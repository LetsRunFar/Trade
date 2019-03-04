<template>
  <div>
    <x-header class="header" commonColor :left-options="{backText: ''}" empty fixed>
      {{$t('common.buy')}}
    </x-header>
    <price-infos :currentTab.sync="currentTab" :coinTypes="coinTypes" class="price-infos" />
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import PriceInfos from '@/components/priceInfos'

  export default {
    name: "purchase",
    components: {XHeader, PriceInfos},
    data() {
      return {
        coinTypes: [
          {
            name: 'BTC',
            value: 1
          },
          {
            name: 'ETH',
            value: 2
          },
          {
            name: 'USDT',
            value: 3
          },
          {
            name: 'EOS',
            value: 4
          }
        ],
        currentTab: {
          name: 'BTC',
          value: 1
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
