<template>
  <div class="registerPage">
    <div class="UnRegister">
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
        <!-- <li>
          <input v-model="password" type="text" placeholder="请设置密码" placeholder-class="placeholderClass001">
        </li> -->
      </ul>
      <button @click="navigatoInformation" class="confirmBtn">下一步</button>
    </div>
  </div>
</template>
<script>
  import {navigateTo,toast,redirectTo} from "@/utils/wxapi.js";
  import {RegExpr} from "@/utils/regex.js"
  import SendCode from "@/components/sendCode.vue";
  import {bindPhone,sendSmsCode,checkSmsCode,getUserProfile} from "@/network/api";
  export default {
    data() {
      return {
        auditIng: false, //审核中
        auditFail: false, //审核失败
        phone: "", //输入的手机号
        code: "", //输入的验证码
        password: "", //输入的密码
      }
    },
    components:{
      SendCode,
    },
    computed:{
      getUserProfileParams(){ //获取个人信息参数
        return {
          openid: this.globalData.openId
        }
      },
      bindPhoneParams(){ //绑定手机参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
        }
      },
      sendSmsCodeParams(){ //发送短信验证码参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          type: "bind_phone",
        }
      },
      checkSmsCodeParams() { //短信验证码验证参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          code: this.code,
          type: "bind_phone"
        }
      }
    },
    methods:{
      navigatoInformation(){ //下一步进入完善信息页面
        let isPhone = RegExpr.checkMobile(this.phone);
        if(!isPhone){ //手机号输入不正确
          toast("手机号输入不正确")
        }else if(this.code == ''){ //验证码不能为空
          toast("验证码不能为空")
        }
        // else if(this.password == ""){ //密码不能为空
        //   toast("密码不能为空")
        // }
        else{ //输入无误
          console.log("输入无误");
          ;(async()=>{
            let checkSmsCodeRES = await checkSmsCode(this.checkSmsCodeParams);
            console.log(checkSmsCodeRES);
            if (checkSmsCodeRES.errCode == 0) { //短信验证码验证成功
              console.log("短信验证码验证成功")
              let bindPhoneRES = await bindPhone(this.bindPhoneParams)
              console.log(bindPhoneRES);
              if (bindPhoneRES.errCode == 0) { //绑定手机号成功
                await toast(bindPhoneRES.msg, 1000);
                redirectTo("/pages/login/register/completeInformation/main")
              } else {
                toast(bindPhoneRES.msg);
              }
            }else{
              toast(checkSmsCodeRES.msg);
            }
          })()
          
        }
      },
      resetRegist(){ //重新注册
        this.auditIng = false;
      },
      getSendCode() { //获取验证码回调
        ;(async () => {
          let sendSmsCodeRES = await sendSmsCode(this.sendSmsCodeParams)
          console.log(sendSmsCodeRES);
          if(sendSmsCodeRES.errCode == 0){
            toast(sendSmsCodeRES.msg);
          }else{
            toast(sendSmsCodeRES.errMsg)
          }
        })()
      },
    },
    onLoad(query) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      // const scene = decodeURIComponent(query.scene)
      query.scene = encodeURIComponent("ceshi...")
      const scene = decodeURIComponent(query.scene)
      
    },
    onShow(query) {}
  }

</script>
<style lang="less" scoped>
  .registerPage {
    .UnRegister {
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
  }

</style>
