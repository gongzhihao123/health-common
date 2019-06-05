import service from '@/api/index'
import { success, error } from '@/utils/index'
const server = service.serverComponent
const state = {
}

const actions = {
  // 登录
  async login ({commit}, data) {
    const res = await server.login(data)
    return res
  },
  // 退出
  async logout ({commit}, data) {
    const res = await server.logout(data)
    return res
  },
  // 角色管理
  async roleList ({commit}, data) {
    const res = await server.roleList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async roleAdd ({commit}, data) {
    const res = await server.roleAdd(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  async roleEdit ({commit}, data) {
    const res = await server.roleEdit(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  async roleDetele ({commit}, data) {
    const res = await server.roleDetele(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  async roleDetail ({commit}, data) {
    const res = await server.roleDetail(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async roleResourceList ({commit}, data) {
    const res = await server.roleResourceList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 用户管理
  async userList ({commit}, data) {
    const res = await server.userList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async userRoleList ({commit}, data) {
    const res = await server.userRoleList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async userAdd ({commit}, data) {
    const res = await server.userAdd(data)
    if (res && res.code === 1) {
      success('添加成功')
      return res.result
    } else error(res.message)
  },
  async userEdit ({commit}, data) {
    const res = await server.userEdit(data)
    if (res && res.code === 1) {
      success('编辑成功')
      return res.result
    } else error(res.message)
  },
  async userLock ({commit}, data) {
    const res = await server.userLock(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async userReset ({commit}, data) {
    const res = await server.userReset(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  // 体检项目管理
  async projectList ({commit}, data) {
    const res = await server.projectList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async projectProject ({commit}, data) {
    const res = await server.projectProject(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async projectProjectEdit ({commit}, data) {
    const res = await server.projectProjectEdit(data)
    if (res && res.code === 1) {
      success('操作成功')
      return res.result
    } else error(res.message)
  }
}

const mutations = {
}

export default ({
  state,
  actions,
  mutations
})
