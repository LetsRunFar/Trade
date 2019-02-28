<template>
  <div class="mine-wrap">
    <div class="top-wrap">
      <div class="user-info">
        <i class="logo" @click="$router.push({name: 'index'})"></i>
        <span class="user-name">13166655666</span>
      </div>
      <div class="account">
        <p class="des">
          我的资产
        </p>
        <p class="main">
          {{myAccount}}
        </p>
        <p class="des">
          资产总额（元）
        </p>
      </div>
    </div>
    <group>
      <cell-box class="links" commonColor is-link :link="{path: '/setting'}">
        用户设置
      </cell-box>
    </group>
    <x-button primary plain class="logout">退出</x-button>
  </div>
</template>

<script>
  import {XHeader, Group, CellBox, XButton} from 'vux'

  export default {
    name: "mine",
    components: {XHeader, Group, CellBox, XButton},
    data() {
      return {
        myAccount: '0.00000'
      }
    }

  }
</script>

<style lang="less" scoped>
  .mine-wrap {
    min-height: 100vh;
    background-color: #050c1e;
    .top-wrap {
      position: relative;
      background: url(/static/images/person_bg_01.jpg) no-repeat;
      background-size: 100% 100%;
      height: 6rem;
      width: 100%;
      .account {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        text-align: center;
        line-height: 1.8;
        .des {
          color: #b2bec1;
          font-size: 0.373rem;
        }
        .main {
          color: #ffffff;
          font-size: 0.76rem;
        }
      }
      .user-info {
        position: relative;
        height: 1rem;
        line-height: 1rem;
        .user-name {
          float: left;
          margin-left: 1.2rem;
          color: #ffffff;
          font-size: 0.373rem;
        }
        .logo {
          position: absolute;
          left: 0.2rem;
          animation: ufo 1s infinite alternate;
        }
      }
    }
    /deep/ .weui-cells {
      background-color: transparent;
      margin-top: 0;
      &:before {
        border-top: none;
      }
      &:after {
        border-bottom: none;
      }
    }
    .links {
      margin-top: 10px;
      text-align: left;
      color: #fff;
      font-size: 0.373rem;
    }
    .logout {
      font-size: 0.373rem;
      margin-top: 1rem;
      width: 90%;
      margin-left: 5%;
      line-height: 2.8;
      color: #0297e2;
      border-color: #0297e2;
      &:active{
        color: #dddddd;
        border-color: #dddddd;
      }
    }
  }
</style>
