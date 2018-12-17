let tabsList = [{
    text: "待接单",
    id: "0",
    dataList: [],
    btnList: [{
        text: "接单",
        id: "0",
        active: true,
      },
      {
        text: "拒绝此单",
        id: "1",
        active: false,
      }
    ]
  },
  {
    text: "待上门",
    id: "1",
    dataList: [],
    btnList: [{
      text: "签到",
      id: "2",
      active: true,
    }]
  },
  {
    text: "进行中",
    id: "2",
    dataList: [],
    btnList: [{
      text: "服务完成",
      id: "3",
      active: true,
    }]
  },
  {
    text: "已完成",
    id: "3",
    dataList: [],
    btnList: [{
      text: "待评价",
      id: "4",
      active: false,
    }]
  },
  {
    text: "已取消",
    id: "4",
    dataList: [],
    btnList: [{
      text: "删除",
      id: "5",
      active: false,
    }]
  },
];

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
  }
];
module.exports = {
  tabsList,
  btnList
}