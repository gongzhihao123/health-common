import service from '@/api/index'
import { error, success } from '@/utils/index'
const server = service.serverComponent
const state = {
}

const actions = {
  // 获取头像流
  async getUserFace ({commit}, data) {
    const res = await server.getUserFace(data)
    return window.URL.createObjectURL(res)
  },
  // 修改密码
  async editPassword ({commit}, data) {
    const res = await server.editPassword(data)
    if (res && res.code === 1) {
      success(res.message)
      return 1
    } else {
      error(res.message)
      return 2
    }
  },
  // 获取当前用户信息
  async getUserInfo ({commit}, data) {
    const res = await server.getUserInfo(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学校列表
  async schoolList ({commit}, data) {
    const res = await server.schoolList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学段列表
  async sectionList ({commit}, data) {
    const res = await server.sectionList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取年级列表
  async gradeList ({commit}, data) {
    const res = await server.gradeList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取班级列表
  async classList ({commit}, data) {
    const res = await server.classList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学年列表
  async xnList ({commit}, data) {
    const res = await server.xnList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 验证
  async validation ({commit}, data) {
    const res = await server.validation(data)
    if (res && res.code === 1) return res.result
  }
}

const mutations = {
}

export default ({
  state,
  actions,
  mutations
})
