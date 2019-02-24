<template>
  <div class="form-wrap">
    <div>
      <p class="each-input userName">
        <input class="signle-input" placeholder="邮箱/手机号" v-model="userNameModel" type="text" />
        <span @click="getMobileTypeList" class="mobile-type" v-show="showMobileHead">{{mobileType}}</span>
      </p>
      <p class="each-input password">
        <input
          v-model="passwordModel"
          class="signle-input"
          placeholder="密码"
          :type="hidePwd ? 'password' : 'text'">
        <i @click="hidePwd = !hidePwd" :class="{'fa-eye-slash': hidePwd, 'fa-eye': !hidePwd ,'fa': true}"></i>
      </p>
      <p class="each-input validMsg" v-if="showValidMsg">
        <input class="signle-input" placeholder="短信验证码" v-model="validMsgModel" type="text" />
        <span @click="getValidMsg" class="register-memberyzm">
        获取验证码
      </span>
      </p>
    </div>
    <popup v-model="showMobileHeadPop" height="60%" position="bottom">
      <ul class="mobile-type-list">
        <li @click="setMobileType(item)" v-for="(item,i) in mobileTypeList" :key="'mobileType' + i">
          <span>+{{item.areaNumber}}</span>
          <span>{{item.areaName}}</span>
        </li>
      </ul>
    </popup>
  </div>
</template>

<script>
  import {Popup} from 'vux'
  import HttpMethods from '../assets/js/HttpMethods'
  import {mobile} from '@/assets/js/lib/validator'

  export default {
    name: "loginForm",
    components: {Popup},
    data(){
      return {
        hidePwd: true,
        showMobileHeadPop: false,
        showValidMsg: false,
        userNameModel: '',
        passwordModel: '',
        validMsgModel: '',
        mobileTypeList: [],
        mobileType: '+86'
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
      async getMobileTypeList(){
        let res = await HttpMethods.mobileTypeList()
        if(res.success && res.data) {
          this.mobileTypeList = res.data
          this.showMobileHeadPop = true
        }
      },
      setMobileType(mobileType){
        this.mobileType = `+${mobileType.areaNumber}`
        this.showMobileHeadPop = false
      },
      async getValidMsg(){
        let res = await HttpMethods.getValidMsg()
        if(res.success){
          this.$vux.toast.show(res.msg)
        }
      },
      async validForm(){
        if (this.userNameModel.length === 0) {
          this.$vux.toast.text('请输入邮箱/手机号')
          return
        } else if(this.passwordModel.length === 0){
          this.$vux.toast.text('请输入密码')
          return
        }
        if(this.showValidMsg && this.validMsgModel.length === 0){
          this.$vux.toast.text('请输入验证码')
          return
        }
        let param = {
          userName: this.userNameModel,
          password: this.passwordModel,
          validMsg: this.validMsgModel
        }
        let res = await HttpMethods.login()
        if(res.success){
          // 登陆成功，跳转到首页
          this.$router.push({
            name: 'index'
          })
        }
      }
    },
    computed: {
      showMobileHead() {
        if (this.userNameModel.length > 0) {
          if (this.userNameModel.indexOf('@') !== -1) return false
          return true
        }
        return false
      }
    },
    watch: {
      userNameModel: {
        handler(val){
          mobile('',val).then(() => {
            this.showValidMsg = true
          }).catch(err => {
            this.showValidMsg = false
          })
        }
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

  .signle-input {
    background: transparent;
    color: #d0d0d0;
    border: 0;
    height: 100%;
    width: 100%;
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
  .mobile-type-list{
    background-color: #ffffff;
    line-height: 1rem;
    li{
      border-bottom: solid 1px #ccc;
      span{
        margin: 0 5px;
      }
    }
  }
</style>
