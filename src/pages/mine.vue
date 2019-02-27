<template>
  <div class="mine-wrap">
    <div class="top-wrap">

    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "mine",
    components:{XHeader}

  }
</script>

<style lang="less" scoped>
  .mine-wrap{
    min-height: 100vh;
    background-color: #050c1e;
    .top-wrap{
      background: url(/static/images/person_bg_01.jpg) no-repeat;
      background-size: 100% 100%;
      height: 6rem;
      width: 100%;
    }
  }
</style>
