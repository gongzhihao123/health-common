import Vue from 'vue'
import Vuex from 'vuex'
import service from './../api/index'
import common from './module/common'
import systemSettings from './module/systemSettings'
import Info from './module/Info'
import healthCheck from './module/healthCheck'
import terminalPrint from './module/terminalPrint'
import schoolMessage from './module/schoolMessage'
import testManage from './module/testManage'
import qualityCheck from './module/qualityCheck'
import router from '../router/index'
import * as type from './mutations-type'

Vue.use(Vuex)

const server = service.serverComponent

const state = {
  user: ''
}

const actions = {
  // 页面初始化
  async init ({commit}, url) {
    const res = await server.init({'accessType': url.accessType})
    if (res.code === 1) {
      router.push(url.url === '/' ? '/navPage' : url.url)
    }
    commit(type.INIT, res)
  }
}

const mutations = {
  [type.INIT] (state, data) {
    if (data.code === 1) {
      state.user = data.result
    }
  }
}
const getters = {
  init (state) {
    return state.user
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    common,
    systemSettings,
    healthCheck,
    Info,
    terminalPrint,
    schoolMessage,
    testManage,
    qualityCheck
  }
})
