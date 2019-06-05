<template>
  <div class='data-analysis-individuation'>
    <div class="top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="预警报表" name="first">
          <ul>
            <li>
              <span>
                  学年：
              </span>
              <el-select v-model="schoolYearValue"  filterable placeholder="请选择">
                <el-option
                  v-for="item in schoolYearOptions"
                  :key="item.xn"
                  :label="item.name"
                  :value="item.xn">
                </el-option>
              </el-select>
            </li>
            <li class="schoolLi">
              <span>学校：</span>
              <el-select v-model="school" :disabled="false" filterable placeholder="请选择">
                <el-option
                  v-for="item in schools"
                  :key="item.xxdm"
                  :label="item.xxmc"
                  :value="item.xxdm">
                </el-option>
              </el-select>
            </li>
          </ul>
          <el-button @click="firstDown" :disabled="!flag"><img src="../../assets/img/btn_downloads.png">下载</el-button>
          <el-button icon="el-icon-search" @click="firstSearch">查询</el-button>
        </el-tab-pane>
        <el-tab-pane label="健促校督导报表" name="second">
            <ul>
                <li>
                  <span>
                      学年：
                  </span>
                  <el-select v-model="schoolYearValue" filterable placeholder="请选择">
                    <el-option
                      v-for="item in schoolYearOptions"
                      :key="item.xn"
                      :label="item.name"
                      :value="item.xn">
                    </el-option>
                  </el-select>
                </li>
                <li class="schoolLi">
                  <span>学校：</span>
                  <el-select v-model="school" size="small" filterable :disabled="!global" placeholder="请选择">
                    <el-option
                      v-for="item in schools"
                      :key="item.xxdm"
                      :label="item.xxmc"
                      :value="item.xxdm">
                    </el-option>
                  </el-select>
                </li>
              </ul>
              <el-button :disabled="!flag" @click="secondDown"><img src="../../assets/img/btn_downloads.png">下载</el-button>
              <el-button icon="el-icon-search" @click="secondSearch">查询</el-button>
        </el-tab-pane>
        <el-tab-pane label="视力新发率" name="third">
            <ul>
                <li class="schoolLi">
                  <span>学校：</span>
                  <el-select size="small" :disabled="!global" v-model="school" filterable placeholder="请选择">
                    <el-option
                      v-for="item in schools"
                      :key="item.xxdm"
                      :label="item.xxmc"
                      :value="item.xxdm">
                    </el-option>
                  </el-select>
                </li>
              </ul>
              <el-button :disabled="!flag" @click="thirdDown"><img src="../../assets/img/btn_downloads.png">下载</el-button>
              <el-button icon="el-icon-search" @click="searchEyesight">查询</el-button>
        </el-tab-pane>
        <el-tab-pane label="全学段健康评价" name="fourth">
          <div class="head">
            <h2>分析对象选择：</h2>
            <ul>
              <li class="schoolLi">
                <span>学校:</span>
                <el-select size="small" v-model="school" :disabled="!global" filterable placeholder="请选择" @change="gradeList">
                  <el-option
                    v-for="item in schools"
                    :key="item.xxdm"
                    :label="item.xxmc"
                    :value="item.xxdm">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>年级:</span>
                <el-select v-model="grade" placeholder="请选择" @change="classList">
                    <el-option
                      v-for="item in grades"
                      :key="item.njid"
                      :label="item.njmc"
                      :value="item.njid">
                    </el-option>
                  </el-select>
              </li>
              <li>
                <span>班级:</span>
                <el-select v-model="classa" placeholder="请选择">
                    <el-option
                      v-for="item in classas"
                      :key="item.bjid"
                      :label="item.bjmc"
                      :value="item.bjid">
                    </el-option>
                  </el-select>
              </li>
              <el-button icon="el-icon-search" class="sear" @click="getSearch">查询</el-button>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="慢性病报表" name="fifth">
            <ul>
                <li>
                  <span>
                      学年：
                  </span>
                  <el-select  v-model="schoolYearValue" filterable placeholder="请选择">
                    <el-option
                      v-for="item in schoolYearOptions"
                      :key="item.xn"
                      :label="item.name"
                      :value="item.xn">
                    </el-option>
                  </el-select>
                </li>
                <li class="schoolLi">
                  <span>学校：</span>
                  <el-select size="small" v-model="school" :disabled="!global" filterable placeholder="请选择">
                    <el-option
                      v-for="item in schools"
                      :key="item.xxdm"
                      :label="item.xxmc"
                      :value="item.xxdm">
                    </el-option>
                  </el-select>
                </li>
              </ul>
              <el-button @click="fifthDown" :disabled="!flag"><img src="../../assets/img/btn_downloads.png">下载</el-button>
              <el-button icon="el-icon-search" @click="fifthSearch">查询</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom">
      <div class="first" v-if="activeName === 'first'">
        <el-tabs v-model="select" @tab-click="firstClick">
            <el-tab-pane label="肥胖预警报表" name="one"></el-tab-pane>
            <el-tab-pane label="视力不良预警报表" name="two"></el-tab-pane>
            <el-tab-pane label="低体重营养不良预警报表" name="three"></el-tab-pane>
        </el-tabs>
        <div class="content" v-loading="tloading">
          <div class="box">
            <el-button v-for="(item, index) in list" :key="index" @click="activeIndex = index" :class="{'active': index === activeIndex}">{{item}}</el-button>
          </div>
          <table border="1" v-if="activeIndex === 0" class="table-box">
            <tr>
              <th :colspan="firstable.length !== 0 ? firstable.length + 1 : 2" v-if="select === 'one'">肥胖{{list[activeIndex]}}预警</th>
              <th :colspan="firstable.length !== 0 ? firstable.length + 1 : 2" v-if="select === 'two'">视力不良{{list[activeIndex]}}预警</th>
              <th :colspan="firstable.length !== 0 ? firstable.length + 1 : 2" v-if="select === 'three'">低体重营养不良{{list[activeIndex]}}预警</th>
            </tr>
            <tr>
              <th :colspan="firstable.length !== 0 ? firstable.length : 1">学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
              <th>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
            </tr>
            <tr>
              <th>项目</th>
              <th v-if="firstable.length === 0"></th>
              <th v-for="(m, i) in firstable" :key="i">{{m.key}}</th>
            </tr>
            <tr>
              <td>上一年度本校<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>检出率</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i">{{m.percentageLast ? m.percentageLast : ''}}</td>
            </tr>
            <tr>
              <td>本年度本校<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>检出率</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i">{{m.percentage ? m.percentage : ''}}</td>
            </tr>
            <tr>
              <td>本校<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>增长率</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i">{{m.growthRate ? m.growthRate : ''}}</td>
            </tr>
            <tr>
              <td>预警等级</td>
              <td v-for="(m, i) in firstable" :key="i" :class="{yellow: m.grade && m.grade.indexOf('Ⅰ') > 0, orange: m.grade && m.grade.indexOf('Ⅱ') > 0, red: m.grade && m.grade.indexOf('Ⅲ') > 0}">{{m.grade ? m.grade : ''}}</td>
              <td v-if="firstable.length === 0"></td>
            </tr>
          </table>
          <table border="1" v-if="activeIndex === 1" class="table-box">
            <tr>
              <th :colspan="firstable.length !== 0 ? firstable.length + 1 : 2" v-if="select === 'one'">肥胖{{list[activeIndex]}}预警</th>
              <th :colspan="firstable.length !== 0 ? firstable.length + 1 : 2" v-if="select === 'two'">视力不良{{list[activeIndex]}}预警</th>
              <th :colspan="firstable.length !== 0 ? firstable.length + 1 : 2" v-if="select === 'three'">低体重营养不良{{list[activeIndex]}}预警</th>
            </tr>
            <tr>
              <th :colspan="firstable.length !== 0 ? firstable.length : 1">学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
              <th>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
            </tr>
            <tr>
              <th>项目</th>
              <th v-for="(m, i) in firstable" :key="i">{{m.key}}</th>
              <th v-if="firstable.length === 0"></th>
            </tr>
            <tr>
              <td>上一年度本年级<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>检出率</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i">{{m.percentageLast ? m.percentageLast : ''}}</td>
            </tr>
            <tr>
              <td>本年度本年级<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>检出率</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i">{{m.percentage ? m.percentage : ''}}</td>
            </tr>
            <tr>
              <td>本年级<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>增长率</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i">{{m.growthRate ? m.growthRate : ''}}</td>
            </tr>
            <tr>
              <td>预警等级</td>
              <td v-if="firstable.length === 0"></td>
              <td v-for="(m, i) in firstable" :key="i" :class="{yellow: m.grade && m.grade.indexOf('Ⅰ') > 0, orange:m.grade &&  m.grade.indexOf('Ⅱ') > 0, red: m.grade && m.grade.indexOf('Ⅲ') > 0}">{{m.grade ? m.grade : ''}}</td>
            </tr>
          </table>
          <!-- <div class="tableBox" v-if="activeIndex === 2 && activeName === 'first'"> -->
          <table border="1" v-if="activeIndex === 2 && activeName === 'first'" class="moreTable">
            <thead>
              <tr>
                <span v-if="select === 'one'">肥胖{{list[activeIndex]}}预警</span>
                <span v-if="select === 'two'">视力不良{{list[activeIndex]}}预警</span>
                <span v-if="select === 'three'">低体重营养不良{{list[activeIndex]}}预警</span>
              </tr>
              <tr>
                <span>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</span>
                <span>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</span>
              </tr>
            </thead>
            <tbody style="width: 100%;">
              <tr class="li-list">
                <th>项目</th>
                <th v-for="(m, i) in firstable" :key="i">{{m.key}}</th>
                <th v-if="firstable.length === 0"></th>
              </tr>
              <tr>
                <td>上一年度本班级<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>检出率</td>
                <td v-if="firstable.length === 0"></td>
                <td v-for="(m, i) in firstable" :key="i">{{m.percentageLast ? m.percentageLast : ''}}</td>
              </tr>
              <tr>
                <td>本年度本班级<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>检出率</td>
                <td v-if="firstable.length === 0"></td>
                <td v-for="(m, i) in firstable" :key="i">{{m.percentage ? m.percentage : ''}}</td>
              </tr>
              <tr>
                <td>本班级<span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">视力不良</span><span v-if="select === 'three'">低体重营养不良</span>增长率</td>
                <td v-if="firstable.length === 0"></td>
                <td v-for="(m, i) in firstable" :key="i">{{m.growthRate ? m.growthRate : ''}}</td>
              </tr>
              <tr>
                <td>预警等级</td>
                <td v-if="firstable.length === 0"></td>
                <td v-for="(m, i) in firstable" :key="i" :class="{yellow: m.grade && m.grade.indexOf('Ⅰ') > 0, orange: m.grade && m.grade.indexOf('Ⅱ') > 0, red: m.grade && m.grade.indexOf('Ⅲ') > 0}">{{m.grade ? m.grade : ''}}</td>
              </tr>
            </tbody>
          </table>
          <!-- </div> -->
          <div v-for="(elem, ind) in firstable" :key="ind" style="display: flex;justify-content: flex-start;margin-bottom: 10px;">
            <p class="tip" style="width: 92px" >{{'*' + elem.key + '：'}}</p>
            <div style="width: 100%;">
              <span class="tip" style="width:80px; margin-left: 18px;">上一年度：</span>
              <p>
              <span style="margin-right: 10px; color: #999999;" v-for="(item, index) in dataStateLast" :key="index" v-if="firstable.length && elem[item.data]">
                {{ item.label + elem[item.data] }}
              </span>
              </p>
              <span class="tip" style="width:80px; margin-left: 18px;">本年度：</span>
              <p style="margin-left: 18px;">
              <span style="margin-right: 10px; color: #999999;" v-for="(item, index) in dataState" :key="index" v-if="firstable.length && elem[item.data]">
                {{ item.label + elem[item.data] }}
              </span>
              </p>
            </div>
          </div>
          <span class="tip">*预警说明：</span>
          <ul class="tips">
            <li>Ⅰ级：增长幅度在0.5-1.0百分点以内，黄色预警</li>
            <li>Ⅱ级：增长幅度在1.0-1.5百分点以内，橙色预警</li>
            <li>Ⅲ级：增长幅度在1.5百分点以上，红色预警</li>
          </ul>
        </div>
      </div>
      <div class="second" v-if="activeName === 'second'">
        <el-tabs v-model="superName" @tab-click="secondClick" v-loading="tloading">
          <el-tab-pane label="肥胖分级预警" name="fp">
              <table border="1" class="table-box">
                  <tr>
                    <th colspan="2">肥胖预警报表</th>
                  </tr>
                  <tr>
                    <th>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                    <th>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
                  </tr>
                  <tr>
                    <th>项目</th>
                    <th v-for="(item, index) in onetable" :key="index">{{ item.key }}</th>
                    <th v-if="!onetable.length">校级预警</th>
                  </tr>
                  <tr>
                    <td>上一年度肥胖检出率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.percentageLast ? item.percentageLast : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
                  <tr>
                    <td>本度肥胖检出率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.percentage ? item.percentage : ''}}</td>
                    <td v-if="!onetable.length"></td>

                    <!--<td>{{onetable.percentage ? onetable.percentage : ''}}</td>-->
                  </tr>
                  <tr>
                    <td>增长率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.growthRate ? item.growthRate : ''}}</td>
                    <td v-if="!onetable.length"></td>

                    <!--<td>{{onetable.growthRate ? onetable.growthRate : ''}}</td>-->
                  </tr>
                  <tr>
                    <td>预警等级</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.grade ? item.grade : ''}}</td>
                    <td v-if="!onetable.length"></td>
                    <!--<td>{{onetable.grade ? onetable.grade : ''}}</td>-->
                  </tr>
              </table>
          </el-tab-pane>
          <el-tab-pane label="低体重营养不良" name="dt">
              <table border="1" class="table-box">
                  <tr>
                    <th colspan="2">低体重营养不良检出率报表</th>
                  </tr>
                  <tr>
                    <th>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                    <th>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
                  </tr>
                  <tr>
                    <th>项目</th>
                    <th v-for="(item, index) in onetable" :key="index">{{ item.key }}</th>
                    <th v-if="!onetable.length">校级预警</th>
                  </tr>
                  <tr>
                    <td>上一年度低体重营养不良检出率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.percentageLast ? item.percentageLast : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
                  <tr>
                    <td>本年度低体重营养不良检出率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.percentage ? item.percentage : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
                  <tr>
                    <td>增长率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.growthRate ? item.growthRate : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
              </table>
          </el-tab-pane>
          <el-tab-pane label="视力不良分级预警" name="sl">
              <table border="1" class="table-box">
                  <tr>
                    <th colspan="2">视力不良预警报表</th>
                  </tr>
                  <tr>
                    <th>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                    <th>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
                  </tr>
                  <tr>
                    <th>项目</th>
                    <th v-for="(item, index) in onetable" :key="index">{{ item.key }}</th>
                    <th v-if="!onetable.length">校级预警</th>
                  </tr>
                  <tr>
                    <td>上一年度视力不良检出率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.percentageLast ? item.percentageLast : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
                  <tr>
                    <td>本年度视力不良检出率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.percentage ? item.percentage : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
                  <tr>
                    <td>增长率</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.growthRate ? item.growthRate : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
                  <tr>
                    <td>预警等级</td>
                    <td v-for="(item, index) in onetable" :key="index">{{item.grade ? item.grade : ''}}</td>
                    <td v-if="!onetable.length"></td>
                  </tr>
              </table>
              <!-- <span class="tip">预警说明：</span>
              <ul class="tips">
                <li>0级：离均差为负数但增长幅度为正数，蓝色预警</li>
                <li>Ⅰ级：离均差在0-3.0个百分点以内，黄色预警</li>
                <li>Ⅱ级：离均差在3.0-5.0个百分点以内，橙色预警</li>
                <li>Ⅲ级：离均差在5.0个百分点以上，红色预警</li>
              </ul> -->
          </el-tab-pane>
          <el-tab-pane label="贫血检出率" name="px">
              <table border="1" class="table-box">
                  <tr>
                    <th :colspan="twotable.length + 1 !== 1 ? twotable.length + 1 : 2">贫血检出率报表</th>
                  </tr>
                  <tr>
                    <th>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                    <th :colspan="twotable.length !== 0 ? twotable.length : 1">学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
                  </tr>
                  <tr>
                    <th>项目</th>
                    <th v-for="(m, i) in twotable" :key="i">{{m.key ? m.key : ''}}</th>
                    <th v-if="twotable.length === 0"></th>
                  </tr>
                  <tr>
                    <td>贫血检出率</td>
                    <td v-for="(m, i) in twotable" :key="i">{{m.percentage ? m.percentage : ''}}</td>
                    <td v-if="twotable.length === 0"></td>
                  </tr>
              </table>
          </el-tab-pane>
          <el-tab-pane label="沙眼检出率" name="sy">
              <table border="1" class="table-box">
                  <tr>
                    <th :colspan="twotable.length + 1 !== 1 ? twotable.length + 1 : 2">沙眼检出率报表</th>
                  </tr>
                  <tr>
                    <th>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                    <th :colspan="twotable.length !== 0 ? twotable.length : 1">学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
                  </tr>
                  <tr>
                    <th>项目</th>
                    <th v-for="(m, i) in twotable" :key="i">{{m.key ? m.key : ''}}</th>
                    <th v-if="twotable.length === 0"></th>
                  </tr>
                  <tr>
                    <td>沙眼检出率</td>
                    <td v-for="(m, i) in twotable" :key="i">{{m.percentage ? m.percentage : ''}}</td>
                    <td v-if="twotable.length === 0"></td>
                  </tr>
              </table>
          </el-tab-pane>
          <el-tab-pane label="龋齿检出率" name="qc">
              <table border="1" class="table-box">
                  <tr>
                    <th colspan="4">龋齿检出率</th>
                  </tr>
                  <tr>
                    <th colspan="2">学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                    <th colspan="2">学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
                  </tr>
                  <tr>
                    <th>项目</th>
                    <th>恒牙龋均</th>
                    <th>龋齿填充率</th>
                    <th>窝沟封闭率</th>
                  </tr>
                  <tr>
                    <td>上一年度</td>
                    <td>{{threetable.percentageLastQJ ? threetable.percentageLastQJ : ''}}</td>
                    <td>{{threetable.percentageLastTC ? threetable.percentageLastTC : ''}}</td>
                    <td>{{threetable.percentageLastWG ? threetable.percentageLastWG : ''}}</td>
                  </tr>
                  <tr>
                    <td>本年度</td>
                    <td>{{threetable.percentageQJ ? threetable.percentageQJ : ''}}</td>
                    <td>{{threetable.percentageTC ? threetable.percentageTC : ''}}</td>
                    <td>{{threetable.percentageWG ? threetable.percentageWG : ''}}</td>
                  </tr>
                  <tr>
                    <td>增长率</td>
                    <td>{{threetable.growthRateQJ ? threetable.growthRateQJ : ''}}</td>
                    <td>{{threetable.growthRateTC ? threetable.growthRateTC : ''}}</td>
                    <td>{{threetable.growthRateWG ? threetable.growthRateWG : ''}}</td>
                  </tr>
              </table>
          </el-tab-pane>
          <!-- 修改报表提示信息 -->
          <div v-for="(elem, ind) in onetable" :key="ind" style="display: flex;justify-content: flex-start;margin-bottom: 10px;">
            <p class="tip" style="width: 92px" >{{'*' + elem.key + '：'}}</p>
            <div style="width: 100%;">
              <span class="tip" style="width:80px; margin-left: 18px;">上一年度：</span>
              <p>
              <span style="margin-right: 10px; color: #999999;" v-for="(item, index) in dataStateLast" :key="index" v-if="onetable.length && elem[item.data]">
                {{ item.label + elem[item.data] }}
              </span>
              </p>
              <span class="tip" style="width:80px; margin-left: 18px;">本年度：</span>
              <p style="margin-left: 18px;">
              <span style="margin-right: 10px; color: #999999;" v-for="(item, index) in dataState" :key="index" v-if="onetable.length && elem[item.data]">
                {{ item.label + elem[item.data] }}
              </span>
              </p>
            </div>
          </div>
        </el-tabs>
      </div>
      <div class="thirds" v-if="activeName === 'third'">
          <table border="1" class="table-boxs">
              <tr>
                <th :colspan="blength">视力新发率报表</th>
              </tr>
              <tr>
                <th :colspan="blength">学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                <!-- <th colspan="3">学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th> -->
              </tr>
              <!-- <tr>
                <th>学校类别</th>
                <th>年级</th>
                <th v-for="(n, i) in xnlist" :key="i" class="xnth">
                  {{n.name}}上年视力正常
                  <ul>
                    <li>当学年受检人数</li>
                    <li>新发近视人数</li>
                    <li>新发率</li>
                  </ul>
                </th>
              </tr>
              <tr v-for="(item, index) in eyetable" :key="index">
                <td  class="tdli">{{item}}</td>
                <td>
                  <ul class="ullist">
                    <li v-for="(nj, i) in eyesighttable[0][item]" :key="i">
                      {{nj.njmc}}
                    </li>
                  </ul>
                </td>
                <td class="ultd">
                  <ul class="ullista"  v-for="(n, i) in eyesighttable[0][item]" :key="i">
                    <li>{{n.allCount ? n.allCount : ''}}</li>
                    <li>{{n.errorCount ? n.errorCount : ''}}</li>
                    <li>{{n.errorPercentage ? n.errorPercentage : ''}}</li>
                  </ul>
                </td>
              </tr>
              <tr class="totaltr ultd">
                <td colspan="2">{{totalobj.njmc}}</td>
                <td v-for="(v, i) in totalobj.valueList" :key="i">
                  <ul class="ullista">
                    <li>{{v.allCount ? v.allCount : ''}}</li>
                    <li>{{v.errorCount ? v.errorCount : ''}}</li>
                    <li>{{v.errorPercentage ? v.errorPercentage : ''}}</li>
                  </ul>
                </td>
              </tr> -->
          </table>
          <el-table :span-method="merge" border :data="eyesighttable">
              <el-table-column prop="xdmc" label="学校类别">
              </el-table-column>
              <el-table-column prop="njmc" label="年级">
              </el-table-column>
              <el-table-column v-for="(item, index) in  xnlist" :key="index" :label="item.name + '上年视力正常'">
                <el-table-column label="当学年受检人数">
                  <template slot-scope="scope">
                    {{ scope.row.valueList[index] ? scope.row.valueList[index].allCount : '-' }}
                  </template>
                </el-table-column>
                <el-table-column label="新发近视人数">
                  <template slot-scope="scope">
                    {{ scope.row.valueList[index] ? scope.row.valueList[index].errorCount : '-' }}
                  </template>
                </el-table-column>
                <el-table-column label="新发率">
                  <template slot-scope="scope">
                    {{ scope.row.valueList[index] ? scope.row.valueList[index].errorPercentage ? scope.row.valueList[index].errorPercentage : '-' : '-' }}
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
      </div>
      <div class="fourth" v-if="activeName === 'fourth'">
        <div class="search">
          <el-button icon="el-icon-search" @click="getkey">搜索</el-button>
          <el-autocomplete
            class="inline-input"
            v-model="input"
            ref="model"
            popper-class="ulList"
            :fetch-suggestions="querySearch"
            placeholder="请输入教育ID或学生姓名或拼音搜索"
            :trigger-on-focus="false"
            @select="handleSelect"
            @focus="onFocus"
          ></el-autocomplete>
        </div>
        <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="教育ID"
          width="150"
          show-overflow-tooltip
          label-class-name="head">
          <template slot-scope="scope">
            <span>{{scope.row.jyid}}</span>
            <i class="lin" v-if="scope.row.lsFlag">临</i>
          </template>
        </el-table-column>
        <el-table-column
          prop="xm"
          label="姓名"
          show-overflow-tooltip
          label-class-name="head">
        </el-table-column>
        <el-table-column
          prop="xxmc"
          show-overflow-tooltip
           width="250"
          label-class-name="head"
          label="学校">
        </el-table-column>
        <el-table-column
          prop="njmc"
          show-overflow-tooltip
          label-class-name="head"
          label="年级">
        </el-table-column>
        <el-table-column
          prop="bjmc"
          show-overflow-tooltip
          label-class-name="head"
          label="班级">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label-class-name="head"
          label="性别"
          wdith="80">
          <template slot-scope="scope">
            <span v-if="scope.row.xb === 1">男</span>
            <span v-if="scope.row.xb === 2">女</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label-class-name="head"
          label=生日>
          <template slot-scope="scope">
            <span>{{scope.row.csrq | dateFormat('yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label-class-name="head"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="look(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="totalCount !== 0"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
      </div>
      <div class="fifth" v-if="activeName === 'fifth'">
          <el-tabs v-model="select" @tab-click="fifthClick">
              <el-tab-pane label="肥胖统计报表" name="one"></el-tab-pane>
              <el-tab-pane label="高血压统计报表" name="two"></el-tab-pane>
              <el-tab-pane label="营养不良统计报表" name="three"></el-tab-pane>
          </el-tabs>
          <div class="content" v-loading="aloading">
            <div class="box">
              <el-button v-for="(item, index) in list" :key="index" @click="activeIndex = index" :class="{'active': index === activeIndex}">{{item}}</el-button>
            </div>
            <!--<table border="1" v-if="activeIndex === 0" class="table-box">-->
              <!--<tr>-->
                <!--<th :colspan="alength" v-if="select === 'one'">{{list[activeIndex]}}肥胖预警报表</th>-->
                <!--<th :colspan="alength" v-if="select === 'two'">{{list[activeIndex]}}高血压统计报表</th>-->
                <!--<th :colspan="alength" v-if="select === 'three'">{{list[activeIndex]}}营养不良预警报表</th>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<th>学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>-->
                <!--<th>学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<th>项目</th>-->
                <!--<th>数值</th>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td><span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">高血压</span><span v-if="select === 'three'">营养不良</span>检出率</td>-->
                <!--<td>{{yyNum}}</td>-->
              <!--</tr>-->
            <!--</table>-->
            <table border="1" v-if="activeIndex !== 2" class="table-box">
              <tr>
                <th :colspan="alength" v-if="select === 'one'">{{list[activeIndex]}}肥胖预警报表</th>
                <th :colspan="alength" v-if="select === 'two'">{{list[activeIndex]}}高血压统计报表</th>
                <th :colspan="alength" v-if="select === 'three'">{{list[activeIndex]}}营养不良预警报表</th>
              </tr>
              <tr>
                <th :colspan="alength - 3">学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}</th>
                <th :colspan="alength + 3">学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}</th>
              </tr>
              <tr>
                <th>项目</th>
                <th v-for="(item, index) in chronicData" :key="index" v-if="chronicData.length !== 0">{{item.key}}</th>
                <th v-if="chronicData.length === 0">数值</th>
              </tr>
              <tr>
                <td><span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">高血压</span><span v-if="select === 'three'">营养不良</span>检出率</td>
                <td v-for="(item, index) in chronicData" :key="index" v-if="chronicData.length !== 0">{{item.percentage}}</td>
                <td v-if="chronicData.length === 0"></td>
              </tr>
            </table>
            <!-- <div class="tableBox"> -->
              <table border="1" v-if="activeIndex === 2" class="moreTable">
                <thead>
                  <tr>
                    <span v-if="select === 'one'">{{list[activeIndex]}}肥胖预警报表</span>
                    <span v-if="select === 'two'">{{list[activeIndex]}}高血压统计报表</span>
                    <span v-if="select === 'three'">{{list[activeIndex]}}营养不良预警报表</span>
                  </tr>
                  <tr>
                    <span>
                      学校：{{this.school ? this.schools.filter(item => item.xxdm === this.school)[0].xxmc : ''}}
                    </span>
                    <span>
                      学年度：{{this.schoolYearValue ? this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name : ''}}
                    </span>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>项目</th>
                    <th v-for="(item, index) in tableli" :key="index" v-if="tableli.length !== 0">{{item.grade}}</th>
                    <th v-if="tableli.length === 0"></th>
                  </tr>
                  <tr>
                    <td><span v-if="select === 'one'">肥胖</span><span v-if="select === 'two'">高血压</span><span v-if="select === 'three'">营养不良</span>检出率</td>
                    <td v-for="(item, index) in tableli" :key="index" v-if="tableli.length !== 0">{{item.value}}</td>
                    <td v-if="tableli.length === 0"></td>
                  </tr>
                </tbody>
              </table>
            <!-- </div> -->
            <!-- 修改报表提示信息 -->
            <div v-for="(elem, ind) in chronicData" :key="ind" style="display: flex;justify-content: flex-start;margin-bottom: 10px;">
              <p class="tip" style="width: 92px" >{{'*' + elem.key + '：'}}</p>
              <div style="width: 100%;">
                <p style="margin-left: 18px;">
              <span style="margin-right: 10px; color: #999999;" v-for="(item, index) in dataState" :key="index" v-if="chronicData.length && elem[item.data]">
                {{ item.label + elem[item.data] }}
              </span>
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { notice } from '../../utils/index.js'
export default {
  name: 'data-analysis-individuation',
  data () {
    return {
      loading: false,
      flag: false,
      aloading: false,
      tloading: false,
      onetable: {},
      twotable: [],
      threetable: {},
      totalobj: {},
      blength: 2,
      alength: 2,
      activeName: 'first',
      schoolYearValue: '',
      schoolYearOptions: [],
      eyesighttable: [],
      eyetable: {},
      list: ['校级', '年级', '班级'],
      school: '',
      tablename: '',
      schools: [],
      select: 'one',
      currentPage: 1,
      totalCount: 0,
      pageSize: 10,
      input: '',
      activeIndex: 0,
      tableData: [
        {jyid: '11111', xm: '张三', xxmc: '北京市怀柔区第一中学', njmc: '三年级', bjmc: '1班', xb: 1, csrq: '09808389383'}
      ],
      chronicData: [],
      superName: 'fp',
      grade: '',
      grades: [],
      classa: '',
      classas: [],
      section: '',
      restaurants: [],
      results: '',
      item: '',
      keyword: '',
      pageNo: 1,
      state: true,
      yyNum: '',
      tableli: [],
      xnlist: [],
      second: '',
      fira: 1,
      firb: 1,
      firstable: [],
      secondtable: [],
      global: false,
      screening: [],
      dataStateLast: [
        {label: '实检：', last: true, data: 'examCountLast'},
        {label: '实检异常：', last: true, data: 'errorCountLast'},
        {label: '未检：', last: true, data: 'unexamCountLast'},
        {label: '超标：', last: true, data: 'overproofCountLast'},
        {label: '临时：', last: true, data: 'lsCountLast'},
        {label: '总计：', last: true, data: 'totalCountLast'},
        {label: '数据异常：', last: true, data: 'abnormalCountLast'}
      ],
      dataState: [
        {label: '实检：', last: false, data: 'examCount'},
        {label: '实检异常：', last: false, data: 'errorCount'},
        {label: '未检：', last: false, data: 'unexamCount'},
        {label: '超标：', last: false, data: 'overproofCount'},
        {label: '临时：', last: false, data: 'lsCount'},
        {label: '总计：', last: false, data: 'totalCount'},
        {label: '数据异常：', last: false, data: 'abnormalCount'}
      ]
    }
  },
  methods: {
    async firstSearch () {
      this.firstable = []
      if (!this.school) {
        notice('请先选择学校再进行查询')
        return
      }
      this.tloading = true
      const data = await this.$store.dispatch('earlywarning', {
        xxdm: this.school,
        xn: this.schoolYearValue,
        type: this.fira,
        grade: this.firb
      })
      this.firstable = data
      this.tloading = false
      this.flag = true
    },
    async searchEyesight () {
      if (!this.school) {
        notice('请先选择学校再进行查询')
        return
      }
      const data = await this.$store.dispatch('listVisionNew', {
        xxdm: this.school
      })
      if (data && data.length !== 0) {
        this.eyesighttable = data.list
        this.xnlist = data.xn
        let arr = []
        let nameList = Array.from(new Set(data.list.map(item => item.xdmc)))
        nameList.forEach((item, index) => {
          arr.push({
            name: item,
            count: 0,
            index: index
          })
          data.list.forEach((elem) => {
            if (elem.xdmc === item) {
              arr[index].count += 1
            }
          })
        })
        this.screening = arr.filter(item => item.count > 1)
        // let obj = {}
        // if (data.list && data.list.length !== 0) {
        //   data.list.map(item => {
        //     if (item.njmc === '总计') {
        //       this.totalobj = item
        //     }
        //     if (obj[item.xdmc]) {
        //       obj[item.xdmc].push({njmc: item.njmc, allCount: item.allCount ? item.allCount : '', errorCount: item.errorCount ? item.errorCount : '', errorPercentage: item.errorPercentage ? item.errorPercentage : ''})
        //     } else {
        //       obj[item.xdmc] = [{njmc: item.njmc, allCount: item.allCount ? item.allCount : '', errorCount: item.errorCount ? item.errorCount : '', errorPercentage: item.errorPercentage ? item.errorPercentage : ''}]
        //     }
        //   })
        // }
        // this.eyesighttable.push(obj)
      }
      // console.log(this.eyesighttable)
      // this.xnlist = data.xn
      // this.blength = this.xnlist ? this.xnlist.length + 2 : 2
      // this.eyetable = Object.getOwnPropertyNames(this.eyesighttable[0])
      // console.log(this.eyetable)
      // this.eyetable.pop()
      // this.eyetable.pop()
      // console.log(this.eyetable)
      this.flag = true
    },
    merge ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let screening = this.screening[0]
        if (rowIndex === screening.index) {
          return [screening.count, 1]
        }
        if (screening.index > rowIndex || rowIndex > screening.index + screening.count) {
          return [1, 1]
        } else if (rowIndex !== screening.index && rowIndex < screening.index + screening.count) {
          return [0, 1]
        }
      }
    },
    firstDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/statisticsIndividualization/earlywarningExport?xxdm=${this.school}&xn=${this.schoolYearValue}&xnmc=${this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name}&xxmc=${this.schools.filter(item => item.xxdm === this.school)[0].xxmc}`
    },
    fifthDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/statisticsIndividualization/chronicExport?xxdm=${this.school}&xn=${this.schoolYearValue}&xnmc=${this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name}&xxmc=${this.schools.filter(item => item.xxdm === this.school)[0].xxmc}`
    },
    thirdDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/statisticsIndividualization/listVisionNewExport?xxdm=${this.school}&xxmc=${this.schools.filter(item => item.xxdm === this.school)[0].xxmc}`
    },
    secondDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/statisticsIndividualization/supervisorExport?xxdm=${this.school}&xn=${this.schoolYearValue}&xnmc=${this.schoolYearOptions.filter(item => item.xn === this.schoolYearValue)[0].name}&xxmc=${this.schools.filter(item => item.xxdm === this.school)[0].xxmc}`
    },
    secondSearch () {
      if (!this.school) {
        notice('请先选择学校再进行查询')
        return
      }
      this.tloading = true
      if (this.superName === 'sl') {
        this.second = 2
        this.supervisorFP()
      } else if (this.superName === 'fp') {
        this.second = 1
        this.supervisorFP()
      } else if (this.superName === 'dt') {
        this.second = 3
        this.supervisorFP()
      } else if (this.superName === 'px') {
        this.second = 1
        this.supervisorFour()
      } else if (this.superName === 'sy') {
        this.second = 2
        this.supervisorFour()
      } else if (this.superName === 'qc') {
        this.supervisorQC()
      }
      this.flag = true
      this.tloading = false
    },
    async supervisorFP () {
      if (!this.school || !this.schoolYearValue) {
        this.tloading = false
        return
      }
      this.onetable = await this.$store.dispatch('supervisorFP', {
        xxdm: this.school,
        xn: this.schoolYearValue,
        type: this.second
      })
      console.log(this.onetable)
    },
    async supervisorQC () {
      if (!this.school || !this.schoolYearValue) {
        this.tloading = false
        return
      }
      this.threetable = await this.$store.dispatch('supervisorQC', {
        xxdm: this.school,
        xn: this.schoolYearValue
      })
    },
    async supervisorFour () {
      if (!this.school || !this.schoolYearValue) {
        this.tloading = false
        return
      }
      this.twotable = await this.$store.dispatch('supervisorFour', {
        xxdm: this.school,
        xn: this.schoolYearValue,
        type: this.second
      })
    },
    fifthSearch () {
      if (!this.school) {
        notice('请先选择学年再进行查询')
        return
      }
      if (this.select === 'one') {
        this.chronicFP()
      } else if (this.select === 'two') {
        this.chronicXY()
      } else if (this.select === 'three') {
        this.chronicYY()
      }
      this.flag = true
    },
    handleSelect (item) {
      this.item = item
      this.keyword = item.name
      var container = this.$refs.model.$children[1].popperElm.firstElementChild.childNodes[0]
      container.style.display = 'none'
    },
    async querySearch (queryString, cb) {
      let state = false
      this.$store.state.user.resources.forEach(elem => {
        elem.childs.forEach(item => {
          if (item.url === '/statisticsIndividualization/*') {
            //  全局
            state = true
          }
        })
      })
      this.result = cb
      this.restaurants = []
      let data
      if (state) {
        data = await this.$store.dispatch('searchStudent', {
          keyword: this.input
        })
      } else {
        data = await this.$store.dispatch('searchStudentBySchool', {
          keyword: this.input
        })
      }
      if (data && data.length !== 0) {
        data.map(item => {
          let obj = {}
          // var arr = ''
          // if (item.indexOf(queryString) < item.indexOf('(')) {
          //   arr = item.substring(0, item.indexOf('('))
          // } else if ((item.indexOf(queryString) > item.indexOf('(')) && (item.indexOf(queryString) < item.indexOf(')'))) {
          //   arr = item.substring(item.indexOf('('), item.indexOf(')') + 1)
          // } else if (item.indexOf(queryString) > item.indexOf(')')) {
          //   arr = item.substring(item.indexOf(')') + 1, item.length + 1)
          // }
          console.log(item)
          obj.value = `${item.xm}(${item.lsFlag ? item.lsJyid : item.jyid})`
          obj.name = item.id
          this.restaurants.push(obj)
        })
      } else {
        let objs = {
          value: '暂无数据',
          name: '暂无数据'
        }
        this.restaurants.push(objs)
      }
      var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant !== '')
      }
    },
    async getMore () {
      let data
      this.state = false
      if (this.global) {
        data = await this.$store.dispatch('searchStudent', {
          keyword: this.input
        })
      } else {
        data = await this.$store.dispatch('searchStudentBySchool', {
          keyword: this.input
        })
      }
      if (data.length !== 0) {
        data.map(item => {
          let obj = {}
          // var arr = ''
          // if (item.indexOf(this.input) < item.indexOf('(')) {
          //   arr = item.substring(0, item.indexOf('('))
          // } else if ((item.indexOf(this.input) > item.indexOf('(')) && (item.indexOf(this.input) < item.indexOf(')'))) {
          //   arr = item.substring(item.indexOf('('), item.indexOf(')') + 1)
          // } else if (item.indexOf(this.input) > item.indexOf(')')) {
          //   arr = item.substring(item.indexOf(')') + 1, item.length + 1)
          // }
          obj.value = `${item.xm}(${item.lsFlag ? item.lsJyid : item.jyid})`
          obj.name = item.lsFlag ? item.lsJyid : item.jyid
          this.restaurants.push(obj)
        })
      } else {
        let objs = {
          value: '暂无数据',
          name: '暂无数据'
        }
        this.restaurants.push(objs)
      }
      this.result(this.restaurants)
      this.state = true
    },
    onFocus () {
      var container = this.$refs.model.$children[1].popperElm.firstElementChild.childNodes[0]
      container.style.display = 'block'
    },
    getSearch () {
      if (!this.school) {
        notice('请先选择学校再进行查询')
        return
      }
      this.input = ''
      this.currentPage = 1
      this.listEvaluate()
    },
    getkey () {
      if (this.input === '') {
        this.restaurants = []
      }
      this.currentPage = 1
      this.listEvaluates()
    },
    async listEvaluates () {
      this.loading = true
      if (this.global) {
        this.school = ''
      }
      this.grade = ''
      this.classa = ''
      if (!this.keyword) {
        notice('请先选择学生')
      }
      const data = await this.$store.dispatch('listEvaluate', {
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        keyword: this.keyword,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.keyword = ''
      this.tableData = data.list
      this.totalCount = data.totalCount
      this.loading = false
    },
    async listEvaluate () {
      this.loading = true
      const data = await this.$store.dispatch('listEvaluate', {
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        keyword: '',
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
      this.loading = false
      // this.totalCount = this.tableData.length
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.input !== '') {
        this.listEvaluates()
      } else {
        this.listEvaluate()
      }
    },
    async handleClick (tab, event) {
      this.firstable = []
      this.activeIndex = 0
      this.flag = false
      this.superName = 'fp'
      this.select = 'one'
      this.schoolYearValue = this.schoolYearOptions.filter(item => item.current)[0].xn
      if (this.global) {
        this.school = ''
      }
      this.grade = ''
      this.classa = ''
      if (this.activeName === 'fourth') {
        this.loading = true
        const data = await this.$store.dispatch('listEvaluate', {
          xxdm: this.school,
          njid: '',
          bjid: '',
          keyword: '',
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })
        this.tableData = data.list
        this.totalCount = data.totalCount
        this.loading = false
      }
      if (this.activeName === 'fifth') {
        // await this.chronicFP()
      }
    },
    async chronicFP () {
      if (!this.flag) return
      this.tableli = []
      if (!this.school || !this.schoolYearValue) return
      this.aloading = true
      const data = await this.$store.dispatch('chronicFP', {
        xxdm: this.school,
        xn: this.schoolYearValue,
        grade: this.activeIndex + 1
      })
      if (this.activeIndex === 0) {
        this.yyNum = data[0] ? data[0].percentage : ''
        this.alength = 2
      } else if (this.activeIndex === 1 || this.activeIndex === 2) {
        if (data && data.length !== 0) {
          data.map(item => {
            let obj = {}
            obj.grade = item.key ? item.key : ''
            obj.value = item.percentage ? item.percentage : ''
            this.tableli.push(obj)
          })
          this.alength = this.tableli && this.tableli.length !== 0 ? (this.tableli.length + 1) : 2
        }
      }
      this.chronicData = data
      this.aloading = false
    },
    firstClick (tab, event) {
      this.activeIndex = 0
    },
    secondClick (tab, event) {
      if (!this.flag) return
      this.activeIndex = 0
      this.secondSearch()
    },
    fifthClick (tab, event) {
      this.activeIndex = 0
      if (this.select === 2) {
        this.chronicXY()
      }
    },
    async  chronicXY () {
      if (!this.flag) return
      this.tableli = []
      if (!this.school || !this.schoolYearValue) return
      this.aloading = true
      const data = await this.$store.dispatch('chronicXY', {
        xxdm: this.school,
        xn: this.schoolYearValue,
        grade: this.activeIndex + 1
      })
      if (this.activeIndex === 0) {
        this.yyNum = data[0] ? data[0].percentage : ''
        this.alength = 2
      } else if (this.activeIndex === 1 || this.activeIndex === 2) {
        if (data && data.length !== 0) {
          data.map(item => {
            let obj = {}
            obj.grade = item.key ? item.key : ''
            obj.value = item.percentage ? item.percentage : ''
            this.tableli.push(obj)
          })
          this.alength = this.tableli && this.tableli.length !== 0 ? (this.tableli.length + 1) : 2
        }
      }
      this.chronicData = data
      this.aloading = false
    },
    async  chronicYY () {
      if (!this.flag) return
      this.tableli = []
      if (!this.school || !this.schoolYearValue) return
      this.aloading = true
      const data = await this.$store.dispatch('chronicYY', {
        xxdm: this.school,
        xn: this.schoolYearValue,
        grade: this.activeIndex + 1
      })
      if (this.activeIndex === 0) {
        this.yyNum = data[0] ? data[0].percentage : ''
        this.alength = 2
      } else if (this.activeIndex === 1 || this.activeIndex === 2) {
        if (data && data.length !== 0) {
          data.map(item => {
            let obj = {}
            obj.grade = item.key ? item.key : ''
            obj.value = item.percentage ? item.percentage : ''
            this.tableli.push(obj)
          })
          this.alength = this.tableli && this.tableli.length !== 0 ? (this.tableli.length + 1) : 2
        }
      }
      this.chronicData = data
      this.aloading = false
    },
    async gradeList () {
      this.grade = ''
      this.classa = ''
      this.grades = await this.$store.dispatch('gradeList', {
        xxdm: this.school
      })
    },
    async classList () {
      this.classa = ''
      this.classas = await this.$store.dispatch('classList', {
        xxdm: this.school,
        njid: this.grade
      })
    },
    look (row) {
      sessionStorage.row = JSON.stringify(row)
      window.open('#/dataAnalysis/studentInfo')
    }
  },
  watch: {
    input () {
      this.currentPage = 1
    },
    restaurants () {
      if (this.restaurants && this.restaurants.length !== 0) {
        // 列表
        var wrapper = this.$refs.model.$children[1].referenceList
        // 容器
        var container = this.$refs.model.$children[1].popperElm.firstElementChild.childNodes[0]
        var t = this
        container.addEventListener('scroll', async function () {
          // var scrollTop = wrapper.scrollTop
          var listbottom = wrapper.getBoundingClientRect().bottom
          var containerbottom = container.getBoundingClientRect().bottom
          if (listbottom === containerbottom - 22) {
            if (!t.state) return
            t.pageNo++
            await t.getMore()
          }
        })
      }
    },
    select () {
      if (this.activeName === 'fifth') {
        if (this.select === 'one') {
          this.chronicFP()
        } else if (this.select === 'two') {
          this.chronicXY()
        } else if (this.select === 'three') {
          this.chronicYY()
        }
      }
      if (this.activeName === 'first') {
        if (this.select === 'one') {
          this.fira = 1
        } else if (this.select === 'two') {
          this.fira = 2
        } else {
          this.fira = 3
        }
        if (!this.flag) {
          return
        }
        this.firstSearch()
      }
    },
    activeIndex () {
      if (this.activeName === 'fifth') {
        if (this.select === 'one') {
          this.chronicFP()
        } else if (this.select === 'two') {
          this.chronicXY()
        } else if (this.select === 'three') {
          this.chronicYY()
        }
      }
      if (this.activeName === 'first') {
        if (this.activeIndex === 0) {
          this.firb = 1
        } else if (this.activeIndex === 1) {
          this.firb = 2
        } else {
          this.firb = 3
        }
        if (!this.flag) {
          return
        }
        this.firstSearch()
      }
    }
  },
  async created () {
    this.schoolYearOptions = await this.$store.dispatch('xnList')
    this.schoolYearValue = this.schoolYearOptions.filter(item => item.current)[0].xn
    this.schools = await this.$store.dispatch('schoolList')
    this.$store.state.user.resources.forEach(elem => {
      elem.childs.forEach(item => {
        if (item.url === '/statisticsIndividualization/*') {
          //  全局
          this.global = true
        }
      })
    })
    if (!this.global) {
      if (this.$store.state.user.xxdm) {
        this.school = this.$store.state.user.xxdm
        // console.log(this.school)
      } else {
        notice('当前用户没有对应的单位')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-analysis-individuation {
  .yellow {
    background: #FFFF00;
  }
  .orange {
    background: #FFC000;
  }
  .red {
    background: #FF0000;
  }
  .totaltr {
    td {
      &:nth-child(1) {
        text-indent: 20px;
      }
    }
  }
  .xnth {
    text-align: center;
  }
  .ultd {
    border-left: none !important;
    border-bottom: none !important;
  }
  .tdli {
    text-indent: 20px;
    height: inherit !important;
  }
  .ullista {
    @extend .clearfix;
    &>li {
      float: left;
      text-indent: 20px;
      height: 40px !important;
      display: inline-block;
      border-right: 1px solid #E0E0E0;
      border-bottom: 1px solid #E0E0E0;
      &:last-child {
        width: 17.5% !important;
      }
    }
  }
  .ullist {
    &>li {
      float: none !important;
      width: inherit !important;
      height: 40px;
      text-align: left !important;
      text-indent: 20px !important;
      border-bottom: 1px solid #E0E0E0;
      &:last-child {
        border-bottom: none !important;
      }
    }
  }
  th {
    border-color: #E0E0E0;
  }
  td {
    border-color: #E0E0E0;
  }
  .moreTable {
    width: 100%;
    display: block;
    position: relative;
    border: 1px solid #e7eaf1;
    margin-bottom: 10px;
    > thead {
      width: 100%;
      position: absolute;
      tr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        &:nth-child(1) {
          background: #e7eaf1;
          height: 40px;
          font-size: 20px;
          line-height: 40px;
          justify-content: center;
        }
        &:nth-child(2) {
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
    }
    > tbody {
      display: block;
      margin-top: 80px !important;
      width: 100%;
      overflow: auto;
      td {
        min-width: 100px;
        line-height: 30px;
      }
      th {
        min-width: 100px;
        line-height: 30px;
        padding-left: 10px;
      }
    }
  }
  .tableBox {
    position: relative;
    margin-bottom: 20px;
    @extend .clearfix;
    min-height: 380px;
    overflow-x: scroll;
    width: 100%;
    .table-box {
      min-width: 100%;
      position: absolute;
      display: block;
      width: auto !important;
      tr {
        width: 100%;
        border-color: #E0E0E0;
        > td {
          min-width: 90px;
        }
        &:nth-child(1) {
          background: #ECEDF2;
          display: block;
          span {
            height: 48px;
            width: inherit;
            display: inline-block;
            line-height: 48px;
            text-align: center;
            font-size: 18px;
          }
        }
        &:nth-child(2) {
          @extend .clearfix;
          position: relative;
          height: 40px;
          width: 100%;
         &>span {
           min-width: 300px;
           height: 40px;
           line-height: 40px;
            display: block;
            &:nth-child(1) {
              text-align: left;
              position: absolute;
              left: 20px;
            }
            &:nth-child(2) {
              // text-align: right;
              position: absolute;
              right: 20px;
            }
          }
        }
      }
      .li-list {
          th {
            min-width: 190px !important;
            /* display: list-item; */
          }
      }
    }
  }
  .schoolLi {
    .el-select>.el-input {
      width: 300px;
      height: 33px;
      .el-input__inner {
        width: 300px;
      }
    }
  }
  .el-tabs__item.is-active {
    color: #4B73EB;
  }
  .el-tabs__item {
    &:hover {
      color: #4B73EB;
    }
  }
  .el-tabs__active-bar {
    background-color: #4B73EB;
  }
  .top {
    min-height: 175px;
    width: 100%;
    background: #fff;
    border-radius: 4px;

    .el-tabs__nav-wrap {
      padding-top: 10px;
      padding-left: 20px;
    }
    .el-tabs__content {
      padding: 20px;
      @extend .clearfix;
      &>div {
        &:nth-child(1), &:nth-child(2) {
        ul {
          li {
            &:nth-child(1) {
              .el-input__inner {
                width: 150px;
              }
            }
            &:nth-child(2) {
              .el-input__inner {
                width: 300px;
              }
            }
          }
        }
      }
      &:nth-child(4) {
        ul {
          li {
            &:nth-child(1) {
              .el-input__inner {
                width: 300px;
              }
            }
            &:nth-child(2), &:nth-child(3) {
              .el-input__inner {
                width: 100px;
              }
            }
          }
        }
      }
      &:nth-child(5) {
        ul {
          li {
            &:nth-child(1) {
              .el-input__inner {
                width: 150px;
              }
            }
            &:nth-child(2) {
              .el-input__inner {
                width: 300px;
              }
            }
          }
        }
      }
      }

      .sear {
        background: #73D586 !important;
        border-color: #73D586 !important;
        padding: 8px 25px;
        color: #fff;
        float: left;
        /* margin-left: 10px; */
        margin-right: 0px !important;
      }
      .el-tab-pane {
      .head {
        h2 {
          font-weight: normal;
          font-size: 15px;
          margin-bottom: 20px;
        }
        ul {
          float: none;
        }
      }
      }
    }
    ul {
      float: left;
      @extend .clearfix;
      li {
        float: left;
        margin-right: 15px;
        .el-input--suffix .el-input__inner {
          height: 32px;
        }
      }
    }
    .el-button {
      float: right;
        background: #6E94FF;
        border-color: #6E94FF;
        padding: 10px 25px;
        color: #fff;
        &>span {
          height: 14px;
          line-height: 14px;
          display: inline-block;
          img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
        &:last-child {
          background: #73D586;
          border-color: #73D586;
          padding: 10px 25px;
          color: #fff;
          margin-right: 20px;
        }
      }
  }
  .bottom {
    margin-top: 20px;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    min-height: calc(100vh - 315px);
    @extend .clearfix;

    .first, .fifth {
      .el-tabs__content {
        padding: 0px !important;
      }
    }

    .third {
      padding: 20px;
      .table-box {
        tr {
          td {
            /* padding-left: 20px; */
          }
          th {
            padding-left: 0px !important;
            text-indent: 20px;
            /* text-align: center; */
            &>ul {
              padding: 0px;
              border-top: 1px solid #ECEDF2;
              /* width: inherit; */
              @extend .clearfix;
              display: flex;
              li {
                text-indent: 0px;
                border-right: 1px solid #ECEDF2;
                float: left;
                text-align: center;
                &:nth-child(1) {
                  width: 41%;
                }
                &:nth-child(2) {
                  width: 41%;
                }
                &:nth-child(3) {
                  border-right: none;
                  width: 15%;
                }
              }
            }
          }
          td {
            height: auto !important;
            &>ul {
              width: inherit;
              height: inherit;
              @extend .clearfix;
              li {
                text-indent: 0px;
                height: inherit;
                border-right: 1px solid #ECEDF2;
                float: left;
                text-align: center;
                &:nth-child(1) {
                  width: 41%;
                }
                &:nth-child(2) {
                  width: 41%;
                }
                &:nth-child(3) {
                  border-right: none;
                }
              }
            }
          }
        }
      }
    }
    .thirds {
      padding: 20px;
      > table {
        border: 1px solid #e3e3e3;
        width: 100%;
        line-height: 2;
        > tr {
          &:nth-child(1) {
            th {
              text-align: center;
              padding: 10px;
              background: #ECEDF2;
              font-size: 18px;
            }
          }
          &:nth-child(2) {
            th {
              padding: 10px;
              font-size: 15px;
            }
          }
        }
      }
      .el-table  {
        border-top: 0px;
        th, td {
          border: 1px solid #e3e3e3;
        }
      }
    }
    .fourth {
      padding: 20px;
      &>table tr:nth-child(1) th {
        height: 32px;
        line-height: 32px;
      }
      .search {
        /* width: 50%; */
        text-align: right;
        @extend .clearfix;
        .el-input {
          float: right;
          width: 330px;
        }
        .el-input__inner {
          width: 330px;
          height: 36px;
          line-height: 36px;
        }
        .el-button {
          float: right;
            padding: 10px 25px;
            background: #73D586;
            border-color: #73D586;
            color: #fff;
            margin-right: 20px;
            margin-left: 20px;

            .el-icon-search {
              margin-right: 8px;
            }
        }
      }
    .el-table {
      text-align: center;
      margin-top: 20px;
      /* height: 608px; */
    }
    .el-table::before {
      display: none;
    }
    .el-table td {
      padding-top: 5px;
      padding-bottom: 5px;
      color: #666;
      &:last-child {
        .el-button {
          padding: 10px 18px;
          background: #6E94FF;
          border-color: #6E94FF;
          color: #fff;
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
        // width: auto !important;
        margin-bottom: 20px;

        tr {
          /* background: #EBEEF7; */
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
    .el-tabs__content {
      padding: 20px;
      &:nth-child(2) {
        &>div {
          table {
            td {
              padding-left: 20px;
            }
          }
        }
      }
    }
    .tips {
      float: left;
      margin-left: 10px;
      color: #999999;
    }
    .tip {
      float: left;
      color: #999999;
    }
    .table-box {
      width: 100%;
      border: 1px solid #E0E0E0;
      margin-bottom: 20px;
      tr {
        td {
          height: 40px;
          line-height: 40px;
          /* padding-left: 20px; */
        }
        &:nth-child(1) {
          /* width: inherit; */
          th {
            height: 48px;
            /* width: 100%; */
            /* display: inline-block; */
            line-height: 48px;
            text-align: center;
            background: #ECEDF2;
            font-size: 18px;
          }
        }
        &:nth-child(2) {
          th {
            &:nth-child(1) {
              padding-left: 20px;
              border-right: none;
              text-align: left;
            }
            &:nth-child(2) {
              padding-right: 20px;
              text-align: right;
              border-left: none;
            }
          }
        }
        &:nth-child(3) {
          th {
            padding-left: 20px;
            font-weight: bold;
            font-size: 15px;
          }
        }
        th {
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .el-tabs__nav-wrap {
      padding-top: 10px;
      padding-left: 20px;
    }
    .one, .two {
      .el-tabs__content {
        display: none;
        padding: 0px !important;
      }
    }
  }
  .content {
    padding: 20px;
    /* background: #fff; */
    @extend .clearfix;
    table {
      td {
        padding-left: 20px;
      }
    }
    .box {
        text-align: right;
        margin-bottom: 20px;
        .el-button {
          padding: 10px 28px;
          background: #E7EAF1;
          border: 1px solid #E2E3E8;
          &:hover {
            color: #555;
          }
        }
        .active {
          background: #6E94FF;
          color: #fff;
          border: 1px solid #6E94FF;
          &:hover {
            color: #fff;
          }
        }
      }
  }
}
</style>
