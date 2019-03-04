<template>
  <div class="form-wrap">
    <x-header class="header" commonColor :left-options="{backText: ''}" empty fixed>
      {{$t('bindAccount.title')}}
    </x-header>
    <p class="each-input password" commonColor>
      <input class="signle-input" :placeholder="$t('bindAccount.password')" v-model="passwordModel" type="password" />
    </p>
    <p class="each-input email" commonColor>
      <input class="signle-input" :placeholder="$t('bindAccount.account')" v-model="emailModel" type="text" />
    </p>
    <x-button primary style="font-size: 0.373rem; margin-top: 1rem; width: 90%; margin-left: 5%; line-height: 2.8;">{{$t('common.insure')}}</x-button>
  </div>
</template>

<script>
  import {XHeader, XButton} from 'vux'

  export default {
    name: "bindEmail",
    components: {XHeader, XButton},
    data(){
      return {
        passwordModel: '',
        emailModel: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-wrap {
    padding-top: 46px;
    min-height: 100vh;
    background-color: #050c1e;
  }
  .each-input {
    margin: .3rem 0;
    padding: .2rem 0;
    padding-left: 1rem;
    height: .6rem;
    display: flex;
    align-items: center;
    color: #d0d0d0;
    font-size: .373rem;
    border-bottom: 2px solid #1a253f;
    &:last-child{
      border: none;
    }
    &.password {
      background: url("/static/images/s1.png") no-repeat 0.3rem;
      background-size: 0.55rem auto;
      .mobile-type {
        display: inline-block;
        height: 100%;
        padding: 0 .2rem;
        border-left: 1px solid #455e77;
        line-height: 1.5;
      }
    }
    &.email {
      background: url("/static/images/mail.png") no-repeat 0.3rem;
      background-size: 0.55rem auto;
      .mobile-type {
        display: inline-block;
        height: 100%;
        padding: 0 .2rem;
        border-left: 1px solid #455e77;
        line-height: 1.5;
      }
    }
    .signle-input{
      background: transparent;
      color: #d0d0d0;
      border: 0;
      height: 100%;
      width: 100%;
      text-indent: 2px;
    }
  }
</style>
