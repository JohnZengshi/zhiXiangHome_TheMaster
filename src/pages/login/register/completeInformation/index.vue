<template>
  <div class="completeInformationPage display_flex flex-direction_column align-items_center">
    <div v-if="serviceProviderName != ''" class="storeName display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">服务商名称</span>
        </div>
        <input v-model="serviceProviderName" type="text" placeholder="请输入服务商名称" placeholder-class="placeholderClass001">
    </div>
    <div class="number display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">服务商编号</span>
        </div>
        <input v-model="serviceProviderNumber" type="text" placeholder="请输入服务商编号" placeholder-class="placeholderClass001">
    </div>
    <div class="name display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">姓名</span>
        </div>
        <input v-model="userName" type="text" placeholder="请输入姓名" placeholder-class="placeholderClass001">
    </div>
    <div class="icp display_flex justify-content_flex-justify align-items_center">
        <div class="display_flex align-items_center">
            <span class="line"></span>
            <span class="title">公安机关备案号</span>
        </div>
        <input v-model="ICP" type="text" placeholder="请输入公安机关备案号" placeholder-class="placeholderClass001">
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
      reLaunch,
      uploadFile,
      toast
    } from "@/utils/wxapi.js";
    import {
      applyBeInstaller,
      uploadImage,
      getInstallerDetail
    } from "@/network/api";
    import {
      API_URL,
    } from '@/network/config/hostConfig';
    import {
      publicParams
    } from "@/network/config/publicParams";
    import {
      sign as getSign
    } from "@/utils/signEncryption";
    import {
      RegExpr
    } from "@/utils/regex";
    export default {
      data() {
        return {
          serviceProviderName: "", //服务商名称
          serviceProviderNumber: "", //服务商编号
          userName: "", //姓名
          ICP: "", //公安机关备案号
          idCardList: [{
            src: "" //上传身份证正面
          }, {
            src: "" //上传身份证反面
          }],
          currentUploadImg: "",
        }
      },
      computed:{
          applyBeInstallerParams(){ //申请成为工程师参数
              return {
                  openid: this.globalData.openId,
                  store_no: this.serviceProviderNumber,
                  realname: this.userName,
                  idcard_font_img: this.idCardList[0].src,
                  idcard_back_img: this.idCardList[1].src,
                  security_record_num: this.ICP,
                //   remark: "",
                //   work_time: "",
              }
          },
          uploadImageParams(){ //图片上传参数
            let params = {
              openid: this.globalData.openId,
              method: 'uploadImage',
              type: "idcard",
              timestamp: Date.parse(new Date()) / 1000,
              ...publicParams,
            };
            params.sign = getSign(params);
            return {
                // openid: this.globalData.openId,
                // file: this.currentUploadImg,
                url: API_URL,
                filePath: this.currentUploadImg,
                name: "file",
                formData: params,
            }
          },
          getInstallerDetailParams() { //获取工程师信息参数
            return {
              openid: this.globalData.openId
            }
          }
      },
      methods: {
        uploadIdCard(index) {;
          (async () => {
            let chooseImageRES = await chooseImage(1, ['album', 'camera']);
            console.log(chooseImageRES);
            this.currentUploadImg = chooseImageRES.tempFilePaths[0];
            // let uploadImageRES = await uploadImage(this.uploadImageParams);
            // console.log(uploadImageRES);
            let uploadFileRES = await uploadFile(this.uploadImageParams);
            console.log(uploadFileRES)
            if(uploadFileRES.errCode == 0){ //上传成功
                this.idCardList[index].src = uploadFileRES.file.file;
            }else{
                toast(uploadFileRES.errMsg)
            }
          })()
        },
        submit() {;
          (async () => {
            if (this.serviceProviderNumber == '') {
              toast("服务商编号不能为空")
            } else if (this.userName == '') {
              toast("姓名不能为空")
            } else if(!RegExpr.checkUserName(this.userName)){
              toast("姓名不能包含特殊字符")
            } else if (this.idCardList[0].src == '') {
              toast("请上传身份证正面")
            } else if (this.idCardList[1].src == '') {
              toast("请上传身份证反面")
            } else {
              let applyBeInstallerRES = await applyBeInstaller(this.applyBeInstallerParams);
              console.log(applyBeInstallerRES)
              if (applyBeInstallerRES.errCode == 0) {
                await toast(applyBeInstallerRES.msg, 500)
                redirectTo("/pages/login/register/auditIng/main");
              } else {
                toast(applyBeInstallerRES.errMsg)
              }
            }
          })()
        }
      },
      onLoad(){
          ;(async()=>{
              let getInstallerDetailRES =await getInstallerDetail(this.getInstallerDetailParams);
              console.log(getInstallerDetailRES);
              if(getInstallerDetailRES.errCode == 0){
                  let detail = getInstallerDetailRES.detail;
                  
                  //信息回填
                  this.serviceProviderNumber = detail.store_no ? detail.store_no : "";
                  this.userName = detail.realname ? detail.realname : "";
                  this.ICP = detail.security_record_num ? detail.security_record_num : "";
                  this.idCardList[0].src = detail.idcard_font_img ? detail.idcard_font_img : "";
                  this.idCardList[1].src = detail.idcard_back_img ? detail.idcard_back_img : "";

                  if (this.globalData.serverStoreInfo) { //通过扫码进入获取到有服务商信息
                    this.serviceProviderNumber = this.globalData.serverStoreInfo.store_no;
                    this.serviceProviderName = this.globalData.serverStoreInfo.name;
                  }
              }else{
                  toast(getInstallerDetailRES.errMsg)
              }
          })()

          
      }
    }
</script>
<style lang="less" scoped>
.completeInformationPage{
    >div {
      &:first-of-type {
        margin-top: 36rpx;
      }
    }
    .storeName,.number,.name,.icp{
        width:690rpx;
        height:94rpx;
        background:rgba(216,216,216,0);
        border-bottom: 1rpx solid rgba(228,228,228,0.5);;
    }
    .storeName,.number,.name,.icp,.iCard{
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