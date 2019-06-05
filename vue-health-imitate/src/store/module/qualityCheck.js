import service from '@/api/index'
import { error, success, notice } from '@/utils/index'
const server = service.service
const state = {}

const actions = {
  async qualityTeam ({commit}, data) {
    const res = await server.qualityTeam(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async newGroup ({commit}, data) {
    const res = await server.newGroup(data)
    if (res && res.code === 1) {
      success('新建成功')
    } else error(res.message)
  },
  async teamDetele ({commit}, data) {
    const res = await server.teamDetele(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  async leaveGroup ({commit}, data) {
    const res = await server.leaveGroup(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else if (res && res.code === -1) {
      notice(res.message)
      return -1
    } else {
      error(res.message)
    }
  },
  async outGroup ({commit}, data) {
    const res = await server.outGroup(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async studentInfo ({commit}, data) {
    const res = await server.studentInfo(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async surveyResult ({commit}, data) {
    const res = await server.surveyResult(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  async qualityStatus ({commit}, data) {
    const res = await server.qualityStatus(data)
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
