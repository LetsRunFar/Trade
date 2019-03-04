<template>
  <div class="purchase-wrap">
    <ul class="tabs clear">
      <li @click="setCurrentTab(item)" :class="{active: item.value == currentTab.value}" v-for="(item, index) in coinTypes" :key="'coin'+index">
        <span>
          {{item.name}}
        </span>
      </li>
    </ul>
    <div class="body">
      <div class="des">
        <popover class="popover" placement="right">
          <div slot="content" class="popover-demo-content">
            {{$t('priceInfo.priceTip')}}
          </div>
          <img width="20" src="/static/images/question.png">
        </popover>
        <span class="tip">
        {{currentTab.name}}{{$t('priceInfo.referPrice')}}：
      </span>
        <span class="price">
        {{price}} CNY/{{currentTab.name}}
      </span>
      </div>
      <div class="purchase-inputs">
        <span @click="buyType = 1" class="tab" :class="{'active': buyType == 1}">{{$t('priceInfo.buyWithPrice')}}</span>
        <span @click="buyType = 2" class="tab" :class="{'active': buyType == 2}">{{$t('priceInfo.buyWithAmount')}}</span>
        <div class="input-wrap">
          <x-input :show-clear="false" :placeholder="inputsPlaceholder" class="inputs" v-model="buyTotal"></x-input>
          <span class="unit">{{currentTab.name}}</span>
        </div>
      </div>
      <p style="margin: 0.3rem 0;">{{$t('priceInfo.chooseBuyWays')}}</p>
      <flexbox class="payways">
        <flexbox-item
          @click.native="currentPayway = payway.value"
          v-for="(payway, index) in payways"
          :class="{'active': currentPayway == payway.value}"
          class="each-payway"
          :key="'payway'+index">
          {{payway.name}}
          <div class="check-flag">
            <icon class="checked" type="success-no-circle"></icon>
          </div>
        </flexbox-item>
      </flexbox>
      <ul class="price-result">
        <li class="clear">
          <span class="fl">{{$t('priceInfo.unitPrice')}}：</span>
          <span class="fr price">{{price}} CNY/{{currentTab.name}}</span>
        </li>
        <li class="clear">
          <span class="fl">{{$t('priceInfo.amount')}}：</span>
          <span class="fr">{{buyTotal || '--'}}</span>
        </li>
        <li class="clear">
          <span class="fl">{{$t('priceInfo.totalPrice')}}：</span>
          <span class="fr">{{totalMoney}}</span>
        </li>
      </ul>
      <x-button class="purchase-button">
        <img width="26" src="/static/images/lighting.png" style="vertical-align: middle;">
        {{$t('priceInfo.quicklyBuy')}}
      </x-button>
      <p style="font-size: 0.32rem; margin-top: 0.3rem;">*{{$t('priceInfo.tradeTip')}}</p>
    </div>
  </div>
</template>

<script>
  import {Popover, XInput, Flexbox, FlexboxItem, Icon, XButton} from 'vux'

  export default {
    name: "priceInfos",
    props: {
      coinTypes: {
        type: Array,
        default: []
      },
      currentTab: {
        type: Object,
        default: {}
      }
    },
    components: {Popover, XInput, Flexbox, FlexboxItem, Icon, XButton},
    data(){
      return {
        price: '-',
        buyType: 1,
        buyTotal: '',
        payways: [
          {
            name: this.$t('common.aliPay'),
            value: 1
          },
          {
            name:  this.$t('common.bankCard'),
            value: 2
          },
          {
            name:  this.$t('common.weChat'),
            value: 3
          }
        ],
        currentPayway: 1
      }
    },
    methods: {
      setCurrentTab(item){
        this.$emit('update:currentTab', item)
      }
    },
    computed:{
      inputsPlaceholder(){
        if(this.buyType === 1){
          return this.$t('priceInfo.totalPricePlaceholder')
        } else if(this.buyType === 2){
          return this.$t('priceInfo.amountPlaceholder')
        }
        return ''
      },
      totalMoney(){
        if(this.price && this.buyTotal){
          return this.price * this.buyTotal
        }
        return '--'
      }
    },
    beforeMount(){
      this.price = 120.5
    },
    watch:{
      currentTab: {
        handler(val){
          this.price = 120.5
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .purchase-wrap {
    text-align: left;
    padding-top: 46px;
    font-size: 0.373rem;

    .tabs {
      font-size: 16px;
      color: #999;
      display: block;
      width: auto;
      border-bottom: 1px solid #eeebeb;
      margin-top: 20px;
      padding: 0 32px;

      li {
        float: left;
        display: inline-block;
        margin-right: 30px;
        padding-bottom: 14px;
        font-size: 14px;
        border-bottom: 2px solid transparent;

        &.active {
          border-color: #638bd4;
          color: #638bd4;
        }
      }
    }
  }
  .body{
    color: #999;
    margin: 0 0.8rem;
    .des{
      padding: 0.7rem 0;
      .popover{
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .purchase-inputs{
    color: #999;
    .tab {
      padding-left: 0.2rem;
      &:first-child {
        border-right: 2px solid #999;
        line-height: 0.373rem;
        height: 0.373rem;
        padding-left: 0;
        padding-right: 0.3rem;
      }
      &.active {
        color: #000;
      }
    }
    .inputs{
      padding: 0.26rem 0.4rem;
      border: solid 1px #999;
      border-radius: 4px;
    }
    .input-wrap{
      position: relative;
      margin: 0.4rem 0;
      .unit{
        position: absolute;
        right: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .payways{
    .each-payway {
      position: relative;
      padding: 0.9rem 0;
      text-align: center;
      background-color: #eef0f7;
      border-radius: 6px;
      font-size: 0.45rem;
      border: 1px solid transparent;
      .check-flag{
        display: none;
      }
      &.active{
        border-color: #638bd4;
        background-color: transparent;
        color: #068bd6;
        .check-flag{
          height: 0;
          width: 0;
          border-bottom: 24px solid #638bd4;
          border-left: 24px solid transparent;
          position: absolute;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .icons-flag{
            font-size: 16px;
            margin-top: 30px;
            margin-right: 12px;
            color: #fff;
          }
          /deep/.weui-icon-success-no-circle{
            position: absolute;
            right: -0.05rem;
            bottom: -0.55rem;
            color: #fff!important;
            font-size: 0.26rem;
          }
        }
      }
    }
  }
  .price-result{
    margin-top: 0.5rem;
    li{
      line-height: 1rem;
    }
    .price {
      color: #489972;
      font-size: 0.5rem;
    }
  }
  .purchase-button{
    margin-top: 0.3rem;
    background-color: #638bd4;
    color: #ffffff;
    padding: 0.2rem 0;
  }
  .popover-demo-content {
    padding: 0.3rem;
    background-color: transparent;
  }
</style>
