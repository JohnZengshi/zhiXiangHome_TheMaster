<template>
  <div class="forgetPasswordPage">
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
    <button class="confirmBtn">确定</button>
  </div>
</template>
<script>
  export default {

  }

</script>
<style lang="less" scoped>
  .forgetPasswordPage {
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
