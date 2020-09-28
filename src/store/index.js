import Vue from 'vue'
import Vuex from 'vuex'

import idnx from './modules/idnx'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    idnx
  }
})
