<template>
  <div class="orderDetailPage">
    <!-- 工单详情 -->
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
    <!-- 服务地址 -->
    <div class="adress display_flex flex-direction_column">
      <span class="title">服务地址</span>
      <span class="des">{{orderData.adress}}</span>
    </div>
    <!-- 维修说明 -->
    <div class="instructions display_flex flex-direction_column">
      <span class="title">维修说明</span>
      <span class="des">{{orderData.instructions.des}}</span>
      <div class="pic">
        <ul>
          <li 
            :key="index"
            v-for="(item,index) in orderData.instructions.pic">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
    </div>
    <!-- 评价 -->
    <div class="evaluation display_flex flex-direction_column">
      <span class="title">评价</span>
      <div 
        class="evaluationList"
        :key="index"
        v-for="(item,index) in orderData.evaluation.graded">
        <span class="title">{{item.title}}</span>
        <Graded 
          :imgs="imgs" 
          :width="15" 
          :height="15" 
          :starValue="1" 
          :initScroe="item.score"
          :isClick="false"
          @ok="back"></Graded>
      </div>
      <span class="des">{{orderData.evaluation.des}}</span>
    </div>
  </div>
</template>
<script>
  import Graded from "@/components/graded.vue";
  export default {
    data() {
      return {
        imgs:["/static/images/homePage/star-gray-icon.png","","/static/images/homePage/star-glod-icon.png"]
      }
    },
    components:{
      Graded,
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
            pic: ["http://img4.imgtn.bdimg.com/it/u=1020383179,3062284491&fm=26&gp=0.jpg","http://img4.imgtn.bdimg.com/it/u=1092627251,154743113&fm=26&gp=0.jpg","http://img0.imgtn.bdimg.com/it/u=1863431202,3112794646&fm=26&gp=0.jpg"]
          },
          evaluation: {
            graded: [{
              title: "服务态度",
              score: 2,
            }, {
              title: "专业技能",
              score: 5,
            }],
            des: "Many people sign up for affiliate programs with the hopes of making some serious money.",
          }
        }
      }
    },
    methods:{
      back(){
        
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
    .instructions{
        .pic{
          ul{
            padding: 0 107rpx;
            >li{
              float: left;
              width: 253rpx;
              height: 253rpx;
              margin-right: 30rpx;
              margin-bottom: 30rpx;
              &:nth-of-type(2n){
                margin-right: 0;
              }
              >img{
                width: 100%;
                height: 100%;
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
                li {
                  width: 30rpx;
                  height: 30rpx;
                  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjQgKDY3Mzc4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zdGFyLWdyYXktaWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSLluIjlgoXnq6/lsI/nqIvluo8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLlt6XljZXor6bmg4Ut5biI5YKF56uvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUwLjAwMDAwMCwgLTE3MjguMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJzdGFyLeacqumAieS4rS1pY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTAuMDAwMDAwLCAxNzI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjRDhEOEQ4IiB4PSIwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSLmmJ/lvaIiIGZpbGw9IiNDNUM1QzciIHBvaW50cz0iMTUgMjIuNSA2LjE4MzIyMTIyIDI3LjEzNTI1NDkgNy44NjcwNzYxMyAxNy4zMTc2Mjc1IDAuNzM0MTUyMjU2IDEwLjM2NDc0NTEgMTAuNTkxNjEwNiA4LjkzMjM3MjU0IDE1IDAgMTkuNDA4Mzg5NCA4LjkzMjM3MjU0IDI5LjI2NTg0NzcgMTAuMzY0NzQ1MSAyMi4xMzI5MjM5IDE3LjMxNzYyNzUgMjMuODE2Nzc4OCAyNy4xMzUyNTQ5Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  -moz-background-size: 100% 100%;
                }
            }
        }
    }
  }
</style>