<template>
  <div class="changePasswordPage">
    <ul>
      <li>
        <input v-model="oldPassword" :password="true" type="text" placeholder="请输入旧密码" placeholder-class="placeholderClass001">
      </li>
      <li>
        <input v-model="newPassword" :password="true" type="text" placeholder="请输入新密码" placeholder-class="placeholderClass001">
      </li>
      <li>
        <input v-model="_newPassword" :password="true" type="text" placeholder="请再次输入新密码" placeholder-class="placeholderClass001">
      </li>
    </ul>
    <button @click="confirm" class="confirmBtn">确定</button>
  </div>
</template>
<script>
  import {toast} from "@/utils/wxapi";
  export default {
    data(){
      return {
        oldPassword: "",
        newPassword: "",
        _newPassword: "",
      }
    },
    methods:{
      confirm(){
        if(this.oldPassword == ''){
          toast("旧密码不能为空")
        }else if(this.newPassword == ''){
          toast("新密码不能为空")  
        }else if(this._newPassword == ''){
          toast("请再次输入新密码")
        }else if(this.newPassword != this._newPassword){
          toast("两次输入的新密码不一样")
        }else{

        }
      }
    }
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
