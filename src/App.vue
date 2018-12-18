<script>
  import {
    login,
    getUserInfo
  } from "@/utils/wxapi";
  export default {
    onLaunch() {
      // wx.hideTabBar({})
      ;
      (async () => {
        // let loginRES = await login();
        // console.log(loginRES);
        // let getUserInfoRES = await getUserInfo({
        //   withCredentials: true
        // });
        // console.log(getUserInfoRES);
      })()
    },
    created() {
      console.log("app created and cache logs by setStorageSync");
    },
    onShow() {
      console.log("app onshow")
    },
    onHide() {

    }
  }
</script>
<style lang="less">
  @import "./assets/base.css";
  @import "./assets/common.css";

  page {
    width: 100%;
    height: 100%;
  }
</style>