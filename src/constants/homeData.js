let btnList = [{
  text: "接单",
  id: "0",
  popType: "", //弹窗类型
  active: true,
}, {
  text: "拒绝此单",
  id: "1",
  popType: "1", //弹窗类型
  active: false,
}, {
  text: "签到",
  id: "2",
  popType: "", //弹窗类型
  active: true,
}, {
  text: "服务完成",
  id: "3",
  popType: "", //弹窗类型
  active: true,
}, {
  text: "待评价",
  id: "4",
  popType: "", //弹窗类型
  active: false,
}, {
  text: "删除",
  id: "5",
  popType: "2", //弹窗类型
  active: false,
}];

let tabsList = [{
    text: "待接单",
    id: "0",
    dataList: [],
    btnList: btnList.filter((val)=>{
      return val.id == '0' || val.id == '1'
    }),
    updataTag: true, //是否可以刷新数据
  },
  {
    text: "待上门",
    id: "1",
    dataList: [],
    btnList: btnList.filter((val)=>{
      return val.id == '2'
    }),
    updataTag: true,
  },
  {
    text: "进行中",
    id: "2",
    dataList: [],
    btnList: btnList.filter((val)=>{
      return val.id == '3'
    }),
    updataTag: true,
  },
  {
    text: "已完成",
    id: "3",
    dataList: [],
    btnList: btnList.filter((val)=>{
      return val.id == '4'
    }),
    updataTag: true,
  },
  {
    text: "已取消",
    id: "4",
    dataList: [],
    btnList: btnList.filter((val)=>{
      return val.id == '5'
    }),
    updataTag: true,
  },
];

module.exports = {
  tabsList,
  btnList
}