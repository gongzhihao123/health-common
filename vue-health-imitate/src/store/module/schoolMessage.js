import service from '@/api/index'
import { error } from '@/utils/index'
const server = service.serverComponent
const state = {
}

const actions = {
  async schoolExamInfolist ({commit}, data) {
    const res = await server.schoolExamInfolist(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async schoolExamInfoGetStudent ({commit}, data) {
    const res = await server.schoolExamInfoGetStudent(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async schoolExamInfoGetStudentExamDetail ({commit}, data) {
    const res = await server.schoolExamInfoGetStudentExamDetail(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async schoolExamInfoGetfeedbackOne ({commit}, data) {
    const res = await server.schoolExamInfoGetfeedbackOne(data)
    if (res && res.code === 1) {
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
