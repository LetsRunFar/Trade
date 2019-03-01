<template>
  <div>
    <ul class="item-list">
      <li>
        <span class="title">商家：</span>
        <span class="content">{{shopNameEnums[item.type]}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "tradeItem",
    data(){
      return {
        shopNameEnums: {
          '1': '义务小商品',
          '2': '义务大商品'
        }
      }
    },
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="less" scoped>
  .item-list{
    margin: 0.2rem 0.3rem;
    text-align: left;
    border-radius: 0.05rem;
    background-color: #172035;
    color: #dddddd;
    li{
      font-size: .373rem;
      padding: .266rem 0;
      border-bottom: 1px solid #172035;
      position: relative;
      min-height: .533rem;
      &:first-child{
        background-color: #172035;
      }
      span.title{
        display: inline-block;
        position: absolute;
        left: 15px;
        text-align: center;
      }
      span.content{
        font-size: .32rem;
        display: inline-block;
        margin-left: 3.2rem;
        margin-right: .4rem;
        word-break: break-word;
      }
    }
  }
</style>
