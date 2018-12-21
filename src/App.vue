<script>
  import {
    login,
    getUserInfo,
    toast,
    redirectTo,
    switchTab,
    reLaunch
  } from "@/utils/wxapi";
  import {
    authorized,
    getThirdOpenid,
    getUserProfile
  } from "@/network/api";
  import {
    UserInfoUpdata
  } from "@/utils/common";
  export default {
    data(){
      return {
        code: "", //用户登录code
        restartBindPhone: false, //是否绑定手机
      }
    },
    computed: {
      authorizedParams() { //第三方账号授权登录参数
        return {
          third_type: "wechat_applet",
          third_openid: this.globalData.openId,
          // nickname: "",
          // avatar: "",
          // gender: "",
          // unionid: ""
        }
      },
      getThirdOpenidParams() { //获取openIp参数
        return {
          type: "1",
          code: this.code,
        }
      },
      getUserProfileParams() { //获取用户信息参数
        return {
          openid: this.globalData.openId,
        }
      }
    },
    methods:{
      engineerStatusFilter(profile) {; //工程师状态流程
        (async () => {
          if (!profile.installer) { //不是工程师，信息未完善
            console.log("不是工程师，信息未完善");
            redirectTo("/pages/login/register/completeInformation/main");
          } else if (profile.installer) { //工程师信息已完善，有状态
            let check_status = profile.installer.check_status;
            // check_status = 1;
            if (check_status == 0) { //待审核
              console.log("待审核")
            } else if (check_status == 1) {
              console.log("工程师信息正常");
              switchTab("/pages/home/main");
            } else { //审核中或审核失败
              console.log("工程师信息审核中或审核失败")
              redirectTo("/pages/login/register/auditIng/main");
            }
          } else { //是工程师,手机已绑定
            console.log("是工程师,手机已绑定");
          }
        })()
      }
    },
    onLaunch() {;
      (async () => {
        let loginRES = await login();
        this.code = loginRES.code;
        let getThirdOpenidRES = await getThirdOpenid(this.getThirdOpenidParams) //获取openId
        if (getThirdOpenidRES.errCode == 0) {
          this.globalData.openId = getThirdOpenidRES.third_openid; //全局保存openId
          console.log("已获取openid");
          let authorizedRES = await authorized(this.authorizedParams); //登录
          console.log(authorizedRES)
          if (authorizedRES.errCode == 0) {
            this.globalData.openId = authorizedRES.openid; //全局保存openId
            let profile = authorizedRES.profile;

            if (Array.isArray(profile) && profile.length == 0) { //没有相关信息，手机未绑定
              console.log("未绑定手机,跳转到手机绑定页面");
              await toast('未绑定手机', 500);
              redirectTo("/pages/login/register/main");
            } else { //有相关信息，手机已绑定
              // let profile = await UserInfoUpdata(this.getUserProfileParams);
              let getUserProfileRES = await getUserProfile(this.getUserProfileParams); //获取个人信息
              if (getUserProfileRES.errCode == 0) {
                let profile = getUserProfileRES.profile;
                this.globalData.userInfo = profile;
                this.engineerStatusFilter(profile)
              } else {
                toast(getUserProfileRES.errMsg)
              }
            }


          } else {
            toast(authorizedRES.errMsg)
          }
        } else {
          toast(getThirdOpenidRES.errMsg)
        }

        console.log(this.globalData);
      })()
    },
    created() {
      // console.log("app created and cache logs by setStorageSync");
    },
    onShow() {
      // console.log("app onshow")
      // ;
      // (async () => {
      //   if (this.restartBindPhone) {
      //     await toast('未绑定手机', 500);
      //     redirectTo("/pages/login/register/main");
      //   }
      // })()
    },
    onHide() {
      // if(!this.globalData.userInfo){
      //   console.log("页面隐藏，页面再次进入重新绑定手机")
      //   this.restartBindPhone = true;
      // }
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