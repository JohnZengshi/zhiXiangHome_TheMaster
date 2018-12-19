<template>
  <!-- 头部tabs栏切换组件 -->
  <div class="tabsComponent">
    <ul>
      <li 
      :style="{width: itemWidth+'rpx'}" 
      class="item" :key="index" 
      v-for="(item,index) in tabsList" 
      @click="switchTab(index)">{{item.text}}</li>
    </ul>
    <span 
    :style="{width: itemWidth+'rpx', left: itemLeft + 'rpx'}" 
    class="line"></span>
  </div>
</template>
<script>
  export default {
    name: "tabs",
    props: {
      tabsList: {
        type: Array,
        default: () => {
          return []
        }
      },
      itemWidth: {
        type: String,
        default: () => {
          return ""
        }
      }
    },
    data() {
      return {
        itemLeft: "0"
      }
    },
    methods: {
      switchTab(index) {
        this.itemLeft = `${index*this.itemWidth}`;
        this.$emit("switchTab",index)
      }
    },

  }
</script>
<style lang="less" scoped>
  .tabsComponent {
    position: absolute;
    top: 0;
    background-color: #fff;
    ul {
      height: 94rpx;

      li {
        float: left;
        height: 100%;
        line-height: 94rpx;
        text-align: center;
        font-size: 28rpx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(77, 61, 51, 1);
      }
    }

    >.line {
      position: absolute;
      bottom: 0;
      display: inline-block;
      transition: all 0.2s;
      height: 5rpx;
      background: rgba(245, 208, 133, 1);
    }
  }

</style>
