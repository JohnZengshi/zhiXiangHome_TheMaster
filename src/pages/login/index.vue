<template>
  <div class="loginPage">智享家师傅端小程序</div>
</template>
<script>
  export default {
    data() {
      ll: "123"
    },
    created() {
      wx.hideTabBar({})
      console.log("app created and cache logs by setStorageSync");
    },
  }

</script>
<style lang="less" scoped>
  .loginPage {
    width: 100%;
    height: 100%;
  }
</style>
