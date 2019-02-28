<template>
  <div class="login-wrap">
    <x-header class="header" :left-options="{backText: ''}" empty fixed>登录</x-header>
    <div class="body">
      <div class="spaceship">
        <img src="/static/images/login.png" class="ufo-float">
      </div>
      <div class="official-address">www.ufo.club</div>
      <login-form ref="loginForm"></login-form>
      <p class="forget-wrap">
        <router-link style="color: #0297e2;" to="/forget">忘记密码？</router-link>
      </p>
      <div class="btn-wrap">
        <x-button @click.native="doLogin" class="login-btn">登录</x-button>
        <x-button @click.native="$router.push({name: 'register'})" class="register-btn" plain>新用户注册</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginForm from '@/components/loginForm'
  import {XButton,XHeader} from 'vux'
  export default {
    name: "login",
    components: {LoginForm,XButton,XHeader},
    methods: {
      doLogin(){
        this.$refs.loginForm.validForm()
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-wrap {
    position: relative;
    height: 100vh;
    background: url(/static/images/bg.jpg) no-repeat;
    background-size: cover;
    .header{
      /deep/.vux-header-title{
        font-size: .427rem;
      }
      /deep/.left-arrow:before{
        border-width: 2px 0 0 2px;
      }
    }
    .body {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      .spaceship{
        text-align: center;
        animation: hover infinite ease-in-out 1.5s;
        -webkit-animation: hover infinite ease-in-out 1.5s;
        .ufo-float{
          width: 2rem;
          z-index: 3;
          -webkit-transform: translateY(5px);
          transform: translateY(5px);
          animation: ufo 1s infinite alternate;
        }
      }
      .official-address{
        text-align: center;
        color: #0297e2;
      }
    }
  }
  .forget-wrap{
    color: #0297e2;
    font-size: .373rem;
    margin: -.6rem 1rem 0;
    text-align: right;
  }
  .btn-wrap{
    margin: 1rem;
    .login-btn{
      font-size: .373rem;
      background: linear-gradient(90deg,#2a44d5,#087fd1);
      color: #fff;
      border-radius: 3px;
    }
    .register-btn{
      font-size: .373rem;
      color: #0297e2;
      border: solid 1px #0297e2;
      border-radius: 3px;
    }
  }
</style>
