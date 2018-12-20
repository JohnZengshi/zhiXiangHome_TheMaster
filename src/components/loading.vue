<template>
  <!-- loading组件 -->
  <div 
    :class="{loading:isLoading}"
    class="loadingComponent display_flex justify-content_flex-center align-items_center">
    <div class="loader-inner ball-clip-rotate">
      <div></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .loadingComponent {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    // background-color: rgba(0, 0, 0, 0.1);
    opacity: 1;
    // &.loading{
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     z-index: 999;
    //     background-color: rgba(77, 61, 51, 0.2);
    //     opacity: 1;
    // }
    .ball-clip-rotate {
      div {
        background-color: #fff;
        width: 80rpx;
        height: 80rpx;
        border-radius: 100%;
        margin: 4rpx;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        border: 8rpx solid #F5D085;
        border-bottom-color: transparent;
        background: transparent !important;
        display: inline-block;
        -webkit-animation: rotate 0.75s 0s linear infinite;
        animation: rotate 0.75s 0s linear infinite;
      }
    }


    @keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
</style>