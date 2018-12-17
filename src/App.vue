<script>
  export default {
    onLaunch() {
      // wx.hideTabBar({})
    },
    created() {
      console.log("app created and cache logs by setStorageSync");
    },
    onShow() {
      console.log("app onshow")
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
