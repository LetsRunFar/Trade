<template>
  <div class="complain-wrap">
    <x-header class="header" :left-options="{backText: ''}" empty fixed></x-header>
    <p class="title">
      申诉
    </p>
    <div class="divider"></div>
    <div class="reasons">
      <p style="margin-bottom: 10px;">申诉理由</p>
      <checklist :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
      <x-textarea :rows="5" class="reason-textarea" v-show="showReasonInput" :max="100" placeholder="请输入申诉理由，若描述不清楚，可能影响处理进度"></x-textarea>
      <div class="warn">
        <p class="text-1">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          警告
        </p>
        <p class="text-2">
          提起申诉后资产将会冻结，申诉专员将介入本次交易，直至申诉结束。恶意申诉属于扰乱平台正常运营秩序的行为，情节严重将冻结账户。
        </p>
      </div>
    </div>
    <div class="do-complain active">
      <span class="btn-text">提交申诉</span>
      <span class="clock">
        <icon type="waiting"></icon>
        <clocker style="vertical-align: middle;" :time="complainTimer">
          <span>%M : %S </span>
        </clocker>
      </span>
    </div>
  </div>
</template>

<script>
  import {XHeader, Checklist, Icon, Clocker, XTextarea } from 'vux'

  export default {
    name: "complain",
    components: {XHeader, Checklist, Icon, Clocker, XTextarea },
    data(){
      return {
        commonList: ['我已完成付款，卖家未及时放行', '我向卖家多转了钱', '其他'],
        radioValue: [''],
        complainTimer: '2019-3-15 23:10',
        showReasonInput: false
      }
    },
    methods: {
      change(val){
        if(val == '其他'){
          this.showReasonInput = true
        } else {
          this.showReasonInput = false
        }
      }
    }
  }
</script>




<style lang="less" scoped>
  .complain-wrap{
    padding-top: 46px;
    min-height: 100vh;
    background-color: #ffffff;
    .title{
      font-size: 30px;
      font-weight: 600;
      text-align: left;
      padding: 0 20px 10px;
      color: #2b3f59;
    }
    .divider{
      height: 8px;
      background-color: #f7f6fc;
    }
    .reasons {
      padding: 18px 20px;
      color: #343b41;
      font-size: 14px;
      text-align: left;
      .warn {
        margin: 15px 0;
        padding: 10px;
        background-color: #f2f5fc;
        border-radius: 6px;
        border: solid 1px #dce7f1;
        .text-1 {
          color: #307dd1;
        }
        .text-2{
          padding: 10px 5px 5px 5px;
          color: #a6afb4;
        }
      }
      .reason-textarea {
        margin-top: 10px;
        padding: 10px;
        border-radius: 6px;
        border: solid 1px #d3d8db;
      }
    }
    .do-complain{
      .btn-text{
        float: left;
      }
      .clock{
        display: none;
        float: right;
        /deep/.weui-icon-waiting{
          color: #ffffff;
          font-size: 14px;
        }
      }
      position: fixed;
      width: 90%;
      border-radius: 5px;
      margin-bottom: 10px;
      margin-left: 5%;
      padding: 12px 20px;
      bottom: 0;
      left: 0;
      background-color: #9aadc1;
      color: #ffffff;
      font-size: 16px;
      box-sizing: border-box;
    }
    .do-complain.active {
      .btn-text{
        float: none;
      }
      background-color: #3886d8;
      /deep/.clock{
        color: #ffffff;
        font-size: 14px;
      }
    }
    /deep/.weui-cell{
      padding: 10px 0;
      font-size: 14px;

    }
    /deep/.weui-cells_checkbox .weui-icon-checked:before {
      margin-left: 0;
      margin-bottom: 3px;
      font-size: 18px;
    }
    /deep/ .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
      color: #307dd1;
    }
  }

</style>
