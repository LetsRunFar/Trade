<template>
  <div class="lang-wrap">
    <x-header class="header" commonColor :left-options="{backText: ''}" empty fixed>
      {{$t('setLang.title')}}
    </x-header>
    <checklist class="checklist" v-model="langType" label-position="left" commonColor :options="langList" :max="1" @on-change="change"></checklist>
  </div>
</template>

<script>
  import {XHeader, Checklist} from 'vux'

  export default {
    name: "setLanguage",
    components: {XHeader, Checklist},
    data(){
      return {
        langList: [
          {
            key: 'zh-CN',
            value: '简体中文'
          },
          {
            key: 'zh-CN2',
            value: '繁體中文'
          },
          {
            key: 'en-US',
            value: 'English'
          }
        ],
        langType: [],
      }
    },
    beforeMount(){
     this.langType.push(localStorage.getItem('lang'))
    },
    methods: {
      change(val, label){
        this.$i18n.locale = val[0];
        this.setLangInStorage()
      },
      setLangInStorage(){
        localStorage.setItem('lang', this.$i18n.locale)
      }
    }
  }
</script>

<style lang="less" scoped>
  .lang-wrap {
    padding-top: 46px;
    min-height: 100vh;
    background-color: #050c1e;
  }
  /deep/.weui-cells{
    background-color: transparent;
    font-size: 0.373rem;
  }
  .checklist{
    color: #ffffff;
    text-align: left;
  }
</style>
