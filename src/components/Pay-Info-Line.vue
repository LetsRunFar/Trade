<template>
  <div class="flex each-line">
    <span class="flex-1 left">
      <slot name="left"></slot>
    </span>
    <span class="flex-1 right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: "Pay-Info-Line"
  }
</script>

<style lang="less" scoped>
  .each-line{
    line-height: 40px;
    font-size: 15px;
    padding: 0 15px;
    .right{
      text-align: right;
      color: #333438;
    }
    .left{
      text-align: left;
      color: #b1b2b6;
    }
  }
</style>
