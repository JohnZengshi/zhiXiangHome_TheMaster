<template>
  <div class="registerPage">
    <div v-if="!auditIng" class="UnRegister">
      <ul>
        <li class="display_flex justify-content_flex-justify align-items_center">
          <input type="text" placeholder="请输入绑定的手机号" placeholder-class="placeholderClass001">
          <button class="sendCode">发送验证码</button>
        </li>
        <li>
          <input type="text" placeholder="请输入验证码" placeholder-class="placeholderClass001">
        </li>
        <li>
          <input type="text" placeholder="请设置密码" placeholder-class="placeholderClass001">
        </li>
      </ul>
      <button @click="navigatoInformation" class="confirmBtn">下一步</button>
    </div>
    <div v-else class="HasRegister display_flex flex-direction_column align-items_center">
      <block v-if="auditFail">
        <img src="/static/images/loginPage/auditFail-image.png" alt="">
        <span>审核失败</span>
        <span>这里是审核失败的备注</span>
        <button @click="resetRegist" class="btn confirmBtn">重新修改提交</button>
      </block>
      <block v-else>
        <img src="/static/images/loginPage/auditIng-image.png" alt="">
        <span>审核中</span>
        <span>您的信息正在审核中，请耐心等待</span>
      </block>
      
    </div>
  </div>
</template>
<script>
import {navigateTo} from "@/utils/wxapi.js";
  export default {
    data() {
      return {
        auditIng: false, //审核中
        auditFail: false, //审核失败
      }
    },
    methods:{
      navigatoInformation(){ //下一步进入完善信息页面
        navigateTo("/pages/login/register/completeInformation/main")
      },
      resetRegist(){ //重新注册
        this.auditIng = false;
      },
    },
    onShow(){
      this.auditIng = true;
      this.auditFail = true;
    }
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
    .HasRegister{
      width: 100%;
      height: 100%;
      >img{
        width:460rpx;
        height:460rpx;
        margin-top: 78rpx;
      }
      >span{
        &:first-of-type{
          font-size:64rpx;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(77,61,51,1);
          margin-top: 78rpx;
          line-height:90rpx;
        }
        &:last-of-type{
          font-size:32rpx;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(197,197,199,1);
          margin-top: 24rpx;
          line-height:45rpx;
        }
      }
      .btn{
        margin-top: 189rpx;
        width: 670rpx;
      }
    }
    
  }

</style>
