<template>
  <div class="setting-wrap">
    <x-header class="header" :left-options="{backText: ''}" fixed>用户设置</x-header>
    <group>
      <cell class="links" commonColor title="邮箱绑定" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {XHeader, Cell, Group} from 'vux'
  export default {
    name: "setting",
    components: {XHeader, Cell, Group}
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
    .weui-cells{
      &:after{
        border-bottom: none;
      }
      &:before{
        border-top: none;
      }
    }
    .links{
      text-align: left;
      color: #fff;
    }
  }
</style>
