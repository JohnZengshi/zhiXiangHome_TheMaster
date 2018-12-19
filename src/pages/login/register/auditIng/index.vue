<template>
  <div class="HasRegister display_flex flex-direction_column align-items_center">
    <block v-if="auditFail">
      <img src="/static/images/loginPage/auditFail-image.png" alt="">
      <span>审核失败</span>
      <span>这里是审核失败的备注</span>
      <button @click="resetRegist" class="btn confirmBtn">重新修改提交</button>
    </block>
    <block v-else-if="auditIng">
      <img src="/static/images/loginPage/auditIng-image.png" alt="">
      <span>审核中</span>
      <span>您的信息正在审核中，请耐心等待</span>
    </block>
  </div>
</template>
<script>
  import {
    getUserProfile
  } from "@/network/api";
  import {
    UserInfoUpdata
  } from "@/utils/common";
  import {
    redirectTo
  } from "@/utils/wxapi";
  export default {
    data() {
      return {
        auditIng: false, //审核中
        auditFail: false, //审核失败
      }
    },
    computed: {
      getUserProfileParams() { //获取用户信息参数
        return {
          openid: this.globalData.openId,
        }
      }
    },
    methods: {

    },
    onShow(query) {;
      (async () => {
        // let profile = await UserInfoUpdata(this.getUserProfileParams);
        let getUserProfileRES = await getUserProfile(this.getUserProfileParams); //获取个人信息
        if (getUserProfileRES.errCode == 0) {
          let profile = getUserProfileRES.profile;
          this.globalData.userInfo = profile;

          let check_status = profile.installer.check_status;
          // check_status = 1;
          if (check_status == 0) { //待审核
            console.log("待审核")
          } else if (check_status == 1) {
            redirectTo("pages/mine/main");
          } else if (check_status == -1 || check_status == -3) { //审核中
            this.auditIng = true;
          } else if (check_status == -2 || check_status == -4) { //审核失败
            this.auditFail = true;
          }

        } else {
          toast(getUserProfileRES.errMsg)
        }
        
      })()
    }
  }
</script>

<style lang="less" scoped>
  .HasRegister {
    width: 100%;
    height: 100%;

    >img {
      width: 460rpx;
      height: 460rpx;
      margin-top: 78rpx;
    }

    >span {
      &:first-of-type {
        font-size: 64rpx;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(77, 61, 51, 1);
        margin-top: 78rpx;
        line-height: 90rpx;
      }

      &:last-of-type {
        font-size: 32rpx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(197, 197, 199, 1);
        margin-top: 24rpx;
        line-height: 45rpx;
      }
    }

    .btn {
      margin-top: 189rpx;
      width: 670rpx;
    }
  }
</style>