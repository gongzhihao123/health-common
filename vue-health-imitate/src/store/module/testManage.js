import service from '@/api/index'
import { error } from '@/utils/index'
const server = service.service
const state = {
  qualitysList: ''
}

const actions = {
  async qualityList ({commit}, data) {
    const res = await server.qualityList(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async groupProject ({commit}, data) {
    const res = await server.groupProject(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async groupList ({commit}, data) {
    const res = await server.groupList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  }
}

const mutations = {
}

export default ({
  state,
  actions,
  mutations
})
