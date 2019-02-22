<template>
  <div>
    <login-form></login-form>
    <input type="text" v-model="lx">
  </div>
</template>

<script>
  import HttpMethods from '@/assets/js/HttpMethods'
  import LoginForm from '@/components/loginForm'
  export default {
    name: "Index",
    components: {
      LoginForm
    },
    data(){
      return {
        lx: '123'
      }
    },
    async beforeMount () {
      let res1 = await HttpMethods.login()
    }
  }
</script>

<style lang="less" scoped>
</style>
