<template>
  <div class="homePage">
    <Tabs 
    ref="Tabs"
    :tabsList="tabsList" 
    itemWidth="150"
    @switchTab="switchTab">
    </Tabs>
        <swiper
          class="swiperContent"
          @change="swiperChange"
          :current="currentSwiperIndex">
          <swiper-item
            class="swiperItemContent"
            :key="index"
            v-for="(item,index) in swiperDataList">
              <!-- <Loading 
                v-if="(item.dataList.length == 0 && item.updataTag)"
                :isLoading="item.dataList.length == 0">
                </Loading> -->
              <block v-if="item.dataList.length == 0">
                <NoData></NoData>
              </block>
              <block v-else>
                <CardsListConent
                  :parentData="item"
                  @navigatoDetail="navigatoDetail"
                  @callPhone="callPhone"
                  @clickBtn="clickBtn"></CardsListConent>
              </block>
          </swiper-item>
        </swiper>
    
    <Popup 
    v-if="showPopup"
    :popType="popType"
    :selectPopupData="popupData"
    :delPopupData="popupData"
    @hidePopup="hidePopup"
    @confirm="confirm"></Popup>
  </div>
</template>
<script>
  import Tabs from "@/components/tabs.vue";
  import Popup from "@/components/popup.vue";
  import NoData from "@/components/noData.vue";
  import Loading from "@/components/loading.vue";
  import CardsListConent from "./components/cardsListConent.vue";
  import {showModal,toast,navigateTo,makePhoneCall} from "@/utils/wxapi";
  import {
    tabsList, //tabs栏数据
    order_statusList,
  } from "@/constants/homeData"
  import {
    getWorkOrderList,
    receiveWorkOrder,
    refuseWorkOrder,
    signWorkOrder,
    finishWorkOrder
  } from "@/network/api";
  import {deepClone} from "@/utils/deepClone";
  export default {
    components: {
      Tabs,
      Popup,
      NoData,
      Loading,
      CardsListConent
    },
    data() {
      return {
        tabsList: tabsList, //tabs栏数据
        swiperDataList: tabsList, //swiper页面数据
        currentSwiperIndex: "0", //swiper当前索引
        showPopup: false, //弹窗显示
        popType: "", //弹窗类型
        selectPopupData: {},
        // getDataListIng: false,
        currentOrder: {}, //当前操作的工单
      }
    },
    computed: {
      getWorkOrderListParams(){ //获取工单列表参数
        return {
          openid: this.globalData.openId,
          type: "",
          status: tabsList[this.currentSwiperIndex].status
        }
      },
      receiveWorkOrderParams(){ //接单参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      },
      refuseWorkOrderParams(){ //拒绝此单参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      },
      signWorkOrderParams() { //工程师现场签到操作参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      },
      finishWorkOrderParams(){ //工程师确认完成操作参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      }
    },
    watch: {
      currentSwiperIndex: function (value) {
        let index = value - 0;
        let isCanUpdata = this.swiperDataList[index].updataTag;
        if(isCanUpdata){
          this.updataWorkOrderList();
        }else{
          return 
        }
      }
    },
    methods: {
      swiperChange(e) { //页面滑动切换时触发
        this.$refs['Tabs'].switchTab(e.target.current);
        this.currentSwiperIndex = `${e.target.current}`;
      },
      switchTab(index) { //tabs栏点击触发
        this.currentSwiperIndex = `${index}`;
      },
      clickBtn(btn,data){ //点击订单上的按钮
        let id = btn.id;
        console.log(id,data);
        // this.showPopup = true;
        this.currentOrder = data;
        this.popType = btn.popType;
        // wx.hideTabBar({})
        if (id == '0') { //接单
          ;
          (async () => {
            let res = await showModal("接单", "确定接此订单吗？", true);
            console.log(res);
            if (res == 'ok') {
              let receiveWorkOrderRES = await receiveWorkOrder(this.receiveWorkOrderParams)
              if (receiveWorkOrderRES.errCode == 0) {
                await toast(receiveWorkOrderRES.msg, 500);
                await this.updataWorkOrderList();
                await this.autoSwiperPage();
              }
            }
          })()
        } else if (id == '1') { //拒绝此单
          this.showPopup = true;
          this.popupData = {
            title: "请选择拒绝工单的原因",
            key: "id",
            label: "text",
            selectList: [{
              text: "我没时间",
              id: "0"
            }, {
              text: "其他",
              id: "1"
            }]
          };
        } else if (id == '2') { //签到
          ;
          (async () => {
            let res = await showModal("签到", "确定签到吗？", true);
            if (res == 'ok') {
              let signWorkOrderRES = await signWorkOrder(this.signWorkOrderParams);
              if (signWorkOrderRES.errCode == 0) {
                await toast(signWorkOrderRES.msg, 1000);
                await this.updataWorkOrderList();
                await this.autoSwiperPage();
              }
            }
          })()
        } else if (id == '3') { //服务完成
          ;
          (async () => {
            let res = await showModal("服务完成", "确定服务完成吗？", true);
            if (res == 'ok') {
              let finishWorkOrderRES = await finishWorkOrder(this.finishWorkOrderParams);
              if (finishWorkOrderRES.errCode == 0) {
                toast(finishWorkOrderRES.msg, 500);
                await this.updataWorkOrderList();
                await this.autoSwiperPage();
              }
            }
          })()
        } else if (id == '5') { //删除
          ;
          (async () => {
            let res = await showModal("删除", "确定删除此订单吗？", true);
            console.log(res);
          })()
        }
      },
      filterBtn(btnList, val, currentIndex) { // 工单按钮过滤
        if (currentIndex == '3') { //已完成的工单按钮判断
          return btnList.filter((v) => {
            if (val.first_assess == 1) {
              return v.id == "6" //已评价
            } else {
              return v.id == "4" //待评价
            }
          })
        } else {
          return btnList
        }
      },
      hidePopup() { //隐藏弹窗
        this.showPopup = false;
        // wx.showTabBar({})
      },
      confirm(data) { //弹窗确定
        console.log(data);
        this.showPopup = false;
        ;(async()=>{
          let refuseWorkOrderRES = await refuseWorkOrder(Object.assign({
            remark: data.text
          }, this.refuseWorkOrderParams))
          if (refuseWorkOrderRES.errCode == 0) {
            await toast(refuseWorkOrderRES.msg, 1000);
            await this.updataWorkOrderList();
            this.swiperDataList[tabsList.length-1].updataTag = true;
          }
        })()
        // wx.showTabBar({})
      },
      navigatoDetail(id) { //点击卡片跳转到工单详情
        let url = `/pages/home/orderDetail/main?orderId=${id}`;
        navigateTo(url);
      },
      getData(index){ //模拟获取数据
        // this.getDataListIng = true;
        let btnList = tabsList[index].btnList
        setTimeout(() => {
          if (this.swiperDataList[index].dataList.length == 0) {
            // this.getDataListIng = false;
            this.swiperDataList[index].updataTag = false;
            if(index == 3) return;
            this.swiperDataList[index].dataList = [{ //模拟数据
              titleName: "智能版Q7",
              type: "安装",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList
            }, {
              titleName: "智能版Q7",
              type: "安装",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList
            }, {
              titleName: "智能版Q7",
              type: "安装",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList
            }, {
              titleName: "智能版Q7",
              type: "安装",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList
            }];
          }
        }, 2000)
      },
      getWorkOrderList() {; //获取工单数据
        let currentIndex = this.currentSwiperIndex;
        return (async () => {
          let getWorkOrderListRES = await getWorkOrderList(this.getWorkOrderListParams);
          console.log(getWorkOrderListRES)
          if(getWorkOrderListRES.errCode == 0){
            console.log(getWorkOrderListRES.list)
            let list = getWorkOrderListRES.list.map((val)=>{
              let btnList = tabsList[currentIndex].btnList;
              btnList = this.filterBtn(btnList, val, currentIndex);
              
              let item = {
                titleName: val.sku_name,
                type: val.work_order_type,
                order: val.worder_sn,
                appointment: val.appointment,
                address: val.address,
                phone: val.phone,
                btnList: btnList,
                status_txt: order_statusList.find((v)=>{
                  return v.status == val.work_order_status
                }).text
              };
              return item;
              
            })
            return list;
            // this.swiperDataList[currentIndex].dataList = list;
          }else{
            return []
          }
        })()
      },
      updataWorkOrderList() { //刷新工单数据
        let currentIndex = this.currentSwiperIndex;
        return (async () => {
          if (Array.isArray(tabsList[currentIndex].status)) { //有多个状态
            this.swiperDataList[currentIndex].dataList = [];
            let statusList = tabsList[currentIndex].status;
            statusList.forEach(async (val) => {
              tabsList[currentIndex].status = val;
              let List = await this.getWorkOrderList()
              this.swiperDataList[currentIndex].dataList = this.swiperDataList[currentIndex].dataList.concat(List);
            });
            tabsList[currentIndex].status = statusList;
          } else {
            this.swiperDataList[currentIndex].dataList = await this.getWorkOrderList();
          }
          this.swiperDataList[currentIndex].updataTag = true; //单个页面默认滑动只刷新一次
          return true;
        })()
      },
      callPhone(phone){ //打电话
        makePhoneCall(`${phone}`)
      },
      autoSwiperPage() { //自动滑动页面
        let currentIndex = parseInt(this.currentSwiperIndex);
        if (currentIndex < tabsList.length - 1) {
          this.currentSwiperIndex = `${currentIndex + 1}`;
          this.swiperDataList[this.currentSwiperIndex].updataTag = true;
        }
      }
    },
    onLoad() {},
    onShow() {
      console.log("home-show")
      if(this.globalData.openId != ''){
        this.updataWorkOrderList();
      }
    }
  }
</script>
<style lang="less"scoped>
.homePage {
  height: 100%;
  background-color: #F5F5F5;
  
  .swiperContent {
    // transform: translateY(94rpx);
    padding-top: 94rpx;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .cardsConent {
      width: 100%;
      height: 94rpx;
      position: relative;
    }
    .swiperItemContent {
      // overflow-y: scroll;

      
    }
  }
  
}

</style>
