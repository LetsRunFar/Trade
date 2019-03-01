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
  import HttpMethods from "../assets/js/HttpMethods";

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
      async queryTrade() {
        let res = await HttpMethods.otcAdList()
        if (res.success) {
          this.AdList = res.data
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
