import axios from './axios'
// 页面初始化
export function init (data) {
  return axios.get('/common/initPage', {params: data}).then((res) => res.data)
}
// 获取头像流
export function getUserFace (data) {
  return axios.get('/common/getUserFace', { params: data, responseType: 'blob' }).then((res) => res.data)
}
// 获取当前用户信息
export function getUserInfo () {
  return axios.get('/common/getUserInfo').then((res) => res.data)
}
// 修改密码
export function editPassword (data) {
  return axios.post('/common/editPassword', data).then((res) => res.data)
}
// 获取学校列表
export function schoolList () {
  return axios.get('/common/getSchoolList').then((res) => res.data)
}
// 获取学段列表
export function sectionList (data) {
  return axios.get('/common/getSectionList', { params: data }).then((res) => res.data)
}
// 获取年级列表
export function gradeList (data) {
  return axios.get('/common/getGradeList', { params: data }).then((res) => res.data)
}
// 获取班级列表
export function classList (data) {
  return axios.get('/common/getClassList', { params: data }).then((res) => res.data)
}
// 获取学年列表
export function xnList () {
  return axios.get('/common/getXnList').then((res) => res.data)
}
// 验证
export function validation () {
  return axios.get('/common/getXnList').then((res) => res.data)
}
// 登录
export function login (data) {
  return axios.put('/login', data).then((res) => res.data)
}
// 退出
export function logout () {
  return axios.get('/logout').then((res) => res.data)
}
// 系统设置-角色管理
export function roleList () {
  return axios.get('/role/list').then((res) => res.data)
}
export function roleAdd (data) {
  return axios.post('/role/add', data).then((res) => res.data)
}
export function roleEdit (data) {
  return axios.put('/role/edit', data).then((res) => res.data)
}
export function roleDetele (data) {
  return axios.delete(`/role/delete?roleId=${data.id}`).then((res) => res.data)
}
export function roleDetail (data) {
  return axios.get('/role/roleDetail', { params: data }).then((res) => res.data)
}
export function roleResourceList () {
  return axios.get('/role/resourceList').then((res) => res.data)
}
// 系统设置-用户管理
export function userList (data) {
  return axios.get('/user/list', { params: data }).then((res) => res.data)
}
export function userRoleList (data) {
  return axios.get('/user/roleList', { params: data }).then((res) => res.data)
}
export function userAdd (data) {
  return axios.post('/user/add', data).then((res) => res.data)
}
export function userEdit (data) {
  return axios.post('/user/edit', data).then((res) => res.data)
}
export function userLock (data) {
  return axios.put('/user/lock', data).then((res) => res.data)
}
export function userReset (data) {
  return axios.put('/user/reset', data).then((res) => res.data)
}
// 系统设置-体检项目管理
export function projectList (data) {
  return axios.get('/project/list', { params: data }).then((res) => res.data)
}
export function projectProject (data) {
  return axios.get('/project/project', { params: data }).then((res) => res.data)
}
export function projectProjectEdit (data) {
  return axios.put('/project/project', data).then((res) => res.data)
}
// 健康体检信息-体检信息管理
export function examInfoList (data) {
  return axios.get('/examInfo/list', { params: data }).then((res) => res.data)
}
export function examination (data) { // 为学生生成体检表
  return axios.put('/examInfo/examination', data).then((res) => res.data)
}
export function examInfoGetStudentExamDetail (data) { // 获取学生体检信息详情
  return axios.get('/examInfo/getStudentExamDetail', { params: data }).then((res) => res.data)
}
export function examProjectAbnormalGetStudentExamDetail (data) { // 异常-获取学生体检信息详情
  return axios.get('/examProjectAbnormal/getStudentExamDetail', { params: data }).then((res) => res.data)
}
export function saveExamData (data) { // 保存学生体检数据
  return axios.post('/examInfo/saveExamData', data).then((res) => res.data)
}
export function getfeedbackOne (data) {
  return axios.get('/examInfo/getfeedbackOne', { params: data }).then((res) => res.data)
}
export function editExaminationDate (data) { // 修改体检日期
  return axios.post('/examInfo/editExaminationDate', data).then((res) => res.data)
}
export function examDownloadGetSchoolPage (data) { // 下载体检信息获取列表
  return axios.get('/examDownload/getSchoolPage', { params: data }).then((res) => res.data)
}
export function examCrowdGetCrowdPage (data) { // 受检/未受检人群获取学校列表
  return axios.get('/examCrowd/getCrowdPage', { params: data }).then((res) => res.data)
}
export function examCrowdGetStatics (data) { // 受检/未受检人群获取受检人群统计
  return axios.get('/examCrowd/getStatistics', { params: data }).then((res) => res.data)
}
export function examCrowdGetStudentCrownPage (data) { // 受检/未受检人群获取学生
  return axios.get('/examCrowd/getStudentCrownPage', { params: data }).then((res) => res.data)
}
// 体检信息录入
export function examEnteringGetStudentExamDetail (data) {
  return axios.get('examEntering/getStudentExamDetail', { params: data }).then((res) => res.data)
}
export function examEnteringSaveExamData (data) { // 保存学生体检数据
  return axios.post('/examEntering/saveExamData', data).then((res) => res.data)
}
export function checkUpdateOverTime (data) { // 检查是否超过可编辑时间
  return axios.post('/examEntering/checkUpdateOverTime', data).then((res) => res.data)
}
export function getStudentCount (data) { // 获取今天已体检人数
  return axios.get('/examEntering/getStudentCount', { params: data }).then((res) => res.data)
}
// 我的变更申请
export function getExamChangePage (data) { // 获取体检信息变更列表
  return axios.get('/examChange/getExamChangePage', { params: data }).then((res) => res.data)
}
export function examChangeCheckChange (data) { // 变更审核
  return axios.post('/examChange/checkChange', data).then((res) => res.data)
}
export function getMyChangePage (data) { // 获取我的变更列表
  return axios.get('/examMyChange/getMyChangePage', { params: data }).then((res) => res.data)
}
// 终端打印
export function examPrintGetStudentExamDetail (data) { // 获取学生体检信息详情
  return axios.get('/examPrint/getStudentExamDetail', { params: data }).then((res) => res.data)
}
export function examPrintGetVote (data) { // 获取学生投票
  return axios.get('/examPrint/getVote', { params: data }).then((res) => res.data)
}
export function examPrintvote (data) { // 投票
  return axios.post('/examPrint/vote', data).then((res) => res.data)
}
export function examPrintGetfeedbackOne (data) { // 获取学生体检反馈表数据
  return axios.get('/examPrint/getfeedbackOne', { params: data }).then((res) => res.data)
}
export function examPrintCheckStudentExamExisit (data) { // 判断是否有体检表
  return axios.get('/examPrint/checkStudentExamExisit', { params: data }).then((res) => res.data)
}
export function examPrintSignCount (data) { // 获取今日学生体检数
  return axios.get('/examPrint/count', { params: data }).then((res) => res.data)
}
// 学校体检信息查询
export function schoolExamInfolist (data) { // 获取学生体检信息列表
  return axios.get('/schoolExamInfo/list', { params: data }).then((res) => res.data)
}
export function schoolExamInfoGetStudent (data) { // 搜索学生
  return axios.get('/schoolExamInfo/getStudent', { params: data }).then((res) => res.data)
}
export function schoolExamInfoGetStudentExamDetail (data) { // 体检详情
  return axios.get('/schoolExamInfo/getStudentExamDetail', { params: data }).then((res) => res.data)
}
export function schoolExamInfoGetfeedbackOne (data) {
  return axios.get('/schoolExamInfo/getfeedbackOne', { params: data }).then((res) => res.data)
}
