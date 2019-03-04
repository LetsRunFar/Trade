<template>
  <div class="index-wrap">
    <x-header class="header" commonColor :left-options="{backText: ''}" empty fixed>
      {{$t('tradePage.title')}}
      <router-link :to="{name: 'order'}" slot="right">{{$t('tradePage.order')}}</router-link>
    </x-header>
    <div @click="showSearchWrap = !showSearchWrap" commonColor class="search">
      <icon class="search-icon" type="search"></icon>
      <span class="text">{{$t('common.search')}}</span>
    </div>
    <transition name="slide">
      <div class="search-wrap" v-show="showSearchWrap" commonColor>
        <p class="title">{{$t('tradePage.sort')}}</p>
        <group class="search-group">
          <selector
            :placeholder="$t('tradePage.sortPlaceholder')"
            v-model="queryTradeParam.CoinUnits"
            :options="coinTypeEnNameMap">
          </selector>
        </group>
        <p class="title">{{$t('tradePage.area')}}：</p>
        <group class="search-group">
          <selector
            :placeholder="$t('tradePage.areaPlaceholder')"
            v-model="queryTradeParam.LangID"
            :options="otcCountrysMap">
          </selector>
          <x-button @click.native="searchQuery" primary style="font-size: 0.373rem; margin-top: 0.3rem; line-height: 3;">{{$t('common.submit')}}</x-button>
        </group>
      </div>
    </transition>
    <div class="list-wrap">
      <tab :line-width="2" active-color="#0297e2" class="trade-tab" commonColor>
        <tab-item selected @on-item-click="queryTradeIn">{{$t('tradePage.tradeIn')}}</tab-item>
        <tab-item @on-item-click="queryTradeOut">{{$t('tradePage.tradeOut')}}</tab-item>
      </tab>
      <p @click="queryTradeParam.Asc = !queryTradeParam.Asc" class="sort-type">
        {{$t('tradePage.queryResult')}}：<span>{{$t('tradePage.orderByPrice')}}</span>
        <i class="icon triangle-up" :class="{'active': queryTradeParam.Asc}"></i>
        <i class="icon triangle-down" :class="{'active': !queryTradeParam.Asc}"></i>
      </p>
      <scroller
        lock-x
        scrollbar-y
        use-pullup
        @on-pullup-loading="loadTradeList"
        :height="pageViewHeight"
        :pullup-config="{loadingContent: 'Loading...'}"
        ref="scrollerBottom">
        <trade-item class="each-trade" :items="tradeList" :itemType="queryTradeParam.TypeEq" />
      </scroller>
    </div>
  </div>
</template>

<script>
  import {XHeader, Icon, Group, Selector, XButton, Tab, TabItem, Scroller, LoadMore} from 'vux'
  import TradeItem from '@/components/tradeItem'
  import HttpMethods from "../assets/js/HttpMethods";

  export default {
    name: "index",
    components: {XHeader, Icon, Group, Selector, XButton, Tab, TabItem, Scroller, TradeItem, LoadMore},
    data() {
      return {
        n1: 60,
        showSearchWrap: false,
        pageViewHeight: '',
        AdList: {},
        tradeList: [],
        queryTradeParam: {
          CoinUnits: '',
          LangID: '',
          pageNum: 0,
          rowsPerPage: 10,
          TypeEq: 1, // 1：买入 0：卖出
          StatusEq: 1,
          Asc: true
        }
      }
    },
    beforeMount(){
      this.queryTrade().then().catch(e => {

      })
    },
    mounted(){
      /*获得展示页面的高度*/
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      this.pageViewHeight = windowHeight - 165 + 'px';
    },
    methods: {
      loadTradeList () {
        this.queryTrade()
        setTimeout(() => {
          this.$refs.scrollerBottom.donePullup()
        }, 100)
      },
      searchQuery(){
        this.resetList()
        this.queryTrade().then((res) => {
          // 重置表单
          if(res.success){
            this.$refs.scrollerBottom.reset({
              top: 0
            })
          } else {
            this.$vux.toast.text(res.msg)
          }
          this.showSearchWrap = false
        })
      },
      resetList(){
        this.queryTradeParam.pageNum = 0
        this.AdList = {}
        this.tradeList = []
      },
      async queryTrade() {
        this.queryTradeParam.pageNum ++
        let res = await HttpMethods.otcAdList(this.queryTradeParam)
        if (res.success) {
          if(res.data.apiQueryResultMiniVo.list.length === 0){
            return this.$vux.toast.text(this.$t('common.noMore'))
          }
          this.AdList = res.data
          this.queryTradeParam.pageNum = res.data.apiQueryResultMiniVo.pageNum
          this.queryTradeParam.rowsPerPage = res.data.apiQueryResultMiniVo.rowsPerPage
          this.tradeList = this.tradeList.concat(res.data.apiQueryResultMiniVo.list)
          return Promise.resolve({success: true})
        }
        return Promise.resolve({msg: res.msg || this.$t('common.queryFailed')})
      },
      queryTradeIn() {
        this.queryTradeParam.TypeEq = 1
        this.searchQuery()
      },
      queryTradeOut() {
        this.queryTradeParam.TypeEq = 0
        this.searchQuery()
      }
    },
    computed: {
      coinTypeEnNameMap() {
        let arr = []
        if (this.AdList.coinTypeEnNameMap) {
          for(let i in this.AdList.coinTypeEnNameMap){
            let o = {}
            o.key = i
            o.value = this.AdList.coinTypeEnNameMap[i]
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
            o.key = i
            o.value = this.AdList.otcCountrysMap[i]
            arr.push(o)
          }
        }
        return arr
      }
    },
    watch: {
      'AdList.priceOfUSDT': {
        handler(val){
          this.$store.dispatch('setPriceOfUSDT', val)
        },
        deep: true
      },
      'queryTradeParam.Asc': {
        handler(){
          this.searchQuery()
        }
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
    text-align: left;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(-1rem);
    opacity: 0;
  }
  .sort-type{
    position: relative;
    margin: 0.3rem 0.3rem 0;
    display: inline-block;
    height: 1rem;
    line-height: 1rem;
    color: #dddddd;
    font-size: 0.372rem;
    font-weight: 600;
    &>span{
      color: #0297e2;
    }
    .triangle-up{
      position: absolute;
      margin-top: -0.2rem;
      top: 50%;
      transform: translateY(-50%);
      right: -0.5rem;
      border-width: 0.14rem;
    }
    .triangle-down{
      position: absolute;
      margin-top: 0.16rem;
      top: 50%;
      transform: translateY(-50%);
      right: -0.5rem;
      border-width: 0.14rem;
    }
  }
</style>
