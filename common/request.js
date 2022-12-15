import http from "./ajax";
import { api } from "./api";

export const login = (data) => {
  return http({
    url: api.login,
    method: "post",
    data: data,
  });
};

export const decryptUserInfo = (data) => {
  return http({
    url: api.decryptUserInfo,
    method: "post",
    data: data,
  });
};

export const decryptMobile = (data) => {
  return http({
    url: api.decryptMobile,
    method: "post",
    data: data,
  });
};

export const home = (data) => {
  return http({
    url: api.home,
    method: "post",
    timeout: 30000,
    data: data,
  });
};

export const newsInfo = (data) => {
  return http({
    url: api.newsInfo,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const newslist = (data) => {
  return http({
    url: api.newslist,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const news = (data) => {
  return http({
    url: api.news,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const userCenter = (data) => {
  return http({
    url: api.userCenter,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const mynotice = (data) => {
  return http({
    url: api.mynotice,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const noticeinfo = (data) => {
  return http({
    url: api.noticeinfo,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const orderlist = (data) => {
  return http({
    url: api.orderlist,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const userAgreement = (data) => {
  return http({
    url: api.userAgreement,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const orderInfo = (data) => {
  return http({
    url: api.orderInfo,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const feedbackType = (data) => {
  return http({
    url: api.feedbackType,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const feedback = (data) => {
  return http({
    url: api.feedback,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const aboutUs = (data) => {
  return http({
    url: api.aboutUs,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const levelRule = (data) => {
  return http({
    url: api.levelRule,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const acceptOrder = (data) => {
  return http({
    url: api.acceptOrder,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const rejectReason = (data) => {
  return http({
    url: api.rejectReason,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const purse = (data) => {
  return http({
    url: api.purse,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const masterStatus = (data) => {
  return http({
    url: api.masterStatus,
    method: "post",
    timeout: 30000,
    data: data,
  });
};

export const rejectOrder = (data) => {
  return http({
    url: api.rejectOrder,
    method: "post",
    timeout: 30000,
    data: data,
  });
};

export const myInfo = (data) => {
  return http({
    url: api.myInfo,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const balance = (data) => {
  return http({
    url: api.balance,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const noticedel = (data) => {
  return http({
    url: api.noticedel,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const withdraw = (data) => {
  return http({
    url: api.withdraw,
    method: "post",
    timeout: 30000,
    data: data,
  });
};
export const myorder = (data) => {
  return http({
    url: api.myorder,
    method: "post",
    timeout: 30000,
    data: data,
  });
};

export const master_application = (data) => {
  return http({
    url: api.master_application,
    method: "post",
    data: data,
  });
};

export const application_edit = (data) => {
  return http({
    url: api.application_edit,
    method: "post",
    data: data,
  });
};

export const application_status = (data) => {
  return http({
    url: api.application_status,
    method: "post",
    data: data,
  });
};

export const contractinfo = (data) => {
  return http({
    url: api.contractinfo,
    method: "post",
    data: data,
  });
};

export const sign_contract = (data) => {
  return http({
    url: api.sign_contract,
    method: "post",
    data: data,
  });
};
export const search = (data) => {
  return http({
    url: api.search,
    method: "post",
    data: data,
  });
};
export const finishservice = (data) => {
  return http({
    url: api.finishservice,
    method: "post",
    data: data,
  });
};
export default {
  login,
  newsInfo,
  newslist,
  news,
  myInfo,
  mynotice,
  userCenter,
  userAgreement,
  orderlist,
  orderInfo,
  noticeinfo,
  feedbackType,
  feedback,
  aboutUs,
  levelRule,
  acceptOrder,
  rejectReason,
  purse,
  masterStatus,
  rejectOrder,
  balance,
  noticedel,
  withdraw,
  search,
  finishservice,

  myorder,

  master_application,
  application_edit,
  application_status,
  contractinfo,
  sign_contract,

  decryptUserInfo,
  decryptMobile,
};
