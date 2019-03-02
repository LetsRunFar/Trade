import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const state = {
  priceOfUSDT: null
}

const mutations = {
  SET_PRICE_OF_USDT(state,data){
    state.priceOfUSDT = data
  }
}

const actions = {
  setPriceOfUSDT:({commit}, priceOfUSDT) => {
    commit('SET_PRICE_OF_USDT', priceOfUSDT)
  }
}

const getters = {
  priceOfUSDT: state => state.priceOfUSDT
}

const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
vue.prototype.$store = store
export default store
