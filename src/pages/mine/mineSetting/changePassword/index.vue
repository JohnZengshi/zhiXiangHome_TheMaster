<template>
  <div class="changePasswordPage">
    <ul>
      <li>
        <input type="text" placeholder="请输入旧密码" placeholder-class="placeholderClass001">
      </li>
      <li>
        <input type="text" placeholder="请输入新密码" placeholder-class="placeholderClass001">
      </li>
      <li>
        <input type="text" placeholder="请再次输入新密码" placeholder-class="placeholderClass001">
      </li>
    </ul>
    <button class="confirmBtn">确定</button>
  </div>
</template>
<script>
  export default {

  }

</script>
<style lang="less" scoped>
  .changePasswordPage {
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
