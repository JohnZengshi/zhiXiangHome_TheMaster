<template>
  <scroll-view 
    scroll-y
    @scroll="scroll"
    @touchstart="touchstart"
    @touchmove="touchmove"
    class="cardsListConent">
     <ul>
        <li 
          :key="i"
          v-for="(data,i) in parentData.dataList">
              <div class="card display_flex">
                <div class="left display_flex flex-direction_column align-items_center">
                  <block v-if="data.type == 1">
                    <img src="/static/images/homePage/install-icon.png" alt="">
                    <span class="line"></span>
                    <span class="type">安装</span>
                  </block>
                  <block v-else-if="data.type == 2">
                    <img src="/static/images/homePage/service-icon.png" alt="">
                    <span class="line"></span>
                    <span class="type">维修</span>
                  </block>
                </div>
                <div class="rigth display_flex flex-direction_column">
                  <div @click="navigatoDetail(data.order)" class="detail display_flex flex-direction_column">
                    <span class="titleName">
                      <span class="name">{{data.titleName}}</span>
                      <span class="type">{{data.status_txt}}</span>
                    </span>
                    <span class="order">单号：{{data.order}}</span>
                    <span class="appointment">预约时间：{{data.appointment}}</span>
                    <span class="address">地址：{{data.address}}</span>
                  </div>
                  <div @click="callPhone(data.phone)" class="callPhone display_flex flex-direction_column align-items_center" v-if="parentData.id > 0">
                    <img src="/static/images/homePage/phone-icon.png" alt="">
                    <span>顾客</span>
                  </div>
                  <div class="btn">
                    <button 
                      @click="clickBtn(btn,data)" 
                      :class="{active : btn.active}" 
                      :key="b" v-for="(btn,b) in data.btnList">{{btn.text}}</button>
                  </div>
                </div>
              </div>
        </li>
     </ul> 
  </scroll-view>
</template>
<script>
  import {getScrollOffset} from "@/utils/wxapi";
  export default {
    props: {
      parentData: {
        type: Object
      }
    },
    methods: {
      navigatoDetail(order) {
        this.$emit("navigatoDetail", order)
      },
      callPhone(phone) {
        this.$emit("callPhone", phone)
      },
      clickBtn(btn, data) {
        this.$emit("clickBtn", btn, data)
      },
      scroll(e){
        // console.log(e);
      },
      touchstart(e){
        console.log(e);
      },
      touchmove(e){
        console.log(e);
      }
    },
    onLoad(){
      ;(async()=>{
        let res = await getScrollOffset(".cardsListConent");
        console.log(res);
      })()
    }
  }
</script>
<style lang="less" scoped>
  .cardsListConent {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-ing: touch;
    ul {
      box-sizing: border-box;
      padding: 0 30rpx;

      li {
        .card {
          width: 690rpx;
          height: 380rpx;
          background-color: #fff;
          border-radius: 30rpx;
          margin-top: 30rpx;
          box-shadow: 0rpx 10rpx 12rpx 0rpx rgba(193, 193, 193, 0.34);
          overflow: hidden;

          .left {
            width: 100rpx;
            height: 100%;
            background: rgba(245, 208, 133, 1);

            >img {
              margin-top: 48rpx;
              width: 72rpx;
              height: 72rpx;
            }

            >.line {
              margin-top: 47rpx;
              margin-bottom: 61rpx;
              display: inline-block;
              background-color: rgba(77, 61, 51, 1);
              width: 69rpx;
              height: 2rpx;
              opacity: 0.5;
            }

            >.type {
              font-size: 32rpx;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(77, 61, 51, 1);
            }
          }

          .rigth {
            width: 590rpx;
            height: 100%;
            padding: 0 20rpx 0 24rpx;
            position: relative;

            .detail {
              box-sizing: border-box;
              border-bottom: 1rpx solid rgba(216, 216, 216, 1);

              .titleName {
                position: relative;
                margin-top: 30rpx;
                margin-bottom: 2rpx;

                .name {
                  margin-right: 12rpx;
                  font-size: 42rpx;
                  line-height: 63rpx;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(77, 61, 51, 1);
                }

                .type {
                  text-align: center;
                  line-height: 38rpx;
                  display: inline-block;
                  width: 82rpx;
                  height: 38rpx;
                  background: rgba(240, 240, 240, 1);
                  border-radius: 10rpx;
                  font-size: 20rpx;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  color: rgba(197, 197, 199, 1);
                  transform: translateY(-34rpx)
                }
              }

              .order,
              .appointment,
              .address {
                font-size: 26rpx;
                line-height: 37rpx;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(197, 197, 199, 1);
                margin-top: 10rpx;
              }

              .address {
                margin-bottom: 20rpx;
              }

            }

            .btn {
              height: 127rpx;

              button {
                float: right;
                width: 225rpx;
                height: 79rpx;
                background: rgba(240, 240, 240, 1);
                box-shadow: 0rpx 10rpx 12rpx 0rpx rgba(193, 193, 193, 0.34);
                border-radius: 40rpx;
                font-size: 32rpx;
                margin: 24rpx;
                color: rgba(77, 61, 51, 1);

                &.active {
                  background: rgba(245, 208, 133, 1);
                  box-shadow: 0rpx 10rpx 12rpx 0px rgba(245, 208, 133, 0.69);
                  color: rgba(77, 61, 51, 1);
                }
              }
            }

            .callPhone {
              position: absolute;
              right: 20rpx;
              top: 20rpx;

              >img {
                width: 82rpx;
                height: 82rpx;
              }

              >span {
                margin-top: 14rpx;
                font-size: 20rpx;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(197, 197, 199, 1);
              }
            }
          }
        }

        &:last-of-type {
          margin-bottom: 30rpx;
        }


      }
    }
    // &:after {
    //   clear: both;
    //   content: "";
    //   width: 0;
    //   height: 0;
    //   display: block;
    //   visibility: hidden;
    // }
  }

</style>