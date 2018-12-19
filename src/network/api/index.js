/**
 * Created by guangqiang on 2017/10/3.
 */

import {
  getFetch,
  postFetch,
  putFetch,
  getFetchFromCache,
  postFetchForValidator
} from '../request/HttpExtension';
import {
  PATH
} from '../config/pathConfig';
import {
  ApiSource
} from '../config/commonType';
import {
  publicParams
} from "../config/publicParams.js";
import {
  deepClone
} from "@/utils/deepClone";

const getThirdOpenid = params => { //获取Openid
  params.method = 'getThirdOpenid';
  return postFetch('', Object.assign(params, publicParams), true);
};

const authorized = params => { //第三方账号授权登录
  params.method = 'authorized';
  return postFetch('', Object.assign(params, publicParams), true);
};

const bindPhone = params => { //手机号绑定
  params.method = 'bindPhone';
  return postFetch('', Object.assign(params, publicParams), true);
};

const sendSmsCode = params => { //发送短信验证码
  params.method = 'sendSmsCode';
  return postFetch('', Object.assign(params, publicParams), true);
};

const checkSmsCode = params => { //短信验证码验证
  params.method = 'checkSmsCode';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getUserProfile = params => { //获取个人资料
  params.method = 'getUserProfile';
  return postFetch('', Object.assign(params, publicParams), true);
};

const applyBeInstaller = params => { //申请成为工程师
  params.method = 'applyBeInstaller';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getInstallerDetail = params => { //获取工程师个人信息
  params.method = 'getInstallerDetail';
  return postFetch('', Object.assign(params, publicParams), true);
}

const uploadImage = params => { //图片上传
  params.method = 'uploadImage';
  return postFetch('', Object.assign(params, publicParams), true);
}



const getWorkOrderList = params => { //工单列表
  params.method = 'getWorkOrderList';
  return postFetch('', Object.assign(params, publicParams), true);
}
export {
  authorized,
  bindPhone,
  sendSmsCode,
  checkSmsCode,
  getUserProfile,
  getThirdOpenid,
  applyBeInstaller,
  getInstallerDetail,
  uploadImage,
  getWorkOrderList
}