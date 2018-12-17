<template>
  <div class="orderDetailPage">
    <div class="detial display_flex flex-direction_column">
      <span class="title">工单详情</span>
      <ul>
        <li 
        :key="index"
        v-for="(item,index) in orderData.detail">
          <div class="item display_flex justify-content_flex-justify align-items_center">
            <div class="display_flex align-items_center">
              <span class="line"></span>
              <span class="text">{{item.title}}</span>
            </div>
            <span class="text">{{item.value}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="adress display_flex flex-direction_column">
      <span class="title">服务地址</span>
      <span class="des">{{orderData.adress}}</span>
    </div>
    <div class="instructions display_flex flex-direction_column">
      <span class="title">维修说明</span>
      <span class="des">{{orderData.instructions.des}}</span>
      <div class="pic">
        <ul>
          <li>
            <!-- <img src="" alt=""> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="evaluation display_flex flex-direction_column">
      <span class="title">评价</span>
      <div 
        class="evaluationList"
        :key="index"
        v-for="(item,index) in orderData.evaluation.graded">
        <span class="title">{{item.title}}</span>
        <ul>
          <li></li>
        </ul>
      </div>
      <span class="des">{{orderData.evaluation.des}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {
      orderData() {
        return {
          detail: [{
            title: "状态",
            value: "已完成"
          },{
            title: "工单编号",
            value: "1023568565"
          },{
            title: "售后类型",
            value: "维修"
          },{
            title: "设备分类",
            value: "智能版Q7"
          },{
            title: "业主姓名",
            value: "张飞"
          }],
          adress: "广东省深圳市南山区南山街道南山小区32栋3单元204室",
          instructions: {
            des: "Many people sign up for affiliate programs with the hopes of making some serious money.",
            pic: []
          },
          evaluation: {
            graded: [{
              title: "服务态度",
              score: "2",
            }, {
              title: "专业技能",
              score: "5",
            }],
            des: "Many people sign up for affiliate programs with the hopes of making some serious money.",
          }
        }
      }
    },
    onLoad(option) {
      console.log(`工单id:${option.orderId}`)
    }
  }
</script>
<style lang="less" scoped>
  .orderDetailPage {
    width: 100%;
    height: 100%;
    .detial,.adress,.instructions,.evaluation{
        >.title{
            padding-left: 30rpx;
            width: 100%;
            height: 56rpx;
            line-height: 56rpx;
            font-size:24rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(77,61,51,1);
            background: rgba(241, 241, 241, 1);
        }
        >.des{
            padding: 30rpx;
            font-size:27rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(77,61,51,1);
        }
    }
    .detial{
        >ul{
            li{
                height: 94rpx;
                padding: 0 30rpx;
                box-sizing: border-box;
                >.item{
                    height: 100%;
                    border-bottom: 1rpx solid rgba(241, 241, 241, 1);
                    >div{
                        .line{
                            display: inline-block;
                            width:6rpx;
                            height:50rpx;
                            margin-right: 16rpx;
                            background:rgba(245,208,133,1);
                        }
                    }
                    .text{
                        font-size:27rpx;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(77,61,51,1);
                    }
                }
            }
        }
    }
    .evaluation{
        .evaluationList{
            padding: 30rpx;
            border-bottom: 1rpx solid rgba(241, 241, 241, 1);
            >.title{
                font-size:27rpx;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(77,61,51,1);
            }
            ul{
                li{
                    
                }
            }
        }
    }
  }
</style>