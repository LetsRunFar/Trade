<template>
  <div class="order-wrap">
    <x-header commonColor class="header" :left-options="{backText: ''}" empty fixed>订单</x-header>
    <div @click="showSearchWrap = !showSearchWrap" commonColor class="search">
      <icon class="search-icon" type="search"></icon>
      <span class="text">搜索</span>
    </div>
    <transition name="slide">
      <div class="search-wrap" v-show="showSearchWrap" commonColor>
        <p class="title">状态搜索</p>
        <group class="search-group">
          <selector
            placeholder="下拉选择状态"
            v-model="searchModel.status"
            :options="Enums.status">
          </selector>
          <flexbox :gutter="30">
            <flexbox-item>
              <p>开始时间</p>
              <datetime
                class="time-picker"
                start-date="2019:01:01"
                v-model="searchModel.beginTime">
              </datetime>
            </flexbox-item>
            <flexbox-item>
              <p>结束时间</p>
              <datetime
                class="time-picker"
                start-date="2019:01:01"
                v-model="searchModel.endTime">
              </datetime>
            </flexbox-item>
          </flexbox>
          <x-button @click.native="queryOrder" primary style="font-size: 0.373rem; margin-top: 0.3rem;">提交</x-button>
        </group>
      </div>
    </transition>
    <div class="list-wrap">
      <tab :line-width="2" active-color="#0297e2" class="order-tab" commonColor>
        <tab-item selected @on-item-click="queryOrderIn">买入订单</tab-item>
        <tab-item @on-item-click="queryOrderOut">卖出订单</tab-item>
      </tab>
      <scroller class="list-scroll">
        <div v-if="orderList.length <= 0" class="null-wrap"></div>
        <div class="each-order" commonColor v-for="(item, index) in orderList" :key="'order' + index">
          <p class="clear header">
            <span class="fl">{{item.name}}</span>
            <span class="fr">{{item.time}}</span>
          </p>
          <p class="tl body">买家：{{item.fromName}}</p>
          <p class="tl body">卖家：{{item.toName}}</p>
          <p class="tl body">价格：{{item.price}}</p>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import {XHeader, Icon, Tab, TabItem, Group, Selector, FlexboxItem, Flexbox, Datetime, XButton, Scroller} from 'vux'
  import HttpMethods from "../assets/js/HttpMethods";

  export default {
    name: "order",
    components: {XHeader, Icon, Tab, TabItem, Group, Selector, FlexboxItem, Flexbox, Datetime, XButton, Scroller},
    data() {
      return {
        orderList: [],
        Enums: {
          status: [
            {
              key: '0',
              value: '未完成'
            },
            {
              key: '1',
              value: '已完成'
            },
            {
              key: '-1',
              value: '已撤销'
            }
          ]
        },
        searchModel: {
          status: '',
          beginTime: '年/月/日',
          endTime: '年/月/日'
        },
        showSearchWrap: false
      }
    },
    beforeMount() {
      this.queryOrderIn()
    },
    methods: {
      async queryOrderIn() {
        let res = await HttpMethods.queryOrderIn()
        if (res.success) {
          this.orderList = res.data
        }
      },
      async queryOrderOut() {
        let res = await HttpMethods.queryOrderOut()
        if (res.success) {
          this.orderList = res.data
        }
      },
      async queryOrder() {
        console.log(this.searchModel)
        let res = [
          {
            fromName: "来源",
            id: 0,
            name: "订单名称1",
            price: 8888,
            time: "2019.02.01 19:00:00",
            toName: "去向"
          }
        ]
        this.orderList = res
        this.showSearchWrap = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-wrap {
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
    .order-tab {
      /deep/ .vux-tab {
        background-color: transparent;
      }
    }
  }

  .header {
    /deep/ .vux-header-title {
      font-size: .427rem;
    }
    /deep/ .left-arrow:before {
      border-width: 2px 0 0 2px;
    }
  }

  .each-order {
    color: #ffffff;
    font-size: 0.373rem;
    margin: 0.2rem 0;
    padding: 0.3rem;
    .header {
      padding-bottom: 0.3rem;
    }
    .body {
      line-height: 2;
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

  .list-wrap {
    width: 100%;
  }
  .list-scroll{
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
