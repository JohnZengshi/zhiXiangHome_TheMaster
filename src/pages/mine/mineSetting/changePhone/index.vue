<template>
  <div class="changePhonePage">
    <ul>
      <li class="display_flex justify-content_flex-justify align-items_center">
        <input v-model="phone" type="text" placeholder="请输入手机号" placeholder-class="placeholderClass001">
        <SendCode
          @getSendCode="getSendCode"
          :phoneNum="phone"></SendCode>
      </li>
      <li>
        <input v-model="code" type="text" placeholder="请输入验证码" placeholder-class="placeholderClass001">
      </li>
    </ul>
    <button @click="confirm" class="confirmBtn">确定更换</button>
  </div>
</template>
<script>
  import {navigateTo,toast} from "@/utils/wxapi.js";
  import {RegExpr} from "@/utils/regex.js"
  import SendCode from "@/components/sendCode.vue";
  export default {
    data(){
      return {
        phone: "",
        code: "",
      }
    },
    components:{
      SendCode,
    },
    methods:{
      getSendCode(){

      },
      confirm(){
        let isPhone = RegExpr.checkMobile(this.phone)
        if(!isPhone){
          toast("请输入正确的手机号")
        }else if(this.code == ''){
          toast("验证码不能为空")
        }else{
          console.log("输入无误")
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  .changePhonePage {
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
