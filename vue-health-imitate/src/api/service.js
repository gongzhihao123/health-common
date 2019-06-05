import axios from './axios'

// 获取单位信息列表--数据管理
export function getSchoolExtendList (data) {
  return axios.get('/company/getSchoolExtendList', { params: data }).then((res) => res.data)
}
// 获取角色接口--获取角色接口
export function roles () {
  return axios.get('/company/roleList').then((res) => res.data)
}
// 获取联系人接口
export function allList () {
  return axios.get('/company/allList').then((res) => res.data)
}

// 修改学校联系人--单位管理
export function updateSchoolExtend (data) {
  return axios.post('/company/updateSchoolExtend', data).then((res) => res.data)
}

// 获取学生课桌椅列表
export function getStudentDeskList (data) {
  return axios.get('/desk/getStudentDeskList', { params: data }).then((res) => res.data)
}

// 获取本校学生课桌椅列表
export function getSchoolDeskList (data) {
  return axios.get('/deskSchool/getStudentDeskList', { params: data }).then((res) => res.data)
}

// 获取课桌椅列表
export function getDeskList () {
  return axios.get('/deskRule/getDeskList').then((res) => res.data)
}
// 修改课桌椅
export function updateDesk (data) {
  return axios.get('/deskRule/updateDesk', { params: data }).then((res) => res.data)
}
// 删除课桌椅
export function deleteDesk (data) {
  return axios.get('/deskRule/deleteDesk', { params: data }).then((res) => res.data)
}

// 删除临时学生
export function deleteTempStudent (data) {
  return axios.get('/cmis/deleteTempStudent', { params: data }).then((res) => res.data)
}

// 获取体检项目列表
export function getproject (data) {
  return axios.get('/projectInfo/selectList', { params: data }).then((res) => res.data)
}

// 获取体检项目内容
export function projectContentList (data) {
  return axios.get('/projectInfo/projectContentList', { params: data }).then((res) => res.data)
}
// 添加临时学生
export function addTempStudent (data) {
  return axios.get('/cmis/addTempStudent', { params: data }).then((res) => res.data)
}

// 获取学生列表
export function getStudentList (data) {
  return axios.get('/cmis/getStudentList', { params: data }).then((res) => res.data)
}

// 获取体检反馈标准
export function setting () {
  return axios.get('/projectInfo/setting').then((res) => res.data)
}

// 设置体检反馈标准
export function set (data) {
  return axios.post('/projectInfo/set', data).then((res) => res.data)
}
// 获取已设置体检项目
export function projectLists () {
  return axios.get('/projectInfo/projectList').then((res) => res.data)
}
// 修改体检项目
export function projectChange (data) {
  return axios.post('/projectInfo/projectChange', data).then((res) => res.data)
}

// 编辑体检意见
export function editContentSuggest (data) {
  return axios.post('/projectInfo/editContentSuggest', data).then((res) => res.data)
}

// 获取体检项目列表
export function tjlist () {
  return axios.get('/examProjectAbnormal/selectList').then((res) => res.data)
}

// 获取异常类别列表
export function yclist (data) {
  return axios.get('/examProjectAbnormal/projectContentList', { params: data }).then((res) => res.data)
}

// 获取学生体检异常信息列表
export function getAbnormalList (data) {
  return axios.get('/examProjectAbnormal/getAbnormalList', { params: data }).then((res) => res.data)
}

// 获取学生体检信息详情
export function getStudentExamDetail (data) {
  return axios.get('/examProjectAbnormal/getStudentExamDetail', { params: data }).then((res) => res.data)
}

// 获取视力数据列表
export function getVisionList (data) {
  return axios.get('/statisticsVision/getVisionList', { params: data }).then((res) => res.data)
}

// 获取评价统计--满意度数据
export function evaluateInfo (data) {
  return axios.get('/statisticsEvaluate/evaluateInfo', { params: data }).then((res) => res.data)
}

// 获取体检老师满意度
export function listUser (data) {
  return axios.get('/statisticsEvaluate/listUser', { params: data }).then((res) => res.data)
}

// 获取信息CIMS搜索框列表--全局
export function searchStudent (data) {
  return axios.get('common/getStudent', { params: data }).then((res) => res.data)
}

// 获取信息CIMS搜索框列表--本校
export function searchStudentBySchool (data) {
  return axios.get('common/getStudentBySchool', { params: data }).then((res) => res.data)
}

// 获取个性化报表搜索框列表
export function searchStudentgx (data) {
  return axios.get('/statisticsIndividualization/searchStudentByKeyWord', { params: data }).then((res) => res.data)
}

// 获取个性化报表搜索框列表
export function searchGetStudent (data) {
  return axios.get('/deskSchool/getStudent', { params: data }).then((res) => res.data)
}

// 获取个性化报表学校列表
// export function getSchoolgx () {
//   return axios.get('/statisticsIndividualization/getSchoolList').then((res) => res.data)
// }

// 获取个性化报表学年列表
// export function getXnListgx () {
//   return axios.get('/statisticsIndividualization/getXnList').then((res) => res.data)
// }

// // 获取个性化列表年级列表
// export function getGradeListgx (data) {
//   return axios.get('/statisticsIndividualization/getGradeList', { params: data }).then((res) => res.data)
// }

// // 获取个性化班级列表
// export function getClassListgx (data) {
//   return axios.get('/statisticsIndividualization/getClassList', { params: data }).then((res) => res.data)
// }

// 个性化全学段健康评价学生列表
export function listEvaluate (data) {
  return axios.get('/statisticsIndividualization/listEvaluate', { params: data }).then((res) => res.data)
}

// 学段健康评价详情
export function evaluateDetail (data) {
  return axios.get('/statisticsIndividualization/evaluateDetail', { params: data }).then((res) => res.data)
}

// 慢性病 肥胖预警
export function chronicFP (data) {
  return axios.get('/statisticsIndividualization/chronicFP', { params: data }).then((res) => res.data)
}

// 慢性病 血压
export function chronicXY (data) {
  return axios.get('/statisticsIndividualization/chronicXY', { params: data }).then((res) => res.data)
}

// 慢性病 营养
export function chronicYY (data) {
  return axios.get('/statisticsIndividualization/chronicYY', { params: data }).then((res) => res.data)
}

// 个性化，视力新发列表
export function listVisionNew (data) {
  return axios.get('/statisticsIndividualization/listVisionNew', { params: data }).then((res) => res.data)
}

// 个性化，健促校督导报表 视力不良预警 肥胖分级预警 低重营养不良
export function supervisorFP (data) {
  return axios.get('/statisticsIndividualization/supervisorFP', { params: data }).then((res) => res.data)
}

// 个性化，健促校督导报表 贫血 沙眼
export function supervisorFour (data) {
  return axios.get('/statisticsIndividualization/supervisorFour', { params: data }).then((res) => res.data)
}

// 个性化，健促校督导报表 龋齿
export function supervisorQC (data) {
  return axios.get('/statisticsIndividualization/supervisorQC', { params: data }).then((res) => res.data)
}

// 个性化 ，预警报表
export function earlywarning (data) {
  return axios.get('/statisticsIndividualization/earlywarning', { params: data }).then((res) => res.data)
}

// 获取当前全部质检小组
export function qualityTeam () {
  return axios.get('/qualityMonitor/groupList').then((res) => res.data)
}

// 新建质检组
export function newGroup (data) {
  return axios.post('/qualityMonitor/group', data).then((res) => res.data)
}

// 删除质检小组
export function teamDetele (data) {
  return axios.delete('/qualityMonitor/group', { params: data }).then((res) => res.data)
}

// 离开质检小组
export function leaveGroup (data) {
  return axios.patch(`/qualityMonitor/group?groupId=${data}`).then((res) => res.data)
}
// 结束质检小组
export function outGroup (data) {
  console.log('000', data)
  return axios.put('/qualityMonitor/group', data).then((res) => res.data)
}

// 获取学生具体数据
export function studentInfo (data) {
  return axios.get('/qualityMonitor/studentInfo', { params: data }).then((res) => res.data)
}

// 检测保存监测数据
export function surveyResult (data) {
  return axios.post('/qualityMonitor/qualityExam', data).then((res) => res.data)
}
// 获取质检员用户列表
export function qualityList (data) {
  return axios.get('/qualityManage/userList', { params: data }).then((res) => res.data)
}

// 获取监测小组的检测项目列表
export function groupProject (data) {
  return axios.get('/qualityManage/groupProject', { params: data }).then((res) => res.data)
}

// 获取全部质检小组
export function groupList (data) {
  return axios.get('/qualityManage/groupList', { params: data }).then((res) => res.data)
}

// 质量监测统计
export function qualityStatus () {
  return axios.get('/qualityMonitor/qualityStatus').then((res) => res.data)
}
