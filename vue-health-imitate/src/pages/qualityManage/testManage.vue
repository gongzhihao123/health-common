<template>
  <div class='test-Manage'>
    <header :class="deviceFlag == false ? 'header' : 'headers' ">
      <el-row>
        <el-col :span="12">
          <img v-if="this.deviceFlag" src="../../assets/images/small-logo.png" @click="$router.push('/navPage')">
          <img v-else src="../../assets/images/backOff.png" alt="" @click="backOff">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
          <span>{{ userName }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <img v-else src="../../assets/images/default-avatar.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
              <!-- <el-dropdown-item >个人信息</el-dropdown-item>
              <el-dropdown-item  @click.native="changePassword">修改密码</el-dropdown-item> -->
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- <el-button size="small" @click="languageChange">
        切换语言
      </el-button> -->
    </header>
    <div :class="deviceFlag == false ? 'contentpad' : 'content'">
      <ul class="top">
        <li>
          <span v-if="deviceFlag">质检日期:</span>
          <el-date-picker
            v-model="qualityTime"
            type="date"
            class="checkTimes"
            :editable="false"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择质检日期">
          </el-date-picker>
        </li>
        <li>
          <span v-if="deviceFlag">质检学校:</span>
            <el-select v-model="school" clearable placeholder="请选择质检学校">
            <el-option
              v-for="item in schools"
              style="font-size: 0.36rem;"
              :key="item.xxdm"
              :label="item.xxmc"
              :value="item.xxdm">
            </el-option>
          </el-select>
        </li>
        <li>
          <span v-if="deviceFlag">质检组长:</span>
          <el-select v-model="classa" clearable placeholder="请选择质检组长" >
              <el-option
                v-for="item in qualityLists"
                style="font-size: 0.36rem;"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </li>
        <li>
          <el-button icon="el-icon-search" @click="groupList">查询</el-button>
        </li>
      </ul>
    <el-table v-if="deviceFlag" v-loading="loading" style="width: 100%" :data='tableData.list' class="manageTable">
      <el-table-column
        label="质检日期"
        show-overflow-tooltip
        label-class-name="head"
        width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.date | dateFormat('yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="xxmc"
        show-overflow-tooltip
        label-class-name="head"
        label="质检学校">
      </el-table-column>
      <el-table-column
        prop="leaderUserName"
        label="质检组长"
        show-overflow-tooltip
        label-class-name="head"
        width="120">
      </el-table-column>
      <el-table-column
        label-class-name="head"
        label="查看质检报告"
        width="440">
        <template slot-scope="scope">
          <div v-for="(itea, ind) in scope.row.resultList" :key="ind">
            <el-button v-if="itea.projectId === 'sgtz'" :class="itea.result == '1' ? 'primary' : itea.result == '2' ? 'warning' : 'danger' " @click="getAllDown('sgtz', scope.row)" size="small">身高体重<span>(<i style="font-style:normal;">{{ (Number(itea.rateValue) * 100).toFixed(2) }}</i>%)</span></el-button>
            <el-button v-if="itea.projectId === 'sl'" :class="itea.result == '1' ? 'primary' : itea.result == '2' ? 'warning' : 'danger' " @click="getNewAllDown('sl', scope.row)" size="small">视力<span>(<i style="font-style:normal;">{{ (Number(itea.rateValue) * 100).toFixed(2) }}</i>%)</span></el-button>
            <el-button v-if="itea.projectId === 'xss'" :class="itea.result == '1' ? 'primary' : itea.result == '2' ? 'warning' : 'danger' " @click="getXss('xss', scope.row)" size="small">血红蛋白<span>(<i style="font-style:normal;">{{ (Number(itea.rateValue) * 100).toFixed(2) }}</i>%)</span></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalCount !== 0 && deviceFlag"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
      <div class="middle" v-if="!deviceFlag">
        <div class="title">
          <span>质检日期</span><span>质检学校</span><span>质检组长</span><span>查看质检报告</span>
        </div>
        <ul class="con" v-loading='loading'>
          <li v-for="(item, index) in this.tableData.list" :key="index">
            <span>{{ item.date | dateFormat('yyyy-MM-dd') }}</span>
            <span>{{ item.xxmc }}</span>
            <span>{{ item.leaderUserName }}</span>
            <span v-for="(its, ind) in item.resultList" :key="ind">
              <el-button v-if="its.projectId === 'sgtz'" :class="its.result == '1' ? 'primary' : its.result == '2' ? 'warning' : 'danger'" @click="getAllDown('sgtz', item)" size="small">身高体重(<i style="font-style:normal;">{{ (Number(its.rateValue) * 100).toFixed(2) }}</i>%)</el-button>
              <el-button v-if="its.projectId === 'sl'" :class="its.result == '1' ? 'primary' : its.result == '2' ? 'warning' : 'danger'" @click="getNewAllDown('sl', item)" size="small">视力(<i style="font-style:normal;">{{ (Number(its.rateValue) * 100).toFixed(2) }}</i>%)</el-button>
              <el-button v-if="its.projectId === 'xss'" :class="its.result == '1' ? 'primary' : its.result == '2' ? 'warning' : 'danger'" @click="getXss('xss', item)" size="small">血红蛋白(<i style="font-style:normal;">{{ (Number(its.rateValue) * 100).toFixed(2) }}</i>%)</el-button>
            </span>
          </li>
          <div class="spinner" v-if="moreFalg">
            <div class="spinnerCon">
              <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
              </div>
              <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
              </div>
              <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <!-- pc表格弹窗 -->
    <el-dialog
      :title="pcTitle == 'sgtz' ? '身高体重表格' : pcTitle == 'sl' ? '视力表格' : '血红蛋白表格'"
      :visible.sync="pcDialog"
      width="55%"
      class="addDia"
      :before-close="handleClose">
      <div ref="ruleForm" class="cop">
        <h1 style="text-align:center; font-size:20px;" v-if="pcTitle == 'sgtz'">北京市学生健康体检抽验复测表——身高体重</h1>
        <h1 style="text-align:center; font-size:20px;" v-if="pcTitle == 'sl'">北京市学生健康体检抽验复测表——视力</h1>
        <h1 style="text-align:center; font-size:20px;" v-if="pcTitle == 'xss'">北京市学生健康体检抽验复测表——血红蛋白</h1>
        <ul style=" margin: 10px 0 10px 3%; width: 100%;">
          <li style="display:inline-block; width:310px; float:left; line-height:2;">体检单位：<span>北京市怀柔区中小学卫生保健所</span></li><li style="display:inline-block; width:52%; line-height:2;">学校名称：<span>{{qualityUserInfo.xxmc}}</span></li>
          <li style="display:inline-block; width:310px; text-align:left; line-height:2;">体检日期： <span>{{qualityUserInfo.date | dateFormat('yyyy'+'年'+'MM'+'月'+'dd'+'日') }}</span></li><li style="display:inline-block; width:50%; text-align:left; line-height:2;">当天体检人数：<span>{{ groupProjectList.examNum }}</span>人</li>
        </ul>
        <table v-if="pcTitle == 'sgtz'" width="100%" border="1" style="text-align:center; border-color: #ccc; line-height: 3; border: 1px solid #ccc;"  cellspacing="0" cellpadding="0">
          <thead style="background: #ABC1FE; color: #fff;">
          <tr>
            <td rowspan="2">编号</td>
            <td rowspan="2">复测学生姓名</td>
            <td colspan="3">身高（cm）</td>
            <td rowspan="2">结果</td>
            <td colspan="3">体重（kg）</td>
            <td rowspan="2">结果</td>
          </tr>
          <tr>
            <td>测量结果</td>
            <td>复测结果</td>
            <td>差值</td>
            <td>测量结果</td>
            <td>复测结果</td>
            <td>差值</td>
          </tr>
          </thead>
          <tbody v-for="(item, index) in this.qualityProjectList" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item[0].studentName }}</td>
            <td>{{ Number(item[0].originalValue1).toFixed(1) }}</td>
            <td>{{ Number(item[0].monitoringValue1).toFixed(1) }}</td>
            <td>{{ Number(item[0].originalValue1 - item[0].monitoringValue1 > 0 ? (item[0].originalValue1 - item[0].monitoringValue1) : (item[0].monitoringValue1 - item[0].originalValue1)).toFixed(1) }}</td>
            <td :class="item[0].qualityFlag == true ? '' : 'active'">{{ item[0].qualityFlag == true ? '合格' : '不合格' }}</td>
            <td>{{ Number(item[1].originalValue1).toFixed(1) }}</td>
            <td>{{ Number(item[1].monitoringValue1).toFixed(1) }}</td>
            <td>{{ Number(item[1].originalValue1 - item[1].monitoringValue1 > 0 ? (item[1].originalValue1 - item[1].monitoringValue1) : (item[1].monitoringValue1 - item[1].originalValue1)).toFixed(1) }}</td>
            <td :class="item[1].qualityFlag == true ? '' : 'active'">{{ item[1].qualityFlag == true ? '合格' : '不合格' }}</td>
          </tr>
          </tbody>
        </table>
        <table v-if="pcTitle == 'sl'" width="100%" border="1" style="text-align:center; border-color: #ccc; line-height: 3; border: 1px solid #ccc;"  cellspacing="0" cellpadding="0">
          <thead style="background: #ABC1FE; color: #fff;">
          <tr>
            <td rowspan="2">编号</td>
            <td rowspan="2">复测学生姓名</td>
            <td colspan="3">右眼</td>
            <td colspan="3">左眼</td>
            <td rowspan="2">结果</td>
          </tr>
          <tr>
            <td>测量结果</td>
            <td>复测结果</td>
            <td>差值</td>
            <td>测量结果</td>
            <td>复测结果</td>
            <td>差值</td>
          </tr>
          </thead>
          <tbody v-for="(item, index) in this.qualityProjectList" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.studentName }}</td>
            <td>{{ Number(item.originalValue1).toFixed(1) }}</td>
            <td>{{ Number(item.originalValue1).toFixed(1) }}</td>
            <td>{{ Number(item.originalValue1 - item.monitoringValue1 > 0 ? (item.originalValue1 - item.monitoringValue1) : (item.monitoringValue1 - item.originalValue1)).toFixed(1) }}</td>
            <td>{{ Number(item.originalValue2).toFixed(1) }}</td>
            <td>{{ Number(item.originalValue2).toFixed(1) }}</td>
            <td>{{ Number(item.originalValue2 - item.monitoringValue2 > 0 ? (item.originalValue2 - item.monitoringValue2) : (item.monitoringValue2 - item.originalValue2)).toFixed(1) }}</td>
            <td :class="item.qualityFlag == true ? '' : 'active'">{{ item.qualityFlag == true ? '合格' : '不合格' }}</td>
          </tr>
          </tbody>
        </table>
        <table v-if="pcTitle == 'xss'" width="100%" border="1" style="text-align:center; border-color: #ccc; line-height: 3; border: 1px solid #ccc;"  cellspacing="0" cellpadding="0">
          <thead style="background: #ABC1FE; color: #fff;">
          <tr>
            <td >编号</td>
            <td >采血员</td>
            <td >血样编号</td>
            <td >血红蛋白质g/L</td>
            <td >平行样值g/L</td>
            <td >范围g/L</td>
            <td >是否合格</td>
          </tr>
          </thead>
          <tbody v-for="(item, index) in this.qualityProjectList" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td></td>
            <td></td>
            <td>{{ Number(item.originalValue1).toFixed(1) }}</td>
            <td>{{ Number(item.monitoringValue1).toFixed(1) }}</td>
            <td>{{ Number(item.originalValue1 - item.monitoringValue1 > 0 ? (item.originalValue1 - item.monitoringValue1) : (item.monitoringValue1 - item.originalValue1)).toFixed(1) }}</td>
            <td :class="item.qualityFlag == true ? '' : 'active'">{{ item.qualityFlag == true ? '合格' : '不合格' }}</td>
          </tr>
          </tbody>
        </table>
        <div class="footer">
            <div v-if="pcTitle == 'sgtz'" class="sheight" style="font-size: 12px; margin:16px;">
              <p style="line-height: 16px;">复测学生人数不少于当天受检学生人数的3%；</p><p style="line-height: 16px;">身高测量误差的允许范围是≤0.5cm；体重测量误差的允许范围是≤0.1kg。</p><p style="line-height: 16px;">每天计算P值：</p>
              <p style="margin-left: 0.2rem; line-height: 16px;">
                P=∑n/AN×100%=<i style="font-style:normal; display:inline-block; border-bottom: 1px solid #606266; width: 50px;"></i>
              </p>
              <p style="line-height: 16px; margin-left: 0.2rem"><b style="display:inline-block; font-weight:normal; width: 28%;">P：误差发生率</b><b style=" display:inline-block; font-weight:normal; width: 64%;">∑n：复查数中检测误差超过允许范围的项次数的总和</b><br><b  style="display:inline-block; font-weight:normal; width: 28%;">A：复查指数之和</b><b style="display:inline-block; font-weight:normal; width: 64%;"> &nbsp;&nbsp;N：复查数</b></p>
              <p style="line-height: 20px; ">P值应不超过5%，若5%<P<10%时应查明原因，对超过允许误差范围的指标进行复测加以改正。当P>10%时，则这两项的全部检测数据无效，必须重测。</p>
            </div>
            <div v-show="pcTitle == 'sl'" style="font-size: 12px; margin:0.26rem;">
              <p style="line-height: 20px;">根据检查学生数复测学生数为5-10人；<br>视力测量值与复测值差值的允许范围：±1行。</p>
            </div>
            <div v-show="pcTitle == 'xss'" style="font-size: 12px; margin:0.26rem;">
              <p style="line-height: 20px;">平行样测定数应占当天样本数的5%，<br>前后两次血红蛋白值在T±0.05T以内，则采血员合格。</p>
            </div>
            <p v-if="deviceFlag" style="text-align:right; margin:20px 60px 40px 0px; line-height: 10px; font-size:14px; ">质控员：<i style="font-style:normal; display:inline-block; border-bottom: 1px solid #606266; width: 120px;"></i></p>
          </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="copy">打印</el-button>
        </span>
    </el-dialog>
    <!-- pad表格弹窗 -->
    <div class="pad" v-if="padDialog" @click="padDialog = !padDialog">
      <div class="padDialogs" @click.stop="padDialog = true">
        <header>
          <div>
            <span ><img @click.stop="padDialog = false" src="../../assets/images/backOffs.png" alt=""></span>
            <!-- <span>2019-01-08</span>
            <span>北京市怀柔区第一中学</span>
            <span><i style="font-style:normal;" v-show="padTitle == 'sgtz'">身高体重</i><i style="font-style:normal;" v-show="padTitle == 'sl'">视力</i><i style="font-style:normal;" v-show="padTitle == 'xss'">血色素</i></span> -->
          </div>
          <!-- <p><i>{{ userName }}</i><img src="../../assets/images/username.png" alt=""></p> -->
        </header>
        <div class="content">
          <h1 style="text-align:center; font-size:0.54rem;" v-if="padTitle == 'sgtz'">北京市学生健康体检抽验复测表——身高体重</h1>
          <h1 style="text-align:center; font-size:0.54rem;" v-if="padTitle == 'sl'">北京市学生健康体检抽验复测表——视力</h1>
          <h1 style="text-align:center; font-size:0.54rem;" v-if="padTitle == 'xss'">北京市学生健康体检抽验复测表——血红蛋白</h1>
          <ul style=" margin: 0.2rem 0 0.2rem 0; font-size:0.36rem;">
            <li style="display:inline-block; width:48%; text-align:left; line-height:2;">体检单位：<span>北京市怀柔区中小学卫生保健所</span></li><li style="display:inline-block; width:50%; text-align:left; line-height:2;">学校名称：<span>{{qualityUserInfo.xxmc}}</span></li>
            <li style="display:inline-block; width:48%; text-align:left; line-height:2;">体检日期： <span>{{qualityUserInfo.date | dateFormat('yyyy'+'年'+'MM'+'月'+'dd'+'日') }}</span></li><li style="display:inline-block; width:44%; text-align:left; line-height:2;">当天体检人数：<span>{{ groupProjectList.examNum }}</span>人</li>
          </ul>
          <!-- 身高体重 -->
          <table v-if="padTitle == 'sgtz'" width="100%" border="1" style="text-align:center; border-color: #ccc; line-height: 3; border: 1 solid #ccc; font-size: 0.36rem; "  cellspacing="0" cellpadding="0">
            <thead style="background: #ABC1FE; color: #fff;">
            <tr>
              <td rowspan="2">编号</td>
              <td rowspan="2">复测学生姓名</td>
              <td colspan="3">身高（cm）</td>
              <td rowspan="2">结果</td>
              <td colspan="3">体重（kg）</td>
              <td rowspan="2">结果</td>
            </tr>
            <tr>
              <td>测量结果</td>
              <td>复测结果</td>
              <td>差值</td>
              <td>测量结果</td>
              <td>复测结果</td>
              <td>差值</td>
            </tr>
            </thead>
            <tbody v-for="(item, index) in qualityProjectList" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item[0].studentName }}</td>
              <td>{{ Number(item[0].originalValue1).toFixed(1) }}</td>
              <td>{{ Number(item[0].monitoringValue1).toFixed(1) }}</td>
              <td>{{ Number(item[0].originalValue1 - item[0].monitoringValue1 > 0 ? (item[0].originalValue1 - item[0].monitoringValue1) : (item[0].monitoringValue1 - item[0].originalValue1)).toFixed(1) }}</td>
              <td :class="item[0].qualityFlag == true ? '' : 'active'">{{ item[0].qualityFlag == true ? '合格' : '不合格' }}</td>
              <td>{{ Number(item[1].originalValue1).toFixed(1) }}</td>
              <td>{{ Number(item[1].monitoringValue1).toFixed(1) }}</td>
              <td>{{ Number(item[1].originalValue1 - item[1].monitoringValue1 > 0 ? (item[1].originalValue1 - item[1].monitoringValue1) : (item[1].monitoringValue1 - item[1].originalValue1)).toFixed(1) }}</td>
              <td :class="item[1].qualityFlag == true ? '' : 'active'">{{ item[1].qualityFlag == true ? '合格' : '不合格' }}</td>
            </tr>
            </tbody>
          </table>
          <!-- 视力 -->
          <table v-if="padTitle == 'sl'" width="100%" border="1" style="text-align:center; border-color: #ccc; line-height: 3; border: 1px solid #ccc; font-size: 0.36rem; "  cellspacing="0" cellpadding="0">
            <thead style="background: #ABC1FE; color: #fff;">
            <tr>
              <td rowspan="2">编号</td>
              <td rowspan="2">复测学生姓名</td>
              <td colspan="3">右眼</td>
              <td colspan="3">左眼</td>
              <td rowspan="2">结果</td>
            </tr>
            <tr>
              <td>测量结果</td>
              <td>复测结果</td>
              <td>差值</td>
              <td>测量结果</td>
              <td>复测结果</td>
              <td>差值</td>
            </tr>
            </thead>
            <tbody v-for="(item, index) in this.qualityProjectList" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item.studentName }}</td>
              <td>{{ Number(item.originalValue1).toFixed(1) }}</td>
              <td>{{ Number(item.monitoringValue1).toFixed(1) }}</td>
              <td>{{ Number(item.originalValue1 - item.monitoringValue1 > 0 ? (item.originalValue1 - item.monitoringValue1) : (item.monitoringValue1 - item.originalValue1)).toFixed(1) }}</td>
              <td>{{ Number(item.originalValue2).toFixed(1) }}</td>
              <td>{{ Number(item.monitoringValue2).toFixed(1) }}</td>
              <td>{{ Number(item.originalValue2 - item.monitoringValue2 > 0 ? (item.originalValue2 - item.monitoringValue2) : (item.monitoringValue2 - item.originalValue2)).toFixed(1) }}</td>
              <td :class="item.qualityFlag == true ? '' : 'active'">{{ item.qualityFlag == true ? '合格' : '不合格' }}</td>
            </tr>
            </tbody>
          </table>
          <!-- 血色素 -->
          <table v-if="padTitle == 'xss'" width="100%" border="1" style="text-align:center; border-color: #ccc; line-height: 3; border: 1px solid #ccc; font-size: 0.36rem; "  cellspacing="0" cellpadding="0">
            <thead style="background: #ABC1FE; color: #fff;">
              <tr>
                <td >编号</td>
                <td >采血员</td>
                <td >血样编号</td>
                <td >血红蛋白质g/L</td>
                <td >平行样值g/L</td>
                <td >范围g/L</td>
                <td >是否合格</td>
              </tr>
            </thead>
            <tbody v-for="(item, index) in this.qualityProjectList" :key="index">
              <tr>
                <td>{{ index + 1 }}</td>
                <td></td>
                <td></td>
                <td>{{ item.originalValue1 }}</td>
                <td>{{ item.monitoringValue1 }}</td>
                <td>{{ item.originalValue1 - item.monitoringValue1 > 0 ? (item.originalValue1 - item.monitoringValue1) : (item.monitoringValue1 - item.originalValue1) }}</td>
                <td :class="item.qualityFlag == true ? '' : 'active'">{{ item.qualityFlag == true ? '合格' : '不合格' }}</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <div v-if="padTitle == 'sgtz'" class="sheight" style="font-size: 0.38rem; margin:0.26rem; color: #000;">
              <p style="line-height: 0.63rem;">复测学生人数不少于当天受检学生人数的3%；<br>身高测量误差的允许范围是≤0.5cm；体重测量误差的允许范围是≤0.1kg。<br>每天计算P值：</p>
              <p style="margin-left: 0.2rem; line-height: 0.5rem;">
                P=∑n/AN×100%=<i style="font-style:normal; display:inline-block; border-bottom: 1px solid #000; width: 1.2rem;"></i>
              </p>
              <p style="line-height: 0.63rem; margin-left: 0.2rem"><b style="display:inline-block; font-weight:normal; width: 28%;">P：误差发生率</b><b style=" display:inline-block; font-weight:normal; width: 64%;">∑n：复查数中检测误差超过允许范围的项次数的总和</b><br><b  style="display:inline-block; font-weight:normal; width: 28%;">A：复查指数之和</b><b style="display:inline-block; font-weight:normal; width: 64%;"> &nbsp;&nbsp;N：复查数</b></p>
              <p style="line-height: 0.63rem; ">P值应不超过5%，若5%<P<10%时应查明原因，对超过允许误差范围的指标进行复测加以改正。当P>10%时，则这两项的全部检测数据无效，必须重测。</p>
            </div>
            <div v-show="padTitle == 'sl'" style="font-size: 0.38rem; margin:0.26rem; color: #000;">
              <p style="line-height: 0.63rem;">根据检查学生数复测学生数为5-10人；<br>视力测量值与复测值差值的允许范围：±1行。</p>
            </div>
            <div v-show="padTitle == 'xss'" style="font-size: 0.38rem; margin:0.26rem; color: #000;">
              <p style="line-height: 0.63rem;">平行样测定数应占当天样本数的5%，<br>前后两次血红蛋白值在T±0.05T以内，则采血员合格。</p>
            </div>
            <p v-if="deviceFlag == false" style="text-align:right; margin:0.4rem 0.6rem 0.6rem 0; line-height: 0.5rem; font-size:0.36rem; color:#4A4A4A; ">质控员：<i style="font-style:normal; display:inline-block; border-bottom: 1px solid #000; width: 1.8rem;"></i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-Manage',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      restaurants: [],
      pageNo: 1,
      school: '',
      schools: [],
      canSave: true,
      grades: [],
      action: '',
      grade: '',
      classa: '',
      classas: [],
      loading: false,
      result: '',
      pcDialog: false,
      tableData: [],
      tableDataHandle: [],
      groupProjectList: [],
      qualityLists: [],
      showLoading: true,
      busy: false,
      qualityUserInfo: '',
      qualityProjectList: '',
      qualityTime: '',
      options: [],
      item: '',
      userName: '',
      userPath: '',
      keyword: '',
      input: '',
      totalCount: 0,
      state: true,
      pageSize: 10,
      currentPage: 1,
      deviceFlag: true,
      padDialog: false,
      moreFalg: false,
      is_r: false,
      pcTitle: ''
    }
  },
  methods: {
    // 识别设备
    device () {
      let ua = navigator.userAgent
      let isWindowsPhone = /(?:Windows Phone)/.test(ua)
      let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
      let isAndroid = /(?:Android)/.test(ua)
      let isFireFox = /(?:Firefox)/.test(ua)
      // let isChrome = /(?:Chrome|CriOS)/.test(ua)
      let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
      let isPhone = /(?:iPhone)/.test(ua) && !isTablet
      let isPc = !isPhone && !isAndroid && !isSymbian
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
      }
    },
    // 分辨率处理
    getRem (pwidth, prem) {
      var html = document.getElementsByTagName('html')[0]
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth
      html.style.fontSize = oWidth / pwidth * prem + 'px'
    },
    // 返回上一级
    backOff () {
      this.$router.go(-1)
    },
    logout () {
      // this.$store.dispatch('logout')
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
    },
    copy () {
      let newWindow = window.open('打印窗口', '_blank')
      let docStr = document.querySelectorAll('.cop')[0].innerHTML
      newWindow.document.write(docStr)
      newWindow.document.close()
      newWindow.print()
    },
    async getXss (val, data) {
      this.groupProjectList = await this.$store.dispatch('groupProject', {projectId: val, groupId: data.id})
      this.qualityUserInfo = this.groupProjectList.qualityGroupDto
      this.qualityProjectList = this.groupProjectList.projectList
      this.pcTitle = val
      this.padTitle = val
      this.deviceFlag === true ? this.pcDialog = true : this.pcDialog = false
      this.deviceFlag === false ? this.padDialog = true : this.padDialog = false
    },
    async getAllDown (val, data) {
      this.groupProjectList = await this.$store.dispatch('groupProject', {projectId: val, groupId: data.id})
      this.qualityUserInfo = this.groupProjectList.qualityGroupDto
      let map = {}
      let dest = []
      this.groupProjectList.projectList.forEach((item, index) => {
        if (!map[item.studentId]) {
          var arr = []
          arr.push(item)
          dest.push(arr)
          map[item.studentId] = item
        } else {
          dest.forEach((value, ind) => {
            if (value[0].studentId === item.studentId) {
              value.push(item)
            }
          })
        }
      })
      this.qualityProjectList = dest
      this.pcTitle = val
      this.padTitle = val
      this.deviceFlag === true ? this.pcDialog = true : this.pcDialog = false
      this.deviceFlag === false ? this.padDialog = true : this.padDialog = false
    },
    async getNewAllDown (val, data) {
      this.groupProjectList = await this.$store.dispatch('groupProject', {projectId: val, groupId: data.id})
      this.qualityUserInfo = this.groupProjectList.qualityGroupDto
      this.qualityProjectList = this.groupProjectList.projectList
      this.pcTitle = val
      this.padTitle = val
      this.deviceFlag === true ? this.pcDialog = true : this.pcDialog = false
      this.deviceFlag === false ? this.padDialog = true : this.padDialog = false
    },
    handleClose () {
      this.pcDialog = false
    },
    padHandleClose () {
      this.padDialog = false
    },
    async handleCurrentChange (item) {
      if (this.deviceFlag === false) {
        this.tableData = await this.$store.dispatch('groupList', {
          pageNo: item,
          pageSize: '7'})
        this.totalCount = this.tableData.totalCount
        this.pageSize = this.tableData.pageSize
      } else {
        this.tableData = await this.$store.dispatch('groupList', {
          pageNo: item,
          pageSize: this.pageSize })
        this.totalCount = this.tableData.totalCount
        this.pageSize = this.tableData.pageSize
      }
      // this.tableDataHandle = this.tableData.list
    },
    async schoolList () {
      this.schools = await this.$store.dispatch('schoolList')
    },
    // 获取质检员列表
    async getQualityList () {
      let qualityUser = await this.$store.dispatch('qualityList', {pageNo: '1', pageSize: '1000'})
      this.qualityLists = qualityUser.list
    },
    // 获取全部质检小组
    async groupList () {
      if (this.deviceFlag === false) {
        this.tableData = await this.$store.dispatch('groupList', {
          date: this.qualityTime,
          xxdm: this.school,
          userId: this.classa,
          pageNo: '1',
          pageSize: '7'})
        this.totalCount = this.tableData.totalCount
        this.pageSize = this.tableData.pageSize
      } else {
        this.tableData = await this.$store.dispatch('groupList', {
          date: this.qualityTime,
          xxdm: this.school,
          userId: this.classa,
          pageNo: '1',
          pageSize: '12'})
        this.totalCount = this.tableData.totalCount
        this.pageSize = this.tableData.pageSize
      }
    }
  },
  mounted () {
    this.groupList()
    var path = document.getElementById('contextPath').value
    this.action = `${path}/cmis/importStudent`
    this.device().isTablet === true ? this.deviceFlag = false : this.deviceFlag = true
    let dom = document.querySelector('.con')
    dom.addEventListener('scroll', () => {
      const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
      if (scrollDistance < 0 || scrollDistance === 0) {
        if (this.pageNo < this.tableData.totalPage) {
          this.moreFalg = true
          this.pageNo++
          this.$store.dispatch('groupList', {
            pageNo: this.pageNo,
            pageSize: '7'})
            .then((res) => {
              if (res) {
                this.tableData.list = this.tableData.list.concat(res.list)
                this.moreFalg = false
              } else {
                this.$message({
                  message: '加载中',
                  type: 'warning'
                })
              }
            })
            .catch(() => {
              this.$message.error('加载失败')
            })
          this.totalCount = this.tableData.totalCount
          this.pageSize = this.tableData.pageSize
        } else {
          this.$message({
            message: '已经加载到最后一页',
            type: 'warning'
          })
        }
      }
    })
  },
  watch: {
    input () {
      this.pageNo = 1
    }
  },
  async created () {
    if (this.device().isTablet) {
      this.deviceFlag = false
      this.getRem(1920, 100)
    } else {
      this.deviceFlag = true
    }
    await this.schoolList()
    await this.getQualityList()
    if (this.$store.state.user.name) {
      this.userName = this.$store.state.user.name
    }
    if (this.$store.state.user.face) {
      this.userPath = await this.$store.dispatch('getUserFace', {
        userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
      })
    }
    this.loading = true
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
  .test-Manage {
    .el-button.is-disabled:focus, .el-button.is-disabled:hover {
      color: #fff !important;
    }
    .headers {
      height: 80px;
      line-height: 80px;
      background: #6B92FE;
      color: #fff;
      &>.el-row {
        .el-col:nth-child(1) {
          padding-left: 40px;
          font-size: 24px;
          img {
            width: 50px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        .el-col:nth-child(2) {
          span {
            font-size: 15px;
          }
          padding-right: 40px;
          text-align: right;
          .el-dropdown-link{
            cursor: pointer;
            display: inline-block;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #96BBF8;
            color: #fff;
            text-align: center;
            line-height: 36px;
            vertical-align: middle;
            img{
              width: 36px;
              height: 36px;
              border-radius: 50%;
              vertical-align: middle;
              cursor: pointer;
            }
          }
        }
      }
    }
    .header {
      height: 1.44rem;
      line-height: 1.44rem;
      background: #6B92FE;
      color: #fff;
      &>.el-row {
        .el-col:nth-child(1) {
          padding-left: 0.4rem;
          font-size: 0.54rem;
          img {
            width: 0.7rem;
            vertical-align: middle;
            margin-right: 0.1rem;
          }
        }
        .el-col:nth-child(2) {
          span {
            font-size: 0.42rem;
          }
          padding-right: 0.4rem;
          text-align: right;
          .el-dropdown-link{
            cursor: pointer;
            display: inline-block;
            width: 1.02rem;
            height: 1.02rem;
            border-radius: 50%;
            background: #96BBF8;
            color: #fff;
            text-align: center;
            line-height: 1.02rem;
            // vertical-align: middle;
            img{
              width: 1.02rem;
              height: 1.02rem;
              border-radius: 50%;
              vertical-align: middle;
              cursor: pointer;
            }
          }
        }
      }
    .content {
      height: calc(100vh - 0px);
    }
  }
  .content {
    .top {
       @extend .clearfix;
      li {
        float: left;
        height: 36px;
        line-height: 36px;
        margin-bottom: 15px;
        &:last-child {
          margin-left: 20px;
        }
        &:nth-child(3) {
          margin-left: 20px;
        }
        &:last-child {
          margin-left: 20px;
        }
        .el-radio+.el-radio {
          margin-right: 40px;
        }
        .el-button {
          padding: 10px 25px;
          background: #73D586;
          color: #fff;
          border-color: #73D586;
        }
        .el-input {
          margin-right: 20px;
        }
        .el-select>.el-input {
          margin-right: 20px;
        }
        .el-input__inner {
          height: 33px;
          line-height: 33px;
        }
        .el-input__icon {
          line-height: 0;
        }
      }
    }
    background: #EAEFF8;
    padding: 20px 40px;
    border-radius: 4px;
    box-sizing: border-box;
    .el-pagination {
      width: 100%;
      margin-left: 50%;
      margin-top: 0;
      margin-bottom: 10px;
      padding: 20px 0 20px;
      transform: translateX(-50%);
      background: #fff;
    }

    .el-table {
      margin-top: 20px;
      min-height: 410px;
    }
    .el-table::before {
      display: none;
    }
    .el-table td {
      padding-top: 14px;
      padding-bottom: 14px;
      color: #666;
      &:last-child {
          div {
            .el-button {
            float: left;
            padding: 8px 14px;
            margin-left: 10px;
            color: #fff;
            &.primary {
              background: #6E94FF;
              border-color: #6E94FF;
            }
            &.warning {
              background-color: #e6a23c;
              border-color: #e6a23c;
            }
            &.danger {
              background-color: #f56c6c;
              border-color: #f56c6c;
            }
          }
        }
      }
    }
    .el-table th.is-leaf {
      border: none !important;
      padding-top: 10px;
      padding-bottom: 10px;
    }
      .el-table .head  {
        background: #ABC1FE;
      }
      .el-table__body {
        .lin {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          display: inline-block;
          color: #fff;
          background: #73D586;
          border-radius: 100%;
          font-style: normal;
        }
        tr {
          &:hover {
            td {
              &:first-child {
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
              }
              &:nth-child(8){
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              }
            }
          }
        }
      }
      .el-table__header {
        margin-bottom: 20px;
        tr {
          border-radius: 4px;
          th {
            &:first-child {
              border-top-left-radius: 8px;
              border-bottom-left-radius: 8px;
            }
            &:nth-child(8){
              border-top-right-radius: 8px;
              border-bottom-right-radius: 8px;
            }
          }
        }
      }
  }
  // pad样式
  .contentpad {
    ::-webkit-scrollbar {/*隐藏滚轮*/
    width: 0.1rem;
    }
    .top {
      height: 1.2rem;
       @extend .clearfix;
      li {
        float: left;
        height: 0.36rem;
        line-height: 0.36rem;
        margin-top: 0.14rem;
        margin-left: 0.24rem;
        &:first-child {
          width: 4rem;
          .el-date-editor {
            width: 100%;
          }
        }
        &:nth-child(2) {
          width: 7rem;
          .el-select {
            width: 100%;
          }
          .checkTimes {
            .el-date-table {
              font-size: 0.36rem !important;
            }
          }
        }
        &:nth-child(3) {
          width: 4rem;
          margin-left: 0.24rem;
        }
        &:last-child {
          margin-left: 1rem;
          .el-button {
            padding: 0.15rem 0.3rem;
            background: #73D586;
            color: #fff;
            font-size: 0.4rem;
            border-color: #73D586;
          }
        }
        .el-date-table {
            font-size: 0.36rem !important;
          }
        .el-input {
          margin-right: 0.2rem;
          height: 0.8rem;
        }
        .el-select>.el-input {
          margin-right: 0.2rem;
        }
        .el-input__inner {
          height: 0.8rem;
          font-size: 0.36rem;
          line-height: 0.8rem;
        }
        .el-input__icon {
          line-height: 0.4rem;
        }
        ::-webkit-input-placeholder {
          font-size: 0.36rem;
        }
      }
    }
    background: #EAEFF8;
    // padding: 0.2rem 0.4rem;
    height: calc(100vh - 1.5rem);
    border-radius: 0.04rem;
    box-sizing: border-box;
    .el-pagination {
      margin-left: 50%;
      margin-top: 0.3rem;
      transform: translateX(-50%);
    }
    .middle {
      display: flex;
      flex-direction: column;
      // height: 8.38rem;
      .title {
        width: 100%;
        height: 1.24rem;
        line-height: 1.24rem;
        background: #6B92FE;
        span {
          font-size: 0.44rem;
          color: #fff;
          margin-left: 0.34rem;
          &:nth-child(2) {
            margin-left: 1rem;
          }
          &:nth-child(3) {
            margin-left: 3rem;
          }
          &:last-child {
            margin-left: 0.7rem;
          }
        }
      }
      .con {
        flex: 1;
        overflow: auto;
        height: 7.14rem;
        >li {
          height: 1.2rem;
          line-height: 1.2rem;
          padding-left: 0.34rem;
          // &:hover {
          //   background: #ccc;
          //   opacity: 0.5;
          // }
          span {
            display: inline-block;
            font-size: 0.34rem;
            &:nth-child(2) {
              width: 5.2rem;
              margin-left: 0.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: top;
            }
            &:nth-child(3) {
              width:1.8rem;
            }
            .el-button {
              padding: 9px 5px;
              margin-left: 0.2rem;
              color: #fff;
              &.primary {
                background: #6E94FF;
                border-color: #6E94FF;
              }
              &.warning {
                background-color: #e6a23c;
                border-color: #e6a23c;
              }
              &.danger {
                background-color: #f56c6c;
                border-color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }
  .active {
    color: #f56c6c;
  }
  .addDia {
    .dialog-footer {
      .el-button {
        color: #fff;
        font-size: 24px;
        &:first-child {
          background: #74D486;
          border-color: #74D486;
        }
        &:nth-child(2) {
          background: #6B87FD;
          border-color: #6B87FD;
        }
      }
    }
  }
  .pad {
    overflow-y: scroll;
    ::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
      }
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // opacity: 0.5;
    background: #73D586;
    background: rgba(0, 0, 0, 0.5);
    overflow: auto;
    z-index: 9999 !important;
    .padDialogs {
      ::-webkit-scrollbar {/*隐藏滚轮*/
        display: none;
        }
      overflow-y: scroll;
      position: absolute;
      left: 0; right:  0;
      top: 0; bottom: 0;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      min-height: 9rem;
      opacity: 1 ;
      background:#fff;
      z-index: 999;
    header {
      position: fixed;
      right: 0.5rem;
      top:0.2rem;
      height: 1.44rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.54rem;
      z-index:999;
        div {
          display: flex;
          span {
            display: flex;
            height: 1.44rem;
            align-items: center;
            img {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            line-height: 1.44rem;
            }
          }
          // span:nth-child(1) {
          //   width: 1.44rem;
          //   display: flex;
          //   justify-content: center;
          //   align-items: center;
          // }
        }
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.45rem;
          i {
            font-style: normal;
            font-size: 0.42rem;
          }
          img {
            display: inline-block;
            background: #fff;
            width: 1.02rem;
            height: 1.02rem;
            margin-left: 0.2rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
.el-date-picker {
  .el-picker-panel__icon-btn {
    font-size: 0.34rem;
  }
  .el-date-picker__header-label {
    font-size: 0.36rem;
  }
  table {
    font-size: 0.36rem;
  }
}
</style>
<style scoped>
.spinner {
  position: absolute;
  left: 0;
  top: 3.86rem;
  width: 100%;
  opacity: 0.8;
}
.spinnerCon {
  margin: 100px auto;
  width: 1rem;
  height: 1rem;
  position: relative;
}
.container1 > div, .container2 > div, .container3 > div {
  width: 0.2rem;
  height: 0.2rem;
  background-color: rgb(20, 20, 18);
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.spinnerCon .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
