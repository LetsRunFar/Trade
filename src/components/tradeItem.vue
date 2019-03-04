<template>
  <div>
    <div v-if="items.length > 0">
      <ul v-for="(item, index) in items" :key="'tradeItem' + index" class="item-list">
        <li>
          <span class="title">{{$t('tradeItem.seller')}}</span>
          <span class="content">{{shopNameEnums[item.type]}}</span>
        </li>
        <li>
          <span class="title">{{$t('tradeItem.tradeIn30days')}}：</span>
          <span class="content">{{item.recentThirtyDaysDeal}}</span>
        </li>
        <li>
          <span class="title">{{$t('tradeItem.payWays')}}：</span>
          <span class="content">
          <img class="payway" v-for="(payway, index) in item.payTypesUrls" :key="'payway'+index" :src="payway" />
        </span>
        </li>
        <li>
          <span class="title">{{$t('tradeItem.number')}}</span>
          <span class="content">{{item.initAmount}}</span>
        </li>
        <li>
          <span class="title">{{$t('tradeItem.price')}}/{{item.coinTypeEnName}}：</span>
          <span class="content">{{item.price}}CNY {{`（${item.singleMinMoneyTotal}-${item.singleMaxMoneyTotal}）`}}</span>
        </li>
        <li>
          <span class="title">{{$t('tradeItem.price')}}/{{$t('tradeItem.dollar')}}</span>
          <span class="content">{{item.price | toUSDT}} （{{item.singleMinMoneyTotal | toUSDT}}-{{item.singleMaxMoneyTotal | toUSDT}}）</span>
        </li>
        <li>
          <span class="title">USD = CNY：</span>
          <span class="content">$1 = {{$store.getters.priceOfUSDT}}CNY</span>
        </li>
        <li>
          <span class="title">{{$t('tradeItem.handle')}}</span>
          <span class="content">
            <x-button class="action-button" primary @click.native="buyAction" v-if="itemType === 1">{{$t('tradeItem.buy')}}</x-button>
            <x-button class="action-button" primary @click.native="sealAction" v-else-if="itemType === 0">{{$t('tradeItem.sale')}}</x-button>
          </span>
        </li>
      </ul>
    </div>
    <div v-else class="null-wrap" :nullWords="$t('common.empty')"></div>
  </div>
</template>

<script>
  import storeInstance from '@/store'
  import {XButton} from 'vux'

  export default {
    name: "tradeItem",
    beforeMount(){
    },
    components: {XButton},
    data(){
      return {
        shopNameEnums: {
          '1': '义务小商品',
          '2': '义务大商品'
        }
      }
    },
    filters: {
      toUSDT(val){
        if(val && !isNaN(val)){
          return (val / storeInstance.getters.priceOfUSDT).toFixed(2)
        }
        return 0.00
      }
    },
    props: {
      items: {
        type: Array,
        default: []
      },
      itemType: {
        type: Number,
        default: 1 // 0:卖出   1:买入
  }
    },
    methods: {
      buyAction(){

      },
      sealAction(){

      }
    }
  }
</script>

<style lang="less" scoped>
  .item-list{
    margin: 0.4rem 0.3rem;
    text-align: left;
    background-color: #172035;
    color: #dddddd;
    border-radius: 0.2rem;
    overflow: hidden;
    li{
      padding: .266rem 0;
      position: relative;
      min-height: .533rem;
      line-height: 1.6;
      font-size: .373rem;
      border-bottom: 1px solid #172035;
      background-color: #223c53;
      &:first-child{
        background-color: #172035;
      }
      span.title{
        display: inline-block;
        position: absolute;
        left: 15px;
        text-align: center;
      }
      span.content{
        font-size: .32rem;
        display: inline-block;
        margin-left: 3.2rem;
        margin-right: .4rem;
        word-break: break-word;
        .payway{
          width: 0.6rem;
          margin: 0px 0.1rem;
        }
        .action-button {
          padding: 0 1rem;
          text-align: center;
          line-height: 2;
          border-radius: 3px;
          font-size: 0.32rem;
        }
      }
    }
  }
  .font-spacing{
    display: inline-block;
    margin: 0 0.35rem;
  }
</style>
