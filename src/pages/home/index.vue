<template>
  <div class="homePage">
    <Tabs 
    ref="Tabs"
    :tabsList="tabsList" 
    itemWidth="150"
    @switchTab="switchTab"></Tabs>
    <swiper
      class="swiperContent"
      @change="swiperChange"
      :current="currentSwiperIndex">
      <swiper-item
      class="swiperItemContent"
      :key="index"
      v-for="(item,index) in swiperDataList">
      <ul>
          <li 
            :key="i"
            v-for="(data,i) in item.dataList">
                <div class="card display_flex">
                  <div class="left display_flex flex-direction_column align-items_center">
                    <img src="/static/images/homePage/install-icon.png" alt="">
                    <span class="line"></span>
                    <span class="type">{{data.type}}</span>
                  </div>
                  <div class="rigth display_flex flex-direction_column">
                    <!-- <navigator url="/pages/home/orderDetail/main?id={{item.id}}"> -->
                    <div @click="navigatoDetail(data.order)" class="detail display_flex flex-direction_column">
                      <span class="titleName">
                        <span class="name">{{data.titleName}}</span>
                        <span class="type">{{item.text}}</span>
                      </span>
                      <span class="order">单号：{{data.order}}</span>
                      <span class="appointment">预约时间：{{data.appointment}}</span>
                      <span class="address">地址：{{data.address}}</span>
                    </div>
                    <!-- </navigator> -->
                    <div class="callPhone display_flex flex-direction_column align-items_center" v-if="item.id > 0">
                      <img src="/static/images/homePage/phone-icon.png" alt="">
                      <span>顾客</span>
                    </div>
                    <div class="btn">
                      <button @click="clickBtn(btn.id)" :class="{active : btn.active}" :key="b" v-for="(btn,b) in data.btnList">{{btn.text}}</button>
                    </div>
                  </div>
                </div>
          </li>
      </ul>
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
  import {showModal,toast,navigateTo} from "@/utils/wxapi";
  import {
    tabsList, //tabs栏数据
    btnList, //按钮
  } from "@/constants/homeData"
  export default {
    components: {
      Tabs,
      Popup
    },
    data() {
      return {
        tabsList: tabsList, //tabs栏数据
        swiperDataList: tabsList, //swiper页面数据
        currentSwiperIndex: "0", //swiper当前索引
        showPopup: false, //弹窗显示
        popType: "", //弹窗类型
        selectPopupData: {},
      }
    },
    computed: {

    },
    watch: {
      currentSwiperIndex: function (value) {
        let index = value - 0;
        let btnList = tabsList[index].btnList
        if (this.swiperDataList[index].dataList.length == 0) {
          this.swiperDataList[index].dataList = [{
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
      clickBtn(id){ //点击订单上的按钮
        // this.showPopup = true;
        this.popType = this.getPopupType(id);
        // wx.hideTabBar({})
        if(id == '1'){ //拒绝此单
          this.showPopup = true;
          this.popupData = {
            title: "请选择拒绝工单的原因",
            key: "id",
            label: "text",
            selectList: [{
              text: "我没时间",
              id: "0"
            },{
              text: "其他",
              id: "1"
            }]
          }
        }else if(id == '5'){ //删除
          // this.showPopup = true;
          // this.popupData = {
          //   title: "确定删除此订单吗？"
          // };
          (async()=>{
            let res = await showModal("删除", "确定删除此订单吗？", true);
            console.log(res);
          })()
        }
      },
      hidePopup() { //隐藏弹窗
        this.showPopup = false;
        // wx.showTabBar({})
      },
      confirm(data) { //弹窗确定
        console.log(data);
        this.showPopup = false;
        // wx.showTabBar({})
      },
      navigatoDetail(id) { //点击卡片跳转到工单详情
        let url = `/pages/home/orderDetail/main?orderId=${id}`;
        navigateTo(url);
      },
      getPopupType(id) { // 获取弹窗类型
        let item = btnList.find((val) => {
          return val.id == id;
        });
        return item.popType;
      },
    },
    
    onLoad() {
      let btnList = tabsList[0].btnList
      this.swiperDataList[0].dataList = [{
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
  }
</script>
<style lang="less"scoped>
.homePage {
  height: 100%;
  background-color: #F5F5F5;
  .swiperContent {
    padding-top: 94rpx;
    height: 100%;
    box-sizing: border-box;

    .swiperItemContent {
      overflow-y: scroll;

      ul {
        box-sizing: border-box;
        padding: 0 30rpx;

        li {
          .card {
            width: 690rpx;
            height: 380rpx;
            background-color: #fff;
            border-radius: 30rpx;
            margin-top: 30rpx;
            box-shadow: 0rpx 10rpx 12rpx 0rpx rgba(193, 193, 193, 0.34);
            overflow: hidden;

            .left {
              width: 100rpx;
              height: 100%;
              background: rgba(245, 208, 133, 1);

              >img {
                margin-top: 48rpx;
                width: 72rpx;
                height: 72rpx;
              }

              >.line {
                margin-top: 47rpx;
                margin-bottom: 61rpx;
                display: inline-block;
                background-color: rgba(77, 61, 51, 1);
                width: 69rpx;
                height: 2rpx;
                opacity: 0.5;
              }

              >.type {
                font-size: 32rpx;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(77, 61, 51, 1);
              }
            }

            .rigth {
              width: 590rpx;
              height: 100%;
              padding: 0 20rpx 0 24rpx;
              position: relative;
              .detail {
                box-sizing: border-box;
                border-bottom: 1rpx solid rgba(216, 216, 216, 1);

                .titleName {
                  position: relative;
                  margin-top: 30rpx;
                  margin-bottom: 2rpx;

                  .name {
                    margin-right: 12rpx;
                    font-size: 42rpx;
                    line-height: 63rpx;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(77, 61, 51, 1);
                  }

                  .type {
                    text-align: center;
                    line-height: 38rpx;
                    display: inline-block;
                    width: 82rpx;
                    height: 38rpx;
                    background: rgba(240, 240, 240, 1);
                    border-radius: 10rpx;
                    font-size: 20rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(197, 197, 199, 1);
                    transform: translateY(-34rpx)
                  }
                }

                .order,
                .appointment,
                .address {
                  font-size: 26rpx;
                  line-height: 37rpx;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(197, 197, 199, 1);
                  margin-top: 10rpx;
                }

                .address {
                  margin-bottom: 20rpx;
                }

              }
              .btn {
                height: 127rpx;

                button {
                  float: right;
                  width: 225rpx;
                  height: 79rpx;
                  background: rgba(240, 240, 240, 1);
                  box-shadow: 0rpx 10rpx 12rpx 0rpx rgba(193, 193, 193, 0.34);
                  border-radius: 40rpx;
                  font-size: 32rpx;
                  margin: 24rpx;
                  color: rgba(77, 61, 51, 1);

                  &.active {
                    background: rgba(245, 208, 133, 1);
                    box-shadow: 0rpx 10rpx 12rpx 0px rgba(245, 208, 133, 0.69);
                    color: rgba(77, 61, 51, 1);
                  }
                }
              }
              .callPhone {
                position: absolute;
                right: 20rpx;
                top: 20rpx;

                >img {
                  width: 82rpx;
                  height: 82rpx;
                }

                >span {
                  margin-top: 14rpx;
                  font-size: 20rpx;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  color: rgba(197, 197, 199, 1);
                }
              }
            }
          }

          &:last-of-type {
            margin-bottom: 30rpx;
          }


        }
      }
    }
  }
}

</style>
