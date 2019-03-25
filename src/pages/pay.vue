<template>
  <div class="pay-wrap">
    <x-header class="header" :left-options="{backText: ''}" empty fixed></x-header>
    <div class="flex header align-vertical clear">
      <div v-if="payStatus === 0" class="flex-1 pay-info">
        <p class="tip-text">请付款</p>
        <p class="tip-sub">
          请在
          <clocker style="color: #bcc2d7;"  time="2019-03-20 22:30:00">
            <span>%H</span><span>:%M</span><span>:%S</span>
          </clocker>
          内付款给商家
        </p>
      </div>
      <div v-if="payStatus === 1" class="flex-1 pay-info">
        <p class="tip-text">待放行</p>
        <p class="tip-sub">
          预计将在
          <clocker style="color: #bcc2d7;"  time="2019-03-20 22:30:00">
            <span>%H</span><span>:%M</span><span>:%S</span>
          </clocker>
          内收到资产
        </p>
      </div>
      <a v-if="payStatus === 1" class="icon-text" :href="'tel:' + tel">
        <i class="icon icon-phone"></i>
        <p class="tip-sub" style="color: #8a8a8a;">电话</p>
      </a>
      <div @click="toContact" class="icon-text">
        <i class="icon icon-msg"></i>
        <p class="tip-sub">联系对方</p>
      </div>
    </div>
    <div v-if="payStatus === 0" class="pay-body">
      <div class="pay-title flex align-vertical">
        <div class="flex-1" style="text-align: left;">
          <p>请向以下账户付款</p>
          <p class="total">¥100.00</p>
        </div>
        <div class="pay-des">
          <p class="clear">
            <span class="fl" style="margin-right: 10px;">交易单价</span>
            <span class="fr">¥6.82</span>
          </p>
          <p class="clear">
            <span class="fl" style="margin-right: 10px;">交易数量</span>
            <span class="fr">14.662756USDT</span>
          </p>
        </div>
        <div class="left-radius"></div>
        <div class="right-radius"></div>
      </div>
      <div class="pay-main">
        <group class="link-cell">
          <cell title="切换方式" is-link @click.native="showPayway = true">
            <span slot="icon">
              <i :class="paywayIcon" class="icon" style="width: 20px; height: 20px; vertical-align: middle;"></i>
              <span style="vertical-align: middle; color: #333438;">{{payway[0]}}</span>
            </span>
          </cell>
        </group>
        <div class="info-lines">
          <pay-info-line v-for="(item, index) in infoLines" @click.native="payInfoClick(item)" :style="item.style" :key="'info-line' + index">
            <span slot="left">{{item.left}}</span>
            <span slot="right">
              <template v-if="item.right">
                <span v-if="item.right.type === 'text'">
                  {{item.right.content}}
                </span>
                <img style="height: 24px; vertical-align: middle;" v-else-if="item.right.type === 'icon'" :src="item.right.url">
              </template>
            </span>
          </pay-info-line>
          <div class="tips">
            {{payInfoTip}}
          </div>
          <div class="handles flex">
            <x-button @click.native="cancelOrder" class="flex-1">
              取消订单
            </x-button>
            <x-button v-if="currentPayway === 1" @click.native="toPay" class="flex-1" primary>
              去付款
            </x-button>
            <x-button class="flex-1" @click.native="markPay" gray>
              标记为已支付
            </x-button>
          </div>
        </div>
      </div>
      <div @click="$router.push('/')" class="jump-to-prod">
        <cell is-link>
          <span slot="icon">
              <span style="vertical-align: middle; color: #dddddd;">富美佳</span>
              <img src="/static/images/V1.png" style="height: 20px; vertical-align: middle;">
            </span>
        </cell>
      </div>
    </div>
    <div v-if="payStatus === 1" class="pay-body">
      <div class="pay-title flex align-vertical">
        <div class="flex-1" style="text-align: left;">
          <p>交易信息</p>
          <p class="total">14.662756<span class="unit">USDT</span></p>
        </div>
        <div class="pay-des">
          <p class="clear">
            <span class="fl" style="margin-right: 10px;">交易单价</span>
            <span class="fr">¥6.82</span>
          </p>
          <p class="clear">
            <span class="fl" style="margin-right: 10px;">交易总额</span>
            <span class="fr">¥100.00</span>
          </p>
        </div>
        <div class="left-radius"></div>
        <div class="right-radius"></div>
      </div>
      <div class="pay-main">
        <div class="info-lines">
          <pay-info-line v-for="(item, index) in salerLines" :style="item.style" :key="'info-line' + index">
            <span slot="left">{{item.left}}</span>
            <span slot="right">
              <template v-if="item.right">
                <span v-if="item.right.type === 'text'">
                  {{item.right.content}}
                </span>
                <img style="height: 24px; vertical-align: middle;" v-else-if="item.right.type === 'icon'" :src="item.right.url">
              </template>
            </span>
          </pay-info-line>
          <div class="tips">
            {{payInfoTip}}
          </div>
          <div v-if="payStatus === 0" class="handles flex">
            <x-button @click.native="cancelOrder" class="flex-1">
              取消订单
            </x-button>
            <x-button v-if="currentPayway === 1" class="flex-1" primary>
              去付款
            </x-button>
            <x-button class="flex-1" gray>
              标记为已支付
            </x-button>
          </div>
          <div v-if="payStatus === 1" class="handles flex">
            <x-button @click.native="cancelOrder" class="flex-1">
              取消订单
            </x-button>
            <x-button link="/complain" v-if="currentPayway === 1" class="flex-1">
              申述
            </x-button>
            <x-button  @click.native="toContact" class="flex-1" primary>
              联系对方
            </x-button>
          </div>
        </div>
      </div>
    </div>
    <div class="warn">
      <p class="text-1">
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        温馨提示
      </p>
      <p class="text-2">
        1、您的汇款将直接进入卖家账户，交易过程中卖家出售的数字资产由平台托管保护。
      </p>
      <p class="text-2">
        2、请在规定时间内完成付款，并务必点击“我已付款”，卖家确认收款后，系统会将数字资产划转到您的账户。
      </p>
      <p class="text-2">
        3、如果买家当日取消订单达3次，将会被限制当日的买入功能。
      </p>
    </div>
    <div v-transfer-dom>
      <popup class="payway-picker" v-model="showPayway" height="30vh">
        <p class="flex head">
          <span class="flex-1"></span>
          <span style="color: #3887d6;" @click="showPayway = false">确定</span>
        </p>
        <group>
          <picker :data='payways' v-model='payway'></picker>
        </group>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="QRs" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
  import {XHeader, Clocker, Cell, Group, XButton, Picker, Popup, TransferDom, Previewer} from 'vux'
  import PayInfoLine from '@/components/Pay-Info-Line'
  import GlobalConfig from '@/assets/js/config'
  const chatDomain = GlobalConfig.domain.chatUrl

  export default {
    name: "pay",
    components:{XHeader, Clocker, Cell, Group, PayInfoLine, XButton, Picker, Popup, Previewer},
    directives:{TransferDom},
    data(){
      return {
        payStatus: 1, // 付款状态 0：未付款 1：已付款
        tel: '10086',
        payInfoTip: '如您已向卖家转账付款，请务必点击“标记为已支付”按钮，否则有可能造成资金损失。',
        payways: [
          [
            '支付宝',
            '微信',
            '银行卡'
          ]
        ],
        QRs: [
          {
            src: '/static/images/qrcode.png', // 二维码，接口获取
            w: '200',
            h: '200'
          }
        ],
        payway: [],
        currentPayway: 1,
        showPayway: false,
        alipayInfo: [
          {
            left: '收款人',
            right: {
              type: 'text',
              content: '陈爱'
            }
          },
          {
            left: '支付宝账号',
            right: {
              type: 'text',
              content: '1389666****'
            }
          },
          {
            left: '收款二维码',
            right: {
              type: 'icon',
              url: '/static/images/qrcode.png'
            },
            click: () => {
              this.$refs.previewer.show(0)
            }
          },
          {
            left: '参考号',
            right: {
              type: 'text',
              content: '320482'
            }
          }
        ],
        wxpayInfo: [
          {
            left: '收款人',
            right: {
              type: 'text',
              content: '陈爱'
            }
          },
          {
            left: '微信账号',
            right: {
              type: 'text',
              content: 'testWx'
            }
          },
          {
            left: '收款二维码',
            right: {
              type: 'icon',
              url: '/static/images/qrcode.png'
            },
            click: () => {
              this.$refs.previewer.show(1)
            }
          },
          {
            left: '参考号',
            right: {
              type: 'text',
              content: '320482'
            }
          }
        ],
        salerLines:[
          {
            left: '卖家',
            right: {
              type: 'text',
              content: '富美佳'
            }
          },
          {
            left: '下单时间',
            right: {
              type: 'text',
              content: '2019-03-10 15:17:06'
            }
          },
          {
            left: '订单号',
            right: {
              type: 'text',
              content: '11552202269539'
            }
          },
          {
            left: '参考号',
            right: {
              type: 'text',
              content: '320482'
            }
          }
        ],
        bankpayInfo:[
          {
            left: '银行卡信息',
            right: {
              type: 'text',
              content: '中国建设银行'
            }
          },
          {
            left: '东莞市凤岗支行',
            style: {
              backgroundColor: '#f7f6fb',
              margin: '0 15px',
              borderRadius: '4px',
              fontSize: '12px'
            }
          },
          {
            left: '收款人',
            right: {
              type: 'text',
              content: '陈爱'
            }
          },
          {
            left: '银行卡卡号',
            right: {
              type: 'text',
              content: '621700323001******'
            }
          },
          {
            left: '参考号',
            right: {
              type: 'text',
              content: '320482'
            }
          }
        ]
      }
    },
    computed:{
      paywayIcon() {
        switch (this.payway[0]) {
          case '支付宝':
            this.currentPayway = 1;
            return 'icon-alipay';
          case '微信':
            this.currentPayway = 2;
            return 'icon-wxpay';
          case '银行卡':
            this.currentPayway = 3;
            return 'icon-bankcard';
          default:
            return 'icon-alipay';
        }
      },
      infoLines(){
        if(this.currentPayway === 1){
          return this.alipayInfo
        } else if(this.currentPayway === 2){
          return this.wxpayInfo
        } else if(this.currentPayway === 3){
          return this.bankpayInfo
        }
      },
    },
    methods: {
      cancelOrder(){
        this.$vux.confirm.show({
          title: '是否取消订单？',
          confirmText: '是',
          cancelText: '否',
          onCancel:() => {

          },
          onConfirm:() => {
            this.$vux.toast.text('调用取消订单接口')
          }
        })
      },
      payInfoClick(item){
        if(item.click){
          item.click()
        }
      },
      toPay(){
        this.$vux.toast.text('进入支付宝付款界面')
      },
      toContact(){
        window.open(`${chatDomain}/client?cid=1&sid=1`, 'blank')
      },
      markPay(){
        this.$vux.toast.text('标记为付款成功')
      }
    }
  }
</script>




<style lang="less" scoped>
  .pay-wrap{
    padding: 46px 0 20px;
    min-height: 100vh;
    background-color: #162232;
    .header {
      padding: 15px;
      .pay-info{
        text-align: left;
        .tip-text {
          margin-bottom: 3px;
          font-size: 30px;
          color: #4175c8;
          font-weight: 600;
        }
        .tip-sub{
          color: #748398;
          font-size: 12px;
        }
      }
      .icon-text{
        padding: 5px 0;
        margin-left: 10px;
        width: 50px;
        position: relative;
        .tip-sub{
          position: absolute;
          bottom: 0;
          width: 100%;
          color: #4a7ebc;
          font-size: 12px;
        }
      }
    }
    .pay-body{
      margin: 15px;
      margin-bottom: 0;
      font-size: 14px;
      border-radius: 5px;
      overflow: hidden;
      .pay-title{
        position: relative;
        line-height: 28px;
        padding: 15px;
        background-color: #f7f6fb;
        font-size: 12px;
        .total{
          font-size: 22px;
          color: #4592e2;
          font-weight: 600;
        }
        .unit{
          font-size: 12px;
          font-weight: 500;
        }
        .pay-des{
          line-height: 24px;
          padding-top: 10px;
          color: #b1b2b6;
        }
        .left-radius, .right-radius {
          position: absolute;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          background-color: #162232;
          bottom: -6px;
        }
        .left-radius{
          left: -6px;
        }
        .right-radius{
          right: -6px;
        }
      }
      .pay-main{
        font-size: 14px;
        background-color: #fff;
        .link-cell{
          color: #989e9c;
          /deep/.weui-cells{
            margin: 0 15px;
            text-align: right;
            line-height: 20px;
            font-size: 15px;
            &:before{
              display: none;
            }
            .weui-cell{
              padding: 15px 0;
            }
          }
        }
        .info-lines{
          .tips{
            margin: 0 15px;
            padding: 15px 0;
            line-height: 20px;
            text-align: left;
            border-top: 1px solid #D9D9D9;
            font-size: 12px;
            color: #73b6fd;
          }
          .handles{
            padding: 20px 0;
            margin: 0 10px;
            .weui-btn {
              margin: 0 5px;
              padding: 8px 5px;
              font-size: 14px;
              white-space: nowrap;
              border-radius: 3px;
              &[primary]{
                background-color: #3887d6;
              }
              &[gray]{
                background-color: #4c6480;
                color: #ffffff;
              }
            }
          }
        }
      }
      .jump-to-prod{
        margin: 15px 0;
        background-color: #152439;
        border: solid 1px #223a5a;
        border-radius: 4px;
        .weui-cell{
          padding: 15px;
          box-shadow:0 4px 8px #1a1d2c;
          /deep/.weui-cell__ft:after{
            border-color: #4c4c4c;
          }
        }
      }
    }
    .warn{
      margin: 15px 15px 0 15px;
      padding: 15px;
      line-height: 1.8;
      text-align: left;
      font-size: 14px;
      background-color: #152439;
      border: solid 1px #223a5a;
      border-radius: 4px;
      box-shadow: 0 4px 8px #1a1d2c;
      .text-1{
        color: #3887d6;
      }
      .text-2{
        color: #b1b2b6;
      }
    }
  }
</style>
