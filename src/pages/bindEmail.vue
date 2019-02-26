<template>
  <div class="form-wrap">
    <p class="each-input userName">
      <input class="signle-input" placeholder="邮箱/手机号" v-model="userNameModel" type="text" />
    </p>
  </div>
</template>

<script>
  export default {
    name: "bindEmail",
    data(){
      return {
        userNameModel: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-wrap {
    margin: 1rem;
    background-color: red;
  }
  .each-input {
    padding: .5rem 0;
    padding-left: .7rem;
    height: .6rem;
    display: flex;
    align-items: center;
    margin: 0 .3rem;
    color: #d0d0d0;
    font-size: .373rem;
    border-bottom: 2px solid #1a253f;
    &:last-child{
      border: none;
    }
    &.userName {
      background: url("/static/images/Mobile-phone-number.png") no-repeat 0.1rem;
      background-size: 0.38rem auto;
      .mobile-type {
        display: inline-block;
        height: 100%;
        padding: 0 .2rem;
        border-left: 1px solid #455e77;
        line-height: 1.5;
      }
    }
    &.password {
      background: url("/static/images/s1.png") no-repeat 0.1rem;
      background-size: 0.55rem auto;
      background-position: 0.04rem;
      & > i {
        color: #d0d0d0;
        margin-right: .3rem;
      }
    }
    &.validMsg{
      background: url("/static/images/yzm.png") no-repeat .1rem;
      background-size: .6rem auto;
      .register-memberyzm{
        display: inline-block;
        height: 100%;
        color: #d0d0d0;
        padding: 0 .2rem;
        border-left: 1px solid #455e77;
        line-height: 1.5;
      }
    }
  }
</style>
