import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const state = {
  priceOfUSDT: null
}

const mutations = {
  setPriceOfUSDT(state,data){
    this.priceOfUSDT = data
  }
}

const action = {
  commitPriceOfUSDT:({commit}, priceOfUSDT) => commit('setPriceOfUSDT', priceOfUSDT)
}
