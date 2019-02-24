<template>
  <div class="order-wrap">
    <x-header commonColor class="header" :left-options="{backText: ''}" empty fixed>订单</x-header>
    <div commonColor class="search">
      <icon class="search-icon" type="search"></icon>
      <span class="text">搜索</span>
    </div>
    <tab :line-width="2" active-color="#0297e2" class="order-tab" commonColor>
      <tab-item selected @on-item-click="queryOrderIn">买入订单</tab-item>
      <tab-item @on-item-click="queryOrderOut">卖出订单</tab-item>
    </tab>
    <div>
      <div v-if="orderInList.length <= 0" class="null-wrap"></div>
      <div class="each-order" commonColor v-for="(item, index) in orderInList" :key="'order' + index">
        <p class="clear header">
          <span class="fl">{{item.name}}</span>
          <span class="fr">{{item.time}}</span>
        </p>
        <p class="tl body">买家：{{item.fromName}}</p>
        <p class="tl body">卖家：{{item.toName}}</p>
        <p class="tl body">价格：{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Icon, Tab, TabItem} from 'vux'
  import HttpMethods from "../assets/js/HttpMethods";

  export default {
    name: "order",
    components: {XHeader, Icon, Tab, TabItem},
    data(){
      return {
        orderInList: []
      }
    },
    beforeMount(){
      this.queryOrderIn()
    },
    methods:{
      async queryOrderIn(){
        let res = await HttpMethods.queryOrderIn()
        if(res.success) {
          this.orderInList = res.data
        }
      },
      async queryOrderOut(){
        let res = await HttpMethods.queryOrderOut()
        if(res.success) {
          this.orderInList = res.data
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-wrap{
    padding-top: 46px;
    min-height: 100vh;
    background-color: #050c1e;
    .search {
      margin: 5px 15px;
      color: #d0d0d0;
      border-radius: 10px;
      height: 35px;
      line-height: 35px;
      font-size: 0.373rem;
      .search-icon{
        font-size: 16px;
        vertical-align: middle;
      }
      .text{
        vertical-align: middle;
      }
    }
    .order-tab{
      /deep/ .vux-tab{
        background-color: transparent;
      }
    }
  }
  .header{
    /deep/.vux-header-title{
      font-size: .427rem;
    }
    /deep/.left-arrow:before{
      border-width: 2px 0 0 2px;
    }
  }
  .each-order{
    color: #ffffff;
    font-size: 0.373rem;
    margin: 0.2rem 0;
    padding: 0.3rem;
    .header{
      padding-bottom: 0.3rem;
    }
    .body{
      line-height: 2;
    }
  }
</style>
