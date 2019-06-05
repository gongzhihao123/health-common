<template>
  <div class="single-project">
    <table class="table-1" border="1" cellspacing="0" width="100%">
      <thead v-if="obj.sgFlag !== 'wu' || obj.tzFlag !== 'wu' || obj.tjFlag !== 'wu' || obj.jzFlag !== 'wu' || obj.pfFlag !== 'wu' || obj.szgjFlag !== 'wu' || obj.xbFlag !== 'wu' || obj.xzFlag !== 'wu' || obj.fFlag !== 'wu' || obj.gpFlag !== 'wu' || obj.xlFlag !== 'wu' || obj.fhlFlag !== 'wu' || obj.xssFlag !== 'wu' || obj.syFlag !== 'wu' || obj.sjFlag !== 'wu' || obj.jmyFlag !== 'wu' || obj.ggnFlag !== 'wu' || obj.bjFlag !== 'wu' || obj.ppdFlag !== 'wu'">
        <tr>
          <th style="width:20%">体检项目</th>
          <th style="width:20%">上次参考值</th>
          <th>本次结果</th>
          <th style="width:30%">暂未检测原因</th>
        </tr>
      </thead>
      <tbody @click="tabBut">
        <!-- 身高 -->
        <tr v-if="obj.sgFlag !== 'wu'">
          <td>
            身高
          </td>
          <td>
            {{ path.sg }}
          </td>
          <td>
            <el-input class="input_focus" ref="sg" v-model.trim="sgVal" @blur="sgBlur"></el-input> cm
          </td>
          <td>
            <!-- <el-checkbox @change="sgChange" v-model="obj.sgFlag"></el-checkbox> -->
           <!-- <el-button @click="show1 = !show1" type="warning" size='small'>显示原因</el-button> -->
             <!-- <transition name="fade">
            <div v-if="show1" style="display: inline-block;">
              <el-tag :type="rea.sgrea == '1' ? '' : 'info'" @click="sgChange('1')">被检人不配合</el-tag>
              <el-tag :type="rea.sgrea == '2' ? '' : 'info'" @click="sgChange('2')">身体异常</el-tag>
              <el-tag :type="rea.sgrea == '3' ? '' : 'info'" @click="sgChange('3')">其他</el-tag>
            </div>
            </transition> -->
            <el-dropdown split-button type="primary" @command="sgChange">
              <span >{{this.rea.sgrea == '1' ? '被检人不配合' : this.rea.sgrea == '2' ? '身体原因' : this.rea.sgrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" tabindex='-1'>
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 体重 -->
        <tr v-if="obj.tzFlag !== 'wu'">
          <td>
            体重
          </td>
          <td>
            {{ path.tz }}
          </td>
          <td>
            <el-input class="input_focus" ref="tz" v-model.trim="tzVal" @blur="tzBlur"></el-input> kg
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.tzFlag" @change="tzChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="tzChange">
              <span >{{this.rea.tzrea == '1' ? '被检人不配合' : this.rea.tzrea == '2' ? '身体原因' : this.rea.tzrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 头颈 -->
        <tr v-if="obj.tjFlag !== 'wu'">
          <td>
            头颈
          </td>
          <td>
            {{ path.tj }}
          </td>
          <td>
            <el-select @change="tjSel" v-model="tjVal" placeholder="请选择">
              <el-option
                v-for="item in tjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="tj" @blur="tjBlur" v-if="tjVal === '4'" v-model.trim="tjOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.tjFlag" @change="tjChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="tjChange">
              <span >{{this.rea.tjrea == '1' ? '被检人不配合' : this.rea.tjrea == '2' ? '身体原因' : this.rea.tjrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 脊柱 -->
        <tr v-if="obj.jzFlag !== 'wu'">
          <td>
            脊柱
          </td>
          <td>
            {{ path.jz }}
          </td>
          <td>
            <el-select @change="jzSel" v-model="jzVal" placeholder="请选择">
              <el-option
                v-for="item in jzOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="jz" @blur="jzBlur" v-if="jzVal === '4'" v-model.trim="jzOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.jzFlag" @change="jzChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="jzChange">
              <span >{{this.rea.jzrea == '1' ? '被检人不配合' : this.rea.jzrea == '2' ? '身体原因' : this.rea.jzrea == '4' ? '已体检' : '其他' }}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 皮肤 -->
        <tr v-if="obj.pfFlag !== 'wu'">
          <td>
            皮肤
          </td>
          <td>
            {{ path.pf }}
          </td>
          <td>
            <el-select @change="pfSel" v-model="pfVal" placeholder="请选择">
              <el-option
                v-for="item in pfOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="pf" @blur="pfBlur" v-if="pfVal === '5'" v-model.trim="pfOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.pfFlag" @change="pfChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="pfChange">
              <span >{{this.rea.pfrea == '1' ? '被检人不配合' : this.rea.pfrea == '2' ? '身体原因' : this.rea.pfrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" tabindex="-1">
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 四肢关节 -->
        <tr v-if="obj.szgjFlag !== 'wu'">
          <td>
            四肢关节
          </td>
          <td>
            {{ path.szgj }}
          </td>
          <td>
            <el-select @change="szgjSel" v-model="szgjVal" placeholder="请选择">
              <el-option
                v-for="item in szgjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="szgj" @blur="szgjBlur" v-if="szgjVal === '2'" v-model.trim="szgjOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.szgjFlag" @change="szgjChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="szgjChange">
              <span >{{this.rea.szgjrea == '1' ? '被检人不配合' : this.rea.szgjrea == '2' ? '身体原因' : this.rea.szgjrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 胸部 -->
        <tr v-if="obj.xbFlag !== 'wu'">
          <td>
            胸部
          </td>
          <td>
            {{ path.xb }}
          </td>
          <td>
            <el-select @change="xbSel" v-model="xbVal" placeholder="请选择">
              <el-option
                v-for="item in xbOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="xb" @blur="xbBlur" v-if="xbVal === '4'" v-model.trim="xbOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.xbFlag" @change="xbChange"></el-checkbox> -->
           <el-dropdown split-button type="primary" @command="xbChange">
              <span >{{this.rea.xbrea == '1' ? '被检人不配合' : this.rea.xbrea == '2' ? '身体原因' : this.rea.xbrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 心脏 -->
        <tr v-if="obj.xzFlag !== 'wu'">
          <td>
            心脏
          </td>
          <td>
            {{ path.xz }}
          </td>
          <td>
            <el-select @change="xzSel" v-model="xzVal" placeholder="请选择">
              <el-option
                v-for="item in xzOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="xz" @blur="xzBlur" v-if="xzVal === '9'" v-model.trim="xzOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.xzFlag" @change="xzChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="xzChange">
              <span >{{this.rea.xzrea == '1' ? '被检人不配合' : this.rea.xzrea == '2' ? '身体原因' : this.rea.xzrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 肺 -->
        <tr v-if="obj.fFlag !== 'wu'">
          <td>
            肺
          </td>
          <td>
            {{ path.f }}
          </td>
          <td>
            <el-select @change="fSel" v-model="fVal" placeholder="请选择">
              <el-option
                v-for="item in fOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="f" @blur="fBlur" v-if="fVal === '5'" v-model.trim="fOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.fFlag" @change="fChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="fChange">
              <span >{{this.rea.frea == '1' ? '被检人不配合' : this.rea.frea == '2' ? '身体原因' : this.rea.frea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 肝脾 -->
        <tr v-if="obj.gpFlag !== 'wu'">
          <td>
            肝脾
          </td>
          <td>
            {{ path.gp }}
          </td>
          <td>
            <el-select @change="gpSel" v-model="gpVal" placeholder="请选择">
              <el-option
                v-for="item in gpOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="gp" @blur="gpBlur" v-if="gpVal === '100'" v-model.trim="gpOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.gpFlag" @change="gpChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="gpChange">
              <span >{{this.rea.gprea == '1' ? '被检人不配合' : this.rea.gprea == '2' ? '身体原因' : this.rea.gprea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 心率 -->
        <tr v-if="obj.xlFlag !== 'wu'">
          <td>
            脉搏
          </td>
          <td>
            {{ path.xl }}
          </td>
          <td>
            <!-- <el-select @change="xlSel" v-model="xlVal" placeholder="请选择">
              <el-option
                v-for="item in xlOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> -->
            <el-input ref="xl" class="input_focus" @blur="xlBlur" v-model.trim="xlVal"></el-input> 次/分
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.xlFlag" @change="xlChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="xlChange">
              <span >{{this.rea.xlrea == '1' ? '被检人不配合' : this.rea.xlrea == '2' ? '身体原因' : this.rea.xlrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 肺活量 -->
        <tr v-if="obj.fhlFlag !== 'wu'">
          <td>
            肺活量
          </td>
          <td>
            {{ path.fhl }}
          </td>
          <td>
            <el-input ref="fhl" class="input_focus" v-model.trim="fhlVal" @blur="fhlBlur"></el-input> ml
          </td>
          <td>
            <!-- <el-checkbox @change="fhlChange" v-model="obj.fhlFlag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="fhlChange">
              <span >{{this.rea.fhlrea == '1' ? '被检人不配合' : this.rea.fhlrea == '2' ? '身体原因' : this.rea.fhlrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 血色素 -->
        <tr v-if="obj.xssFlag !== 'wu'">
          <td>
            血色素
          </td>
          <td>
            {{ path.xss }}
          </td>
          <td>
            <el-input  ref="xss" class="input_focus" v-model.trim="xssVal" @blur="xssBlur"></el-input>
          </td>
          <td>
            <!-- <el-checkbox @change="xssChange" v-model="obj.xssFlag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="xssChange">
              <span >{{this.rea.xssrea == '1' ? '被检人不配合' : this.rea.xssrea == '2' ? '身体原因' : this.rea.xssrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 沙眼 -->
        <tr v-if="obj.syFlag !== 'wu'">
          <td>
            沙眼
          </td>
          <td>
            {{ path.sy }}
          </td>
          <td>
            <el-select @change="sySel" v-model="syVal" placeholder="请选择">
              <el-option
                v-for="item in syOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="sy" @blur="syBlur" v-if="syVal === '100'" v-model.trim="syOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.syFlag" @change="syChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="syChange">
              <span >{{this.rea.syrea == '1' ? '被检人不配合' : this.rea.syrea == '2' ? '身体原因' : this.rea.syrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 色觉 -->
        <tr v-if="obj.sjFlag !== 'wu'">
          <td>
            色觉
          </td>
          <td>
            {{ path.sj }}
          </td>
          <td>
            <el-select @change="sjSel" v-model="sjVal" placeholder="请选择">
              <el-option
                v-for="item in sjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="sj" @blur="sjBlur" v-if="sjVal === '100'" v-model.trim="sjOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.sjFlag" @change="sjChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="sjChange">
              <span >{{this.rea.sjrea == '1' ? '被检人不配合' : this.rea.sjrea == '2' ? '身体原因' : this.rea.sjrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 结膜炎 -->
        <tr v-if="obj.jmyFlag !== 'wu'">
          <td>
            结膜炎
          </td>
          <td>
            {{ path.jmy }}
          </td>
          <td>
            <el-select @change="jmySel" v-model="jmyVal" placeholder="请选择">
              <el-option
                v-for="item in jmyOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="jmy" @blur="jmyBlur" v-if="jmyVal === '100'" v-model.trim="jmyOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.jmyFlag" @change="jmyChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="jmyChange">
              <span >{{this.rea.jmyrea == '1' ? '被检人不配合' : this.rea.jmyrea == '2' ? '身体原因' : this.rea.jmyrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 肝功能 -->
        <tr v-if="obj.ggnFlag !== 'wu'">
          <td>
            肝功能
          </td>
          <td>
            {{ path.ggn }}
          </td>
          <td>
            <el-select @change="ggnSel" v-model="ggnVal" placeholder="请选择">
              <el-option
                v-for="item in ggnOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="ggn" @blur="ggnBlur" v-if="ggnVal === '100'" v-model.trim="ggnOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.ggnFlag" @change="ggnChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="ggnChange">
              <span >{{this.rea.ggnrea == '1' ? '被检人不配合' : this.rea.ggnrea == '2' ? '身体原因' : this.rea.ggnrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 便检 -->
        <tr v-if="obj.bjFlag !== 'wu'">
          <td>
            便检
          </td>
          <td>
            {{ path.bj }}
          </td>
          <td>
            <el-select @change="bjSel" v-model="bjVal" placeholder="请选择">
              <el-option
                v-for="item in bjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="bj" @blur="bjBlur" v-if="bjVal === '100'" v-model.trim="bjOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.bjFlag" @change="bjChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="bjChange">
              <span >{{this.rea.bjrea == '1' ? '被检人不配合' : this.rea.bjrea == '2' ? '身体原因' : this.rea.bjrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- ppd试验 -->
        <tr v-if="obj.ppdFlag !== 'wu'">
          <td>
            ppd试验
          </td>
          <td>
            {{ path.ppd }}
          </td>
          <td>
            <el-select @change="ppdSel" v-model="ppdVal" placeholder="请选择">
              <el-option
                v-for="item in ppdOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input ref="ppd" @blur="ppdBlur" v-if="ppdVal === '100'" v-model.trim="ppdOther" :maxlength="50"></el-input>
          </td>
          <td>
            <!-- <el-checkbox v-model="obj.ppdFlag" @change="ppdChange"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="ppdChange">
              <span >{{this.rea.ppdrea == '1' ? '被检人不配合' : this.rea.ppdrea == '2' ? '身体原因' : this.rea.ppdrea == '4' ? '已体检' : '其他'}}</span>
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

    <table v-if="obj.jzslFlag !== 'wu' || obj.slFlag !== 'wu' || obj.xy1Flag !== 'wu' || obj.xy2Flag !== 'wu'" class="table-2" border="1" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th style="width:20%">体检项目</th>
          <th style="width:20%">上次参考值</th>
          <th>本次结果</th>
          <th style="width:20%">暂未检测原因</th>
          <!-- <th>体检项目</th>
          <th>上次参考值</th>
          <th style="width:20%">本次结果</th>
          <th style="width:8%">暂未检测</th> -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-if="obj.slFlag !== 'wu'" rowspan="2">
            裸眼视力
          </td>
          <td v-if="obj.slFlag !== 'wu'">
            {{ path.sly }}
          </td>
          <td v-if="obj.slFlag !== 'wu'">
            右 <el-input @blur="slyBlur" class="input_focus sly" ref="sly" v-model="slyVal"></el-input>
          </td>
          <td v-if="obj.slFlag !== 'wu'" rowspan="2">
            <!-- <el-checkbox @change="slChange" v-model="obj.slFlag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="slChange">
              <span >{{this.rea.slrea == '1' ? '被检人不配合' : this.rea.slrea == '2' ? '身体原因' : this.rea.slrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <!-- <td rowspan="2" v-if="obj.jzslFlag !== 'wu'">
            矫正视力
          </td>
          <td v-if="obj.jzslFlag !== 'wu'">
            {{ path.jzsly }}
          </td>
          <td v-if="obj.jzslFlag !== 'wu'">
            右 <el-input @blur="jzslyBlur" class="input_focus" ref="jzsly" v-model="jzslyVal"></el-input>
          </td>
          <td rowspan="2" v-if="obj.jzslFlag !== 'wu'">
            <el-checkbox @change="jzslChange" v-model="obj.jzslFlag"></el-checkbox>
          </td> -->
        </tr>
        <tr>
          <td v-if="obj.slFlag !== 'wu'">
            {{ path.slz }}
          </td>
          <td  v-if="obj.slFlag !== 'wu'">
            左 <el-input @blur="slzBlur" class="input_focus slz" ref="slz" v-model="slzVal"></el-input>
          </td>
          <!-- <td v-if="obj.jzslFlag !== 'wu'">
            {{ path.jzslz }}
          </td>
          <td v-if="obj.jzslFlag !== 'wu'">
            左<el-input @blur="jzslzBlur" class="input_focus" ref="jzslz" v-model="jzslzVal"></el-input>
          </td> -->
        </tr>
        <tr>
          <!-- <td v-if="obj.slFlag !== 'wu'" rowspan="2">
            裸眼视力
          </td>
          <td v-if="obj.slFlag !== 'wu'">
            {{ path.sly }}
          </td>
          <td v-if="obj.slFlag !== 'wu'">
            右 <el-input @blur="slyBlur" class="input_focus sly" ref="sly" v-model="slyVal"></el-input>
          </td>
          <td v-if="obj.slFlag !== 'wu'" rowspan="2">
            <el-checkbox @change="slChange" v-model="obj.slFlag"></el-checkbox>
          </td> -->
          <td rowspan="2" v-if="obj.jzslFlag !== 'wu'">
            矫正视力
          </td>
          <td v-if="obj.jzslFlag !== 'wu'">
            {{ path.jzsly }}
          </td>
          <td v-if="obj.jzslFlag !== 'wu'">
            右 <el-input @blur="jzslyBlur" class="input_focus" ref="jzsly" v-model="jzslyVal"></el-input>
          </td>
          <td rowspan="2" v-if="obj.jzslFlag !== 'wu'">
            <!-- <el-checkbox @change="jzslChange" v-model="obj.jzslFlag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="jzslChange">
              <span >{{this.rea.jzslrea == '1' ? '被检人不配合' : this.rea.jzslrea == '2' ? '身体原因' : this.rea.jzslrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <tr>
          <!-- <td v-if="obj.slFlag !== 'wu'">
            {{ path.slz }}
          </td>
          <td  v-if="obj.slFlag !== 'wu'">
            左 <el-input @blur="slzBlur" class="input_focus slz" ref="slz" v-model="slzVal"></el-input>
          </td> -->
          <td v-if="obj.jzslFlag !== 'wu'">
            {{ path.jzslz }}
          </td>
          <td v-if="obj.jzslFlag !== 'wu'">
            左<el-input @blur="jzslzBlur" class="input_focus" ref="jzslz" v-model="jzslzVal"></el-input>
          </td>
        </tr>

        <tr>
          <td rowspan="2" v-if="obj.xy1Flag !== 'wu'">
            血压1
          </td>
          <td  v-if="obj.xy1Flag !== 'wu'">
            {{ path.xy1ss }}
          </td>
          <td  v-if="obj.xy1Flag !== 'wu'">
            收缩压1 <el-input @blur="xy1ssBlur" class="input_focus xy xy1ss" ref="xy1ss" v-model="xy1ssVal"></el-input> mmHg
          </td>
          <td rowspan="2" v-if="obj.xy1Flag !== 'wu'">
            <!-- <el-checkbox @change="xy1Change" v-model="obj.xy1Flag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="xy1Change">
              <span >{{this.rea.xy1rea == '1' ? '被检人不配合' : this.rea.xy1rea == '2' ? '身体原因' : this.rea.xy1rea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <!-- <td rowspan="2" v-if="obj.xy2Flag !== 'wu'">
            血压2
          </td>
          <td v-if="obj.xy2Flag !== 'wu'">
            {{ path.xy2ss }}
          </td>
          <td v-if="obj.xy2Flag !== 'wu'">
            收缩压2 <el-input @blur="xy2ssBlur" class="input_focus xy" ref="xy2ss" v-model="xy2ssVal"></el-input> mmHg
          </td>
          <td rowspan="2" v-if="obj.xy2Flag !== 'wu'">
            <el-checkbox @change="xy2Change" v-model="obj.xy2Flag"></el-checkbox>
          </td> -->
        </tr>
        <tr>
          <td v-if="obj.xy1Flag !== 'wu'">
            {{ path.xy1sz }}
          </td>
          <td v-if="obj.xy1Flag !== 'wu'">
            舒张压1 <el-input @blur="xy1szBlur" class="input_focus xy xy1sz" ref="xy1sz" v-model="xy1szVal"></el-input> mmHg
          </td>
          <!-- <td v-if="obj.xy2Flag !== 'wu'">
            {{ path.xy2sz }}
          </td>
          <td v-if="obj.xy2Flag !== 'wu'">
            舒张压2 <el-input @blur="xy2szBlur" class="input_focus xy xy2sz" ref="xy2sz" v-model="xy2szVal"></el-input> mmHg
          </td> -->
        </tr>
        <tr>
          <!-- <td rowspan="2" v-if="obj.xy1Flag !== 'wu'">
            血压1
          </td>
          <td  v-if="obj.xy1Flag !== 'wu'">
            {{ path.xy1ss }}
          </td>
          <td  v-if="obj.xy1Flag !== 'wu'">
            收缩压1 <el-input @blur="xy1ssBlur" class="input_focus xy xy1ss" ref="xy1ss" v-model="xy1ssVal"></el-input> mmHg
          </td>
          <td rowspan="2" v-if="obj.xy1Flag !== 'wu'">
            <el-checkbox @change="xy1Change" v-model="obj.xy1Flag"></el-checkbox>
          </td> -->
          <td rowspan="2" v-if="obj.xy2Flag !== 'wu'">
            血压2
          </td>
          <td v-if="obj.xy2Flag !== 'wu'">
            {{ path.xy2ss }}
          </td>
          <td v-if="obj.xy2Flag !== 'wu'">
            收缩压2 <el-input @blur="xy2ssBlur" class="input_focus xy" ref="xy2ss" v-model="xy2ssVal"></el-input> mmHg
          </td>
          <td rowspan="2" v-if="obj.xy2Flag !== 'wu'">
            <!-- <el-checkbox @change="xy2Change" v-model="obj.xy2Flag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="xy2Change">
              <span >{{this.rea.xy2rea == '1' ? '被检人不配合' : this.rea.xy2rea == '2' ? '身体原因' : this.rea.xy2rea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <tr>
          <!-- <td v-if="obj.xy1Flag !== 'wu'">
            {{ path.xy1sz }}
          </td>
          <td v-if="obj.xy1Flag !== 'wu'">
            舒张压1 <el-input @blur="xy1szBlur" class="input_focus xy xy1sz" ref="xy1sz" v-model="xy1szVal"></el-input> mmHg
          </td> -->
          <td v-if="obj.xy2Flag !== 'wu'">
            {{ path.xy2sz }}
          </td>
          <td v-if="obj.xy2Flag !== 'wu'">
            舒张压2 <el-input @blur="xy2szBlur" class="input_focus xy xy2sz" ref="xy2sz" v-model="xy2szVal"></el-input> mmHg
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { notice } from '../utils/index'
export default {
  name: 'single-project',
  data () {
    return {
      list: [],
      obj: {
        xzFlag: false,
        fFlag: false,
        gpFlag: false,
        xlFlag: false,
        sgFlag: false,
        tzFlag: false,
        tjFlag: false,
        jzFlag: false,
        pfFlag: false,
        szgjFlag: false,
        xbFlag: false,
        fhlFlag: false,
        xssFlag: false,
        ggnFlag: false,
        bjFlag: false,
        xy1Flag: false,
        xy2Flag: false,
        ppdFlag: false,
        slFlag: false,
        jzslFlag: false,
        syFlag: false,
        sjFlag: false,
        jmyFlag: false
      },
      path: {
        xz: '',
        f: '',
        gp: '',
        xl: '',
        sg: '',
        tz: '',
        tj: '',
        jz: '',
        pf: '',
        szgj: '',
        xb: '',
        fhl: '',
        xss: '',
        ggn: '',
        bj: '',
        xy1: '',
        xy2: '',
        ppd: '',
        sl: '',
        jzsl: '',
        sy: '',
        sj: '',
        jmy: ''
      },
      rea: {
        xzrea: '',
        frea: '',
        gprea: '',
        xlrea: '',
        sgrea: '',
        tzrea: '',
        tjrea: '',
        jzrea: '',
        pfrea: '',
        szgjrea: '',
        xbrea: '',
        fhlrea: '',
        xssrea: '',
        ggnrea: '',
        bjrea: '',
        xy1rea: '',
        xy2rea: '',
        ppdrea: '',
        slrea: '',
        jzslrea: '',
        syrea: '',
        sjrea: '',
        jmyrea: ''
      },
      sgVal: '',
      tzVal: '',
      tjVal: '',
      tjOptions: [],
      tjOther: '',
      jzVal: '',
      jzOptions: [],
      jzOther: '',
      pfVal: '',
      pfOptions: [],
      pfOther: '',
      szgjVal: '',
      szgjOptions: [],
      szgjOther: '',
      xbVal: '',
      xbOptions: [],
      xbOther: '',
      xzVal: '',
      xzOptions: [],
      xzOther: '',
      fVal: '',
      fOptions: [],
      fOther: '',
      gpVal: '',
      gpOptions: [],
      gpOther: '',
      xlVal: '',
      xlOptions: [],
      xlOther: '',
      fhlVal: '',
      xssVal: '',
      syVal: '',
      syOptions: [],
      syOther: '',
      sjVal: '',
      sjOptions: [],
      sjOther: '',
      jmyVal: '',
      jmyOptions: [],
      jmyOther: '',
      ggnVal: '',
      ggnOptions: [],
      ggnOther: '',
      bjVal: '',
      bjOptions: [],
      bjOther: '',
      ppdVal: '',
      ppdOptions: [],
      ppdOther: '',
      xy1ssVal: '',
      xy1szVal: '',
      xy2ssVal: '',
      xy2szVal: '',
      slyVal: '',
      slzVal: '',
      jzslyVal: '',
      jzslzVal: '',
      hProjectList: [],
      sgCopyVal: '',
      tzCopyVal: '',
      slyCopyVal: '',
      slzCopyVal: '',
      jzslyCopyVal: '',
      jzslzCopyVal: ''
    }
  },
  props: [
    'studentExam',
    'checkout',
    'history',
    'fill',
    'myList',
    'gradeName'
  ],
  methods: {
    projectValue (item, state) {
      let project
      this.studentExam.projectList.forEach(elem => {
        if (elem.projectName === item && elem.flag) {
          if (!state) {
            project = Number(elem.value1) || Number(elem.value2)
          } else {
            if (state === 1) {
              project = Number(elem.value1)
            } else {
              project = Number(elem.value2)
            }
          }
        }
      })
      return project
    },
    // 弹框验证
    open3 () {
      this.$alert('该数值非法,请重新输入', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },
    tabBut () {
      let bothInputw = document.body.querySelectorAll('.el-dropdown__caret-button')
      bothInputw.forEach(item => {
        item.setAttribute('tabindex', '-1')
      })
    },
    // 身高
    sgBlur () {
      if (this.sgVal) {
        if (Number(this.sgVal) === this.projectValue('身高')) {
          return false
        }
        if (Number(this.sgVal) === this.projectValue('身高')) {
          return false
        }
        if (!(/^-?\d*\.?\d*$/).test(this.sgVal)) {
          this.sgVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '' })
        } else {
          const bool = this.sgVal.toString().split('').map(item => item === '9')
          if (this.sgVal.toString().length > 3 && !bool.includes(false)) {
            this.open3()
            this.sgVal = ''
            this.$refs.sg.focus()
          } else {
            if (this.sgVal > 9999 || this.sgVal < 100) {
              this.open3()
              this.sgVal = ''
              this.$refs.sg.focus()
              return
            }
            if (this.sgVal.replace('.', '').toString().length > 5) {
              this.open3()
              this.sgVal = ''
              this.$refs.sg.focus()
              return
            }
            const state = this.path.sg && this.path.sg > this.sgVal / 10
            if (this.sgVal > 3000 || this.sgVal < 1000 || state) {
              this.obj.sgFlag = false
              if (this.sgVal !== this.sgCopyVal) {
                this.sgVal = this.sgVal / 10
              }
              this.sgCopyVal = this.sgVal
              this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', sureSg: '1', flag: true, value1: this.sgVal, value2: '' })
              this.rea.sgrea = '4'
            } else {
              this.obj.sgFlag = false
              if (this.sgVal !== this.sgCopyVal) {
                this.sgVal = this.sgVal / 10
              }
              this.rea.sgrea = '4'
              this.sgCopyVal = this.sgVal
              this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', sureSg: '2', flag: true, value1: this.sgVal, value2: '' })
            }
          }
        }
      } else {
        if (this.obj.sgFlag) {
          this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '', flag: false, value1: '', value2: '' })
        } else {
          this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '' })
        }
      }
    },
    sgChange (val) {
      this.rea.sgrea = val
      if (this.sgVal) {
        this.sgVal = ''
        this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
      } else {
        this.$emit('change', { projectId: 'sg', id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
      }
    },
    // 体重
    tzBlur () {
      if (this.tzVal) {
        if (Number(this.tzVal) === this.projectValue('体重')) {
          return false
        }
        if (Number(this.tzVal) === this.projectValue('体重')) {
          return false
        }
        if (!(/^-?\d*\.?\d*$/).test(this.tzVal)) {
          this.tzVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '' })
        } else {
          const bool = this.tzVal.toString().split('').map(item => item === '9')
          if (this.tzVal.toString().length > 3 && !bool.includes(false)) {
            this.open3()
            this.tzVal = ''
            this.$refs.tz.focus()
          } else {
            if (this.tzVal < 100 || this.tzVal > 2000) {
              this.open3()
              this.tzVal = ''
              this.$refs.tz.focus()
              return
            }
            if (this.tzVal.replace('.', '').toString().length > 4) {
              this.open3()
              this.tzVal = ''
              this.$refs.tz.focus()
              return
            }
            if (this.tzVal > 1000 || this.tzVal < 200) {
              this.obj.tzFlag = false
              if (this.tzVal !== this.tzCopyVal) {
                this.tzVal = this.tzVal / 10
              }
              this.rea.tzrea = '4'
              this.tzCopyVal = this.tzVal
              this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', sureTz: '1', flag: true, value1: this.tzVal, value2: '' })
            } else {
              this.obj.tzFlag = false
              if (this.tzVal !== this.tzCopyVal) {
                this.tzVal = this.tzVal / 10
              }
              this.rea.tzrea = '4'
              this.tzCopyVal = this.tzVal
              this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', sureTz: '2', flag: true, value1: this.tzVal, value2: '' })
            }
          }
        }
      } else {
        if (this.obj.tzFlag) {
          this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '', flag: false, value1: '', value2: '' })
        } else {
          this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '' })
        }
      }
    },
    tzChange (val) {
      this.rea.tzrea = val
      if (this.tzVal) {
        this.tzVal = ''
        this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
      } else {
        this.$emit('change', { projectId: 'tz', id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
      }
    },
    // 头颈
    tjSel () {
      this.obj.tjFlag = false
      if (this.tjVal !== '0') {
        this.tjOther = ''
      }
      if (this.tjVal) {
        this.rea.tjrea = '4'
        this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther })
      }
    },
    tjBlur () {
      this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther })
    },
    tjChange (val) {
      this.rea.tjrea = val
      if (this.tjVal) {
        this.tjVal = ''
        this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.tjrea })
      } else {
        this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: '头颈', flag: false, value1: '', value2: '', unexamReason: this.rea.tjrea })
      }
    },
    // 脊柱
    jzSel () {
      this.obj.jzFlag = false
      if (this.jzVal !== '0') {
        this.jzOther = ''
      }
      if (this.jzVal) {
        this.rea.jzrea = '4'
        this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther })
      }
    },
    jzBlur () {
      this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther })
    },
    jzChange (val) {
      this.rea.jzrea = val
      if (this.jzVal) {
        this.jzVal = ''
        this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.jzrea })
      } else {
        this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: '脊柱', flag: false, value1: '', value2: '', unexamReason: this.rea.jzrea })
      }
    },
    // 皮肤
    pfSel () {
      this.obj.pfFlag = false
      if (this.pfVal !== '0') {
        this.pfOther = ''
      }
      if (this.pfVal) {
        this.rea.pfrea = '4'
        this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther })
      }
    },
    pfBlur () {
      this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther })
    },
    pfChange (val) {
      this.rea.pfrea = val
      if (this.pfVal) {
        this.pfVal = ''
        this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.pfrea })
      } else {
        this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: '皮肤', flag: false, value1: '', value2: '', unexamReason: this.rea.pfrea })
      }
    },
    // 四肢关节
    szgjSel () {
      this.obj.szgjFlag = false
      if (this.szgjVal !== '0') {
        this.szgjOther = ''
      }
      if (this.szgjVal) {
        this.rea.szgjrea = '4'
        this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther })
      }
    },
    szgjBlur () {
      this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther })
    },
    szgjChange (val) {
      this.rea.szgjrea = val
      if (this.szgjVal) {
        this.szgjVal = ''
        this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.szgjrea })
      } else {
        this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: '四肢关节', flag: false, value1: '', value2: '', unexamReason: this.rea.szgjrea })
      }
    },
    // 胸部
    xbSel () {
      this.obj.xbFlag = false
      if (this.xbVal !== '0') {
        this.xbOther = ''
      }
      if (this.xbVal) {
        this.rea.xbrea = '4'
        this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther })
      }
    },
    xbBlur () {
      this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther })
    },
    xbChange (val) {
      this.rea.xbrea = val
      if (this.xbVal) {
        this.xbVal = ''
        this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xbrea })
      } else {
        this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: '胸部', flag: false, value1: '', value2: '', unexamReason: this.rea.xbrea })
      }
    },
    // 心脏
    xzSel () {
      this.obj.xzFlag = false
      if (this.xzVal !== '9') {
        this.xzOther = ''
      }
      if (this.xzVal) {
        this.rea.xzrea = '4'
        this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: this.xzOther })
      }
    },
    xzBlur () {
      this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: this.xzOther })
    },
    xzChange (val) {
      this.rea.xzrea = val
      if (this.xzVal) {
        this.xzVal = ''
        this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xzrea })
      } else {
        this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: '心脏', flag: false, value1: '', value2: '', unexamReason: this.rea.xzrea })
      }
    },
    // 肺
    fSel () {
      this.obj.fFlag = false
      if (this.fVal !== '9') {
        this.fOther = ''
      }
      if (this.fVal) {
        this.rea.frea = '4'
        this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: this.fOther })
      }
    },
    fBlur () {
      this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: this.fOther })
    },
    fChange (val) {
      this.rea.frea = val
      if (this.fVal) {
        this.fVal = ''
        this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.frea })
      } else {
        this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: '肺', flag: false, value1: '', value2: '', unexamReason: this.rea.frea })
      }
    },
    // 肝脾
    gpSel () {
      this.obj.gpFlag = false
      if (this.gpVal !== '0') {
        this.gpOther = ''
      }
      if (this.gpVal) {
        this.rea.gprea = '4'
        this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther })
      }
    },
    gpBlur () {
      this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther })
    },
    gpChange (val) {
      this.rea.gprea = val
      if (this.gpVal) {
        this.gpVal = ''
        this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.gprea })
      } else {
        this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: '肝脾', flag: false, value1: '', value2: '', unexamReason: this.rea.gprea })
      }
    },
    // 心率
    xlSel () {
      this.obj.xlFlag = false
      if (this.xlVal !== '0') {
        this.xlOther = ''
      }
      if (this.xlVal) {
        this.rea.xlrea = '4'
        this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: this.xlOptions.filter(item => item.code === this.xlVal)[0].name, flag: true, value1: this.xlVal, value2: this.xlOther })
      }
    },
    xlBlur () {
      if (this.xlVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.xlVal)) {
          this.xlVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: false, value1: '', value2: '' })
        } else {
          this.obj.xlFlag = false
          this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: true, value1: this.xlVal, value2: '' })
        }
      } else {
        if (this.obj.xlFlag) {
          this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '', flag: false, value1: '', value2: '' })
        } else {
          this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: false, value1: '', value2: '' })
        }
      }
    },
    xlChange (val) {
      this.rea.xlrea = val
      if (this.xlVal) {
        this.xlVal = ''
        this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
      } else {
        this.$emit('change', { projectId: 'xl', id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
      }
    },
    // 肺活量
    fhlBlur () {
      if (this.fhlVal) {
        if (Number(this.fhlVal) === this.projectValue('肺活量')) {
          return false
        }
        if (!(/^\d{1,}$/).test(this.fhlVal)) {
          this.fhlVal = ''
          notice('请输入100-6000之间的正整数')
          this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '' })
        } else {
          const bool = this.fhlVal.toString().split('').map(item => item === '9')
          const booleans = this.fhlVal.toString().length > 4 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.fhlVal = ''
            this.$refs.fhl.focus()
          } else {
            if (this.fhlVal > 9999 || this.fhlVal < 100) {
              this.open3()
              this.fhlVal = ''
              this.$refs.fhl.focus()
              return
            }
            if (this.fhlVal > 6000 || this.fhlVal < 1000) {
              this.fhlVal = this.fhlVal
              this.obj.fhlFlag = false
              this.rea.fhlrea = '4'
              this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', sureFhl: '1', flag: true, value1: this.fhlVal, value2: '' })
            } else {
              this.fhlVal = this.fhlVal
              this.obj.fhlFlag = false
              this.rea.fhlrea = '4'
              this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', sureFhl: '2', flag: true, value1: this.fhlVal, value2: '' })
            }
          }
        }
      } else {
        if (this.obj.fhlFlag) {
          this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '', flag: false, value1: '', value2: '' })
        } else {
          this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '' })
        }
      }
    },
    fhlChange (val) {
      this.rea.fhlrea = val
      if (this.fhlVal) {
        this.fhlVal = ''
        this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
      } else {
        this.$emit('change', { projectId: 'fhl', id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
      }
    },
    // 血色素
    xssBlur () {
      if (this.xssVal) {
        if (Number(this.xssVal) === this.projectValue('血色素')) {
          return false
        }
        if (!(/^\d{1,}$/).test(this.xssVal)) {
          this.xssVal = ''
          notice('请输入50-300之间的正整数')
          this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '' })
        } else {
          const bool = this.xssVal.toString().split('').map(item => item === '9')
          const booleans = this.xssVal.toString().length > 3 && !bool.includes(false)
          if (booleans || this.xssVal < 50) {
            this.open3()
            this.xssVal = ''
            this.$refs.xss.focus()
          } else {
            if (this.xssVal > 350) {
              this.open3()
              this.xssVal = ''
              this.$refs.xss.focus()
              return
            }
            if (this.xssVal > 300 || this.xssVal < 50) {
              this.xssVal = this.xssVal
              this.obj.xssFlag = false
              this.rea.xssrea = '4'
              this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', sureXss: '1', flag: true, value1: this.xssVal, value2: '' })
            } else {
              this.xssVal = this.xssVal
              this.obj.xssFlag = false
              this.rea.xssrea = '4'
              this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', sureXss: '2', flag: true, value1: this.xssVal, value2: '' })
            }
          }
        }
      } else {
        if (this.obj.xssFlag) {
          this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '', flag: false, value1: '', value2: '' })
        } else {
          this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '' })
        }
      }
    },
    xssChange (val) {
      this.rea.xssrea = val
      if (this.xssVal) {
        this.xssVal = ''
        this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
      } else {
        this.$emit('change', { projectId: 'xss', id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
      }
    },
    // 沙眼
    sySel () {
      this.obj.syFlag = false
      if (this.syVal !== '0') {
        this.syOther = ''
      }
      if (this.syVal) {
        this.rea.syrea = '4'
        this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther })
      }
    },
    syBlur () {
      this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther })
    },
    syChange (val) {
      this.rea.syrea = val
      if (this.syVal) {
        this.syVal = ''
        this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.syrea })
      } else {
        this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: '沙眼', flag: false, value1: '', value2: '', unexamReason: this.rea.syrea })
      }
    },
    // 色觉
    sjSel () {
      this.obj.sjFlag = false
      if (this.sjVal !== '0') {
        this.sjOther = ''
      }
      if (this.sjVal) {
        this.rea.sjrea = '4'
        this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther })
      }
    },
    sjBlur () {
      this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther })
    },
    sjChange (val) {
      this.rea.sjrea = val
      if (this.sjVal) {
        this.sjVal = ''
        this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.sjrea })
      } else {
        this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: '色觉', flag: false, value1: '', value2: '', unexamReason: this.rea.sjrea })
      }
    },
    // 结膜炎
    jmySel () {
      this.obj.jmyFlag = false
      if (this.jmyVal !== '0') {
        this.jmyOther = ''
      }
      if (this.jmyVal) {
        this.rea.jmyrea = '4'
        this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther })
      }
    },
    jmyBlur () {
      this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther })
    },
    jmyChange (val) {
      this.rea.jmyrea = val
      if (this.jmyVal) {
        this.jmyVal = ''
        this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.jmyrea })
      } else {
        this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: '结膜炎', flag: false, value1: '', value2: '', unexamReason: this.rea.jmyrea })
      }
    },
    // 肝功能
    ggnSel () {
      this.obj.ggnFlag = false
      if (this.ggnVal !== '0') {
        this.ggnOther = ''
      }
      if (this.ggnVal) {
        this.rea.ggnrea = '4'
        this.$emit('change', { projectId: 'ggn', id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: this.ggnOptions.filter(item => item.code === this.ggnVal)[0].name, flag: true, value1: this.ggnVal, value2: this.ggnOther })
      }
    },
    ggnBlur () {
      this.$emit('change', { projectId: 'ggn', id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: this.ggnOptions.filter(item => item.code === this.ggnVal)[0].name, flag: true, value1: this.ggnVal, value2: this.ggnOther })
    },
    ggnChange (val) {
      this.rea.ggnrea = val
      if (this.ggnVal) {
        this.ggnVal = ''
        this.$emit('change', { projectId: 'ggn', id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.ggnrea })
      } else {
        this.$emit('change', { projectId: 'ggn', id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: '肝功能', flag: false, value1: '', value2: '', unexamReason: this.rea.ggnrea })
      }
    },
    // 便检
    bjSel () {
      this.obj.bjFlag = false
      if (this.bjVal !== '0') {
        this.bjOther = ''
      }
      if (this.bjVal) {
        this.rea.bjrea = '4'
        this.$emit('change', { projectId: 'bj', id: this.list.filter(item => item.projectName === '便检')[0].id, name: this.bjOptions.filter(item => item.code === this.bjVal)[0].name, flag: true, value1: this.bjVal, value2: this.bjOther })
      }
    },
    bjBlur () {
      this.$emit('change', { projectId: 'bj', id: this.list.filter(item => item.projectName === '便检')[0].id, name: this.bjOptions.filter(item => item.code === this.bjVal)[0].name, flag: true, value1: this.bjVal, value2: this.bjOther })
    },
    bjChange (val) {
      this.rea.bjrea = val
      if (this.bjVal) {
        this.bjVal = ''
        this.$emit('change', { projectId: 'bj', id: this.list.filter(item => item.projectName === '便检')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.bjrea })
      } else {
        this.$emit('change', { projectId: 'bj', id: this.list.filter(item => item.projectName === '便检')[0].id, name: '便检', flag: false, value1: '', value2: '', unexamReason: this.rea.bjrea })
      }
    },
    // ppd试验
    ppdSel () {
      this.obj.ppdFlag = false
      if (this.ppdVal !== '0') {
        this.ppdOther = ''
      }
      if (this.ppdVal) {
        this.rea.ppdrea = '4'
        this.$emit('change', { projectId: 'ppd', id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: this.ppdOptions.filter(item => item.code === this.ppdVal)[0].name, flag: true, value1: this.ppdVal, value2: this.ppdOther })
      }
    },
    ppdBlur () {
      this.$emit('change', { projectId: 'ppd', id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: this.ppdOptions.filter(item => item.code === this.ppdVal)[0].name, flag: true, value1: this.ppdVal, value2: this.ppdOther })
    },
    ppdChange (val) {
      this.rea.ppdrea = val
      if (this.ppdVal) {
        this.ppdVal = ''
        this.$emit('change', { projectId: 'ppd', id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.ppdrea })
      } else {
        this.$emit('change', { projectId: 'ppd', id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: 'PPD试验', flag: false, value1: '', value2: '', unexamReason: this.rea.ppdrea })
      }
    },
    // 血压1
    xy1ssBlur () {
      if (this.xy1ssVal) {
        if (Number(this.xy1ssVal) === this.projectValue('血压1', 1)) {
          return false
        }
        if (Number(this.xy1ssVal) === this.projectValue('血压1', 1)) {
          return false
        }
        if (!(/^\d*[02468]$/).test(this.xy1ssVal)) {
          this.xy1ssVal = ''
          this.$alert('请输入60-200之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: this.xy1szVal })
        } else {
          const bool = this.xy1ssVal.toString().split('').map(item => item === '9')
          const booleans = this.xy1ssVal.toString().length > 3 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.xy1ssVal = ''
            this.$refs.xy1ss.focus()
          } else {
            if (this.xy1ssVal < 10 || this.xy1ssVal > 900) {
              this.open3()
              this.xy1ssVal = ''
              this.$refs.xy1ss.focus()
              return
            }
            if (this.xy1ssVal > 200 || this.xy1ssVal < 60) {
              this.xy1ssVal = this.xy1ssVal
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1ss: '1', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal })
            } else {
              this.xy1ssVal = this.xy1ssVal
              this.rea.xy1rea = '4'
              this.obj.xy1Flag = false
              this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1ss: '2', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal })
            }
          }
        }
      } else {
        if (this.obj.xy1Flag) {
          this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '', flag: false, value1: '', value2: this.xy1szVal })
        } else {
          this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: this.xy1szVal })
        }
      }
    },
    xy1szBlur () {
      if (this.xy1szVal) {
        if (Number(this.xy1szVal) === this.projectValue('血压1', 2)) {
          return false
        }
        if (Number(this.xy1szVal) === this.projectValue('血压1', 2)) {
          return false
        }
        if (!(/^\d*[02468]$/).test(this.xy1szVal)) {
          this.xy1szVal = ''
          this.$alert('请输入30-120之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: this.xy1ssVal, value2: '' })
        } else {
          const bool = this.xy1szVal.toString().split('').map(item => item === '9')
          const booleans = this.xy1szVal.toString().length > 3 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.xy1szVal = ''
            this.$refs.xy1sz.focus()
          } else {
            if (this.xy1szVal < 10 || this.xy1szVal > 900) {
              this.open3()
              this.xy1szVal = ''
              this.$refs.xy1sz.focus()
              return
            }
            if (this.xy1szVal > 120 || this.xy1szVal < 30) {
              this.xy1szVal = this.xy1szVal
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1sz: '1', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal })
            } else {
              this.xy1szVal = this.xy1szVal
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1sz: '2', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal })
            }
          }
        }
      } else {
        if (this.obj.xy1Flag) {
          this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '', flag: false, value1: this.xy1ssVal, value2: '' })
        } else {
          this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: this.xy1ssVal, value2: '' })
        }
      }
    },
    xy1Change (val) {
      this.rea.xy1rea = val
      if (this.xy1ssVal || this.xy1szVal) {
        this.xy1ssVal = ''
        this.xy1szVal = ''
        this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xy1rea })
      } else {
        this.$emit('change', { projectId: 'xy1', id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: '', unexamReason: this.rea.xy1rea })
      }
    },
    // 血压2
    xy2ssBlur () {
      if (this.xy2ssVal) {
        if (!(/^\d*[02468]$/).test(this.xy2ssVal)) {
          this.xy2ssVal = ''
          this.$alert('请输入60-200之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: '', value2: this.xy2szVal })
        } else {
          const bool = this.xy2ssVal.toString().split('').map(item => item === '9')
          const booleans = this.xy2ssVal.toString().length > 3 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.xy2ssVal = ''
            this.$refs.xy2ss.focus()
          } else {
            if (this.xy2ssVal > 900 || this.xy2ssVal < 10) {
              this.open3()
              this.xy2ssVal = ''
              this.$refs.xy2ss.focus()
              return
            }
            if (this.xy2ssVal > 200 || this.xy2ssVal < 60) {
              this.xy2ssVal = this.xy2ssVal
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2ss: '1', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal })
            } else {
              this.xy2ssVal = this.xy2ssVal
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2ss: '2', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal })
            }
          }
        }
      } else {
        if (this.obj.xy2Flag) {
          this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '', flag: false, value1: '', value2: this.xy2szVal })
        } else {
          this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: '', value2: this.xy2szVal })
        }
      }
    },
    xy2szBlur () {
      if (this.xy2szVal) {
        if (!(/^\d*[02468]$/).test(this.xy2szVal)) {
          this.xy2szVal = ''
          this.$alert('请输入30-120之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: this.xy2ssVal, value2: '' })
        } else {
          const bool = this.xy2szVal.toString().split('').map(item => item === '9')
          const booleans = this.xy2szVal.toString().length > 3 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.xy2szVal = ''
            this.$refs.xy2sz.focus()
          } else {
            if (this.xy2szVal > 900 || this.xy2szVal < 10) {
              this.open3()
              this.xy2szVal = ''
              this.$refs.xy2sz.focus()
              return
            }
            if (this.xy2szVal > 120 || this.xy2szVal < 60) {
              this.xy2szVal = this.xy2szVal
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2sz: '1', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal })
            } else {
              this.xy2szVal = this.xy2szVal
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2sz: '2', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal })
            }
          }
        }
      } else {
        if (this.obj.xy2Flag) {
          this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '', flag: false, value1: this.xy2ssVal, value2: '' })
        } else {
          this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: this.xy2ssVal, value2: '' })
        }
      }
    },
    xy2Change (val) {
      this.rea.xy2rea = val
      if (this.xy2ssVal || this.xy2szVal) {
        this.xy2ssVal = ''
        this.xy2szVal = ''
        this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xy2rea })
      } else {
        this.$emit('change', { projectId: 'xy2', id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: '', value2: '', unexamReason: this.rea.xy2rea })
      }
    },
    // 裸眼视力
    slyBlur () {
      if (this.slyVal) {
        if (Number(this.slyVal) === this.projectValue('裸眼视力', 1)) {
          return false
        }
        if (Number(this.slyVal) === this.projectValue('裸眼视力', 1)) {
          return false
        }
        if (!(/^-?\d*\.?\d*$/).test(this.slyVal)) {
          this.slyVal = ''
          notice('请输入数字偶数')
          this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: this.slzVal })
        } else {
          const bool = this.slyVal.toString().split('').map(item => item === '9')
          const booleans = this.slyVal.toString().length > 2 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.slyVal = ''
            this.$refs.sly.focus()
          } else {
            if (this.slyVal > 99 || this.slyVal < 10) {
              this.open3()
              this.slyVal = ''
              this.$refs.sly.focus()
              return
            }
            if (this.slyVal.replace('.', '').toString().length > 3) {
              this.open3()
              this.slyVal = ''
              this.$refs.sly.focus()
              return
            }
            if (this.slyVal > 54 || this.slyVal < 40) {
              if (this.slyCopyVal !== this.slyVal) {
                this.slyVal = (this.slyVal / 10).toFixed(1)
              }
              this.slyCopyVal = this.slyVal
              this.obj.slFlag = false
              this.rea.slrea = '4'
              this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSly: '1', flag: true, value1: this.slyVal, value2: this.slzVal })
            } else {
              if (this.slyCopyVal !== this.slyVal) {
                this.slyVal = (this.slyVal / 10).toFixed(1)
              }
              this.slyCopyVal = this.slyVal
              this.obj.slFlag = false
              this.rea.slrea = '4'
              this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSly: '2', flag: true, value1: this.slyVal, value2: this.slzVal })
            }
          }
        }
      } else {
        if (this.obj.slFlag) {
          this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '', flag: false, value1: '', value2: this.slzVal })
        } else {
          this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: this.slzVal })
        }
      }
    },
    slzBlur () {
      if (this.slzVal) {
        if (Number(this.slzVal) === this.projectValue('裸眼视力', 1)) {
          return false
        }
        if (Number(this.slzVal) === this.projectValue('裸眼视力', 1)) {
          return false
        }
        if (!(/^-?\d*\.?\d*$/).test(this.slzVal)) {
          this.slzVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: this.slyVal, value2: '' })
        } else {
          const bool = this.slzVal.toString().split('').map(item => item === '9')
          const booleans = this.slzVal.toString().length > 2 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.slzVal = ''
            this.$refs.slz.focus()
          } else {
            if (this.slzVal > 99 || this.slzVal < 10) {
              this.open3()
              this.slzVal = ''
              this.$refs.slz.focus()
              return
            }
            if (this.slzVal.replace('.', '').toString().length > 3) {
              this.open3()
              this.slzVal = ''
              this.$refs.slz.focus()
              return
            }
            if (this.slzVal > 54 || this.slzVal < 40) {
              if (this.slzCopyVal !== this.slzVal) {
                this.slzVal = (this.slzVal / 10).toFixed(1)
              }
              this.slzCopyVal = this.slzVal
              this.obj.slFlag = false
              this.rea.slrea = '4'
              this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSlz: '1', flag: true, value1: this.slyVal, value2: this.slzVal })
            } else {
              if (this.slzCopyVal !== this.slzVal) {
                this.slzVal = (this.slzVal / 10).toFixed(1)
              }
              this.slzCopyVal = this.slzVal
              this.obj.slFlag = false
              this.rea.slrea = '4'
              this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSlz: '2', flag: true, value1: this.slyVal, value2: this.slzVal })
            }
          }
        }
      } else {
        if (this.obj.slFlag) {
          this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '', flag: false, value1: this.slyVal, value2: '' })
        } else {
          this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: this.slyVal, value2: '' })
        }
      }
    },
    slChange (val) {
      this.rea.slrea = val
      if (this.slyVal || this.slzVal) {
        this.slyVal = ''
        this.slzVal = ''
        this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.slrea })
      } else {
        this.$emit('change', { projectId: 'sl', id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: '', unexamReason: this.rea.slrea })
      }
    },
    // 矫正视力
    jzslyBlur () {
      if (this.jzslyVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.jzslyVal)) {
          this.jzslyVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: '', value2: this.jzslzVal })
        } else {
          const bool = this.jzslyVal.toString().split('').map(item => item === '9')
          const booleans = this.jzslyVal.toString().length > 2 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.jzslyVal = ''
            this.$refs.jzsly.focus()
          } else {
            if (this.jzslyVal > 99 || this.jzslyVal < 10) {
              this.open3()
              this.jzslyVal = ''
              this.$refs.jzsly.focus()
              return
            }
            if (this.jzslyVal.replace('.', '').toString().length > 3) {
              this.open3()
              this.jzslyVal = ''
              this.$refs.jzsly.focus()
              return
            }
            if (this.jzslyVal > 54 || this.jzslyVal < 40) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.jzslFlag = false
              if (this.jzslyCopyVal !== this.jzslyVal) {
                this.jzslyVal = (this.jzslyVal / 10).toFixed(1)
              }
              this.jzslyCopyVal = this.jzslyVal
              this.rea.jzslrea = '4'
              this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', sureJzsly: '1', flag: true, value1: this.jzslyVal, value2: this.jzslzVal })
              // }).catch(() => {
              //   this.jzslyVal = ''
              //   this.$refs.jzsly.focus()
              //   this.obj.jzslFlag = false
              //   this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: true, value1: this.jzslyVal, value2: this.jzslzVal })
              // })
            } else {
              this.obj.jzslFlag = false
              if (this.jzslyCopyVal !== this.jzslyVal) {
                this.jzslyVal = (this.jzslyVal / 10).toFixed(1)
              }
              this.jzslyCopyVal = this.jzslyVal
              this.rea.jzslrea = '4'
              this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', sureJzsly: '2', flag: true, value1: this.jzslyVal, value2: this.jzslzVal })
            }
          }
        }
      } else {
        if (this.obj.jzslFlag) {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '', flag: false, value1: '', value2: this.jzslzVal })
        } else {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: '', value2: this.jzslzVal })
        }
      }
    },
    jzslzBlur () {
      if (this.jzslzVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.jzslzVal)) {
          this.jzslzVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: this.jzslyVal, value2: '' })
        } else {
          const bool = this.jzslzVal.toString().split('').map(item => item === '9')
          const booleans = this.jzslzVal.toString().length > 2 && !bool.includes(false)
          if (booleans) {
            this.open3()
            this.jzslzVal = ''
            this.$refs.jzslz.focus()
          } else {
            if (this.jzslzVal > 99 || this.jzslzVal < 10) {
              this.open3()
              this.jzslzVal = ''
              this.$refs.jzslz.focus()
              return
            }
            if (this.jzslzVal.replace('.', '').toString().length > 3) {
              this.open3()
              this.jzslzVal = ''
              this.$refs.jzslz.focus()
              return
            }
            if (this.jzslzVal > 54 || this.jzslzVal < 40) {
              this.obj.jzslFlag = false
              if (this.jzslzCopyVal !== this.jzslzVal) {
                this.jzslzVal = (this.jzslzVal / 10).toFixed(1)
              }
              this.jzslzCopyVal = this.jzslzVal
              this.rea.jzslrea = '4'
              this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', sureJzslz: '1', flag: true, value1: this.jzslyVal, value2: this.jzslzVal })
            } else {
              this.obj.jzslFlag = false
              if (this.jzslzCopyVal !== this.jzslzVal) {
                this.jzslzVal = (this.jzslzVal / 10).toFixed(1)
              }
              this.jzslzCopyVal = this.jzslzVal
              this.rea.jzslrea = '4'
              this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', sureJzslz: '2', flag: true, value1: this.jzslyVal, value2: this.jzslzVal })
            }
          }
        }
      } else {
        if (this.obj.jzslFlag) {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '', flag: false, value1: this.jzslyVal, value2: '' })
        } else {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: this.jzslyVal, value2: '' })
        }
      }
    },
    jzslChange (val) {
      this.rea.jzslrea = val
      if (this.jzslyVal || this.jzslzVal) {
        this.jzslyVal = ''
        this.jzslzVal = ''
        this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.jzslrea })
      } else {
        this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: '', value2: '', unexamReason: this.rea.jzslrea })
      }
    }
  },
  watch: {
    fill () {
      if (this.list.filter(item => item.projectName === '心脏').length !== 0 && this.list.filter(item => item.projectName === '心脏')[0].myProjectFlag === true) {
        this.xzVal = '0'
        this.obj.xzFlag = false
        this.rea.xzrea = '4'
        this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: '', unexamReason: this.rea.xzrea })
      }
      if (this.list.filter(item => item.projectName === '肺').length !== 0 && this.list.filter(item => item.projectName === '肺')[0].myProjectFlag === true) {
        this.fVal = '0'
        this.obj.fFlag = false
        this.rea.frea = '4'
        this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: '', unexamReason: this.rea.frea })
      }
      if (this.list.filter(item => item.projectName === '肝脾').length !== 0 && this.list.filter(item => item.projectName === '肝脾')[0].myProjectFlag === true) {
        this.gpVal = '0'
        this.obj.gpFlag = false
        this.rea.gprea = '4'
        this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther, unexamReason: this.rea.gprea })
      }
      // if (this.list.filter(item => item.projectName === '脉搏').length !== 0) {
      //   this.xlVal = '1'
      //   this.obj.xlFlag = false
      //   this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: this.xlOptions.filter(item => item.code === this.xlVal)[0].name, flag: true, value1: this.xlVal, value2: this.xlOther })
      // }
      if (this.list.filter(item => item.projectName === '头颈').length !== 0 && this.list.filter(item => item.projectName === '头颈')[0].myProjectFlag === true) {
        this.tjVal = '0'
        this.obj.tjFlag = false
        this.rea.tjrea = '4'
        this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther, unexamReason: this.rea.tjrea })
      }
      if (this.list.filter(item => item.projectName === '脊柱').length !== 0 && this.list.filter(item => item.projectName === '脊柱')[0].myProjectFlag === true) {
        this.jzVal = '0'
        this.obj.jzFlag = false
        this.rea.jzrea = '4'
        this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther, unexamReason: this.rea.jzrea })
      }
      if (this.list.filter(item => item.projectName === '皮肤').length !== 0 && this.list.filter(item => item.projectName === '皮肤')[0].myProjectFlag === true) {
        this.pfVal = '0'
        this.obj.pfFlag = false
        this.rea.pfrea = '4'
        this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther, unexamReason: this.rea.pfrea })
      }
      if (this.list.filter(item => item.projectName === '四肢关节').length !== 0 && this.list.filter(item => item.projectName === '四肢关节')[0].myProjectFlag === true) {
        this.szgjVal = '0'
        this.obj.szgjFlag = false
        this.rea.szgjrea = '4'
        this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther, unexamReason: this.rea.szgjrea })
      }
      if (this.list.filter(item => item.projectName === '胸部').length !== 0 && this.list.filter(item => item.projectName === '胸部')[0].myProjectFlag === true) {
        this.xbVal = '0'
        this.obj.xbFlag = false
        this.rea.xbrea = '4'
        this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther, unexamReason: this.rea.xbrea })
      }
      if (this.list.filter(item => item.projectName === '沙眼').length !== 0 && this.list.filter(item => item.projectName === '沙眼')[0].myProjectFlag === true) {
        this.syVal = '0'
        this.obj.syFlag = false
        this.rea.syrea = '4'
        this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther, unexamReason: this.rea.syrea })
      }
      if (this.list.filter(item => item.projectName === '色觉').length !== 0 && this.list.filter(item => item.projectName === '色觉')[0].myProjectFlag === true) {
        this.sjVal = '0'
        this.rea.sjrea = '4'
        this.obj.sjFlag = false
        this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther, unexamReason: this.rea.sjrea })
      }
      if (this.list.filter(item => item.projectName === '结膜炎').length !== 0 && this.list.filter(item => item.projectName === '结膜炎')[0].myProjectFlag === true) {
        this.jmyVal = '0'
        this.obj.jmyFlag = false
        this.rea.jmyrea = '4'
        this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther, unexamReason: this.rea.jmyrea })
      }
    },
    checkout () {
      // 身高
      if (!this.obj.sgFlag && !this.sgVal) {
        this.$refs.sg.focus()
        return
      }
      // 体重
      if (!this.obj.tzFlag && !this.tzVal) {
        this.$refs.tz.focus()
        return
      }
      if (this.tjVal === '4' && !this.tjOther) {
        this.$refs.tj.focus()
        return
      }
      if (!this.obj.tjFlag && !this.tjVal) {
        notice('请选择头颈选项')
        return
      }
      if (this.jzVal === '4' && !this.jzOther) {
        this.$refs.jz.focus()
        return
      }
      if (!this.obj.jzFlag && !this.jzVal) {
        notice('请选择脊柱选项')
        return
      }
      if (this.pfVal === '5' && !this.pfOther) {
        this.$refs.pf.focus()
        return
      }
      if (!this.obj.pfFlag && !this.pfVal) {
        notice('请选择皮肤选项')
        return
      }
      if (this.szgjVal === '2' && !this.szgjOther) {
        this.$refs.szgj.focus()
        return
      }
      if (!this.obj.szgjFlag && !this.szgjVal) {
        notice('请选择四肢关节选项')
        return
      }
      if (this.xbVal === '4' && !this.xbOther) {
        this.$refs.xb.focus()
        return
      }
      if (!this.obj.xbFlag && !this.xbVal) {
        notice('请选择胸部选项')
        return
      }
      if (this.xzVal === '9' && !this.xzOther) {
        this.$refs.xz.focus()
        return
      }
      if (!this.obj.xzFlag && !this.xzVal) {
        notice('请选择心脏选项')
        return
      }
      if (this.fVal === '5' && !this.fOther) {
        this.$refs.f.focus()
        return
      }
      if (!this.obj.fFlag && !this.fVal) {
        notice('请选择肺选项')
        return
      }
      if (this.gpVal === '100' && !this.gpOther) {
        this.$refs.gp.focus()
        return
      }
      if (!this.obj.gpFlag && !this.gpVal) {
        notice('请选择肝脾选项')
        return
      }
      if (!this.obj.xlFlag && !this.xlVal) {
        this.$refs.xl.focus()
        return
      }
      if (this.syVal === '100' && !this.syOther) {
        this.$refs.sy.focus()
        return
      }
      if (!this.obj.syFlag && !this.syVal) {
        notice('请选择沙眼选项')
        return
      }
      if (this.sjVal === '100' && !this.sjOther) {
        this.$refs.sj.focus()
        return
      }
      if (!this.obj.sjFlag && !this.sjVal) {
        notice('请选择色觉选项')
        return
      }
      if (this.jmyVal === '100' && !this.jmyOther) {
        this.$refs.jmy.focus()
        return
      }
      if (!this.obj.jmyFlag && !this.jmyVal) {
        notice('请选择结膜炎选项')
        return
      }
      if (this.ggnVal === '100' && !this.ggnOther) {
        this.$refs.ggn.focus()
        return
      }
      if (!this.obj.ggnFlag && !this.ggnVal) {
        notice('请选择肝功能选项')
        return
      }
      if (this.bjVal === '100' && !this.bjOther) {
        this.$refs.bj.focus()
        return
      }
      if (!this.obj.bjFlag && !this.bjVal) {
        notice('请选择便检选项')
        return
      }
      if (this.ppdVal === '100' && !this.ppdOther) {
        this.$refs.ppd.focus()
        return
      }
      if (!this.obj.ppdFlag && !this.ppdVal) {
        notice('请选择ppd试验选项')
        return
      }
      // 肺活量
      if (!this.obj.fhlFlag && !this.fhlVal) {
        this.$refs.fhl.focus()
        return
      }
      // 血色素
      if (!this.obj.xssFlag && !this.xssVal) {
        this.$refs.xss.focus()
        return
      }
      // 血压1
      if (!this.obj.xy1Flag && (!this.xy1ssVal || !this.xy1szVal)) {
        if (!this.xy1ssVal) {
          this.$refs.xy1ss.focus()
        } else {
          this.$refs.xy1sz.focus()
        }
        return
      }
      // 血压2
      if (!this.obj.xy2Flag && (!this.xy2ssVal || !this.xy2szVal)) {
        if (!this.xy2ssVal) {
          this.$refs.xy2ss.focus()
        } else {
          this.$refs.xy2sz.focus()
        }
        return
      }
      // 裸眼视力
      if (!this.obj.slFlag && (!this.slyVal || !this.slzVal)) {
        if (!this.slyVal) {
          this.$refs.sly.focus()
        } else {
          this.$refs.slz.focus()
        }
        return
      }
      // 矫正视力
      if (!this.obj.jzslFlag && (!this.jzslyVal || !this.jzslzVal)) {
        if (!this.jzslyVal) {
          this.$refs.jzsly.focus()
        } else {
          this.$refs.jzslz.focus()
        }
      }
    },
    history () {
      let data = this.history.projectList
      this.hProjectList = this.history.projectList
      if (data.filter(item => item.projectId === 'sg').length !== 0) {
        this.path.sg = data.filter(item => item.projectId === 'sg')[0].value1
      }
      if (data.filter(item => item.projectId === 'tz').length !== 0) {
        this.path.tz = data.filter(item => item.projectId === 'tz')[0].value1
      }
      if (data.filter(item => item.projectId === 'tj').length !== 0) {
        this.path.tj = data.filter(item => item.projectId === 'tj')[0].contentList.filter(item => data.filter(item => item.projectId === 'tj')[0].value1 === item.code)[0].name
        if (this.path.tj === '其他') {
          this.path.tj = '其他:' + data.filter(item => item.projectId === 'tj')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'jz').length !== 0) {
        this.path.jz = data.filter(item => item.projectId === 'jz')[0].contentList.filter(item => data.filter(item => item.projectId === 'jz')[0].value1 === item.code)[0].name
        if (this.path.jz === '其他') {
          this.path.jz = '其他:' + data.filter(item => item.projectId === 'jz')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'pf').length !== 0) {
        this.path.pf = data.filter(item => item.projectId === 'pf')[0].contentList.filter(item => data.filter(item => item.projectId === 'pf')[0].value1 === item.code)[0].name
        if (this.path.pf === '其他') {
          this.path.pf = '其他:' + data.filter(item => item.projectId === 'pf')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'szgj').length !== 0) {
        this.path.szgj = data.filter(item => item.projectId === 'szgj')[0].contentList.filter(item => data.filter(item => item.projectId === 'szgj')[0].value1 === item.code)[0].name
        if (this.path.szgj === '其他') {
          this.path.szgj = '其他:' + data.filter(item => item.projectId === 'szgj')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'xb').length !== 0) {
        this.path.xb = data.filter(item => item.projectId === 'xb')[0].contentList.filter(item => data.filter(item => item.projectId === 'xb')[0].value1 === item.code)[0].name
        if (this.path.xb === '其他') {
          this.path.xb = '其他:' + data.filter(item => item.projectId === 'xb')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'xz').length !== 0) {
        this.path.xz = data.filter(item => item.projectId === 'xz')[0].contentList.filter(item => data.filter(item => item.projectId === 'xz')[0].value1 === item.code)[0].name
        if (this.path.xz === '其他') {
          this.path.xz = '其他:' + data.filter(item => item.projectId === 'xz')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'f').length !== 0) {
        this.path.f = data.filter(item => item.projectId === 'f')[0].contentList.filter(item => data.filter(item => item.projectId === 'f')[0].value1 === item.code)[0].name
        if (this.path.f === '其他') {
          this.path.f = '其他:' + data.filter(item => item.projectId === 'f')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'gp').length !== 0) {
        this.path.gp = data.filter(item => item.projectId === 'gp')[0].contentList.filter(item => data.filter(item => item.projectId === 'gp')[0].value1 === item.code)[0].name
        if (this.path.gp === '其他') {
          this.path.gp = '其他:' + data.filter(item => item.projectId === 'gp')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'xl').length !== 0) {
        this.path.xl = data.filter(item => item.projectId === 'xl')[0].value1
      }
      if (data.filter(item => item.projectId === 'fhl').length !== 0) {
        this.path.fhl = data.filter(item => item.projectId === 'fhl')[0].value1
      }
      if (data.filter(item => item.projectId === 'xss').length !== 0) {
        this.path.xss = data.filter(item => item.projectId === 'xss')[0].value1
      }
      if (data.filter(item => item.projectId === 'sy').length !== 0) {
        this.path.sy = data.filter(item => item.projectId === 'sy')[0].contentList.filter(item => data.filter(item => item.projectId === 'sy')[0].value1 === item.code)[0].name
        if (this.path.sy === '其他') {
          this.path.sy = '其他:' + data.filter(item => item.projectId === 'sy')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'sj').length !== 0) {
        this.path.sj = data.filter(item => item.projectId === 'sj')[0].contentList.filter(item => data.filter(item => item.projectId === 'sj')[0].value1 === item.code)[0].name
        if (this.path.sj === '其他') {
          this.path.sj = '其他:' + data.filter(item => item.projectId === 'sj')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'jmy').length !== 0) {
        this.path.jmy = data.filter(item => item.projectId === 'jmy')[0].contentList.filter(item => data.filter(item => item.projectId === 'jmy')[0].value1 === item.code)[0].name
        if (this.path.jmy === '其他') {
          this.path.jmy = '其他:' + data.filter(item => item.projectId === 'jmy')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'ggn').length !== 0) {
        // this.path.ggn = data.filter(item => item.projectId === 'ggn')[0].contentList.filter(item => data.filter(item => item.projectId === 'ggn')[0].value1 === item.code)[0].name
        if (this.path.ggn === '其他') {
          this.path.ggn = '其他:' + data.filter(item => item.projectId === 'ggn')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'bj').length !== 0) {
        // this.path.bj = data.filter(item => item.projectId === 'bj')[0].contentList.filter(item => data.filter(item => item.projectId === 'bj')[0].value1 === item.code)[0].name
        if (this.path.bj === '其他') {
          this.path.bj = '其他:' + data.filter(item => item.projectId === 'bj')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'ppd').length !== 0) {
        // this.path.ppd = data.filter(item => item.projectId === 'ppd')[0].contentList.filter(item => data.filter(item => item.projectId === 'ppd')[0].value1 === item.code)[0].name
        if (this.path.ppd === '其他') {
          this.path.ppd = '其他:' + data.filter(item => item.projectId === 'ppd')[0].value2
        }
      }
      if (data.filter(item => item.projectId === 'xy1').length !== 0) {
        this.path.xy1ss = data.filter(item => item.projectId === 'xy1')[0].value1
        this.path.xy1sz = data.filter(item => item.projectId === 'xy1')[0].value2
      }
      if (data.filter(item => item.projectId === 'xy2').length !== 0) {
        this.path.xy2ss = data.filter(item => item.projectId === 'xy2')[0].value1
        this.path.xy2sz = data.filter(item => item.projectId === 'xy2')[0].value2
      }
      if (data.filter(item => item.projectId === 'sl').length !== 0) {
        this.path.sly = data.filter(item => item.projectId === 'sl')[0].value1
        this.path.slz = data.filter(item => item.projectId === 'sl')[0].value2
      }
      if (data.filter(item => item.projectId === 'jzsl').length !== 0) {
        this.path.jzsly = data.filter(item => item.projectId === 'jzsl')[0].value1
        this.path.jzslz = data.filter(item => item.projectId === 'jzsl')[0].value2
      }
    },
    studentExam () {
      let data = this.studentExam.projectList
      this.list = data
      this.obj = {
        xzFlag: (data.filter(item => item.projectName === '心脏').length === 0 || data.filter(item => item.projectName === '心脏')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '心脏')[0].flag,
        fFlag: (data.filter(item => item.projectName === '肺').length === 0 || data.filter(item => item.projectName === '肺')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肺')[0].flag,
        gpFlag: (data.filter(item => item.projectName === '肝脾').length === 0 || data.filter(item => item.projectName === '肝脾')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肝脾')[0].flag,
        xlFlag: (data.filter(item => item.projectName === '脉搏').length === 0 || data.filter(item => item.projectName === '脉搏')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '脉搏')[0].flag,
        sgFlag: (data.filter(item => item.projectName === '身高').length === 0 || data.filter(item => item.projectName === '身高')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '身高')[0].flag,
        tzFlag: (data.filter(item => item.projectName === '体重').length === 0 || data.filter(item => item.projectName === '体重')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '体重')[0].flag,
        tjFlag: (data.filter(item => item.projectName === '头颈').length === 0 || data.filter(item => item.projectName === '头颈')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '头颈')[0].flag,
        jzFlag: (data.filter(item => item.projectName === '脊柱').length === 0 || data.filter(item => item.projectName === '脊柱')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '脊柱')[0].flag,
        pfFlag: (data.filter(item => item.projectName === '皮肤').length === 0 || data.filter(item => item.projectName === '皮肤')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '皮肤')[0].flag,
        szgjFlag: (data.filter(item => item.projectName === '心脏').length === 0 || data.filter(item => item.projectName === '四肢关节')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '四肢关节')[0].flag,
        xbFlag: (data.filter(item => item.projectName === '胸部').length === 0 || data.filter(item => item.projectName === '胸部')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '胸部')[0].flag,
        fhlFlag: (data.filter(item => item.projectName === '肺活量').length === 0 || data.filter(item => item.projectName === '肺活量')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肺活量')[0].flag,
        xssFlag: (data.filter(item => item.projectName === '血色素').length === 0 || data.filter(item => item.projectName === '血色素')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '血色素')[0].flag,
        ggnFlag: (data.filter(item => item.projectName === '肝功能').length === 0 || data.filter(item => item.projectName === '肝功能')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肝功能')[0].flag,
        bjFlag: (data.filter(item => item.projectName === '便检').length === 0 || data.filter(item => item.projectName === '便检')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '便检')[0].flag,
        xy1Flag: (data.filter(item => item.projectName === '血压1').length === 0 || data.filter(item => item.projectName === '血压1')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '血压1')[0].flag,
        xy2Flag: (data.filter(item => item.projectName === '血压2').length === 0 || data.filter(item => item.projectName === '血压2')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '血压2')[0].flag,
        ppdFlag: (data.filter(item => item.projectName === 'PPD试验').length === 0 || data.filter(item => item.projectName === 'PPD试验')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === 'PPD试验')[0].flag,
        slFlag: (data.filter(item => item.projectName === '裸眼视力').length === 0 || data.filter(item => item.projectName === '裸眼视力')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '裸眼视力')[0].flag,
        jzslFlag: (data.filter(item => item.projectName === '矫正视力').length === 0 || data.filter(item => item.projectName === '矫正视力')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '矫正视力')[0].flag,
        syFlag: (data.filter(item => item.projectName === '沙眼').length === 0 || data.filter(item => item.projectName === '沙眼')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '沙眼')[0].flag,
        sjFlag: (data.filter(item => item.projectName === '色觉').length === 0 || data.filter(item => item.projectName === '色觉')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '色觉')[0].flag,
        jmyFlag: (data.filter(item => item.projectName === '结膜炎').length === 0 || data.filter(item => item.projectName === '结膜炎')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '结膜炎')[0].flag
      }
      if (data.filter(item => item.projectName === '身高').length !== 0) {
        this.sgVal = data.filter(item => item.projectName === '身高')[0].value1
        this.sgCopyVal = this.sgVal
      }
      if (data.filter(item => item.projectName === '体重').length !== 0) {
        this.tzVal = data.filter(item => item.projectName === '体重')[0].value1
        this.tzCopyVal = this.tzVal
      }
      if (data.filter(item => item.projectName === '头颈').length !== 0) {
        this.tjVal = data.filter(item => item.projectName === '头颈')[0].value1
        this.tjOther = data.filter(item => item.projectName === '头颈')[0].value2
        this.tjOptions = this.myList.filter(item => item.projectName === '头颈')[0].contentList
      }
      if (data.filter(item => item.projectName === '脊柱').length !== 0) {
        this.jzVal = data.filter(item => item.projectName === '脊柱')[0].value1
        this.jzOther = data.filter(item => item.projectName === '脊柱')[0].value2
        this.jzOptions = this.myList.filter(item => item.projectName === '脊柱')[0].contentList
      }
      if (data.filter(item => item.projectName === '皮肤').length !== 0) {
        this.pfVal = data.filter(item => item.projectName === '皮肤')[0].value1
        this.pfOther = data.filter(item => item.projectName === '皮肤')[0].value2
        this.pfOptions = this.myList.filter(item => item.projectName === '皮肤')[0].contentList
      }
      if (data.filter(item => item.projectName === '四肢关节').length !== 0) {
        this.szgjVal = data.filter(item => item.projectName === '四肢关节')[0].value1
        this.szgjOther = data.filter(item => item.projectName === '四肢关节')[0].value2
        this.szgjOptions = this.myList.filter(item => item.projectName === '四肢关节')[0].contentList
      }
      if (data.filter(item => item.projectName === '胸部').length !== 0) {
        this.xbVal = data.filter(item => item.projectName === '胸部')[0].value1
        this.xbOther = data.filter(item => item.projectName === '胸部')[0].value2
        this.xbOptions = this.myList.filter(item => item.projectName === '胸部')[0].contentList
      }
      if (data.filter(item => item.projectName === '心脏').length !== 0) {
        this.xzVal = data.filter(item => item.projectName === '心脏')[0].value1
        this.xzOther = data.filter(item => item.projectName === '心脏')[0].value2
        this.xzOptions = this.myList.filter(item => item.projectName === '心脏')[0].contentList
      }
      if (data.filter(item => item.projectName === '肺').length !== 0) {
        this.fVal = data.filter(item => item.projectName === '肺')[0].value1
        this.fOther = data.filter(item => item.projectName === '肺')[0].value2
        this.fOptions = this.myList.filter(item => item.projectName === '肺')[0].contentList
      }
      if (data.filter(item => item.projectName === '肝脾').length !== 0) {
        this.gpVal = data.filter(item => item.projectName === '肝脾')[0].value1
        this.gpOther = data.filter(item => item.projectName === '肝脾')[0].value2
        this.gpOptions = this.myList.filter(item => item.projectName === '肝脾')[0].contentList
      }
      if (data.filter(item => item.projectName === '脉搏').length !== 0) {
        this.xlVal = data.filter(item => item.projectName === '脉搏')[0].value1
      }
      if (data.filter(item => item.projectName === '肺活量').length !== 0) {
        this.fhlVal = data.filter(item => item.projectName === '肺活量')[0].value1
      }
      if (data.filter(item => item.projectName === '血色素').length !== 0) {
        this.xssVal = data.filter(item => item.projectName === '血色素')[0].value1
      }
      if (data.filter(item => item.projectName === '沙眼').length !== 0) {
        this.syVal = data.filter(item => item.projectName === '沙眼')[0].value1
        this.syOther = data.filter(item => item.projectName === '沙眼')[0].value2
        this.syOptions = this.myList.filter(item => item.projectName === '沙眼')[0].contentList
      }
      if (data.filter(item => item.projectName === '色觉').length !== 0) {
        this.sjVal = data.filter(item => item.projectName === '色觉')[0].value1
        this.sjOther = data.filter(item => item.projectName === '色觉')[0].value2
        this.sjOptions = this.myList.filter(item => item.projectName === '色觉')[0].contentList
      }
      if (data.filter(item => item.projectName === '结膜炎').length !== 0) {
        this.jmyVal = data.filter(item => item.projectName === '结膜炎')[0].value1
        this.jmyOther = data.filter(item => item.projectName === '结膜炎')[0].value2
        this.jmyOptions = this.myList.filter(item => item.projectName === '结膜炎')[0].contentList
      }
      if (data.filter(item => item.projectName === '肝功能').length !== 0) {
        this.ggnVal = data.filter(item => item.projectName === '肝功能')[0].value1
        this.ggnOther = data.filter(item => item.projectName === '肝功能')[0].value2
        this.ggnOptions = this.myList.filter(item => item.projectName === '肝功能')[0].contentList
      }
      if (data.filter(item => item.projectName === '便检').length !== 0) {
        this.bjVal = data.filter(item => item.projectName === '便检')[0].value1
        this.bjOther = data.filter(item => item.projectName === '便检')[0].value2
        this.bjOptions = this.myList.filter(item => item.projectName === '便检')[0].contentList
      }
      if (data.filter(item => item.projectName === 'PPD试验').length !== 0) {
        this.ppdVal = data.filter(item => item.projectName === 'PPD试验')[0].value1
        this.ppdOther = data.filter(item => item.projectName === 'PPD试验')[0].value2
        this.ppdOptions = this.myList.filter(item => item.projectName === 'ppd试验')[0].contentList
      }
      if (data.filter(item => item.projectName === '血压1').length !== 0) {
        this.xy1ssVal = data.filter(item => item.projectName === '血压1')[0].value1
        this.xy1szVal = data.filter(item => item.projectName === '血压1')[0].value2
      }
      if (data.filter(item => item.projectName === '血压2').length !== 0) {
        this.xy2ssVal = data.filter(item => item.projectName === '血压2')[0].value1
        this.xy2szVal = data.filter(item => item.projectName === '血压2')[0].value2
      }
      if (data.filter(item => item.projectName === '裸眼视力').length !== 0) {
        this.slyVal = data.filter(item => item.projectName === '裸眼视力')[0].value1
        this.slyCopyVal = this.slyVal
        this.slzVal = data.filter(item => item.projectName === '裸眼视力')[0].value2
        this.slzCopyVal = this.slzVal
      }
      if (data.filter(item => item.projectName === '矫正视力').length !== 0) {
        this.jzslyVal = data.filter(item => item.projectName === '矫正视力')[0].value1
        this.jzslyCopyVal = this.jzslyVal
        this.jzslzVal = data.filter(item => item.projectName === '矫正视力')[0].value2
        this.jzslzCopyVal = this.jzslzVal
      }
    }
  },
  mounted () {
    let bothInput = document.body.querySelectorAll("button[type='button']")
    bothInput.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
  },
  created () {
    setTimeout(() => {
      let data = this.studentExam.projectList
      this.list = data
      this.obj = {
        xzFlag: (data.filter(item => item.projectName === '心脏').length === 0 || data.filter(item => item.projectName === '心脏')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '心脏')[0].flag,
        fFlag: (data.filter(item => item.projectName === '肺').length === 0 || data.filter(item => item.projectName === '肺')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肺')[0].flag,
        gpFlag: (data.filter(item => item.projectName === '肝脾').length === 0 || data.filter(item => item.projectName === '肝脾')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肝脾')[0].flag,
        xlFlag: (data.filter(item => item.projectName === '脉搏').length === 0 || data.filter(item => item.projectName === '脉搏')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '脉搏')[0].flag,
        sgFlag: (data.filter(item => item.projectName === '身高').length === 0 || data.filter(item => item.projectName === '身高')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '身高')[0].flag,
        tzFlag: (data.filter(item => item.projectName === '体重').length === 0 || data.filter(item => item.projectName === '体重')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '体重')[0].flag,
        tjFlag: (data.filter(item => item.projectName === '头颈').length === 0 || data.filter(item => item.projectName === '头颈')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '头颈')[0].flag,
        jzFlag: (data.filter(item => item.projectName === '脊柱').length === 0 || data.filter(item => item.projectName === '脊柱')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '脊柱')[0].flag,
        pfFlag: (data.filter(item => item.projectName === '皮肤').length === 0 || data.filter(item => item.projectName === '皮肤')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '皮肤')[0].flag,
        szgjFlag: (data.filter(item => item.projectName === '心脏').length === 0 || data.filter(item => item.projectName === '四肢关节')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '四肢关节')[0].flag,
        xbFlag: (data.filter(item => item.projectName === '胸部').length === 0 || data.filter(item => item.projectName === '胸部')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '胸部')[0].flag,
        fhlFlag: (data.filter(item => item.projectName === '肺活量').length === 0 || data.filter(item => item.projectName === '肺活量')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肺活量')[0].flag,
        xssFlag: (data.filter(item => item.projectName === '血色素').length === 0 || data.filter(item => item.projectName === '血色素')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '血色素')[0].flag,
        ggnFlag: (data.filter(item => item.projectName === '肝功能').length === 0 || data.filter(item => item.projectName === '肝功能')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '肝功能')[0].flag,
        bjFlag: (data.filter(item => item.projectName === '便检').length === 0 || data.filter(item => item.projectName === '便检')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '便检')[0].flag,
        xy1Flag: (data.filter(item => item.projectName === '血压1').length === 0 || data.filter(item => item.projectName === '血压1')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '血压1')[0].flag,
        xy2Flag: (data.filter(item => item.projectName === '血压2').length === 0 || data.filter(item => item.projectName === '血压2')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '血压2')[0].flag,
        ppdFlag: (data.filter(item => item.projectName === 'PPD试验').length === 0 || data.filter(item => item.projectName === 'PPD试验')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === 'PPD试验')[0].flag,
        slFlag: (data.filter(item => item.projectName === '裸眼视力').length === 0 || data.filter(item => item.projectName === '裸眼视力')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '裸眼视力')[0].flag,
        jzslFlag: (data.filter(item => item.projectName === '矫正视力').length === 0 || data.filter(item => item.projectName === '矫正视力')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '矫正视力')[0].flag,
        syFlag: (data.filter(item => item.projectName === '沙眼').length === 0 || data.filter(item => item.projectName === '沙眼')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '沙眼')[0].flag,
        sjFlag: (data.filter(item => item.projectName === '色觉').length === 0 || data.filter(item => item.projectName === '色觉')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '色觉')[0].flag,
        jmyFlag: (data.filter(item => item.projectName === '结膜炎').length === 0 || data.filter(item => item.projectName === '结膜炎')[0].myProjectFlag === false) ? 'wu' : !data.filter(item => item.projectName === '结膜炎')[0].flag
      }
      if (data.filter(item => item.projectName === '身高').length !== 0) {
        this.sgVal = data.filter(item => item.projectName === '身高')[0].value1
        this.rea.sgrea = data.filter(item => item.projectName === '身高')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '身高')[0].flag
        if (flagyy) {
          this.rea.sgrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '体重').length !== 0) {
        this.tzVal = data.filter(item => item.projectName === '体重')[0].value1
        this.rea.tzrea = data.filter(item => item.projectName === '体重')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '体重')[0].flag
        if (flagyy) {
          this.rea.tzrea = '4'
        }
      }
      if (this.list.filter(item => item.projectName === '头颈')[0].flag) {
        if (data.filter(item => item.projectName === '头颈').length !== 0) {
          this.tjVal = data.filter(item => item.projectName === '头颈')[0].value1
          this.tjOther = data.filter(item => item.projectName === '头颈')[0].value2
          this.tjOptions = this.myList.filter(item => item.projectName === '头颈')[0].contentList
          this.rea.tjrea = data.filter(item => item.projectName === '头颈')[0].unexamReason
          if (!this.rea.tjrea) {
            this.rea.tjrea = '4'
          } else {
            if (this.rea.tjrea !== 4) {
              this.tjVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '头颈').length !== 0 && this.list.filter(item => item.projectName === '头颈')[0].myProjectFlag === true) {
          this.tjVal = '0'
          this.obj.tjFlag = false
          this.rea.tjrea = data.filter(item => item.projectName === '头颈')[0].unexamReason
          if (!this.rea.tjrea) {
            this.rea.tjrea = '4'
          } else {
            if (this.rea.tjrea !== 4) {
              this.tjVal = ''
            }
          }
          if (this.tjVal) {
            this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther, unexamReason: this.rea.tjrea })
          } else {
            this.$emit('change', { projectId: 'tj', id: this.list.filter(item => item.projectName === '头颈')[0].id, name: '', flag: true, value1: this.tjVal, value2: this.tjOther, unexamReason: this.rea.tjrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '脊柱')[0].flag) {
        if (data.filter(item => item.projectName === '脊柱').length !== 0) {
          this.jzVal = data.filter(item => item.projectName === '脊柱')[0].value1
          this.jzOther = data.filter(item => item.projectName === '脊柱')[0].value2
          this.jzOptions = this.myList.filter(item => item.projectName === '脊柱')[0].contentList
          this.rea.jzrea = data.filter(item => item.projectName === '脊柱')[0].unexamReason
          if (!this.rea.jzrea) {
            this.rea.jzrea = '4'
          } else {
            if (this.rea.jzrea !== 4) {
              this.jzVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '脊柱').length !== 0 && this.list.filter(item => item.projectName === '脊柱')[0].myProjectFlag === true) {
          this.jzVal = '0'
          this.obj.jzFlag = false
          this.rea.jzrea = data.filter(item => item.projectName === '脊柱')[0].unexamReason
          if (!this.rea.jzrea) {
            this.rea.jzrea = '4'
          } else {
            if (this.rea.jzrea !== 4) {
              this.jzVal = ''
            }
          }
          if (this.jzVal) {
            this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther, unexamReason: this.rea.jzrea })
          } else {
            this.$emit('change', { projectId: 'jz', id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: '', flag: true, value1: this.jzVal, value2: this.jzOther, unexamReason: this.rea.jzrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '皮肤')[0].flag) {
        if (data.filter(item => item.projectName === '皮肤').length !== 0) {
          this.pfVal = data.filter(item => item.projectName === '皮肤')[0].value1
          this.pfOther = data.filter(item => item.projectName === '皮肤')[0].value2
          this.pfOptions = this.myList.filter(item => item.projectName === '皮肤')[0].contentList
          this.rea.pfrea = data.filter(item => item.projectName === '皮肤')[0].unexamReason
          if (!this.rea.pfrea) {
            this.rea.pfrea = '4'
          } else {
            if (this.rea.pfrea !== 4) {
              this.pfVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '皮肤').length !== 0 && this.list.filter(item => item.projectName === '皮肤')[0].myProjectFlag === true) {
          this.pfVal = '0'
          this.obj.pfFlag = false
          this.rea.pfrea = data.filter(item => item.projectName === '皮肤')[0].unexamReason
          if (!this.rea.pfrea) {
            this.rea.pfrea = '4'
          } else {
            if (this.rea.pfrea !== 4) {
              this.pfVal = ''
            }
          }
          if (this.pfVal) {
            this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther, unexamReason: this.rea.pfrea })
          } else {
            this.$emit('change', { projectId: 'pf', id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: '', flag: true, value1: this.pfVal, value2: this.pfOther, unexamReason: this.rea.pfrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '四肢关节')[0].flag) {
        if (data.filter(item => item.projectName === '四肢关节').length !== 0) {
          this.szgjVal = data.filter(item => item.projectName === '四肢关节')[0].value1
          this.szgjOther = data.filter(item => item.projectName === '四肢关节')[0].value2
          this.szgjOptions = this.myList.filter(item => item.projectName === '四肢关节')[0].contentList
          this.rea.szgjrea = data.filter(item => item.projectName === '四肢关节')[0].unexamReason
          if (!this.rea.szgjrea) {
            this.rea.szgjrea = '4'
          } else {
            if (this.rea.szgjrea !== 4) {
              this.szgjVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '四肢关节').length !== 0 && this.list.filter(item => item.projectName === '四肢关节')[0].myProjectFlag === true) {
          this.szgjVal = '0'
          this.obj.szgjFlag = false
          this.rea.szgjrea = data.filter(item => item.projectName === '四肢关节')[0].unexamReason
          if (!this.rea.szgjrea) {
            this.rea.szgjrea = '4'
          } else {
            if (this.rea.szgjrea !== 4) {
              this.szgjVal = ''
            }
          }
          if (this.szgjVal) {
            this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther, unexamReason: this.rea.szgjrea })
          } else {
            this.$emit('change', { projectId: 'szgj', id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: '', flag: true, value1: this.szgjVal, value2: this.szgjOther, unexamReason: this.rea.szgjrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '胸部')[0].flag) {
        if (data.filter(item => item.projectName === '胸部').length !== 0) {
          this.xbVal = data.filter(item => item.projectName === '胸部')[0].value1
          this.xbOther = data.filter(item => item.projectName === '胸部')[0].value2
          this.xbOptions = this.myList.filter(item => item.projectName === '胸部')[0].contentList
          this.rea.xbrea = data.filter(item => item.projectName === '胸部')[0].unexamReason
          if (!this.rea.xbrea) {
            this.rea.xbrea = '4'
          } else {
            if (this.rea.xbrea !== 4) {
              this.xbVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '胸部').length !== 0 && this.list.filter(item => item.projectName === '胸部')[0].myProjectFlag === true) {
          this.xbVal = '0'
          this.obj.xbFlag = false
          this.rea.xbrea = data.filter(item => item.projectName === '胸部')[0].unexamReason
          if (!this.rea.xbrea) {
            this.rea.xbrea = '4'
          } else {
            if (this.rea.xbrea !== 4) {
              this.xbVal = ''
            }
          }
          if (this.xbVal) {
            this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther, unexamReason: this.rea.xbrea })
          } else {
            this.$emit('change', { projectId: 'xb', id: this.list.filter(item => item.projectName === '胸部')[0].id, name: '', flag: true, value1: this.xbVal, value2: this.xbOther, unexamReason: this.rea.xbrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '心脏')[0].flag) {
        if (data.filter(item => item.projectName === '心脏').length !== 0) {
          this.xzVal = data.filter(item => item.projectName === '心脏')[0].value1
          this.xzOther = data.filter(item => item.projectName === '心脏')[0].value2
          this.xzOptions = this.myList.filter(item => item.projectName === '心脏')[0].contentList
          this.rea.xzrea = data.filter(item => item.projectName === '心脏')[0].unexamReason
          if (!this.rea.xzrea) {
            this.rea.xzrea = '4'
          } else {
            if (this.rea.xzrea !== 4) {
              this.xzVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '心脏').length !== 0 && this.list.filter(item => item.projectName === '心脏')[0].myProjectFlag === true) {
          this.xzVal = '0'
          this.obj.xzFlag = false
          this.rea.xzrea = data.filter(item => item.projectName === '心脏')[0].unexamReason
          if (!this.rea.xzrea) {
            this.rea.xzrea = '4'
          } else {
            if (this.rea.xzrea !== 4) {
              this.xzVal = ''
            }
          }
          if (this.xzVal) {
            this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: '', unexamReason: this.rea.xzrea })
          } else {
            this.$emit('change', { projectId: 'xz', id: this.list.filter(item => item.projectName === '心脏')[0].id, name: '', flag: true, value1: this.xzVal, value2: '', unexamReason: this.rea.xzrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '肺')[0].flag) {
        if (data.filter(item => item.projectName === '肺').length !== 0) {
          this.fVal = data.filter(item => item.projectName === '肺')[0].value1
          this.fOther = data.filter(item => item.projectName === '肺')[0].value2
          this.fOptions = this.myList.filter(item => item.projectName === '肺')[0].contentList
          this.rea.frea = data.filter(item => item.projectName === '肺')[0].unexamReason
          if (!this.rea.frea) {
            this.rea.frea = '4'
          } else {
            if (this.rea.frea !== 4) {
              this.fVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '肺').length !== 0 && this.list.filter(item => item.projectName === '肺')[0].myProjectFlag === true) {
          this.fVal = '0'
          this.obj.fFlag = false
          this.rea.frea = data.filter(item => item.projectName === '肺')[0].unexamReason
          if (!this.rea.frea) {
            this.rea.frea = '4'
          } else {
            if (this.rea.frea !== 4) {
              this.fVal = ''
            }
          }
          if (this.fVal) {
            this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: '', unexamReason: this.rea.frea })
          } else {
            this.$emit('change', { projectId: 'f', id: this.list.filter(item => item.projectName === '肺')[0].id, name: '', flag: true, value1: this.fVal, value2: '', unexamReason: this.rea.frea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '肝脾')[0].flag) {
        if (data.filter(item => item.projectName === '肝脾').length !== 0) {
          this.gpVal = data.filter(item => item.projectName === '肝脾')[0].value1
          this.gpOther = data.filter(item => item.projectName === '肝脾')[0].value2
          this.gpOptions = this.myList.filter(item => item.projectName === '肝脾')[0].contentList
          this.rea.gprea = data.filter(item => item.projectName === '肝脾')[0].unexamReason
          if (!this.rea.gprea) {
            this.rea.gprea = '4'
          } else {
            if (this.rea.gprea !== 4) {
              this.gpVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '肝脾').length !== 0 && this.list.filter(item => item.projectName === '肝脾')[0].myProjectFlag === true) {
          this.gpVal = '0'
          this.obj.gpFlag = false
          this.rea.gprea = data.filter(item => item.projectName === '肝脾')[0].unexamReason
          if (!this.rea.gprea) {
            this.rea.gprea = '4'
          } else {
            if (this.rea.gprea !== 4) {
              this.gpVal = ''
            }
          }
          if (this.gpVal) {
            this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther, unexamReason: this.rea.gprea })
          } else {
            this.$emit('change', { projectId: 'gp', id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: '', flag: true, value1: this.gpVal, value2: this.gpOther, unexamReason: this.rea.gprea })
          }
        }
      }
      if (data.filter(item => item.projectName === '脉搏').length !== 0) {
        this.xlVal = data.filter(item => item.projectName === '脉搏')[0].value1
        this.rea.xlrea = data.filter(item => item.projectName === '脉搏')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '脉搏')[0].flag
        if (flagyy) {
          this.rea.xlrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '肺活量').length !== 0) {
        this.fhlVal = data.filter(item => item.projectName === '肺活量')[0].value1
        this.rea.fhlrea = data.filter(item => item.projectName === '肺活量')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '肺活量')[0].flag
        if (flagyy) {
          this.rea.fhlrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '血色素').length !== 0) {
        this.xssVal = data.filter(item => item.projectName === '血色素')[0].value1
        this.rea.xssrea = data.filter(item => item.projectName === '血色素')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '血色素')[0].flag
        if (flagyy) {
          this.rea.xssrea = '4'
        }
      }
      if (this.list.filter(item => item.projectName === '沙眼')[0].flag) {
        if (data.filter(item => item.projectName === '沙眼').length !== 0) {
          this.syVal = data.filter(item => item.projectName === '沙眼')[0].value1
          this.syOther = data.filter(item => item.projectName === '沙眼')[0].value2
          this.syOptions = this.myList.filter(item => item.projectName === '沙眼')[0].contentList
          this.rea.syrea = data.filter(item => item.projectName === '沙眼')[0].unexamReason
          if (!this.rea.syrea) {
            this.rea.syrea = '4'
          } else {
            if (this.rea.syrea !== 4) {
              this.syVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '沙眼').length !== 0 && this.list.filter(item => item.projectName === '沙眼')[0].myProjectFlag === true) {
          this.syVal = '0'
          this.obj.syFlag = false
          this.rea.syrea = data.filter(item => item.projectName === '沙眼')[0].unexamReason
          if (!this.rea.syrea) {
            this.rea.syrea = '4'
          } else {
            if (this.rea.syrea !== 4) {
              this.syVal = ''
            }
          }
          if (this.syVal) {
            this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther, unexamReason: this.rea.syrea })
          } else {
            this.$emit('change', { projectId: 'sy', id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: '', flag: true, value1: this.syVal, value2: this.syOther, unexamReason: this.rea.syrea })
          }
        }
      }
      if (this.list.filter(item => item.projectName === '色觉')[0].flag) {
        if (data.filter(item => item.projectName === '色觉').length !== 0) {
          this.sjVal = data.filter(item => item.projectName === '色觉')[0].value1
          this.sjOther = data.filter(item => item.projectName === '色觉')[0].value2
          this.sjOptions = this.myList.filter(item => item.projectName === '色觉')[0].contentList
          this.rea.sjrea = data.filter(item => item.projectName === '色觉')[0].unexamReason
          if (!this.rea.sjrea) {
            this.rea.sjrea = '4'
          } else {
            if (this.rea.sjrea !== 4) {
              this.sjVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '色觉').length !== 0 && this.list.filter(item => item.projectName === '色觉')[0].myProjectFlag === true) {
          if (this.studentExam.gradeName.indexOf('1') !== -1) {
            this.sjVal = '0'
            this.obj.sjFlag = false
            this.rea.sjrea = data.filter(item => item.projectName === '色觉')[0].unexamReason
            if (!this.rea.sjrea) {
              this.rea.sjrea = '4'
            } else {
              if (this.rea.sjrea !== 4) {
                this.sjVal = ''
              }
            }
            if (this.sjVal) {
              this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther, unexamReason: this.rea.sjrea })
            } else {
              this.$emit('change', { projectId: 'sj', id: this.list.filter(item => item.projectName === '色觉')[0].id, name: '', flag: true, value1: this.sjVal, value2: this.sjOther, unexamReason: this.rea.sjrea })
            }
          } else {
            this.sjVal = ''
            this.obj.sjFlag = true
            this.rea.sjrea = data.filter(item => item.projectName === '色觉')[0].unexamReason
          }
        }
      }
      if (this.list.filter(item => item.projectName === '结膜炎')[0].flag) {
        if (data.filter(item => item.projectName === '结膜炎').length !== 0) {
          this.jmyVal = data.filter(item => item.projectName === '结膜炎')[0].value1
          this.jmyOther = data.filter(item => item.projectName === '结膜炎')[0].value2
          this.jmyOptions = this.myList.filter(item => item.projectName === '结膜炎')[0].contentList
          this.rea.jmyrea = data.filter(item => item.projectName === '结膜炎')[0].unexamReason
          if (!this.rea.jmyrea) {
            this.rea.jmyrea = '4'
          } else {
            if (this.rea.jmyrea !== 4) {
              this.jmyVal = ''
            }
          }
        }
      } else {
        if (this.list.filter(item => item.projectName === '结膜炎').length !== 0 && this.list.filter(item => item.projectName === '结膜炎')[0].myProjectFlag === true) {
          this.jmyVal = '0'
          this.obj.jmyFlag = false
          this.rea.jmyrea = data.filter(item => item.projectName === '结膜炎')[0].unexamReason
          if (!this.rea.jmyrea) {
            this.rea.jmyrea = '4'
          } else {
            if (this.rea.jmyrea !== 4) {
              this.jmyVal = ''
            }
          }
          if (this.jmyVal) {
            this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther, unexamReason: this.rea.jmyrea })
          } else {
            this.$emit('change', { projectId: 'jmy', id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: '', flag: true, value1: this.jmyVal, value2: this.jmyOther, unexamReason: this.rea.jmyrea })
          }
        }
      }
      if (data.filter(item => item.projectName === '肝功能').length !== 0) {
        this.ggnVal = data.filter(item => item.projectName === '肝功能')[0].value1
        this.ggnOther = data.filter(item => item.projectName === '肝功能')[0].value2
        this.ggnOptions = this.myList.filter(item => item.projectName === '肝功能')[0].contentList
        this.rea.ggnrea = data.filter(item => item.projectName === '肝功能')[0].unexamReason
        if (!this.rea.ggnrea) {
          this.rea.ggnrea = '4'
        } else {
          if (this.rea.ggnrea !== 4) {
            this.ggnVal = ''
          }
        }
      }
      if (data.filter(item => item.projectName === '便检').length !== 0) {
        this.bjVal = data.filter(item => item.projectName === '便检')[0].value1
        this.bjOther = data.filter(item => item.projectName === '便检')[0].value2
        this.bjOptions = this.myList.filter(item => item.projectName === '便检')[0].contentList
        this.rea.bjrea = data.filter(item => item.projectName === '便检')[0].unexamReason
        if (!this.rea.bjrea) {
          this.rea.bjrea = '4'
        } else {
          if (this.rea.bjrea !== 4) {
            this.bjVal = ''
          }
        }
      }
      if (data.filter(item => item.projectName === 'PPD试验').length !== 0) {
        this.ppdVal = data.filter(item => item.projectName === 'PPD试验')[0].value1
        this.ppdOther = data.filter(item => item.projectName === 'PPD试验')[0].value2
        this.ppdOptions = this.myList.filter(item => item.projectName === 'ppd试验')[0].contentList
        this.rea.ppdrea = data.filter(item => item.projectName === 'PPD试验')[0].unexamReason
        if (!this.rea.ppdrea) {
          this.rea.ppdrea = '4'
        } else {
          if (this.rea.ppdrea !== 4) {
            this.ppdVal = ''
          }
        }
      }
      if (data.filter(item => item.projectName === '血压1').length !== 0) {
        this.xy1ssVal = data.filter(item => item.projectName === '血压1')[0].value1
        this.xy1szVal = data.filter(item => item.projectName === '血压1')[0].value2
        this.rea.xy1rea = data.filter(item => item.projectName === '血压1')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '血压1')[0].flag
        if (flagyy) {
          this.rea.xy1rea = '4'
        }
      }
      if (data.filter(item => item.projectName === '血压2').length !== 0) {
        this.xy2ssVal = data.filter(item => item.projectName === '血压2')[0].value1
        this.xy2szVal = data.filter(item => item.projectName === '血压2')[0].value2
        this.rea.xy2rea = data.filter(item => item.projectName === '血压2')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '血压2')[0].flag
        if (flagyy) {
          this.rea.xy2rea = '4'
        }
      }
      if (data.filter(item => item.projectName === '裸眼视力').length !== 0) {
        this.slyVal = data.filter(item => item.projectName === '裸眼视力')[0].value1
        this.slzVal = data.filter(item => item.projectName === '裸眼视力')[0].value2
        this.rea.slrea = data.filter(item => item.projectName === '裸眼视力')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '裸眼视力')[0].flag
        if (flagyy) {
          this.rea.slrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '矫正视力').length !== 0) {
        this.jzslyVal = data.filter(item => item.projectName === '矫正视力')[0].value1
        this.jzslzVal = data.filter(item => item.projectName === '矫正视力')[0].value2
        this.rea.jzslrea = data.filter(item => item.projectName === '矫正视力')[0].unexamReason
        let flagyy = data.filter(item => item.projectName === '矫正视力')[0].flag
        if (flagyy) {
          this.rea.jzslrea = '4'
        }
      }
    }, 400)
    setTimeout(() => {
      // let xy1szClass = document.body.querySelectorAll('.xy1sz input')
      // if (xy1szClass) {
      //   xy1szClass[0].classList.add('xy1sz-input')
      // }
      // let xy1ssClass = document.body.querySelectorAll('.xy1ss input')
      // if (xy1ssClass[0]) {
      //   xy1ssClass[0].classList.add('xy1ss-input')
      // }
      // let slyClass = document.body.querySelectorAll('.sly input')
      // if (slyClass[0]) {
      //   slyClass[0].classList.add('sly-input')
      // }
      // let slzClass = document.body.querySelectorAll('.slz input')
      // if (slzClass[0]) {
      //   slzClass[0].classList.add('slz-input')
      // }
      // let all = document.body.querySelectorAll('input')
      // let num = 0
      // let xy1szNum
      // let slz
      // for (let i = 0; i < all.length; i++) {
      //   num++
      //   if (all[i].className.indexOf('xy1sz-input') === -1 && all[i].className.indexOf('slz-input') === -1) {
      //     all[i].setAttribute('tabindex', num)
      //   }
      //   if (all[i].className.indexOf('xy1ss-input') !== -1) {
      //     xy1szNum = num + 1
      //     xy1szClass[0].setAttribute('tabindex', xy1szNum)
      //   }
      //   if (all[i].className.indexOf('sly-input') !== -1) {
      //     slz = num + 1
      //     slzClass[0].setAttribute('tabindex', slz)
      //   }
      // }
      let bothInput = document.body.querySelectorAll("button[type='button']")
      bothInput.forEach(item => {
        item.setAttribute('tabindex', '-1')
      })
      let bothInputw = document.body.querySelectorAll('.el-dropdown__caret-button')
      bothInputw.forEach(item => {
        item.setAttribute('tabindex', '-1')
      })
    }, 800)
  }
}
</script>
<style lang="scss">
.fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity 3s;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .fade-leave-active{
    transition: opacity 3s;
  }
.single-project {
  .table-1 {
    margin-top: 10px;
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    td,th {
      width: 40px;
      height: 50px;
      padding: 2px 5px;
      box-sizing: border-box;
      text-align: center;
      border-color: #EEEEEE;
      color: #4D4D4D;
      &:nth-child(3) {
        text-align: left;
        padding-left: 100px;
      }
    }
    thead {
      background: #ABC1FE;
      th {
        color: #fff;
        border: 0;
      }
      tr:nth-child(2) {
        background: #C4D3FE;
      }
    }
    tbody {
      tr {
        td {
          width: 120px;
          .el-input {
            width: 150px;
            .el-input__inner {
              height: 40px;
              width: 150px;
            }
          }
          .el-select {
            width: 150px;
            .el-input {
              width: 150px;
              .el-input__inner {
                height: 40px;
                width: 150px;
              }
            }
          }
          .el-tag {
            cursor: pointer;
          }
          .el-tag:hover {
            border-color: #409EFF;
          }
        }
        td:nth-child(1) {
          background: #E6E6E6;
        }
        td:nth-child(5) {
          background: #E6E6E6;
        }
      }
    }
  }

  .table-2 {
    margin-top: 10px;
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    td,th {
      width: 40px;
      height: 50px;
      padding: 2px 5px;
      box-sizing: border-box;
      text-align: center;
      border-color: #EEEEEE;
      color: #4D4D4D;
      .el-input {
        width: 150px;
        .el-input__inner {
          height: 40px;
          width: 150px;
        }
      }
    }
    thead {
      background: #ABC1FE;
      th {
        color: #fff;
        border: 0;
      }
      tr:nth-child(2) {
        background: #C4D3FE;
      }
    }
    tbody {
      tr:nth-child(1),tr:nth-child(3),tr:nth-child(5),tr:nth-child(7) {
        td:nth-child(1),td:nth-child(5) {
          background: #E6E6E6;
        }
      }
    }
  }
  .xy {
    width: 100px !important;
    .el-input__inner {
      width: 100px !important;
    }
  }
}
</style>
