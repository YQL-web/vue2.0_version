/**
 * Created by qiushaoyu on 2017/12/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import commodity from './modules/commodity'
import sale from './modules/sale'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: Object.assign({}, commodity,sale)
})
