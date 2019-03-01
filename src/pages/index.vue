<template>
  <div class="index-wrap">
    <x-header class="header" commonColor :left-options="{backText: ''}" empty fixed>OTC交易中心</x-header>
    <div @click="showSearchWrap = !showSearchWrap" commonColor class="search">
      <icon class="search-icon" type="search"></icon>
      <span class="text">搜索</span>
    </div>
    <transition name="slide">
      <div class="search-wrap" v-show="showSearchWrap" commonColor>
        <p class="title">分类：</p>
        <group class="search-group">
          <selector
            placeholder="请选择分类"
            v-model="searchModel.class"
            :options="coinTypeEnNameMap">
          </selector>
        </group>
        <p class="title">地区：</p>
        <group class="search-group">
          <selector
            placeholder="请选择币种"
            v-model="searchModel.area"
            :options="otcCountrysMap">
          </selector>
          <x-button primary style="font-size: 0.373rem; margin-top: 0.3rem;">提交</x-button>
        </group>
      </div>
    </transition>
    <div class="list-wrap">
      <tab :line-width="2" active-color="#0297e2" class="trade-tab" commonColor>
        <tab-item selected @on-item-click="queryTradeIn">我要买入</tab-item>
        <tab-item @on-item-click="queryTradeOut">我要卖出</tab-item>
      </tab>
      <scroller class="list-scroll">
        <div v-if="tradeList.length <= 0" class="null-wrap"></div>
        <trade-item v-else class="each-trade" v-for="(item, index) in tradeList" :item="item" :key="'trade' + index"/>
      </scroller>
    </div>
  </div>
</template>

<script>
  import {XHeader, Icon, Group, Selector, XButton, Tab, TabItem, Scroller} from 'vux'
  import TradeItem from '@/components/tradeItem'

  export default {
    name: "index",
    components: {XHeader, Icon, Group, Selector, XButton, Tab, TabItem, Scroller, TradeItem},
    data() {
      return {
        showSearchWrap: false,
        searchModel: {
          class: '',
          area: ''
        },
        AdList: {}
      }
    },
    beforeMount(){
      this.queryTrade()
    },
    methods: {
      queryTrade() {
        this.AdList = {
          "apiQueryResultMiniVo": {
            "list": [{
              "addTime": "2019-02-28 12:57:10",
              "coinTypeEnName": "UT",
              "coinUnits": "2",
              "dealCount": "0",
              "dealPercent": "",
              "initAmount": "20000.0",
              "isOnline": "1",
              "isVip": "0",
              "labelSelects": "",
              "leaveAmount": "20000.0",
              "nickName": "Makeyourdaycount",
              "otcAdID": "7271",
              "otcMerchantID": "24",
              "passportID": "1189",
              "passportName": "U598258188",
              "payTypes": "2",
              "payTypesUrls": ["/userfiles/553488/shop/20180320-164154-49248.png"],
              "price": "0.15",
              "realName": "",
              "recentThirtyDaysDeal": "5",
              "singleMaxMoneyTotal": "3000.0",
              "singleMinMoneyTotal": "100.0",
              "type": "1"
            }, {
              "addTime": "2019-02-28 15:07:17",
              "coinTypeEnName": "UT",
              "coinUnits": "2",
              "dealCount": "0",
              "dealPercent": "",
              "initAmount": "8330.0",
              "isOnline": "1",
              "isVip": "0",
              "labelSelects": "",
              "leaveAmount": "2896.66666667",
              "nickName": "ufo传奇",
              "otcAdID": "7272",
              "otcMerchantID": "33",
              "passportID": "554059",
              "passportName": "U402266738",
              "payTypes": "1,2",
              "payTypesUrls": ["/userfiles/553488/shop/20180320-164146-24210.png", "/userfiles/553488/shop/20180320-164154-49248.png"],
              "price": "0.15",
              "realName": "",
              "recentThirtyDaysDeal": "28",
              "singleMaxMoneyTotal": "1249.5",
              "singleMinMoneyTotal": "150.0",
              "type": "1"
            }],
            "pageNum": "1",
            "rowsPerPage": "10",
            "rowsTotal": "2"
          },
          "bindPayTypeMap": {},
          "coinTypeEnNameMap": {"1": "UT", "3": "ETH", "22": "UET", "27": "USDT"},
          "currentCoinType": "1",
          "hasBindPayTypes": false,
          "orderRules": "1",
          "otcCountrysMap": {
            "2": "中国",
            "3": "澳门",
            "4": "香港",
            "5": "韩国",
            "6": "欧元",
            "7": "日本",
            "8": "英国",
            "9": "马来西亚"
          },
          "priceOfUSDT": "6.8343",
          "realAuths": false
        }
        this.showSearchWrap = false
      },
      queryTradeIn() {

      },
      queryTradeOut() {

      }
    },
    computed: {
      coinTypeEnNameMap() {
        let arr = []
        if (this.AdList.coinTypeEnNameMap) {
          for(let i in this.AdList.coinTypeEnNameMap){
            let o = {}
            o[i] = this.AdList.coinTypeEnNameMap[i]
            arr.push(o)
          }
        }
        return arr
      },
      otcCountrysMap() {
        let arr = []
        if (this.AdList.otcCountrysMap) {
          for(let i in this.AdList.otcCountrysMap){
            let o = {}
            o[i] = this.AdList.otcCountrysMap[i]
            arr.push(o)
          }
        }
        return arr
      },
      tradeList() {
        if(this.AdList.apiQueryResultMiniVo){
          return this.AdList.apiQueryResultMiniVo.list || []
        }
        return []
      }
    }
  }
</script>

<style lang="less" scoped>
  .index-wrap {
    box-sizing: border-box;
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
      .search-icon {
        font-size: 16px;
        vertical-align: middle;
      }
      .text {
        vertical-align: middle;
      }
    }
    .search-wrap {
      position: absolute;
      padding: 0 0.3rem;
      width: calc(100% - 0.6rem);
      z-index: 1;
      color: #ddd;
      font-size: 0.373rem;
      .title {
        text-align: left;
        padding: 0.3rem 0;
        line-height: 1;
        font-weight: 600;
      }
      .search-group {
        p {
          margin: 0.2rem 0;
          font-size: 0.373rem;
        }
        /deep/ .weui-cells {
          margin-top: 0;
          background: none;
          .vux-selector {
            border: solid 1px #365363;
            &:before {
              border: none;
            }
            &:after {
              border: none;
            }
          }
          &:before {
            border: none;
          }
          &:after {
            border: none;
          }
          .weui-select {
            font-size: 0.373rem;
            color: #ddd;
          }
        }
        /deep/ .time-picker {
          border: solid 1px #365363;
          .vux-datetime-value {
            text-align: left;
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.373rem;
          }
          &:before {
            border: none;
          }
        }
      }
    }
  }

  .trade-tab {
    /deep/ .vux-tab {
      background-color: transparent;
    }
  }

  .list-wrap {
    width: 100%;
  }

  .list-scroll {
    min-height: 80vh;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(-1rem);
    opacity: 0;
  }
</style>
