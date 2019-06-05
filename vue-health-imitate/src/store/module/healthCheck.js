import service from '@/api/index'
import { success, error } from '@/utils/index'
const server = service.serverComponent
const state = {
}

const actions = {
  // 搜索
  async examInfoGetStudent ({commit}, data) {
    const res = await server.searchStudent(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  async examInfoList ({commit}, data) {
    const res = await server.examInfoList(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examination ({commit}, data) {
    const res = await server.examination(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.code
    } else {
      error(res.message)
      return res.code
    }
  },
  async examInfoGetStudentExamDetail ({commit}, data) {
    const res = await server.examInfoGetStudentExamDetail(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examProjectAbnormalGetStudentExamDetail ({commit}, data) { // 异常-查看详情
    const res = await server.examProjectAbnormalGetStudentExamDetail(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async saveExamData ({commit}, data) {
    const res = await server.saveExamData(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async getfeedbackOne ({commit}, data) {
    const res = await server.getfeedbackOne(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  // 修改体检日期
  async editExaminationDate ({commit}, data) {
    const res = await server.editExaminationDate(data)
    if (res && res.code === 1) {
      success('体检日期修改成功')
      return res.result
    } else error(res.message)
  },
  // 体检信息录入
  async examEnteringGetStudentExamDetail ({commit}, data) {
    const res = await server.examEnteringGetStudentExamDetail(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examEnteringSaveExamData ({commit}, data) {
    const res = await server.examEnteringSaveExamData(data)
    if (res && res.code === 1) {
      success(res.message)
      return res.result
    } else error(res.message)
  },
  async checkUpdateOverTime ({commit}, data) {
    const res = await server.checkUpdateOverTime(data)
    if (res && (res.code === 1 || res.code === 999)) {
      return res.code
    } else error(res.message)
  },
  async getStudentCount ({commit}, data) {
    const res = await server.getStudentCount(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  // 体检信息变更
  async getExamChangePage ({commit}, data) {
    const res = await server.getExamChangePage(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examChangeCheckChange ({commit}, data) { // 审核变更
    const res = await server.examChangeCheckChange(data)
    if (res && res.code === 1) {
      success('审核成功')
      return res.result
    } else error(res.message)
  },
  async getMyChangePage ({commit}, data) { // 获取我的变更列表
    const res = await server.getMyChangePage(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examDownloadGetSchoolPage ({commit}, data) { // 下载体检信息获取列表
    const res = await server.examDownloadGetSchoolPage(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examCrowdGetCrowdPage ({commit}, data) { // 受检/未受检人群获取学校列表
    const res = await server.examCrowdGetCrowdPage(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examCrowdGetStatics ({commit}, data) { // 受检/未受检人群获取受检人群统计
    const res = await server.examCrowdGetStatics(data)
    if (res && res.code === 1) {
      return res.result
    } else error(res.message)
  },
  async examCrowdGetStudentCrownPage ({commit}, data) { // 受检/未受检人群获取学生
    const res = await server.examCrowdGetStudentCrownPage(data)
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
