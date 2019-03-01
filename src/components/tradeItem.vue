<template>
  <div>
    <ul class="item-list">
      <li>
        <span class="title">商家：</span>
        <span class="content">{{shopNameEnums[item.type]}}</span>
      </li>
      <li>
        <span class="title">近30日成交：</span>
        <span class="content">{{item.recentThirtyDaysDeal}}</span>
      </li>
      <li>
        <span class="title">支付方式：</span>
        <span class="content">
          <img class="payway" v-for="(payway, index) in item.payTypesUrls" :key="'payway'+index" :src="payway" />
        </span>
      </li>
      <li>
        <span class="title">数量：</span>
        <span class="content">{{item.initAmount}}</span>
      </li>
      <li>
        <span class="title">价格/{{item.coinTypeEnName}}：</span>
        <span class="content">{{item.price}}CNY {{`（${item.singleMinMoneyTotal}-${item.singleMaxMoneyTotal}）`}}</span>
      </li>
      <li>
        <span class="title">价格/美元：</span>
        <span class="content">{{item.price | toUSDT}}CNY {{`（${item.singleMinMoneyTotal}-${item.singleMaxMoneyTotal}）`}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "tradeItem",
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
          return (val/$store.getters.priceOfUSDT).toFixed(2)
        }
        return 0.00
      }
    },
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="less" scoped>
  .item-list{
    margin: 0.2rem 0.3rem;
    text-align: left;
    background-color: #172035;
    color: #dddddd;
    border-radius: 0.2rem;
    overflow: hidden;
    li{
      font-size: .373rem;
      padding: .266rem 0;
      border-bottom: 1px solid #172035;
      position: relative;
      min-height: .533rem;
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
      }
    }
  }
</style>
