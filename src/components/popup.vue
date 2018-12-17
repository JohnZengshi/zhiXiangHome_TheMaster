<template>
  <div class="popupComponent">
    <!-- 选择 -->
    <div v-if="popType == '1'" class="select display_flex flex-direction_column">
        <span>{{selectPopupData.title}}</span>
        <ul>
            <li 
            class="display_flex align-items_center"
            :key="index"
            v-for="(item,index) in selectPopupData.selectList"
            @click="selectItem(item[selectPopupData.key])">
                <img v-if="item[selectPopupData.key] == currentId" src="/static/images/homePage/select.png" alt="">
                <img v-else src="/static/images/homePage/unSelect.png" alt="">
                <span>{{item[selectPopupData.label]}}</span>
            </li>
        </ul>
        <div class="btn display_flex">
            <button  @click.stop="hidePopup">取消</button>
            <button @click.stop="confirm" class="active">确定</button>
        </div>
    </div>
    <!-- 删除 -->
    <div v-else-if="popType == '2'" class="del">
        
    </div>
  </div>
</template>
<script>
  import {
    BtnList
  } from "@/constants/homeData.js";
  export default {
    data() {
      return {
        currentId: ""
      }
    },
    props: {
      popType: { //弹窗类型
        type: String,
        default: () => {
          return ""
        }
      },
      selectPopupData: { //选择弹窗的传参
        type: Object,
        default: () => {
          return {
            title: "这是一个选择弹窗", //弹窗标题
            key: "", //选中的key值
            label: "", //显示的值
            selectList: [] //选中列表
          }
        }
      },
      delPopupData: { //删除弹窗的传参
        type: Object,
        default: () => {
          return {
            title: "这是一个删除弹窗"
          }
        }
      }
    },
    methods: {
      hidePopup() {
        console.log("隐藏")
        this.$emit("hidePopup")
      },
      selectItem(id) { //选择某一项
        this.currentId = id;
        console.log()
      },
      confirm() {
        let item = this.selectPopupData.selectList.find((val) => {
          return val[this.selectPopupData.key] == this.currentId
        });
        this.$emit("confirm",item)
      }
    },
    mounted(){
        this.currentId = this.selectPopupData.selectList[0][this.selectPopupData.key]; //初始化
    }
  }
</script>
<style lang="less" scoped>
  .popupComponent {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(77, 61, 51, 0.5);

    .select {
      width: 100%;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      >span {
        width: 100%;
        height: 92rpx;
        background: rgba(240, 240, 240, 1);
        font-size: 32rpx;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(77, 61, 51, 1);
        line-height: 92rpx;
      }
      >ul{
          li{
              width: 100%;
              height: 89rpx;
              img{
                  width: 46rpx;
                  height: 46rpx;
                  margin-left: 30rpx;
                  margin-right: 30rpx;
              }
              span {
                font-size: 34rpx;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(77, 61, 51, 1);
              }
          }
      }
      >.btn{
          height: 100rpx;
          >button{
              height: 100%;
              width: 50%;
              font-size:36rpx;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(77, 61, 51, 1);
              
              &.active{
                  background:rgba(245,208,133,1);
              }
          }
      }
    }

    .del {
        width: 560rpx;
        height: 291rpx;
        background-color: #fff;
    }
  }
</style>