import service from '@/api/index'
import { error, success } from '@/utils/index'
const server = service.service
const state = {
}
const actions = {
  // 获取单位信息
  async getSchoolExtendList ({commit}, data) {
    const res = await server.getSchoolExtendList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取角色
  async roles ({commit}, data) {
    const res = await server.roles(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取联系人
  async allList ({commit}, data) {
    const res = await server.allList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 添加/编辑联系人
  async updateSchoolExtend ({commit}, data) {
    const res = await server.updateSchoolExtend(data)
    if (res && res.code === 1) success('操作成功')
    else error(res.message)
  },
  // 获取学生课桌椅列表
  async getStudentDeskList ({commit}, data) {
    const res = await server.getStudentDeskList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学生课桌椅列表 搜索
  async searchGetStudent ({commit}, data) {
    const res = await server.searchGetStudent(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取本校学生课桌椅列表
  async getSchoolDeskList ({commit}, data) {
    const res = await server.getSchoolDeskList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学生课桌椅列表
  async getDeskList ({commit}, data) {
    const res = await server.getDeskList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 修改课桌椅列表
  async updateDesk ({commit}, data) {
    const res = await server.updateDesk(data)
    if (res && res.code === 1) success('操作成功')
    else error(res.message)
  },
  // 删除课桌椅
  async deleteDesk ({commit}, data) {
    const res = await server.deleteDesk(data)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
  },
  // 获取体检项目
  async getproject ({commit}, data) {
    const res = await server.getproject(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 添加临时学生
  async addTempStudent ({commit}, data) {
    const res = await server.addTempStudent(data)
    if (res && res.code === 1) success('操作成功')
    else error(res.message)
  },
  // 获取学生列表
  async getStudentList ({commit}, data) {
    const res = await server.getStudentList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取体检反馈标准
  async setting ({commit}, data) {
    const res = await server.setting(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 设置体检反馈标准
  async set ({commit}, data) {
    const res = await server.set(data)
    if (res && res.code === 1) success('操作成功')
    else error(res.message)
  },
  // 获取已设置的体检项目
  async projectLists ({commit}, data) {
    const res = await server.projectLists(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 修改体检项目
  async projectChange ({commit}, data) {
    const res = await server.projectChange(data)
    if (res && res.code === 1) success('操作成功')
    else error(res.message)
  },
  // 获取体检项目内容信息
  async projectContentList ({commit}, data) {
    const res = await server.projectContentList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 修改反馈意见
  async editContentSuggest ({commit}, data) {
    const res = await server.editContentSuggest(data)
    if (res && res.code === 1) success('编辑成功')
    else error(res.message)
  },
  // 获取体检项目列表
  async tjlist ({commit}, data) {
    const res = await server.tjlist(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取异常类别列表
  async yclist ({commit}, data) {
    const res = await server.yclist(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学生体检异常信息列表
  async getAbnormalList ({commit}, data) {
    const res = await server.getAbnormalList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取学生体检信息详情
  async getStudentExamDetail ({commit}, data) {
    const res = await server.getStudentExamDetail(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 删除临时学生
  async deleteTempStudent ({commit}, data) {
    const res = await server.deleteTempStudent(data)
    if (res && res.code === 1) success('操作成功')
    else error(res.message)
  },
  // 获取视力数据列表
  async getVisionList ({commit}, data) {
    const res = await server.getVisionList(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取评价统计--满意度
  async evaluateInfo ({commit}, data) {
    const res = await server.evaluateInfo(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取评价统计--体检老师
  async listUser ({commit}, data) {
    const res = await server.listUser(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取信息CIMS搜索框列表--全局
  async searchStudent ({commit}, data) {
    const res = await server.searchStudent(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取信息CIMS搜索框列表--本校
  async searchStudentBySchool ({commit}, data) {
    const res = await server.searchStudentBySchool(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取个性化报表搜索框列表
  // async searchStudentgx ({commit}, data) {
  //   const res = await server.searchStudentgx(data)
  //   if (res && res.code === 1) return res.result
  //   else error(res.message)
  // },
  // 获取个性化学校列表
  // async getSchoolgx ({commit}, data) {
  //   const res = await server.getSchoolgx(data)
  //   if (res && res.code === 1) return res.result
  //   else error(res.message)
  // },
  // 获取个性化学年列表
  // async getXnListgx ({commit}, data) {
  //   const res = await server.getXnListgx(data)
  //   if (res && res.code === 1) return res.result
  //   else error(res.message)
  // },
  // 获取个性化年级列表
  // async getGradeListgx ({commit}, data) {
  //   const res = await server.getGradeListgx(data)
  //   if (res && res.code === 1) return res.result
  //   else error(res.message)
  // },
  // 获取个性化班级列表
  async getClassListgx ({commit}, data) {
    const res = await server.getClassListgx(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取全学段健康评价学生列表
  async listEvaluate ({commit}, data) {
    const res = await server.listEvaluate(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 获取全学段健康评价详情
  async evaluateDetail ({commit}, data) {
    const res = await server.evaluateDetail(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 慢性病肥胖预警报表
  async chronicFP ({commit}, data) {
    const res = await server.chronicFP(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 慢性病血压预警报表
  async chronicXY ({commit}, data) {
    const res = await server.chronicXY(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 慢性病营养预警报表
  async chronicYY ({commit}, data) {
    const res = await server.chronicYY(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 视力新发率列表
  async listVisionNew ({commit}, data) {
    const res = await server.listVisionNew(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 健促校督导报表3
  async supervisorFP ({commit}, data) {
    const res = await server.supervisorFP(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 健促校督导报表2
  async supervisorFour ({commit}, data) {
    const res = await server.supervisorFour(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 健促校督导报表2
  async supervisorQC ({commit}, data) {
    const res = await server.supervisorQC(data)
    if (res && res.code === 1) return res.result
    else error(res.message)
  },
  // 个性化报表
  async earlywarning ({commit}, data) {
    const res = await server.earlywarning(data)
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
