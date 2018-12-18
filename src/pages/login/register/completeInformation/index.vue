<template>
  <div class="completeInformationPage display_flex flex-direction_column align-items_center">
    <div class="number display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">服务商编号</span>
        </div>
        <input type="text" placeholder="请输入服务商编号" placeholder-class="placeholderClass001">
    </div>
    <div class="name display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">姓名</span>
        </div>
        <input type="text" placeholder="请输入姓名" placeholder-class="placeholderClass001">
    </div>
    <div class="icp display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">公安机关备案号</span>
        </div>
        <input type="text" placeholder="请输入公安机关备案号" placeholder-class="placeholderClass001">
    </div>
    <div class="iCard">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">身份证照片</span>
        </div>
        <div class="pic">
            <ul>
                <li class="display_flex flex-direction_column align-items_center">
                    <img v-if="idCardList[0].src != ''" @click="uploadIdCard(0)" :src="idCardList[0].src" alt="">
                    <img v-else @click="uploadIdCard(0)" src="/static/images/loginPage/UploadIdCard.png" alt="">
                    <span>上传身份证正面</span>
                </li>
                <li class="display_flex flex-direction_column align-items_center">
                    <img v-if="idCardList[1].src != ''" @click="uploadIdCard(1)" :src="idCardList[1].src" alt="">
                    <img v-else @click="uploadIdCard(1)" src="/static/images/loginPage/UploadIdCard.png" alt="">
                    <span>上传身份证反面</span>
                </li>
            </ul>
        </div>
    </div>
    <button class="btn confirmBtn" @click="submit">提交审核</button>
  </div>
</template>
<script>
    import {
      chooseImage,
      actionSheet,
      showModal,
      redirectTo,
      reLaunch
    } from "@/utils/wxapi.js";
    export default {
      data() {
        return {
          idCardList: [{
              src: ""
          },{
              src: ""
          }]
        }
      },
      methods: {
        uploadIdCard(index) {;
          (async () => {
            let chooseImageRES = await chooseImage(1, ['album', 'camera']);
            console.log(chooseImageRES.tempFilePaths[0]);
            this.idCardList[index].src = chooseImageRES.tempFilePaths[0];
          })()
        },
        submit() {;
          (async () => {
            let showModalRES = await showModal("提交成功", "提交成功，我们尽快为您审核", false);
            console.log(showModalRES);
            if(showModalRES == 'ok'){
                reLaunch("/pages/login/main")
            }
          })()
        }
      }
    }
</script>
<style lang="less" scoped>
.completeInformationPage{
    .number{
        margin-top: 36rpx;
    }
    .number,.name,.icp{
        width:690rpx;
        height:94rpx;
        background:rgba(216,216,216,0);
        border-bottom: 1rpx solid rgba(228,228,228,0.5);;
    }
    .number,.name,.icp,.iCard{
        >div{
            &:first-of-type{
                >.line{
                    display: inline-block;
                    width:6rpx;
                    height:50rpx;
                    background:rgba(245,208,133,1);
                    margin-right: 16rpx;
                }
                >.title{
                    font-size:27rpx;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(77,61,51,1);
                }
            }
        }
        >input{
            text-align:right
        }
    }
    .iCard{
        >div{
            &:first-of-type{
                width:690rpx;
                height:94rpx;
                background:rgba(216,216,216,0);
            }
        }
        .pic{
            ul{
                li{
                    margin-bottom: 36rpx;
                    img{
                        width:389rpx;
                        height:248rpx;
                    }
                    span{
                        font-size:21rpx;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(197,197,199,1);
                        margin-top: 16rpx;
                    }
                }
            }
        }
    }
    .btn{
        margin-top: 0;
        width: 670rpx;
    }
}
</style>