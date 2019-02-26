<template>
  <div class="setting-wrap">
    <x-header class="header" :left-options="{backText: ''}" commonColor fixed>用户设置</x-header>
    <group>
      <cell-box class="links" commonColor is-link :link="{path: '/bindEmail'}">
        邮箱绑定
      </cell-box>
      <cell-box class="links" commonColor is-link :link="{path: '/bindAccount'}">
        账户绑定
      </cell-box>
      <cell-box class="links" commonColor is-link :link="{path: '/setLang'}">
        语言设置
      </cell-box>
    </group>
  </div>
</template>

<script>
  import {XHeader, CellBox , Group} from 'vux'
  export default {
    name: "setting",
    components: {XHeader, CellBox , Group}
  }
</script>

<style lang="less" scoped>
  .setting-wrap{
    padding-top: 46px;
    min-height: 100vh;
    background-color: #050c1e;
    .header {
      z-index: 10;
      /deep/ .vux-header-title {
        font-size: .427rem;
      }
      /deep/ .left-arrow:before {
        border-width: 2px 0 0 2px;
      }
    }
    /deep/.weui-cells{
      background-color: transparent;
      margin-top: 0;
      &:after{
        border-bottom: none;
      }
      &:before{
        border-top: none;
      }
    }
    .links{
      margin-top: 10px;
      text-align: left;
      color: #fff;
      font-size: 0.373rem;
      &:after{
        border-bottom: none;
      }
      &:before{
        border-top: none;
      }
    }
  }
</style>
