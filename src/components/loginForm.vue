<template>
  <div class="form-wrap">
    <p class="each-input userName">
      <input class="signle-input" placeholder="邮箱/手机号" type="text" />
      <span class="mobile-type" v-show="showMobileHead">+86</span>
    </p>
    <p class="each-input password">
      <input
        class="signle-input"
        @input="($el) => {validate($el,['required'])}"
        placeholder="密码"
        :type="hidePwd ? 'password' : 'text'">
      <i @click="hidePwd = !hidePwd" :class="{'fa-eye-slash': hidePwd, 'fa-eye': !hidePwd ,'fa': true}"></i>
    </p>

  </div>
</template>

<script>
  import {Selector} from 'vux'

  export default {
    name: "loginForm",
    components: {Selector},
    data(){
      return {
        hidePwd: true,
        userName: '',
        lx: '111'
      }
    },
    methods: {
      validate($el, rules) {
        if (!rules) {
          return true
        } else {
          console.log(rules)
          console.log($el)
        }
      },
      setVal(el){
        this.lx = el.target.value
        console.log(this.lx)
      }
    },
    computed: {
      showMobileHead() {
        if (this.userName.length > 0) {
          if (this.userName.indexOf('@') !== -1) return false
          return true;
        }
        return false
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-wrap {
    margin: 1rem;
    position: relative;
    background: url('/static/images/box.png') no-repeat;
    background-size: 100% 100%;
  }

  .each-input {
    padding: .5rem 0;
    padding-left: .7rem;
    border: none;
    height: .6rem;
    display: flex;
    align-items: center;
    margin: 0 .3rem;
    &.userName {
      border-bottom: 2px solid #1a253f;
      background: url("/static/images/Mobile-phone-number.png") no-repeat 0.1rem;
      background-size: 0.38rem auto;
      .mobile-type {
        display: inline-block;
        height: 100%;
        color: #d0d0d0;
        padding: 0 .2rem;
        border-left: 1px solid #455e77;
        font-size: .373rem;
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
  }

  .signle-input {
    background: transparent;
    color: #d0d0d0;
    border: 0;
    height: 100%;
    width: 100%;
    font-size: .373rem;
    text-indent: 2px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    &:focus {
      outline: none;
    }
  }

  ::-webkit-input-placeholder {
    color: #d0d0d0;
  }
</style>
