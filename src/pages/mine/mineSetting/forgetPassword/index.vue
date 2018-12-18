<template>
  <div class="forgetPasswordPage">
    <ul>
      <li class="display_flex justify-content_flex-justify align-items_center">
        <input v-model="phone" type="number" placeholder="请输入绑定的手机号" placeholder-class="placeholderClass001">
        <SendCode 
        @getSendCode="getSendCode"
        :phoneNum="phone"></SendCode>
      </li>
      <li>
        <input v-model="code" type="text" placeholder="请输入验证码" placeholder-class="placeholderClass001">
      </li>
      <li>
        <input v-model="password" type="text" placeholder="请设置密码" placeholder-class="placeholderClass001">
      </li>
    </ul>
    <button @click="confirm" class="confirmBtn">确定</button>
  </div>
</template>
<script>
  import {
    RegExpr,
  } from "@/utils/regex.js";
  import {
    toast,
    reLaunch
  } from "@/utils/wxapi.js"
  import SendCode from "@/components/sendCode.vue";
  export default {
    data(){
      return {
        phone: "",
        code: "",
        password: "",
      }
    },
    components:{
      SendCode,
    },
    methods:{
      getSendCode(){ //获取验证码回调
        console.log("获取验证码")
      },
      confirm(){ //确定按钮
        let isPhone = RegExpr.checkMobile(this.phone);
        if(!isPhone){
          toast("手机号输入不正确")
        }else if(this.code == ''){
          toast("验证码不能为空")
        }else if(this.password == ""){
          toast("密码不能为空")
        }else{
          console.log("输入无误");
          toast("重新登录")
          reLaunch("/pages/login/main")
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  .forgetPasswordPage {
    width: 100%;
    height: 100%;
    padding: 36rpx 30rpx;
    box-sizing: border-box;

    >ul {
      li {
        margin-top: 26rpx;
        border-bottom: 1rpx solid #E4E4E4;
        input {
          height: 94rpx;
          width: 100%;
        }
      }
    }
  }

</style>
