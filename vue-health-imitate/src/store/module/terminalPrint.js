import service from '@/api/index'
import { error, success } from '@/utils/index'
const server = service.serverComponent
const state = {
}

const actions = {
  // 终端打印
  async examPrintGetStudentExamDetail ({commit}, data) { // 获取学生体检信息详情
    const res = await server.examPrintGetStudentExamDetail(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async examPrintGetVote ({commit}, data) { // 获取学生投票
    const res = await server.examPrintGetVote(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async examPrintvote ({commit}, data) { // 投票
    const res = await server.examPrintvote(data)
    if (res && res.code === 1) {
      success('投票成功')
      return res.result
    } else error(res.message)
  },
  async examPrintGetfeedbackOne ({commit}, data) { // 获取学生体检反馈表数据
    const res = await server.examPrintGetfeedbackOne(data)
    if (res && res.code === 1) {
      return res
    } else error(res.message)
  },
  async examPrintCheckStudentExamExisit ({commit}, data) { // 判断是否有体检表
    const res = await server.examPrintCheckStudentExamExisit(data)
    if (res && res.code === 1) {
      if (res.message) {
        success(res.message)
      }
      return res.result
    } else error(res.message)
  },
  async examPrintSignCount ({commit}, data) { // 获取今日学生体检数
    const res = await server.examPrintSignCount(data)
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
