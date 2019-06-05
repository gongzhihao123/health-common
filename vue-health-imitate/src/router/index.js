import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // 页面顶部进度条
import 'nprogress/nprogress.css'

const noFind = resolve => require(['../../src/pages/noFind.vue'], resolve)
const home = resolve => require(['../../src/pages/home.vue'], resolve)
const firstPage = resolve => require(['@/pages/firstPage.vue'], resolve)
const login = resolve => require(['../../src/pages/login.vue'], resolve)
const navPage = resolve => require(['../../src/pages/navPage.vue'], resolve)

// 数据管理
const studentCMIS = resolve => require(['../../src/pages/dataManagement/studentCMIS.vue'], resolve)
const company = resolve => require(['../../src/pages/dataManagement/company.vue'], resolve)
const unusualMessage = resolve => require(['../../src/pages/dataManagement/unusualMessage.vue'], resolve)
// 健康体检信息
const changeCheck = resolve => require(['../../src/pages/healthCheck/changeCheck.vue'], resolve)
const checkManage = resolve => require(['../../src/pages/healthCheck/checkManage.vue'], resolve)
const downloadMessage = resolve => require(['../../src/pages/healthCheck/downloadMessage.vue'], resolve)
const myChange = resolve => require(['../../src/pages/healthCheck/myChange.vue'], resolve)
const people = resolve => require(['../../src/pages/healthCheck/people.vue'], resolve)
const detailIndex = resolve => require(['../../src/pages/healthCheck/components/index.vue'], resolve)
const myChangeDetail = resolve => require(['../../src/pages/healthCheck/components/myChangeDetail.vue'], resolve)
// 录入
const entry = resolve => require(['../../src/pages/healthCheck/components/entry.vue'], resolve)
const totalEntry = resolve => require(['../../src/pages/healthCheck/components/totalEntry.vue'], resolve)

// 学校体检信息查询
const schoolMessage = resolve => require(['../../src/pages/schoolMessage/schoolMessage.vue'], resolve)

// 数据统计分析
const anomaly = resolve => require(['../../src/pages/dataAnalysis/anomaly.vue'], resolve)
const checkTable = resolve => require(['../../src/pages/dataAnalysis/checkTable.vue'], resolve)
const evaluate = resolve => require(['../../src/pages/dataAnalysis/evaluate.vue'], resolve)
const eyesightAndFat = resolve => require(['../../src/pages/dataAnalysis/eyesightAndFat.vue'], resolve)
const eyesightTable = resolve => require(['../../src/pages/dataAnalysis/eyesightTable.vue'], resolve)
const individuation = resolve => require(['../../src/pages/dataAnalysis/individuation.vue'], resolve)
const studentInfo = resolve => require(['../../src/pages/dataAnalysis/studentInfo.vue'], resolve)
// 身高与课桌椅对照
const deskContrast = resolve => require(['../../src/pages/heightAndDesk/deskContrast.vue'], resolve)
const studentDesk = resolve => require(['../../src/pages/heightAndDesk/studentDesk.vue'], resolve)
const studentDeskSchool = resolve => require(['../../src/pages/heightAndDesk/sudentDeskSchool.vue'], resolve)
// 系统设置
const role = resolve => require(['../../src/pages/systemSettings/role.vue'], resolve)
const user = resolve => require(['../../src/pages/systemSettings/user.vue'], resolve)
const project = resolve => require(['../../src/pages/systemSettings/project.vue'], resolve)

// 打印终端
const sweep = resolve => require(['../../src/pages/terminalPrint/sweep.vue'], resolve)
const print = resolve => require(['../../src/pages/terminalPrint/print.vue'], resolve)
// const terminalPrintIndex = resolve => require(['../../src/pages/terminalPrint/index.vue'], resolve)
const checkMessage = resolve => require(['../../src/pages/terminalPrint/checkMessage.vue'], resolve)
const vote = resolve => require(['../../src/pages/terminalPrint/vote.vue'], resolve)

// 质量检测管理
const testManage = resolve => require(['../../src/pages/qualityManage/testManage.vue'], resolve)
const checkPhysique = resolve => require(['../../src/pages/qualityCheck/checkPhysique.vue'], resolve)
const checkBasic = resolve => require(['../../src/pages/qualityCheck/checkBasic.vue'], resolve)

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: home,
    // redirect: '/studentCMIS',
    children: [
      // 数据管理
      { path: '/dataManagement/studentCMIS', component: studentCMIS },
      { path: '/dataManagement/company', component: company },
      { path: '/dataManagement/unusualMessage', component: unusualMessage },
      // 健康体检信息
      { path: '/healthCheck/changeCheck', component: changeCheck },
      { path: '/healthCheck/checkManage', component: checkManage },
      { path: '/healthCheck/downloadMessage', component: downloadMessage },
      { path: '/healthCheck/myChange', component: myChange },
      { path: '/healthCheck/people', component: people },
      // 学校体检信息查询
      { path: '/schoolMessage/schoolMessage', component: schoolMessage },
      // 数据统计分析
      { path: '/dataAnalysis/anomaly', component: anomaly },
      { path: '/dataAnalysis/checkTable', component: checkTable },
      { path: '/dataAnalysis/evaluate', component: evaluate },
      { path: '/dataAnalysis/eyesightAndFat', component: eyesightAndFat },
      { path: '/dataAnalysis/eyesightTable', component: eyesightTable },
      { path: '/dataAnalysis/individuation', component: individuation },
      // 身高与课桌椅对照
      { path: '/heightAndDesk/deskContrast', component: deskContrast },
      { path: '/heightAndDesk/studentDesk', component: studentDesk },
      { path: '/heightAndDesk/studentDeskSchool', component: studentDeskSchool },
      // 系统设置
      { path: '/systemSettings/role', component: role },
      { path: '/systemSettings/user', component: user },
      { path: '/systemSettings/project', component: project }
    ]
  },
  {
    path: '/detail/index',
    component: detailIndex,
    children: [
      { path: '/detail/myChangeDetail', component: myChangeDetail },
      { path: '/totalEntry', component: totalEntry },
      { path: '/entry', component: entry },
      { path: '/terminalPrint/checkMessage', component: checkMessage },
      { path: '/terminalPrint/vote', component: vote }
    ]
  },
  {
    // 质量检测管理
    path: '/qualityManage/testManage',
    component: testManage
  },
  // 体检质量检测
  {
    path: '/qualityCheck/checkPhysique',
    name: 'checkPhysique',
    component: checkPhysique
  },
  {
    path: '/qualityCheck/checkBasic',
    name: 'checkBasic',
    component: checkBasic
  },
  // 打印终端
  {
    path: '/terminalPrint/sweep',
    component: sweep
  },
  {
    path: '/firstPage',
    component: firstPage
  },
  // {
  //   path: '/terminalPrint/index',
  //   component: terminalPrintIndex,
  //   children: [
  //   ]
  // },
  {
    path: '/terminalPrint/print',
    component: print
  },
  {
    path: '/dataAnalysis/studentInfo',
    component: studentInfo
  },
  // 导航页
  {
    path: '/navPage',
    component: navPage
  },
  // 登录
  {
    path: '/login',
    component: login
  },
  {
    path: '*',
    component: noFind
  }
]

const router = new Router({
  mode: 'hash',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next() // 确保一定要调用 next()
})

router.afterEach(transition => {
  NProgress.done()
})

export default router
