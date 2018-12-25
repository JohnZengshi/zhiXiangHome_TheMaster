<template>
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
        <div @click="callPhone(data.phone)" class="callPhone display_flex flex-direction_column align-items_center" v-if="item.id > 0">
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
</template>
