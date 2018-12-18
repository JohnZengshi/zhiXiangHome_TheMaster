<template>
  <div class="loginPage display_flex flex-direction_column align-items_center">
    <div class="logo display_flex justify-content_flex-center align-items_center">
      <img src="/static/images/loginPage/LOGO.png" alt="">
    </div>
    <div class="phone display_flex align-items_center">
      <img src="/static/images/loginPage/account-icon.png" alt="">
      <input v-model="phone" type="number" placeholder="请输入手机号" placeholder-class="placeholderClass001">
    </div>
    <div class="passworde display_flex align-items_center justify-content_flex-justify">
      <div class="display_flex align-items_center">
        <img src="/static/images/loginPage/password-icon.png" alt="">
        <input v-model="password"  type="text" :password="hidePassword" placeholder="请输入密码" placeholder-class="placeholderClass001">
      </div>
      <div class="display_flex align-items_center">
        <img v-if="hidePassword" @click="switchHidePassword" src="/static/images/loginPage/hide-icon.png" alt="">
        <img v-else @click="switchHidePassword" src="/static/images/loginPage/show-icon.png" alt="">
        <span class="forgetPassword">
          <navigator url="/pages/mine/mineSetting/forgetPassword/main">忘记密码</navigator>
        </span>
      </div>
    </div>
    <button @click="login" class="btn confirmBtn">登录</button>
    <div class="register display_flex align-items_center">
      <span>还没有账号，</span>
      <span><navigator url="/pages/login/register/main">注册</navigator></span>
    </div>
  </div>
</template>
<script>
  import {
    navigateTo,
    redirectTo,
    switchTab,
    toast
  } from "@/utils/wxapi.js";
  import {
    RegExpr
  } from "@/utils/regex.js";
  export default {
    data() {
      return {
        phone: "", //输入的手机号
        password: "", //输入的密码
        hidePassword: true, //隐藏显示密码
      }
    },
    methods:{
      switchHidePassword(){ //点击眼睛按钮
        this.hidePassword = !this.hidePassword;
      },
      login(){ //登录
        let isPhone = RegExpr.checkMobile(this.phone);
        let passwordRight = this.password != '';
        if(isPhone && passwordRight){ //输入无误
          console.log("输入无误")
          // 假设登录成功
          switchTab("/pages/mine/main");
        }else{
          toast("手机号不正确或密码为空");
        }
      }
    },
    created() {
      
    },
  }

</script>
<style lang="less" scoped>
  .loginPage {
    width: 100%;
    height: 100%;
    .logo{
      width:750rpx;
      height:400rpx;
      background:rgba(245,208,133,1);
      >img{
        width: 180rpx;
        height: 251rpx;
      }
    }
    .phone{
      width:690rpx;
      height:94rpx;
      background:rgba(216,216,216,0);
      border-bottom: 1rpx solid #E4E4E4;
      margin-top: 45rpx;
      >img{
        width:54rpx;
        height:54rpx;
        margin-right: 20rpx;
      }
    }
    .passworde{
      width:690rpx;
      height:94rpx;
      background:rgba(216,216,216,0);
      border-bottom: 1rpx solid #E4E4E4;
      margin-top: 26rpx;
      >div {
        >img {
          width: 54rpx;
          height: 54rpx;
          margin-right: 20rpx;
        }
        .forgetPassword{
          font-size:26rpx;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(233,192,101,1);
        }
      }
      
    }
    .btn{
      width: 670rpx;
      margin-top: 70rpx;
    }
    .register{
      font-size:26rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(197,197,199,1);
      margin-top: 50rpx;
      >span {
        &:last-of-type {
          color: #F5D085;
        }
      }
    }
  }
</style>
