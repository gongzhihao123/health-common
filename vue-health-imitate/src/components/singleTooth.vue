<template>
  <div class='tooth'>
    <table class="table-1" border="1" cellspacing="0" width="100%" v-if="qcShow">
      <thead>
        <tr>
          <th colspan="9">
            左侧
          </th>
          <th colspan="7">
            右侧
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- 第一行序号 -->
        <tr>
          <td width="100px" rowspan="9">龋<br>齿<br>情<br>况</td>
          <td>7</td>
          <td>6</td>
          <td>5</td>
          <td>4</td>
          <td>3</td>
          <td>2</td>
          <td>1</td>
          <td rowspan="8"></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
        </tr>
        <!-- 第二行情况 -->
        <tr>
          <td></td>
          <td></td>
          <td>
            <el-select v-model="obj.vl1_5" @change="sel1_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl1_4" @change="sel1_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl1_3" @change="sel1_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl1_2" @change="sel1_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl1_1" @change="sel1_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr1_1" @change="ser1_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr1_2" @change="ser1_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr1_3" @change="ser1_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr1_4" @change="ser1_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr1_5" @change="ser1_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td></td>
          <td></td>
        </tr>
        <!-- 第三行间隔 -->
        <tr>
          <td colspan="7">
          </td>
          <td colspan="7">
          </td>
        </tr>
        <!-- 第四行情况 -->
        <tr>
          <td>
            <el-select v-model="obj.vl2_7" @change="sel2_7" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td><td>
            <el-select v-model="obj.vl2_6" @change="sel2_6" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl2_5" @change="sel2_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl2_4" @change="sel2_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl2_3" @change="sel2_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl2_2" @change="sel2_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl2_1" @change="sel2_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr2_1" @change="ser2_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr2_2" @change="ser2_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr2_3" @change="ser2_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr2_4" @change="ser2_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr2_5" @change="ser2_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr2_6" @change="ser2_6" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td><td>
            <el-select v-model="obj.vr2_7" @change="ser2_7" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
        </tr>
        <!-- 第五行情况 -->
        <tr>
          <td>
            <el-select v-model="obj.vl3_7" @change="sel3_7" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td><td>
            <el-select v-model="obj.vl3_6" @change="sel3_6" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl3_5" @change="sel3_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl3_4" @change="sel3_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl3_3" @change="sel3_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl3_2" @change="sel3_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl3_1" @change="sel3_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr3_1" @change="ser3_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr3_2" @change="ser3_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr3_3" @change="ser3_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr3_4" @change="ser3_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr3_5" @change="ser3_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr3_6" @change="ser3_6" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td><td>
            <el-select v-model="obj.vr3_7" @change="ser3_7" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
        </tr>
        <!-- 第六行间隔 -->
        <tr>
          <td colspan="7">
          </td>
          <td colspan="7">
          </td>
        </tr>
        <!-- 第七行情况 -->
        <tr>
          <td></td>
          <td></td>
          <td>
            <el-select v-model="obj.vl4_5" @change="sel4_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl4_4" @change="sel4_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl4_3" @change="sel4_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl4_2" @change="sel4_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vl4_1" @change="sel4_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr4_1" @change="ser4_1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr4_2" @change="ser4_2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr4_3" @change="ser4_3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr4_4" @change="ser4_4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select v-model="obj.vr4_5" @change="ser4_5" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td></td>
          <td></td>
        </tr>
        <!-- 第八行序号 -->
        <tr>
          <td></td>
          <td></td>
          <td>5</td>
          <td>4</td>
          <td>3</td>
          <td>2</td>
          <td>1</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td></td>
          <td></td>
        </tr>
        <!-- 第九行选择框 -->
        <tr>
          <td colspan="16">
             暂未捡测原因：<!--<el-checkbox v-model="qcFlag" @change="qcChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="qcChange" szie="small"  class="dropdownMini">
              <span >{{this.rea.qcrea == '1' ? '被检人不配合' : this.rea.qcrea == '2' ? '身体原因' : this.rea.qcrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <table table class="table-2" border="1" cellspacing="0" width="100%" v-if="yyShow">
      <thead>
        <tr>
          <th colspan="2">
            左侧
          </th>
          <th colspan="2">
            中间
          </th>
          <th colspan="2">
            右侧
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 第一行牙龈情况 -->
        <tr>
          <td rowspan="3">
            牙<br>龈<br>情<br>况
          </td>
          <td>
            <el-select v-model="yyObj.l1" @change="sel1" placeholder="请选择">
              <el-option
                v-for="item in yyOptions"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td></td>
          <td>
            <el-select v-model="yyObj.m1" @change="sem1" placeholder="请选择">
              <el-option
                v-for="item in yyOptions"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td></td>
          <td>
            <el-select v-model="yyObj.r1" @change="ser1" placeholder="请选择">
             <el-option
                v-for="item in yyOptions"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
        </tr>
        <!-- 第二行牙龈情况 -->
        <tr>
          <td>
            <el-select v-model="yyObj.l2" @change="sel2" placeholder="请选择">
              <el-option
                v-for="item in yyOptions"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td></td>
          <td>
            <el-select v-model="yyObj.m2" @change="sem2" placeholder="请选择">
              <el-option
                v-for="item in yyOptions"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td></td>
          <td>
            <el-select v-model="yyObj.r2" @change="ser2" placeholder="请选择">
              <el-option
                v-for="item in yyOptions"
                :key="item.code"
                :label="item.res"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
        </tr>
        <!-- 第三行多选 -->
        <tr>
          <td colspan="5">
             暂未检测原因：<!--<el-checkbox v-model="yyFlag" @change="yyFlagChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="yyFlagChange" szie="small"  class="dropdownMini">
              <span >{{this.rea.yyrea == '1' ? '被检人不配合' : this.rea.yyrea == '2' ? '身体原因' : this.rea.yyrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 第四行其他输入 -->
        <tr>
          <td colspan="6">
            其他：<el-input v-model.trim="yyValue2" :maxlength="50" @blur="yyBlur"></el-input>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { notice } from '../utils/index'
export default {
  name: 'tooth',
  data () {
    return {
      qcValue1: [],
      qcValue2: [],
      qcFlag: false,
      rea: {
        qcrea: '',
        yyrea: ''
      },
      obj: {
        vl1_5: '',
        vl1_4: '',
        vl1_3: '',
        vl1_2: '',
        vl1_1: '',
        vr1_1: '',
        vr1_2: '',
        vr1_3: '',
        vr1_4: '',
        vr1_5: '',
        vl2_7: '',
        vl2_6: '',
        vl2_5: '',
        vl2_4: '',
        vl2_3: '',
        vl2_2: '',
        vl2_1: '',
        vr2_1: '',
        vr2_2: '',
        vr2_3: '',
        vr2_4: '',
        vr2_5: '',
        vr2_6: '',
        vr2_7: '',
        vl3_7: '',
        vl3_6: '',
        vl3_5: '',
        vl3_4: '',
        vl3_3: '',
        vl3_2: '',
        vl3_1: '',
        vr3_1: '',
        vr3_2: '',
        vr3_3: '',
        vr3_4: '',
        vr3_5: '',
        vr3_6: '',
        vr3_7: '',
        vl4_5: '',
        vl4_4: '',
        vl4_3: '',
        vl4_2: '',
        vl4_1: '',
        vr4_1: '',
        vr4_2: '',
        vr4_3: '',
        vr4_4: '',
        vr4_5: ''
      },
      yyObj: {
        l1: '',
        m1: '',
        r1: '',
        l2: '',
        m2: '',
        r2: ''
      },
      qcShow: false,
      options: [],
      yyShow: false,
      yyOptions: [],
      yyFlag: false,
      yyValue1: [],
      yyValue2: '',
      value: '',
      list: []
    }
  },
  props: [
    'studentExam',
    'toothCheckout',
    'yyCheckout',
    'fill',
    'myList'
  ],
  methods: {
    sel1 () {
      this.rea.yyrea = '4'
      this.$set(this.yyValue1, 0, this.yyObj.l1)
    },
    sem1 () {
      this.rea.yyrea = '4'
      this.$set(this.yyValue1, 1, this.yyObj.m1)
    },
    ser1 () {
      this.rea.yyrea = '4'
      this.$set(this.yyValue1, 2, this.yyObj.r1)
    },
    sel2 () {
      this.rea.yyrea = '4'
      this.$set(this.yyValue1, 3, this.yyObj.l2)
    },
    sem2 () {
      this.rea.yyrea = '4'
      this.$set(this.yyValue1, 4, this.yyObj.m2)
    },
    ser2 () {
      this.rea.yyrea = '4'
      this.$set(this.yyValue1, 5, this.yyObj.r2)
    },
    yyBlur () {
      if (this.yyFlag) {
        this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '', flag: false, value1: '', value2: this.yyValue2 })
      } else {
        if (this.yyValue1.length === 6) {
          this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '牙龈', flag: true, value1: this.yyValue1.join('_'), value2: this.yyValue2 })
        } else {
          this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '牙龈', flag: false, value1: '', value2: this.yyValue2 })
        }
      }
    },
    yyFlagChange (val) {
      this.rea.yyrea = val
      if (val) {
        this.yyValue1 = ['9', '9', '9', '9', '9', '9']
        this.yyObj = {
          l1: this.yyValue1[0],
          m1: this.yyValue1[1],
          r1: this.yyValue1[2],
          l2: this.yyValue1[3],
          m2: this.yyValue1[4],
          r2: this.yyValue1[5]
        }
        this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '', flag: false, value1: '', value2: this.yyValue2, unexamReason: this.rea.yyrea })
      } else {
        this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '牙龈', flag: false, value1: '', value2: this.yyValue2, unexamReason: this.rea.yyrea })
      }
    },
    qcChange (val) {
      this.rea.qcrea = val
      if (val) {
        this.qcValue1 = ['99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99']
        this.qcValue2 = ['99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99', '99']
        this.obj = {
          vl1_5: this.qcValue1[0],
          vl1_4: this.qcValue1[1],
          vl1_3: this.qcValue1[2],
          vl1_2: this.qcValue1[3],
          vl1_1: this.qcValue1[4],
          vr1_1: this.qcValue1[5],
          vr1_2: this.qcValue1[6],
          vr1_3: this.qcValue1[7],
          vr1_4: this.qcValue1[8],
          vr1_5: this.qcValue1[9],
          vl2_7: this.qcValue2[0],
          vl2_6: this.qcValue2[1],
          vl2_5: this.qcValue2[2],
          vl2_4: this.qcValue2[3],
          vl2_3: this.qcValue2[4],
          vl2_2: this.qcValue2[5],
          vl2_1: this.qcValue2[6],
          vr2_1: this.qcValue2[7],
          vr2_2: this.qcValue2[8],
          vr2_3: this.qcValue2[9],
          vr2_4: this.qcValue2[10],
          vr2_5: this.qcValue2[11],
          vr2_6: this.qcValue2[12],
          vr2_7: this.qcValue2[13],
          vl3_7: this.qcValue2[14],
          vl3_6: this.qcValue2[15],
          vl3_5: this.qcValue2[16],
          vl3_4: this.qcValue2[17],
          vl3_3: this.qcValue2[18],
          vl3_2: this.qcValue2[19],
          vl3_1: this.qcValue2[20],
          vr3_1: this.qcValue2[21],
          vr3_2: this.qcValue2[22],
          vr3_3: this.qcValue2[23],
          vr3_4: this.qcValue2[24],
          vr3_5: this.qcValue2[25],
          vr3_6: this.qcValue2[26],
          vr3_7: this.qcValue2[27],
          vl4_5: this.qcValue1[10],
          vl4_4: this.qcValue1[11],
          vl4_3: this.qcValue1[12],
          vl4_2: this.qcValue1[13],
          vl4_1: this.qcValue1[14],
          vr4_1: this.qcValue1[15],
          vr4_2: this.qcValue1[16],
          vr4_3: this.qcValue1[17],
          vr4_4: this.qcValue1[18],
          vr4_5: this.qcValue1[19]
        }
        this.$emit('toothChange', { projectId: 'qc', id: this.list.filter(item => item.projectName === '龋齿')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.qcrea })
      } else {
        this.$emit('toothChange', { projectId: 'qc', id: this.list.filter(item => item.projectName === '龋齿')[0].id, name: '龋齿', flag: false, value1: '', value2: '', unexamReason: this.rea.qcrea })
      }
    },
    sel1_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 0, this.obj.vl1_5)
    },
    sel1_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 1, this.obj.vl1_4)
    },
    sel1_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 2, this.obj.vl1_3)
    },
    sel1_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 3, this.obj.vl1_2)
    },
    sel1_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 4, this.obj.vl1_1)
    },
    ser1_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 5, this.obj.vr1_1)
    },
    ser1_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 6, this.obj.vr1_2)
    },
    ser1_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 7, this.obj.vr1_3)
    },
    ser1_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 8, this.obj.vr1_4)
    },
    ser1_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 9, this.obj.vr1_5)
    },
    sel4_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 10, this.obj.vl4_5)
    },
    sel4_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 11, this.obj.vl4_4)
    },
    sel4_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 12, this.obj.vl4_3)
    },
    sel4_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 13, this.obj.vl4_2)
    },
    sel4_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 14, this.obj.vl4_1)
    },
    ser4_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 15, this.obj.vr4_1)
    },
    ser4_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 16, this.obj.vr4_2)
    },
    ser4_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 17, this.obj.vr4_3)
    },
    ser4_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 18, this.obj.vr4_4)
    },
    ser4_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue1, 19, this.obj.vr4_5)
    },
    sel2_7 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 0, this.obj.vl2_7)
    },
    sel2_6 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 1, this.obj.vl2_6)
    },
    sel2_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 2, this.obj.vl2_5)
    },
    sel2_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 3, this.obj.vl2_4)
    },
    sel2_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 4, this.obj.vl2_3)
    },
    sel2_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 5, this.obj.vl2_2)
    },
    sel2_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 6, this.obj.vl2_1)
    },
    ser2_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 7, this.obj.vr2_1)
    },
    ser2_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 8, this.obj.vr2_2)
    },
    ser2_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 9, this.obj.vr2_3)
    },
    ser2_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 10, this.obj.vr2_4)
    },
    ser2_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 11, this.obj.vr2_5)
    },
    ser2_6 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 12, this.obj.vr2_6)
    },
    ser2_7 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 13, this.obj.vr2_7)
    },
    sel3_7 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 14, this.obj.vl3_7)
    },
    sel3_6 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 15, this.obj.vl3_6)
    },
    sel3_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 16, this.obj.vl3_5)
    },
    sel3_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 17, this.obj.vl3_4)
    },
    sel3_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 18, this.obj.vl3_3)
    },
    sel3_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 19, this.obj.vl3_2)
    },
    sel3_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 20, this.obj.vl3_1)
    },
    ser3_1 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 21, this.obj.vr3_1)
    },
    ser3_2 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 22, this.obj.vr3_2)
    },
    ser3_3 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 23, this.obj.vr3_3)
    },
    ser3_4 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 24, this.obj.vr3_4)
    },
    ser3_5 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 25, this.obj.vr3_5)
    },
    ser3_6 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 26, this.obj.vr3_6)
    },
    ser3_7 () {
      this.rea.qcrea = '4'
      this.$set(this.qcValue2, 27, this.obj.vr3_7)
    }
  },
  watch: {
    fill () {
      if (this.list.filter(item => item.projectName === '龋齿').length !== 0 && this.list.filter(item => item.projectName === '龋齿')[0].myProjectFlag === true) {
        this.obj = {
          vl1_5: '00',
          vl1_4: '00',
          vl1_3: '00',
          vl1_2: '00',
          vl1_1: '00',
          vr1_1: '00',
          vr1_2: '00',
          vr1_3: '00',
          vr1_4: '00',
          vr1_5: '00',
          vl2_7: '00',
          vl2_6: '00',
          vl2_5: '00',
          vl2_4: '00',
          vl2_3: '00',
          vl2_2: '00',
          vl2_1: '00',
          vr2_1: '00',
          vr2_2: '00',
          vr2_3: '00',
          vr2_4: '00',
          vr2_5: '00',
          vr2_6: '00',
          vr2_7: '00',
          vl3_7: '00',
          vl3_6: '00',
          vl3_5: '00',
          vl3_4: '00',
          vl3_3: '00',
          vl3_2: '00',
          vl3_1: '00',
          vr3_1: '00',
          vr3_2: '00',
          vr3_3: '00',
          vr3_4: '00',
          vr3_5: '00',
          vr3_6: '00',
          vr3_7: '00',
          vl4_5: '00',
          vl4_4: '00',
          vl4_3: '00',
          vl4_2: '00',
          vl4_1: '00',
          vr4_1: '00',
          vr4_2: '00',
          vr4_3: '00',
          vr4_4: '00',
          vr4_5: '00'
        }
        this.qcValue1 = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
        this.qcValue2 = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
      }
      if (this.list.filter(item => item.projectName === '牙龈').length !== 0 && this.list.filter(item => item.projectName === '牙龈')[0].myProjectFlag === true) {
        this.yyObj = {
          l1: '0',
          m1: '0',
          r1: '0',
          l2: '0',
          m2: '0',
          r2: '0'
        }
        this.yyValue1 = ['0', '0', '0', '0', '0', '0']
      }
      this.rea.yyrea = '4'
      this.rea.qcrea = '4'
    },
    yyValue1 () {
      this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '牙龈', flag: false, value1: '', value2: this.yyValue2, unexamReason: this.rea.yyrea })
      this.yyFlag = true
      this.yyValue1.forEach(item => {
        if (item !== '9') {
          this.yyFlag = false
        }
      })
      if (this.yyValue1.length === 0) {
        return
      } else {
        for (let i = 0; i < this.yyValue1.length; i++) {
          if (this.yyValue1[i] === undefined || this.yyValue1.length !== 6) {
            return
          }
        }
      }
      this.$emit('yyChange', { projectId: 'yy', id: this.list.filter(item => item.projectName === '牙龈')[0].id, name: '牙龈', flag: true, value1: this.yyValue1.join('_'), value2: this.yyValue2, unexamReason: this.rea.yyrea })
    },
    toothCheckout () {
      notice('请完成龋齿情况')
    },
    yyCheckout () {
      notice('请完成牙龈情况')
    },
    qcValue1 () {
      this.$emit('toothChange', { projectId: 'qc', id: this.list.filter(item => item.projectName === '龋齿')[0].id, name: '龋齿', flag: false, value1: '', value2: '', unexamReason: this.rea.qcrea })
      this.qcFlag = true
      this.qcValue1.forEach(item => {
        if (item !== '99') {
          this.qcFlag = false
        }
      })
      this.qcValue2.forEach(item => {
        if (item !== '99') {
          this.qcFlag = false
        }
      })
      if (this.qcValue1.length === 0) {
        return
      } else {
        for (let i = 0; i < this.qcValue1.length; i++) {
          if (this.qcValue1[i] === undefined || this.qcValue1.length !== 20) {
            return
          }
        }
      }
      if (this.qcValue2.length === 0) {
        return
      } else {
        for (let i = 0; i < this.qcValue2.length; i++) {
          if (this.qcValue2[i] === undefined || this.qcValue2.length !== 28) {
            return
          }
        }
      }
      this.$emit('toothChange', { projectId: 'qc', id: this.list.filter(item => item.projectName === '龋齿')[0].id, name: '龋齿', flag: true, value1: this.qcValue1.join('_'), value2: this.qcValue2.join('_'), unexamReason: this.rea.qcrea })
    },
    qcValue2 () {
      this.$emit('toothChange', { projectId: 'qc', id: this.list.filter(item => item.projectName === '龋齿')[0].id, name: '龋齿', flag: false, value1: '', value2: '', unexamReason: this.rea.qcrea })
      this.qcFlag = true
      this.qcValue1.forEach(item => {
        if (item !== '99') {
          this.qcFlag = false
        }
      })
      this.qcValue2.forEach(item => {
        if (item !== '99') {
          this.qcFlag = false
        }
      })
      if (this.qcValue1.length === 0) {
        return
      } else {
        for (let i = 0; i < this.qcValue1.length; i++) {
          if (this.qcValue1[i] === undefined || this.qcValue1.length !== 20) {
            return
          }
        }
      }
      if (this.qcValue2.length === 0) {
        return
      } else {
        for (let i = 0; i < this.qcValue2.length; i++) {
          if (this.qcValue2[i] === undefined || this.qcValue2.length !== 28) {
            return
          }
        }
      }
      this.$emit('toothChange', { projectId: 'qc', id: this.list.filter(item => item.projectName === '龋齿')[0].id, name: '龋齿', flag: true, value1: this.qcValue1.join('_'), value2: this.qcValue2.join('_'), unexamReason: this.rea.qcrea })
    },
    studentExam () {
      let data = this.studentExam.projectList
      this.list = data
      if (data.filter(item => item.projectName === '龋齿').length === 0 || data.filter(item => item.projectName === '龋齿')[0].myProjectFlag === false) {
        this.qcShow = false
      } else {
        this.qcShow = true
        this.options = this.myList.filter(item => item.projectName === '龋齿')[0].contentList.map(item => ({...item, res: item.code + '         ' + item.name}))
        // this.qcFlag = !data.filter(item => item.projectName === '龋齿')[0].flag
        if (data.filter(item => item.projectName === '龋齿')[0].flag) {
          this.qcFlag = false
          this.qcValue1 = data.filter(item => item.projectName === '龋齿')[0].value1.split('_')
          this.qcValue2 = data.filter(item => item.projectName === '龋齿')[0].value2.split('_')
          this.qcValue1.forEach(item => {
            if (item !== '99') {
              this.qcFlag = false
            }
          })
          this.qcValue2.forEach(item => {
            if (item !== '99') {
              this.qcFlag = false
            }
          })
        } else {
          this.qcFlag = true
        }
        if (data.filter(item => item.projectName === '龋齿').length !== 0) {
          this.rea.qcrea = data.filter(item => item.projectName === '龋齿')[0].unexamReason
          if (!this.qcFlag) {
            this.rea.qcrea = '4'
          }
        }
        if (!this.qcFlag) {
          this.qcValue1 = data.filter(item => item.projectName === '龋齿')[0].value1.split('_')
          this.qcValue2 = data.filter(item => item.projectName === '龋齿')[0].value2.split('_')
          this.obj = {
            vl1_5: this.qcValue1[0],
            vl1_4: this.qcValue1[1],
            vl1_3: this.qcValue1[2],
            vl1_2: this.qcValue1[3],
            vl1_1: this.qcValue1[4],
            vr1_1: this.qcValue1[5],
            vr1_2: this.qcValue1[6],
            vr1_3: this.qcValue1[7],
            vr1_4: this.qcValue1[8],
            vr1_5: this.qcValue1[9],
            vl2_7: this.qcValue2[0],
            vl2_6: this.qcValue2[1],
            vl2_5: this.qcValue2[2],
            vl2_4: this.qcValue2[3],
            vl2_3: this.qcValue2[4],
            vl2_2: this.qcValue2[5],
            vl2_1: this.qcValue2[6],
            vr2_1: this.qcValue2[7],
            vr2_2: this.qcValue2[8],
            vr2_3: this.qcValue2[9],
            vr2_4: this.qcValue2[10],
            vr2_5: this.qcValue2[11],
            vr2_6: this.qcValue2[12],
            vr2_7: this.qcValue2[13],
            vl3_7: this.qcValue2[14],
            vl3_6: this.qcValue2[15],
            vl3_5: this.qcValue2[16],
            vl3_4: this.qcValue2[17],
            vl3_3: this.qcValue2[18],
            vl3_2: this.qcValue2[19],
            vl3_1: this.qcValue2[20],
            vr3_1: this.qcValue2[21],
            vr3_2: this.qcValue2[22],
            vr3_3: this.qcValue2[23],
            vr3_4: this.qcValue2[24],
            vr3_5: this.qcValue2[25],
            vr3_6: this.qcValue2[26],
            vr3_7: this.qcValue2[27],
            vl4_5: this.qcValue1[10],
            vl4_4: this.qcValue1[11],
            vl4_3: this.qcValue1[12],
            vl4_2: this.qcValue1[13],
            vl4_1: this.qcValue1[14],
            vr4_1: this.qcValue1[15],
            vr4_2: this.qcValue1[16],
            vr4_3: this.qcValue1[17],
            vr4_4: this.qcValue1[18],
            vr4_5: this.qcValue1[19]
          }
        } else {
          this.qcValue1 = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
          this.qcValue2 = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
          this.obj = {
            vl1_5: this.qcValue1[0],
            vl1_4: this.qcValue1[1],
            vl1_3: this.qcValue1[2],
            vl1_2: this.qcValue1[3],
            vl1_1: this.qcValue1[4],
            vr1_1: this.qcValue1[5],
            vr1_2: this.qcValue1[6],
            vr1_3: this.qcValue1[7],
            vr1_4: this.qcValue1[8],
            vr1_5: this.qcValue1[9],
            vl2_7: this.qcValue2[0],
            vl2_6: this.qcValue2[1],
            vl2_5: this.qcValue2[2],
            vl2_4: this.qcValue2[3],
            vl2_3: this.qcValue2[4],
            vl2_2: this.qcValue2[5],
            vl2_1: this.qcValue2[6],
            vr2_1: this.qcValue2[7],
            vr2_2: this.qcValue2[8],
            vr2_3: this.qcValue2[9],
            vr2_4: this.qcValue2[10],
            vr2_5: this.qcValue2[11],
            vr2_6: this.qcValue2[12],
            vr2_7: this.qcValue2[13],
            vl3_7: this.qcValue2[14],
            vl3_6: this.qcValue2[15],
            vl3_5: this.qcValue2[16],
            vl3_4: this.qcValue2[17],
            vl3_3: this.qcValue2[18],
            vl3_2: this.qcValue2[19],
            vl3_1: this.qcValue2[20],
            vr3_1: this.qcValue2[21],
            vr3_2: this.qcValue2[22],
            vr3_3: this.qcValue2[23],
            vr3_4: this.qcValue2[24],
            vr3_5: this.qcValue2[25],
            vr3_6: this.qcValue2[26],
            vr3_7: this.qcValue2[27],
            vl4_5: this.qcValue1[10],
            vl4_4: this.qcValue1[11],
            vl4_3: this.qcValue1[12],
            vl4_2: this.qcValue1[13],
            vl4_1: this.qcValue1[14],
            vr4_1: this.qcValue1[15],
            vr4_2: this.qcValue1[16],
            vr4_3: this.qcValue1[17],
            vr4_4: this.qcValue1[18],
            vr4_5: this.qcValue1[19]
          }
        }
      }
      if (data.filter(item => item.projectName === '牙龈').length === 0 || data.filter(item => item.projectName === '牙龈')[0].myProjectFlag === false) {
        this.yyShow = false
      } else {
        this.yyShow = true
        this.yyOptions = this.myList.filter(item => item.projectName === '牙龈')[0].contentList.map(item => ({...item, res: item.code + '                                                         ' + item.name}))
        // this.yyFlag = !data.filter(item => item.projectName === '牙龈')[0].flag
        if (data.filter(item => item.projectName === '牙龈')[0].flag) {
          this.yyFlag = true
          this.yyValue1 = data.filter(item => item.projectName === '牙龈')[0].value1.split('_')
          this.yyValue1.forEach(item => {
            if (item !== '9') {
              this.yyFlag = false
            }
          })
        } else {
          this.yyFlag = true
        }
        if (data.filter(item => item.projectName === '牙龈')[0]) {
          this.yyValue2 = data.filter(item => item.projectName === '牙龈')[0].value2
          if (!data.filter(item => item.projectName === '牙龈')[0].value2) {
            this.yyValue2 = ''
          }
        } else {
          this.yyValue2 = ''
        }
        if (data.filter(item => item.projectName === '牙龈').length !== 0) {
          this.rea.yyrea = data.filter(item => item.projectName === '牙龈')[0].unexamReason
          if (!this.yyFlag) {
            this.rea.yyrea = '4'
          }
        }
        if (!this.yyFlag) {
          this.yyValue1 = data.filter(item => item.projectName === '牙龈')[0].value1.split('_')
          // this.yyValue2 = data.filter(item => item.projectName === '牙龈')[0].value2
          this.yyObj = {
            l1: this.yyValue1[0],
            m1: this.yyValue1[1],
            r1: this.yyValue1[2],
            l2: this.yyValue1[3],
            m2: this.yyValue1[4],
            r2: this.yyValue1[5]
          }
        } else {
          this.yyValue1 = ['0', '0', '0', '0', '0', '0']
          // this.yyValue2 = ''
          this.yyObj = {
            l1: this.yyValue1[0],
            m1: this.yyValue1[1],
            r1: this.yyValue1[2],
            l2: this.yyValue1[3],
            m2: this.yyValue1[4],
            r2: this.yyValue1[5]
          }
        }
        // this.yyShow = true
        // this.yyOptions = this.myList.filter(item => item.projectName === '牙龈')[0].contentList.map(item => ({...item, res: item.code + '                                            ' + item.name}))
        // if (data.filter(item => item.projectName === '牙龈')[0].value1) {
        //   this.yyFlag = false
        // } else {
        //   this.yyFlag = true
        // }
        // if (!this.yyFlag) {
        //   this.yyValue1 = data.filter(item => item.projectName === '牙龈')[0].value1.split('_')
        //   this.yyObj = {
        //     l1: this.yyValue1[0],
        //     m1: this.yyValue1[1],
        //     r1: this.yyValue1[2],
        //     l2: this.yyValue1[3],
        //     m2: this.yyValue1[4],
        //     r2: this.yyValue1[5]
        //   }
        // }
        // this.yyValue2 = data.filter(item => item.projectName === '牙龈')[0].value2
      }
    }
  },
  created () {
    setTimeout(() => {
      let data = this.studentExam.projectList
      this.list = data
      if (data.filter(item => item.projectName === '龋齿').length === 0 || data.filter(item => item.projectName === '龋齿')[0].myProjectFlag === false) {
        this.qcShow = false
      } else {
        this.qcShow = true
        this.options = this.myList.filter(item => item.projectName === '龋齿')[0].contentList.map(item => ({...item, res: item.code + '         ' + item.name}))
        // this.qcFlag = !data.filter(item => item.projectName === '龋齿')[0].flag
        if (data.filter(item => item.projectName === '龋齿')[0].flag) {
          this.qcFlag = false
          this.qcValue1 = data.filter(item => item.projectName === '龋齿')[0].value1.split('_')
          this.qcValue2 = data.filter(item => item.projectName === '龋齿')[0].value2.split('_')
          this.qcValue1.forEach(item => {
            if (item !== '99') {
              this.qcFlag = false
            }
          })
          this.qcValue2.forEach(item => {
            if (item !== '99') {
              this.qcFlag = false
            }
          })
        } else {
          this.qcFlag = true
        }
        if (data.filter(item => item.projectName === '龋齿').length !== 0) {
          this.rea.qcrea = data.filter(item => item.projectName === '龋齿')[0].unexamReason
          if (!this.qcFlag) {
            this.rea.qcrea = '4'
          }
        }
        if (!this.qcFlag) {
          this.qcValue1 = data.filter(item => item.projectName === '龋齿')[0].value1.split('_')
          this.qcValue2 = data.filter(item => item.projectName === '龋齿')[0].value2.split('_')
          this.obj = {
            vl1_5: this.qcValue1[0],
            vl1_4: this.qcValue1[1],
            vl1_3: this.qcValue1[2],
            vl1_2: this.qcValue1[3],
            vl1_1: this.qcValue1[4],
            vr1_1: this.qcValue1[5],
            vr1_2: this.qcValue1[6],
            vr1_3: this.qcValue1[7],
            vr1_4: this.qcValue1[8],
            vr1_5: this.qcValue1[9],
            vl2_7: this.qcValue2[0],
            vl2_6: this.qcValue2[1],
            vl2_5: this.qcValue2[2],
            vl2_4: this.qcValue2[3],
            vl2_3: this.qcValue2[4],
            vl2_2: this.qcValue2[5],
            vl2_1: this.qcValue2[6],
            vr2_1: this.qcValue2[7],
            vr2_2: this.qcValue2[8],
            vr2_3: this.qcValue2[9],
            vr2_4: this.qcValue2[10],
            vr2_5: this.qcValue2[11],
            vr2_6: this.qcValue2[12],
            vr2_7: this.qcValue2[13],
            vl3_7: this.qcValue2[14],
            vl3_6: this.qcValue2[15],
            vl3_5: this.qcValue2[16],
            vl3_4: this.qcValue2[17],
            vl3_3: this.qcValue2[18],
            vl3_2: this.qcValue2[19],
            vl3_1: this.qcValue2[20],
            vr3_1: this.qcValue2[21],
            vr3_2: this.qcValue2[22],
            vr3_3: this.qcValue2[23],
            vr3_4: this.qcValue2[24],
            vr3_5: this.qcValue2[25],
            vr3_6: this.qcValue2[26],
            vr3_7: this.qcValue2[27],
            vl4_5: this.qcValue1[10],
            vl4_4: this.qcValue1[11],
            vl4_3: this.qcValue1[12],
            vl4_2: this.qcValue1[13],
            vl4_1: this.qcValue1[14],
            vr4_1: this.qcValue1[15],
            vr4_2: this.qcValue1[16],
            vr4_3: this.qcValue1[17],
            vr4_4: this.qcValue1[18],
            vr4_5: this.qcValue1[19]
          }
        } else {
          this.qcValue1 = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
          this.qcValue2 = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
          this.obj = {
            vl1_5: this.qcValue1[0],
            vl1_4: this.qcValue1[1],
            vl1_3: this.qcValue1[2],
            vl1_2: this.qcValue1[3],
            vl1_1: this.qcValue1[4],
            vr1_1: this.qcValue1[5],
            vr1_2: this.qcValue1[6],
            vr1_3: this.qcValue1[7],
            vr1_4: this.qcValue1[8],
            vr1_5: this.qcValue1[9],
            vl2_7: this.qcValue2[0],
            vl2_6: this.qcValue2[1],
            vl2_5: this.qcValue2[2],
            vl2_4: this.qcValue2[3],
            vl2_3: this.qcValue2[4],
            vl2_2: this.qcValue2[5],
            vl2_1: this.qcValue2[6],
            vr2_1: this.qcValue2[7],
            vr2_2: this.qcValue2[8],
            vr2_3: this.qcValue2[9],
            vr2_4: this.qcValue2[10],
            vr2_5: this.qcValue2[11],
            vr2_6: this.qcValue2[12],
            vr2_7: this.qcValue2[13],
            vl3_7: this.qcValue2[14],
            vl3_6: this.qcValue2[15],
            vl3_5: this.qcValue2[16],
            vl3_4: this.qcValue2[17],
            vl3_3: this.qcValue2[18],
            vl3_2: this.qcValue2[19],
            vl3_1: this.qcValue2[20],
            vr3_1: this.qcValue2[21],
            vr3_2: this.qcValue2[22],
            vr3_3: this.qcValue2[23],
            vr3_4: this.qcValue2[24],
            vr3_5: this.qcValue2[25],
            vr3_6: this.qcValue2[26],
            vr3_7: this.qcValue2[27],
            vl4_5: this.qcValue1[10],
            vl4_4: this.qcValue1[11],
            vl4_3: this.qcValue1[12],
            vl4_2: this.qcValue1[13],
            vl4_1: this.qcValue1[14],
            vr4_1: this.qcValue1[15],
            vr4_2: this.qcValue1[16],
            vr4_3: this.qcValue1[17],
            vr4_4: this.qcValue1[18],
            vr4_5: this.qcValue1[19]
          }
          this.rea.qcrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '牙龈').length === 0 || data.filter(item => item.projectName === '牙龈')[0].myProjectFlag === false) {
        this.yyShow = false
      } else {
        this.yyShow = true
        this.yyOptions = this.myList.filter(item => item.projectName === '牙龈')[0].contentList.map(item => ({...item, res: item.code + '                                                         ' + item.name}))
        // this.yyFlag = !data.filter(item => item.projectName === '牙龈')[0].flag
        if (data.filter(item => item.projectName === '牙龈')[0].flag) {
          this.yyFlag = true
          this.yyValue1 = data.filter(item => item.projectName === '牙龈')[0].value1.split('_')
          this.yyValue1.forEach(item => {
            if (item !== '9') {
              this.yyFlag = false
            }
          })
        } else {
          this.yyFlag = true
        }
        if (data.filter(item => item.projectName === '牙龈')[0]) {
          this.yyValue2 = data.filter(item => item.projectName === '牙龈')[0].value2
          if (!data.filter(item => item.projectName === '牙龈')[0].value2) {
            this.yyValue2 = ''
          }
        } else {
          this.yyValue2 = ''
        }
        if (data.filter(item => item.projectName === '牙龈').length !== 0) {
          this.rea.yyrea = data.filter(item => item.projectName === '牙龈')[0].unexamReason
          if (!this.yyFlag) {
            this.rea.yyrea = '4'
          }
        }
        if (!this.yyFlag) {
          this.yyValue1 = data.filter(item => item.projectName === '牙龈')[0].value1.split('_')
          // this.yyValue2 = data.filter(item => item.projectName === '牙龈')[0].value2
          this.yyObj = {
            l1: this.yyValue1[0],
            m1: this.yyValue1[1],
            r1: this.yyValue1[2],
            l2: this.yyValue1[3],
            m2: this.yyValue1[4],
            r2: this.yyValue1[5]
          }
        } else {
          this.yyValue1 = ['0', '0', '0', '0', '0', '0']
          // this.yyValue2 = ''
          this.yyObj = {
            l1: this.yyValue1[0],
            m1: this.yyValue1[1],
            r1: this.yyValue1[2],
            l2: this.yyValue1[3],
            m2: this.yyValue1[4],
            r2: this.yyValue1[5]
          }
          this.rea.yyrea = '4'
        }
        // this.yyShow = true
        // this.yyOptions = this.myList.filter(item => item.projectName === '牙龈')[0].contentList.map(item => ({...item, res: item.code + '                                            ' + item.name}))
        // if (data.filter(item => item.projectName === '牙龈')[0].value1) {
        //   this.yyFlag = false
        // } else {
        //   this.yyFlag = true
        // }
        // if (!this.yyFlag) {
        //   this.yyValue1 = data.filter(item => item.projectName === '牙龈')[0].value1.split('_')
        //   this.yyObj = {
        //     l1: this.yyValue1[0],
        //     m1: this.yyValue1[1],
        //     r1: this.yyValue1[2],
        //     l2: this.yyValue1[3],
        //     m2: this.yyValue1[4],
        //     r2: this.yyValue1[5]
        //   }
        // }
        // this.yyValue2 = data.filter(item => item.projectName === '牙龈')[0].value2
      }
    }, 400)
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.tooth {
  .table-1 {
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    margin-top: 20px;
    td,th {
      width: 40px;
      height: 40px;
      padding: 0 5px;
      box-sizing: border-box;
      text-align: center;
      border-color: #EEEEEE;
      color: #4D4D4D;
    }
    .el-input {
      width: 95%;
      .el-input__inner {
        height: 30px;
        padding-right: 15px;
        padding-left: 5px;
      }
      .el-select__caret {
        width: 15px;
      }
    }
    thead {
      background: #ABC1FE;
      th {
        color: #fff;
        border: 0;
      }
    }
    tbody {
      td:nth-child(9) {
        width: 10px;
      }
      td:last-child {
        border-right-color: #eee
      }
      tr:nth-child(1) {
        td:nth-child(1) {
          background: #E6E6E6;
        }
      }
      tr:nth-child(3),tr:nth-child(6) {
        td {
          height: 5px;
        }
      }
      tr:last-child {
        border-bottom-color: #eee;
        td {
          text-align: left;
          padding-left: 20px;
          .dropdownMini {
            .el-button--primary:first-child {
              padding: 6px 10px;
            }
            .el-button--primary:last-child {
             padding: 6px 5px;
           }
         }
        }
      }
    }
  }

  .table-2 {
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    td,th {
      width: 40px;
      height: 40px;
      padding: 0 5px;
      box-sizing: border-box;
      text-align: center;
      border-color: #EEEEEE;
      color: #4D4D4D;
    }
    thead {
      background: #ABC1FE;
      th {
        color: #fff;
        border: 0;
      }
    }
    tbody {
      tr:nth-child(1) {
        td:nth-child(1) {
          background: #E6E6E6;
          width: 4%;
        }
      }
      tr:last-child, tr:nth-child(3) {
        td {
          text-align: left;
          padding-left: 20px;
          .el-input {
            width: 200px;
          }
          .dropdownMini {
            .el-button--primary:first-child {
              padding: 6px 10px;
            }
            .el-button--primary:last-child {
             padding: 6px 5px;
           }
         }
        }
      }
      td {
        padding: 5px;
        .el-input__inner {
          height: 36px;
        }
      }
      tr:nth-child(1) {
        td {
          width: 20%;
        }
        td:nth-child(3),td:nth-child(5) {
          width: 1%;
        }
      }
      tr:nth-child(4) {
        td {
          border-left: 1px solid #E6E6E6;
        }
      }
    }
  }
}
</style>
