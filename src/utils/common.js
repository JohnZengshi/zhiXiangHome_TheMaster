// 公用方法
import {
  getUserProfile
} from "@/network/api";
import {
  toast
} from "@/utils/wxapi"

const UserInfoUpdata = (params) => { //刷新获取个人数据
  ;
  let res = (async () => {
    let getUserProfileRES = await getUserProfile(params); //获取个人信息
    console.log(getUserProfileRES)
    if (getUserProfileRES.errCode == 0) {
      let profile = getUserProfileRES.profile;
      this.globalData.userInfo = getUserProfileRES.profile;
      return profile;
    } else {
      toast(getUserProfileRES.errMsg)
    }
  })()
  return res;
}

export {
  UserInfoUpdata,
}