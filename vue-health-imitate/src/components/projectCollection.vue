<template>
  <div class='project-collection'>
    <!-- 集合重构 -->
    <table class="table-copy" border="1" cellspacing="0" width="100%">
      <thead style="background: #ABC1FE;">
        <tr>
          <th>体检项目</th>
          <th>详细信息</th>
          <th>未检测原因</th>
          <th>体检项目</th>
          <th>详细信息</th>
          <th>未检测原因</th>
        </tr>
      </thead>
      <tbody>
        <!-- 第一行 -->
        <tr>
          <td>心脏</td>
          <td>
            <el-select :disabled="obj.xzFlag === 'wu'" @change="xzSel" v-model="xzVal" placeholder="请选择">
              <el-option
                v-for="item in xzOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="xzOther" ref="xz" class="other-input" @blur="xzBlur" v-if="xzVal === '9'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="xzChange" szie="small">
              <span >{{this.rea.xzrea == '1' ? '被检人不配合' : this.rea.xzrea == '2' ? '身体原因' : this.rea.xzrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>肺</td>
          <td>
            <el-select :disabled="obj.fFlag === 'wu'" @change="fSel" v-model="fVal" placeholder="请选择">
              <el-option
                v-for="item in fOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="fOther" ref="f" class="other-input" @blur="fBlur" v-if="fVal === '5'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="fChange" szie="small">
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
        <!-- 第二行 -->
        <tr>
          <td>肝脾</td>
          <td>
            <el-select @change="gpSel" :disabled="obj.gpFlag === 'wu'" v-model="gpVal" placeholder="请选择">
              <el-option
                v-for="item in gpOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <!-- <el-input v-model.trim="gpOther" @blur="gpBlur" ref="gp" class="other-input" v-if="gpVal === ''" :maxlength="50"></el-input> -->
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="gpChange" szie="small">
              <span >{{this.rea.gprea == '1' ? '被检人不配合' : this.rea.gprea == '2' ? '身体原因' : this.rea.gprea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>脉搏</td>
          <td>
            <el-input style="width: 160px;" v-model.trim="xlVal" @blur="xlBlur" :disabled="obj.xlFlag === 'wu'" ref="xl" class="other-input"></el-input> 次/分
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="xlChange" szie="small">
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
        <!-- 第三行 -->
        <tr>
          <td>身高</td>
          <td>
            <el-input ref="sg" v-model.trim="sgVal" :disabled="obj.sgFlag === 'wu'" @blur="sgBlur"></el-input> cm
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="sgChange" szie="small">
              <span >{{this.rea.sgrea == '1' ? '被检人不配合' : this.rea.sgrea == '2' ? '身体原因' : this.rea.sgrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>体重</td>
          <td>
            <el-input ref="tz" v-model.trim="tzVal" :disabled="obj.tzFlag === 'wu'" @blur="tzBlur"></el-input> kg
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="tzChange" szie="small">
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
        <!-- 第四行 -->
        <tr>
          <td>头颈</td>
          <td>
            <el-select @change="tjSel" :disabled="obj.tjFlag === 'wu'" v-model="tjVal" placeholder="请选择">
              <el-option
                v-for="item in tjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="tjOther" @blur="tjBlur" ref="tj" class="other-input" v-if="tjVal === '4'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="tjChange" szie="small">
              <span >{{this.rea.tjrea == '1' ? '被检人不配合' : this.rea.tjrea == '2' ? '身体原因' : this.rea.tjrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>脊柱</td>
          <td>
            <el-select @change="jzSel" :disabled="obj.jzFlag === 'wu'" v-model="jzVal" placeholder="请选择">
              <el-option
                v-for="item in jzOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="jzOther" @blur="tjBlur" ref="jz" class="other-input" v-if="jzVal === '4'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="jzChange" szie="small">
              <span >{{this.rea.jzrea == '1' ? '被检人不配合' : this.rea.jzrea == '2' ? '身体原因' : this.rea.jzrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
        <!-- 第五行 -->
        <tr>
          <td>皮肤</td>
          <td>
            <el-select @change="pfSel" :disabled="obj.pfFlag === 'wu'" v-model="pfVal" placeholder="请选择">
              <el-option
                v-for="item in pfOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="pfOther" @blur="pfBlur" ref="pf" class="other-input" v-if="pfVal === '5'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="pfChange" szie="small">
              <span >{{this.rea.pfrea == '1' ? '被检人不配合' : this.rea.pfrea == '2' ? '身体原因' : this.rea.pfrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>四肢关节</td>
          <td>
            <el-select @change="szgjSel" :disabled="obj.szgjFlag === 'wu'" v-model="szgjVal" placeholder="请选择">
              <el-option
                v-for="item in szgjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="szgjOther" @blur="szgjBlur" ref="szgj" class="other-input" v-if="szgjVal === '2'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="szgjChange" szie="small">
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
        <!-- 第六行 -->
        <tr>
          <td>胸部</td>
          <td>
            <el-select @change="xbSel" :disabled="obj.xbFlag === 'wu'" v-model="xbVal" placeholder="请选择">
              <el-option
                v-for="item in xbOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="xbOther" @blur="xbBlur" ref="xb" class="other-input" v-if="xbVal === '4'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="xbChange" szie="small">
              <span >{{this.rea.xbrea == '1' ? '被检人不配合' : this.rea.xbrea == '2' ? '身体原因' : this.rea.xbrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>肺活量</td>
          <td>
            <el-input ref="fhl" :disabled="obj.fhlFlag === 'wu'" v-model.trim="fhlVal" @blur="fhlBlur"></el-input> ml
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="fhlChange" szie="small">
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
        <!-- 第七行 -->
        <tr>
          <td>血色素</td>
          <td>
            <el-input ref="xss" :disabled="obj.xssFlag === 'wu'" v-model.trim="xssVal" @blur="xssBlur"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="xssChange" szie="small">
              <span >{{this.rea.xssrea == '1' ? '被检人不配合' : this.rea.xssrea == '2' ? '身体原因' : this.rea.xssrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>沙眼</td>
          <td>
            <el-select @change="sySel" :disabled="obj.syFlag === 'wu'" v-model="syVal" placeholder="请选择">
              <el-option
                v-for="item in syOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="syOther" @blur="syBlur" ref="sy" class="other-input" v-if="syVal === '100'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="syChange" szie="small">
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
        <!-- 第八行 -->
        <tr>
          <td>色觉</td>
          <td>
            <el-select @change="sjSel" :disabled="obj.sjFlag === 'wu'" v-model="sjVal" placeholder="请选择">
              <el-option
                v-for="item in sjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="sjOther" @blur="sjBlur" ref="sj" class="other-input" v-if="sjVal === '2'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="sjChange" szie="small">
              <span >{{this.rea.sjrea == '1' ? '被检人不配合' : this.rea.sjrea == '2' ? '身体原因' : this.rea.sjrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>结膜炎</td>
          <td>
            <el-select @change="jmySel" :disabled="obj.jmyFlag === 'wu'" v-model="jmyVal" placeholder="请选择">
              <el-option
                v-for="item in jmyOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="jmyChange" szie="small">
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
        <!-- 第九行 -->
        <tr>
          <td>肝功能</td>
          <td>
            <el-select @change="ggnSel" :disabled="obj.ggnFlag === 'wu'" v-model="ggnVal" placeholder="请选择">
              <el-option
                v-for="item in ggnOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="ggnOther" @blur="ggnBlur" ref="ggn" class="other-input" v-if="ggnVal === '100'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="ggnChange" szie="small">
              <span >{{this.rea.ggnrea == '1' ? '被检人不配合' : this.rea.ggnrea == '2' ? '身体原因' : this.rea.ggnrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>便检</td>
          <td>
            <el-select @change="bjSel" :disabled="obj.bjFlag === 'wu'" v-model="bjVal" placeholder="请选择">
              <el-option
                v-for="item in bjOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="bjOther" @blur="bjBlur" ref="bj" class="other-input" v-if="bjVal === '2'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="bjChange" szie="small">
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
        <!-- 第十行 -->
        <tr v-if="obj.ppdFlag !== 'wu'">
          <td >ppd实验</td>
          <td>
            <el-select @change="ppdSel" :disabled="obj.ppdFlag === 'wu'" v-model="ppdVal" placeholder="请选择">
              <el-option
                v-for="item in ppdOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input v-model.trim="ppdOther" @blur="ppdBlur" ref="ppd" class="other-input" v-if="ppdVal === '2'" :maxlength="50"></el-input>
          </td>
          <td>
            <el-dropdown split-button type="primary" @command="ppdChange" szie="small">
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
        <!-- 第十一行 -->
        <tr>
          <td rowspan="2">裸眼视力</td>
          <td>右 <el-input @blur="slyBlur" ref="sly" v-model="slyVal" :disabled="obj.slFlag === 'wu'"></el-input></td>
          <td rowspan="2">
            <el-dropdown split-button type="primary" @command="slChange" szie="small">
              <span >{{this.rea.slrea == '1' ? '被检人不配合' : this.rea.slrea == '2' ? '身体原因' : this.rea.slrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td rowspan="2">矫正视力</td>
          <td>
             右 <el-input @blur="jzslyBlur" ref="jzsly" v-model="jzslyVal" :disabled="obj.jzslFlag === 'wu'"></el-input>
          </td>
          <td rowspan="2">
            <el-dropdown split-button type="primary" @command="jzslChange" szie="small">
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
          <td style="margin-left:-20px;">左 <el-input @blur="slzBlur" ref="slz" v-model="slzVal" class="slz" :disabled="obj.slFlag === 'wu'"></el-input></td>
          <td>左 <el-input @blur="jzslzBlur" ref="jzslz" v-model="jzslzVal" class="jzslz" :disabled="obj.jzslFlag === 'wu'"></el-input></td>
        </tr>
        <!-- 第十二行 -->
        <tr>
          <td rowspan="2">血压1</td>
          <td>收缩压1 <el-input @blur="xy1ssBlur" ref="xy1ss" v-model="xy1ssVal" :disabled="obj.xy1Flag === 'wu'"></el-input> mmHg</td>
          <td rowspan="2">
            <el-dropdown split-button type="primary" @command="xy1Change" szie="small">
              <span >{{this.rea.xy1rea == '1' ? '被检人不配合' : this.rea.xy1rea == '2' ? '身体原因' : this.rea.xy1rea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td rowspan="2">血压2</td>
          <td>收缩压2 <el-input @blur="xy2ssBlur" ref="xy2ss" v-model="xy2ssVal" :disabled="obj.xy2Flag === 'wu'"></el-input> mmHg</td>
          <td rowspan="2">
            <el-dropdown split-button type="primary" @command="xy2Change" szie="small">
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
          <td> 舒张压1 <el-input @blur="xy1szBlur" ref="xy1sz" class="xy1sz" v-model="xy1szVal" :disabled="obj.xy1Flag === 'wu'"></el-input> mmHg</td>
          <td>舒张压2 <el-input @blur="xy2szBlur" ref="xy2sz" v-model="xy2szVal" class="xy2sz" :disabled="obj.xy2Flag === 'wu'"></el-input> mmHg</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { notice } from '../utils/index'
export default {
  name: 'project-collection',
  data () {
    return {
      sgCopyVal: '',
      tzCopyVal: '',
      slyCopyVal: '',
      slzCopyVal: '',
      jzslyCopyVal: '',
      jzslzCopyVal: '',
      xzOther: '',
      fOther: '',
      gpOther: '',
      xlOther: '',
      tjOther: '',
      jzOther: '',
      pfOther: '',
      szgjOther: '',
      xbOther: '',
      syOther: '',
      sjOther: '',
      jmyOther: '',
      ggnOther: '',
      bjOther: '',
      ppdOther: '',
      xzVal: '',
      fVal: '',
      gpVal: '',
      xlVal: '',
      tjVal: '',
      jzVal: '',
      pfVal: '',
      szgjVal: '',
      xbVal: '',
      syVal: '',
      sjVal: '',
      jmyVal: '',
      ggnVal: '',
      bjVal: '',
      ppdVal: '',
      sgVal: '',
      tzVal: '',
      xssVal: '',
      fhlVal: '',
      xy1ssVal: '',
      xy1szVal: '',
      xy2ssVal: '',
      xy2szVal: '',
      slyVal: '',
      slzVal: '',
      jzslyVal: '',
      jzslzVal: '',
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
      xzOptions: [],
      fOptions: [],
      gpOptions: [],
      xlOptions: [],
      tjOptions: [],
      jzOptions: [],
      pfOptions: [],
      szgjOptions: [],
      xbOptions: [],
      syOptions: [],
      sjOptions: [],
      jmyOptions: [],
      ggnOptions: [],
      bjOptions: [],
      ppdOptions: [],
      value: '',
      list: []
    }
  },
  props: [
    'studentExam',
    'checkout',
    'fill',
    'myList'
  ],
  methods: {
    open3 () {
      this.$alert('该数值非法,请重新输入', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },
    // 心脏
    xzSel () {
      this.obj.xzFlag = false
      if (this.xzVal !== '9') {
        this.xzOther = ''
      }
      if (this.xzVal) {
        this.rea.xzrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: this.xzOther, unexamReason: this.rea.xzrea })
      }
    },
    xzBlur () {
      this.rea.xzrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: this.xzOther, unexamReason: this.rea.xzrea })
    },
    xzChange (val) {
      this.rea.xzrea = val
      if (this.xzVal) {
        this.xzVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '心脏')[0].id, name: '', flag: true, value1: '', value2: '', unexamReason: this.rea.xzrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '心脏')[0].id, name: '心脏', flag: true, value1: '', value2: '', unexamReason: this.rea.xzrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: this.fOther, unexamReason: this.rea.frea })
      }
    },
    fBlur () {
      this.rea.frea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: this.fOther, unexamReason: this.rea.frea })
    },
    fChange (val) {
      this.rea.frea = val
      if (this.fVal) {
        this.fVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肺')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.frea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肺')[0].id, name: '肺', flag: false, value1: '', value2: '', unexamReason: this.rea.frea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther, unexamReason: this.rea.gprea })
      }
    },
    gpBlur () {
      this.rea.gprea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther, unexamReason: this.rea.gprea })
    },
    gpChange (val) {
      this.rea.gprea = val
      if (this.gpVal) {
        this.gpVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.gprea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: '肝脾', flag: false, value1: '', value2: '', unexamReason: this.rea.gprea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: this.xlOptions.filter(item => item.code === this.xlVal)[0].name, flag: true, value1: this.xlVal, value2: this.xlOther, unexamReason: this.rea.xlrea })
      }
    },
    xlBlur () {
      if (this.xlVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.xlVal)) {
          this.xlVal = ''
          notice('请输入数字')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
        } else {
          this.obj.xlFlag = false
          this.rea.xlrea = '4'
          this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: true, value1: this.xlVal, value2: '', unexamReason: this.rea.xlrea })
        }
      } else {
        if (this.obj.xlFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
        }
      }
    },
    xlChange (val) {
      this.rea.xlrea = val
      if (this.xlVal) {
        this.xlVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: '心率', flag: false, value1: '', value2: '', unexamReason: this.rea.xlrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther, unexamReason: this.rea.tjrea })
      }
    },
    tjBlur () {
      this.rea.tjrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther, unexamReason: this.rea.tjrea })
    },
    tjChange (val) {
      this.rea.tjrea = val
      if (this.tjVal) {
        this.tjVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '头颈')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.tjrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '头颈')[0].id, name: '头颈', flag: false, value1: '', value2: '', unexamReason: this.rea.tjrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther, unexamReason: this.rea.jzrea })
      }
    },
    jzBlur () {
      this.rea.jzrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther, unexamReason: this.rea.jzrea })
    },
    jzChange (val) {
      this.rea.jzrea = val
      if (this.jzVal) {
        this.jzVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.jzrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: '脊柱', flag: false, value1: '', value2: '', unexamReason: this.rea.jzrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther, unexamReason: this.rea.pfrea })
      }
    },
    pfBlur () {
      this.rea.pfrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther, unexamReason: this.rea.pfrea })
    },
    pfChange (val) {
      this.rea.pfrea = val
      if (this.pfVal) {
        this.pfVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.pfrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: '皮肤', flag: false, value1: '', value2: '', unexamReason: this.rea.pfrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther, unexamReason: this.rea.szgjrea })
      }
    },
    szgjBlur () {
      this.rea.szgjrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther, unexamReason: this.rea.szgjrea })
    },
    szgjChange (val) {
      this.rea.szgjrea = val
      if (this.szgjVal) {
        this.szgjVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.szgjrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: '四肢关节', flag: false, value1: '', value2: '', unexamReason: this.rea.szgjrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther, unexamReason: this.rea.xbrea })
      }
    },
    xbBlur () {
      this.rea.xbrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther, unexamReason: this.rea.xbrea })
    },
    xbChange (val) {
      this.rea.xbrea = val
      if (this.xbVal) {
        this.xbVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '胸部')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xbrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '胸部')[0].id, name: '胸部', flag: false, value1: '', value2: '', unexamReason: this.rea.xbrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther, unexamReason: this.rea.syrea })
      }
    },
    syBlur () {
      this.rea.syrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther, unexamReason: this.rea.syrea })
    },
    syChange (val) {
      this.rea.syrea = val
      if (this.syVal) {
        this.syVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.syrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: '沙眼', flag: false, value1: '', value2: '', unexamReason: this.rea.syrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther, unexamReason: this.rea.sjrea })
      }
    },
    sjBlur () {
      this.rea.sjrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther, unexamReason: this.rea.sjrea })
    },
    sjChange (val) {
      this.rea.sjrea = val
      if (this.sjVal) {
        this.sjVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '色觉')[0].id, name: '', flag: true, value1: '', value2: '', unexamReason: this.rea.sjrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '色觉')[0].id, name: '色觉', flag: true, value1: '', value2: '', unexamReason: this.rea.sjrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther, unexamReason: this.rea.jmyrea })
      }
    },
    jmyBlur () {
      this.rea.jmyrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther, unexamReason: this.rea.jmyrea })
    },
    jmyChange (val) {
      this.rea.jmyrea = val
      if (this.jmyVal) {
        this.jmyVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.jmyrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: '结膜炎', flag: false, value1: '', value2: '', unexamReason: this.rea.jmyrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: this.ggnOptions.filter(item => item.code === this.ggnVal)[0].name, flag: true, value1: this.ggnVal, value2: this.ggnOther, unexamReason: this.rea.ggnrea })
      }
    },
    ggnBlur () {
      this.rea.ggnrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: this.ggnOptions.filter(item => item.code === this.ggnVal)[0].name, flag: true, value1: this.ggnVal, value2: this.ggnOther, unexamReason: this.rea.ggnrea })
    },
    ggnChange (val) {
      this.rea.ggnrea = val
      if (this.ggnVal) {
        this.ggnVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.ggnrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: '肝功能', flag: false, value1: '', value2: '', unexamReason: this.rea.ggnrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === '便检')[0].id, name: this.bjOptions.filter(item => item.code === this.bjVal)[0].name, flag: true, value1: this.bjVal, value2: this.bjOther, unexamReason: this.rea.bjrea })
      }
    },
    bjBlur () {
      this.rea.bjrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === '便检')[0].id, name: this.bjOptions.filter(item => item.code === this.bjVal)[0].name, flag: true, value1: this.bjVal, value2: this.bjOther, unexamReason: this.rea.bjrea })
    },
    bjChange (val) {
      this.rea.bjrea = val
      if (this.bjVal) {
        this.bjVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '便检')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.bjrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '便检')[0].id, name: '便检', flag: false, value1: '', value2: '', unexamReason: this.rea.bjrea })
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
        this.$emit('change', { id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: this.ppdOptions.filter(item => item.code === this.ppdVal)[0].name, flag: true, value1: this.ppdVal, value2: this.ppdOther, unexamReason: this.rea.ppdrea })
      }
    },
    ppdBlur () {
      this.rea.ppdrea = '4'
      this.$emit('change', { id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: this.ppdOptions.filter(item => item.code === this.ppdVal)[0].name, flag: true, value1: this.ppdVal, value2: this.ppdOther, unexamReason: this.rea.ppdrea })
    },
    ppdChange (val) {
      this.rea.ppdrea = val
      if (this.ppdVal) {
        this.ppdVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.ppdrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === 'PPD试验')[0].id, name: 'PPD试验', flag: false, value1: '', value2: '', unexamReason: this.rea.ppdrea })
      }
    },
    // **************************************************************************************************************
    // 身高
    sgBlur () {
      if (this.sgVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.sgVal)) {
          this.sgVal = ''
          notice('请输入数字')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
        } else {
          if (this.sgVal > 9998 || this.sgVal < 100) {
            this.open3()
            this.sgVal = ''
            this.$refs.sg.focus()
          } else {
            if (this.sgVal > 3000 || this.sgVal < 1000) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.sgFlag = false
              if (this.sgVal !== this.sgCopyVal) {
                this.sgVal = this.sgVal / 10
              }
              this.sgCopyVal = this.sgVal
              this.rea.sgrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', sureSg: '1', flag: true, value1: this.sgVal, value2: '', unexamReason: this.rea.sgrea })
              // }).catch(() => {
              //   this.sgVal = ''
              //   this.$refs.sg.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
              // })
            } else {
              this.obj.sgFlag = false
              if (this.sgVal !== this.sgCopyVal) {
                this.sgVal = this.sgVal / 10
              }
              this.sgCopyVal = this.sgVal
              this.rea.sgrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', sureSg: '2', flag: true, value1: this.sgVal, value2: '', unexamReason: this.rea.sgrea })
            }
          }
        }
      } else {
        if (this.obj.sgFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
        }
      }
    },
    sgChange (val) {
      this.rea.sgrea = val
      if (this.sgVal) {
        this.sgVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '身高')[0].id, name: '身高', flag: false, value1: '', value2: '', unexamReason: this.rea.sgrea })
      }
    },
    // 体重
    tzBlur () {
      if (this.tzVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.tzVal)) {
          this.tzVal = ''
          notice('请输入数字')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
        } else {
          if (this.tzVal > 2000 || this.tzVal < 100) {
            this.open3()
            this.tzVal = ''
            this.$refs.tz.focus()
          } else {
            if (this.tzVal > 1000 || this.tzVal < 200) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.tzFlag = false
              if (this.tzVal !== this.tzCopyVal) {
                this.tzVal = this.tzVal / 10
              }
              this.tzCopyVal = this.tzVal
              this.rea.tzrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', sureTz: '1', flag: true, value1: this.tzVal, value2: '', unexamReason: this.rea.tzrea })
              // }).catch(() => {
              //   this.tzVal = ''
              //   this.$refs.tz.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
              // })
            } else {
              this.obj.tzFlag = false
              if (this.tzVal !== this.tzCopyVal) {
                this.tzVal = this.tzVal / 10
              }
              this.tzCopyVal = this.tzVal
              this.rea.tzrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', sureTz: '2', flag: true, value1: this.tzVal, value2: '', unexamReason: this.rea.tzrea })
            }
          }
        }
      } else {
        if (this.obj.tzFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
        }
      }
    },
    tzChange (val) {
      this.rea.tzrea = val
      if (this.tzVal) {
        this.tzVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '体重')[0].id, name: '体重', flag: false, value1: '', value2: '', unexamReason: this.rea.tzrea })
      }
    },
    // 肺活量
    fhlBlur () {
      if (this.fhlVal) {
        if (!(/^\d{1,}$/).test(this.fhlVal)) {
          this.fhlVal = ''
          notice('请输入100-6000之间的正整数')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
        } else {
          if (this.fhlVal > 9999 || this.fhlVal < 100) {
            this.open3()
            this.fhlVal = ''
            this.$refs.fhl.focus()
          } else {
            if (this.fhlVal > 6000 || this.fhlVal < 1000) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.fhlFlag = false
              this.rea.fhlrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', sureFhl: '1', flag: true, value1: this.fhlVal, value2: '', unexamReason: this.rea.fhlrea })
              // }).catch(() => {
              //   this.fhlVal = ''
              //   this.$refs.fhl.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
              // })
            } else {
              this.obj.fhlFlag = false
              this.rea.fhlrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', sureFhl: '2', flag: true, value1: this.fhlVal, value2: '', unexamReason: this.rea.fhlrea })
            }
          }
        }
      } else {
        if (this.obj.fhlFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
        }
      }
    },
    fhlChange (val) {
      this.rea.fhlrea = val
      if (this.fhlVal) {
        this.fhlVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肺活量')[0].id, name: '肺活量', flag: false, value1: '', value2: '', unexamReason: this.rea.fhlrea })
      }
    },
    // 血色素
    xssBlur () {
      if (this.xssVal) {
        if (!(/^\d{1,}$/).test(this.xssVal)) {
          this.xssVal = ''
          notice('请输入50-300之间的正整数')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
        } else {
          if (this.xssVal > 350 || this.xssVal < 50) {
            this.open3()
            this.xssVal = ''
            this.$refs.xss.focus()
          } else {
            if (this.xssVal > 300 || this.xssVal < 50) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.xssFlag = false
              this.rea.xssrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', sureXss: '1', flag: true, value1: this.fhlVal, value2: '', unexamReason: this.rea.xssrea })
              // }).catch(() => {
              //   this.xssVal = ''
              //   this.$refs.xss.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
              // })
            } else {
              this.obj.xssFlag = false
              this.rea.xssrea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', sureXss: '2', flag: true, value1: this.xssVal, value2: '', unexamReason: this.rea.xssrea })
            }
          }
        }
      } else {
        if (this.obj.xssFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
        }
      }
    },
    xssChange (val) {
      this.rea.xssrea = val
      if (this.xssVal) {
        this.xssVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '血色素')[0].id, name: '血色素', flag: false, value1: '', value2: '', unexamReason: this.rea.xssrea })
      }
    },
    // 血压1
    xy1ssBlur () {
      if (this.xy1ssVal) {
        if (!(/^\d*[02468]$/).test(this.xy1ssVal)) {
          this.xy1ssVal = ''
          this.$alert('请输入60-200之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: this.xy1ssVal, unexamReason: this.rea.xy1rea })
        } else {
          if (this.xy1ssVal > 900 || this.xy1ssVal < 10) {
            this.open3()
            this.xy1ssVal = ''
            this.$refs.xy1ss.focus()
          } else {
            if (this.xy1ssVal > 200 || this.xy1ssVal < 60) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1ss: '1', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal, unexamReason: this.rea.xy1rea })
              // }).catch(() => {
              //   this.xy1ssVal = ''
              //   this.$refs.xy1ss.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: '', unexamReason: this.rea.xy1rea })
              // })
            } else {
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1ss: '2', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal, unexamReason: this.rea.xy1rea })
            }
          }
        }
      } else {
        if (this.obj.xy1Flag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '', flag: false, value1: '', value2: this.xy1ssVal, unexamReason: this.rea.xy1rea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: this.xy1ssVal, unexamReason: this.rea.xy1rea })
        }
      }
    },
    xy1szBlur () {
      if (this.xy1szVal) {
        if (!(/^\d*[02468]$/).test(this.xy1szVal)) {
          this.xy1szVal = ''
          this.$alert('请输入30-120之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: this.xy1szVal, value2: '', unexamReason: this.rea.xy1rea })
        } else {
          if (this.xy1szVal > 900 || this.xy1szVal < 10) {
            this.open3()
            this.xy1szVal = ''
            this.$refs.xy1sz.focus()
          } else {
            if (this.xy1szVal > 120 || this.xy1szVal < 30) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1sz: '1', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal, unexamReason: this.rea.xy1rea })
              // }).catch(() => {
              //   this.xy1szVal = ''
              //   this.$refs.xy1sz.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: '', unexamReason: this.rea.xy1rea })
              // })
            } else {
              this.obj.xy1Flag = false
              this.rea.xy1rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', sureXy1sz: '2', flag: true, value1: this.xy1ssVal, value2: this.xy1szVal, unexamReason: this.rea.xy1rea })
            }
          }
        }
      } else {
        if (this.obj.xy1Flag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '', flag: false, value1: this.xy1szVal, value2: '', unexamReason: this.rea.xy1rea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: this.xy1szVal, value2: '', unexamReason: this.rea.xy1rea })
        }
      }
    },
    xy1Change (val) {
      this.rea.xy1rea = val
      if (this.xy1ssVal || this.xy1szVal) {
        this.xy1ssVal = ''
        this.xy1szVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xy1rea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: '', unexamReason: this.rea.xy1rea })
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
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: '', value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
        } else {
          if (this.xy2ssVal > 900 || this.xy2ssVal < 10) {
            this.open3()
            this.xy2ssVal = ''
            this.$refs.xy2ss.focus()
          } else {
            if (this.xy2ssVal > 200 || this.xy2ssVal < 60) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2ss: '1', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
              // }).catch(() => {
              //   this.xy2ssVal = ''
              //   this.$refs.xy2ss.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: '', unexamReason: this.rea.xy2rea })
              // })
            } else {
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2ss: '2', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
            }
          }
        }
      } else {
        if (this.obj.xy2Flag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '', flag: false, value1: '', value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: '', value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
        }
      }
    },
    xy2szBlur () {
      if (this.xy2szVal) {
        if (!(/^\d*[02468]$/).test(this.xy2szVal)) {
          this.xy2szVal = ''
          this.$alert('请输入30-200之间的偶数', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: this.xy2ssVal, value2: '', unexamReason: this.rea.xy2rea })
        } else {
          if (this.xy2szVal > 900 || this.xy2szVal < 10) {
            this.open3()
            this.xy2szVal = ''
            this.$refs.xy2sz.focus()
          } else {
            if (this.xy2szVal > 120 || this.xy2szVal < 30) {
              // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2sz: '1', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
              // }).catch(() => {
              //   this.xy2szVal = ''
              //   this.$refs.xy2sz.focus()
              //   this.$emit('change', { id: this.list.filter(item => item.projectName === '血压1')[0].id, name: '血压1', flag: false, value1: '', value2: '', unexamReason: this.rea.xy2rea })
              // })
            } else {
              this.obj.xy2Flag = false
              this.rea.xy2rea = '4'
              this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', sureXy2sz: '2', flag: true, value1: this.xy2ssVal, value2: this.xy2szVal, unexamReason: this.rea.xy2rea })
            }
          }
        }
      } else {
        if (this.obj.xy2Flag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '', flag: false, value1: this.xy2ssVal, value2: '', unexamReason: this.rea.xy2rea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: this.xy2ssVal, value2: '', unexamReason: this.rea.xy2rea })
        }
      }
    },
    xy2Change (val) {
      this.rea.xy2rea = val
      if (this.xy2ssVal || this.xy2szVal) {
        this.xy2ssVal = ''
        this.xy2szVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.xy2rea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '血压2')[0].id, name: '血压2', flag: false, value1: '', value2: '', unexamReason: this.rea.xy2rea })
      }
    },
    // 裸眼视力
    slyBlur () {
      if (this.slyVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.slyVal)) {
          this.slyVal = ''
          notice('请输入数字偶数')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: this.slzVal, unexamReason: this.rea.slrea })
        } else {
          if (this.slyVal > 54 || this.slyVal < 0) {
            // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
            if (this.slyCopyVal !== this.slyVal) {
              this.slyVal = (this.slyVal / 10).toFixed(1)
            }
            this.slyCopyVal = this.slyVal
            this.obj.slFlag = false
            this.rea.slrea = '4'
            this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSly: '1', flag: true, value1: this.slyVal, value2: this.slzVal, unexamReason: this.rea.slrea })
            // }).catch(() => {
            //   this.slyVal = ''
            //   this.$refs.sly.focus()
            //   this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: '', unexamReason: this.rea.slrea })
            // })
          } else {
            if (this.slyCopyVal !== this.slyVal) {
              this.slyVal = (this.slyVal / 10).toFixed(1)
            }
            this.slyCopyVal = this.slyVal
            this.obj.slFlag = false
            this.rea.slrea = '4'
            this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSly: '2', flag: true, value1: this.slyVal, value2: this.slzVal, unexamReason: this.rea.slrea })
          }
        }
      } else {
        if (this.obj.slFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '', flag: false, value1: '', value2: this.slzVal, unexamReason: this.rea.slrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: this.slzVal, unexamReason: this.rea.slrea })
        }
      }
    },
    slzBlur () {
      if (this.slzVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.slzVal)) {
          this.slzVal = ''
          notice('请输入数字')
          this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: this.slyVal, value2: '', unexamReason: this.rea.slrea })
        } else {
          if (this.slzVal > 54 || this.slzVal < 0) {
            // this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
            if (this.slzCopyVal !== this.slzVal) {
              this.slzVal = (this.slzVal / 10).toFixed(1)
            }
            this.slzCopyVal = this.slzVal
            this.obj.slFlag = false
            this.rea.slrea = '4'
            this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSlz: '1', flag: true, value1: this.slyVal, value2: this.slzVal, unexamReason: this.rea.slrea })
            // }).catch(() => {
            //   this.slzVal = ''
            //   this.$refs.slz.focus()
            //   this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: '', unexamReason: this.rea.slrea })
            // })
          } else {
            if (this.slzCopyVal !== this.slzVal) {
              this.slzVal = (this.slzVal / 10).toFixed(1)
            }
            this.slzCopyVal = this.slzVal
            this.obj.slFlag = false
            this.rea.slrea = '4'
            this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', sureSlz: '2', flag: true, value1: this.slyVal, value2: this.slzVal, unexamReason: this.rea.slrea })
          }
        }
      } else {
        if (this.obj.slFlag) {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '', flag: false, value1: this.slyVal, value2: '', unexamReason: this.rea.slrea })
        } else {
          this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: this.slyVal, value2: '', unexamReason: this.rea.slrea })
        }
      }
    },
    slChange (val) {
      this.rea.slrea = val
      if (this.slyVal || this.slzVal) {
        this.slyVal = ''
        this.slzVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.slrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '裸眼视力')[0].id, name: '裸眼视力', flag: false, value1: '', value2: '', unexamReason: this.rea.slrea })
      }
    },
    // 矫正视力
    jzslyBlur () {
      if (this.jzslyVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.jzslyVal)) {
          this.jzslyVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: '', value2: this.jzslzVal, unexamReason: this.rea.jzslrea })
        } else {
          if (this.jzslyVal > 54 || this.jzslyVal < 0) {
            notice('该数值不是正常数值')
          }
          this.obj.jzslFlag = false
          if (this.jzslyCopyVal !== this.jzslyVal) {
            this.jzslyVal = (this.jzslyVal / 10).toFixed(1)
          }
          this.jzslyCopyVal = this.jzslyVal
          this.rea.jzslrea = '4'
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: true, value1: this.jzslyVal, value2: this.jzslzVal, unexamReason: this.rea.jzslrea })
        }
      } else {
        if (this.obj.jzslFlag) {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '', flag: false, value1: '', value2: this.jzslzVal, unexamReason: this.rea.jzslrea })
        } else {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: '', value2: this.jzslzVal, unexamReason: this.rea.jzslrea })
        }
      }
    },
    jzslzBlur () {
      if (this.jzslzVal) {
        if (!(/^-?\d*\.?\d*$/).test(this.jzslzVal)) {
          this.jzslzVal = ''
          notice('请输入数字')
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: this.jzslyVal, value2: '', unexamReason: this.rea.jzslrea })
        } else {
          if (this.jzslzVal > 54 || this.jzslzVal < 0) {
            notice('该数值不是正常数值')
          }
          this.obj.jzslFlag = false
          if (this.jzslzCopyVal !== this.jzslzVal) {
            this.jzslzVal = (this.jzslzVal / 10).toFixed(1)
          }
          this.jzslzCopyVal = this.jzslzVal
          this.rea.jzslrea = '4'
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: true, value1: this.jzslyVal, value2: this.jzslzVal, unexamReason: this.rea.jzslrea })
        }
      } else {
        if (this.obj.jzslFlag) {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '', flag: false, value1: this.jzslyVal, value2: '', unexamReason: this.rea.jzslrea })
        } else {
          this.$emit('change', { projectId: 'jzsl', id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: this.jzslyVal, value2: '', unexamReason: this.rea.jzslrea })
        }
      }
    },
    jzslChange (val) {
      this.rea.jzslrea = val
      if (this.jzslyVal || this.jzslzVal) {
        this.jzslyVal = ''
        this.jzslzVal = ''
        this.$emit('change', { id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.jzslrea })
      } else {
        this.$emit('change', { id: this.list.filter(item => item.projectName === '矫正视力')[0].id, name: '矫正视力', flag: false, value1: '', value2: '', unexamReason: this.rea.jzslrea })
      }
    }
  },
  watch: {
    fill () {
      if (this.list.filter(item => item.projectName === '心脏').length !== 0) {
        this.xzVal = '0'
        this.obj.xzFlag = false
        this.rea.xzrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '心脏')[0].id, name: this.xzOptions.filter(item => item.code === this.xzVal)[0].name, flag: true, value1: this.xzVal, value2: '', unexamReason: this.rea.xzrea })
      }
      if (this.list.filter(item => item.projectName === '肺').length !== 0) {
        this.fVal = '0'
        this.obj.fFlag = false
        this.rea.frea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肺')[0].id, name: this.fOptions.filter(item => item.code === this.fVal)[0].name, flag: true, value1: this.fVal, value2: '', unexamReason: this.rea.frea })
      }
      if (this.list.filter(item => item.projectName === '肝脾').length !== 0) {
        this.gpVal = '0'
        this.obj.gpFlag = false
        this.rea.gprea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '肝脾')[0].id, name: this.gpOptions.filter(item => item.code === this.gpVal)[0].name, flag: true, value1: this.gpVal, value2: this.gpOther, unexamReason: this.rea.gprea })
      }
      // if (this.list.filter(item => item.projectName === '脉搏').length !== 0) {
      //   this.xlVal = '1'
      //   this.obj.xlFlag = false
      //   this.$emit('change', { id: this.list.filter(item => item.projectName === '脉搏')[0].id, name: this.xlOptions.filter(item => item.code === this.xlVal)[0].name, flag: true, value1: this.xlVal, value2: this.xlOther })
      // }
      if (this.list.filter(item => item.projectName === '头颈').length !== 0) {
        this.tjVal = '0'
        this.obj.tjFlag = false
        this.rea.tjrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '头颈')[0].id, name: this.tjOptions.filter(item => item.code === this.tjVal)[0].name, flag: true, value1: this.tjVal, value2: this.tjOther, unexamReason: this.rea.tjrea })
      }
      if (this.list.filter(item => item.projectName === '脊柱').length !== 0) {
        this.jzVal = '0'
        this.obj.jzFlag = false
        this.rea.jzrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '脊柱')[0].id, name: this.jzOptions.filter(item => item.code === this.jzVal)[0].name, flag: true, value1: this.jzVal, value2: this.jzOther, unexamReason: this.rea.jzrea })
      }
      if (this.list.filter(item => item.projectName === '皮肤').length !== 0) {
        this.pfVal = '0'
        this.obj.pfFlag = false
        this.rea.pfrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '皮肤')[0].id, name: this.pfOptions.filter(item => item.code === this.pfVal)[0].name, flag: true, value1: this.pfVal, value2: this.pfOther, unexamReason: this.rea.pfrea })
      }
      if (this.list.filter(item => item.projectName === '四肢关节').length !== 0) {
        this.szgjVal = '0'
        this.obj.szgjFlag = false
        this.rea.szgjrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '四肢关节')[0].id, name: this.szgjOptions.filter(item => item.code === this.szgjVal)[0].name, flag: true, value1: this.szgjVal, value2: this.szgjOther, unexamReason: this.rea.szgjrea })
      }
      if (this.list.filter(item => item.projectName === '胸部').length !== 0) {
        this.xbVal = '0'
        this.obj.xbFlag = false
        this.rea.xbrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '胸部')[0].id, name: this.xbOptions.filter(item => item.code === this.xbVal)[0].name, flag: true, value1: this.xbVal, value2: this.xbOther, unexamReason: this.rea.xbrea })
      }
      if (this.list.filter(item => item.projectName === '沙眼').length !== 0) {
        this.syVal = '0'
        this.obj.syFlag = false
        this.rea.syrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '沙眼')[0].id, name: this.syOptions.filter(item => item.code === this.syVal)[0].name, flag: true, value1: this.syVal, value2: this.syOther, unexamReason: this.rea.syrea })
      }
      if (this.list.filter(item => item.projectName === '色觉').length !== 0) {
        this.sjVal = '0'
        this.obj.sjFlag = false
        this.rea.sjrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '色觉')[0].id, name: this.sjOptions.filter(item => item.code === this.sjVal)[0].name, flag: true, value1: this.sjVal, value2: this.sjOther, unexamReason: this.rea.sjrea })
      }
      if (this.list.filter(item => item.projectName === '结膜炎').length !== 0) {
        this.jmyVal = '0'
        this.obj.jmyFlag = false
        this.rea.jmyrea = '4'
        this.$emit('change', { id: this.list.filter(item => item.projectName === '结膜炎')[0].id, name: this.jmyOptions.filter(item => item.code === this.jmyVal)[0].name, flag: true, value1: this.jmyVal, value2: this.jmyOther, unexamReason: this.rea.jmyrea })
      }
      if (this.list.filter(item => item.projectName === '肝功能').length !== 0) {
        // this.ggnVal = '0'
        // this.obj.ggnFlag = false
        // this.rea.ggnrea = '4'
        // this.$emit('change', { id: this.list.filter(item => item.projectName === '肝功能')[0].id, name: this.ggnOptions.filter(item => item.code === this.ggnVal)[0].name, flag: true, value1: this.ggnVal, value2: this.ggnOther, unexamReason: this.rea.ggnrea })
      }
      if (this.list.filter(item => item.projectName === '便检').length !== 0) {
        // this.bjVal = '0'
        // this.obj.bjFlag = false
        // this.rea.bjrea = '4'
        // this.$emit('change', { id: this.list.filter(item => item.projectName === '便检')[0].id, name: this.bjOptions.filter(item => item.code === this.bjVal)[0].name, flag: true, value1: this.bjVal, value2: this.bjOther, unexamReason: this.rea.bjrea })
      }
      if (this.list.filter(item => item.projectName === 'ppd试验').length !== 0) {
        // this.ppdVal = '0'
        // this.obj.ppdlag = false
        // this.rea.ppdrea = '4'
        // this.$emit('change', { id: this.list.filter(item => item.projectName === 'ppd试验')[0].id, name: this.ppdOptions.filter(item => item.code === this.ppdVal)[0].name, flag: true, value1: this.ppdVal, value2: this.ppdOther, unexamReason: this.rea.ppdrea })
      }
    },
    checkout () {
      if (this.xzVal === '9' && !this.xzOther) {
        this.$refs.xz.focus()
        return
      }
      if (!this.obj.xzFlag && !this.xzVal && !this.rea.xzrea) {
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
      if (!this.obj.gpFlag && !this.gpVal && !this.rea.gprea) {
        notice('请选择肝脾选项')
        return
      }
      if (!this.obj.xlFlag && !this.xlVal) {
        this.$refs.xl.focus()
        return
      }
      if (this.tjVal === '4' && !this.tjOther) {
        this.$refs.tj.focus()
        return
      }
      if (!this.obj.tjFlag && !this.tjVal && !this.rea.tjrea) {
        notice('请选择头颈选项')
        return
      }
      if (this.jzVal === '4' && !this.jzOther) {
        this.$refs.jz.focus()
        return
      }
      if (!this.obj.jzFlag && !this.jzVal && !this.rea.jzrea) {
        notice('请选择脊柱选项')
        return
      }
      if (this.pfVal === '5' && !this.pfOther) {
        this.$refs.pf.focus()
        return
      }
      if (!this.obj.pfFlag && !this.pfVal && !this.rea.pfrea) {
        notice('请选择皮肤选项')
        return
      }
      if (this.szgjVal === '2' && !this.szgjOther) {
        this.$refs.szgj.focus()
        return
      }
      if (!this.obj.szgjFlag && !this.szgjVal && !this.rea.szgjrea) {
        notice('请选择四肢关节选项')
        return
      }
      if (this.xbVal === '4' && !this.xbOther) {
        this.$refs.xb.focus()
        return
      }
      if (!this.obj.xbFlag && !this.xbVal && !this.rea.xbrea) {
        notice('请选择胸部选项')
        return
      }
      if (this.syVal === '100' && !this.syOther) {
        this.$refs.sy.focus()
        return
      }
      if (!this.obj.syFlag && !this.syVal && !this.rea.syrea) {
        notice('请选择沙眼选项')
        return
      }
      if (this.sjVal === '100' && !this.sjOther) {
        // this.$refs.sj.focus()
        return
      }
      if (!this.obj.sjFlag && !this.sjVal && !this.rea.sjrea) {
        notice('请选择色觉选项')
        return
      }
      if (this.jmyVal === '100' && !this.jmyOther) {
        this.$refs.jmy.focus()
        return
      }
      if (!this.obj.jmyFlag && !this.jmyVal && !this.rea.jmyrea) {
        notice('请选择结膜炎选项')
        return
      }
      if (this.ggnVal === '100' && !this.ggnOther) {
        this.$refs.ggn.focus()
        return
      }
      if (!this.obj.ggnFlag && !this.ggnVal && !this.rea.ggnrea) {
        notice('请选择肝功能选项')
        return
      }
      if (this.bjVal === '100' && !this.bjOther) {
        this.$refs.bj.focus()
        return
      }
      if (!this.obj.bjFlag && !this.bjVal && !this.rea.bjrea) {
        notice('请选择便检选项')
        return
      }
      if (this.ppdVal === '100' && !this.ppdOther) {
        this.$refs.ppd.focus()
        return
      }
      if (!this.obj.ppdFlag && !this.ppdVal && !this.rea.ppdrea) {
        notice('请选择ppd试验选项')
        return
      }
      // *************************************
      // 体重
      if (!this.obj.tzFlag && !this.tzVal) {
        this.$refs.tz.focus()
      }
      // 身高
      if (!this.obj.sgFlag && !this.sgVal) {
        this.$refs.sg.focus()
      }
      // 肺活量
      if (!this.obj.fhlFlag && !this.fhlVal) {
        this.$refs.fhl.focus()
      }
      // 血色素
      if (!this.obj.xssFlag && !this.xssVal) {
        this.$refs.xss.focus()
      }
      // 血压1
      if (!this.obj.xy1Flag && (!this.xy1ssVal || !this.xy1szVal)) {
        if (!this.xy1ssVal) {
          this.$refs.xy1ss.focus()
        } else {
          this.$refs.xy1sz.focus()
        }
      }
      // 血压2
      if (!this.obj.xy2Flag && (!this.xy2ssVal || !this.xy2szVal)) {
        if (!this.xy2ssVal) {
          this.$refs.xy2ss.focus()
        } else {
          this.$refs.xy2sz.focus()
        }
      }
      // 裸眼视力
      if (!this.obj.slFlag && (!this.slyVal || !this.slzVal)) {
        if (!this.slyVal) {
          this.$refs.sly.focus()
        } else {
          this.$refs.slz.focus()
        }
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
    studentExam () {
      let data = this.studentExam.projectList
      this.list = data
      this.obj = {
        xzFlag: data.filter(item => item.projectName === '心脏').length === 0 ? 'wu' : !data.filter(item => item.projectName === '心脏')[0].flag,
        fFlag: data.filter(item => item.projectName === '肺').length === 0 ? 'wu' : !data.filter(item => item.projectName === '肺')[0].flag,
        gpFlag: data.filter(item => item.projectName === '肝脾').length === 0 ? 'wu' : !data.filter(item => item.projectName === '肝脾')[0].flag,
        xlFlag: data.filter(item => item.projectName === '脉搏').length === 0 ? 'wu' : !data.filter(item => item.projectName === '脉搏')[0].flag,
        sgFlag: data.filter(item => item.projectName === '身高').length === 0 ? 'wu' : !data.filter(item => item.projectName === '身高')[0].flag,
        tzFlag: data.filter(item => item.projectName === '体重').length === 0 ? 'wu' : !data.filter(item => item.projectName === '体重')[0].flag,
        tjFlag: data.filter(item => item.projectName === '头颈').length === 0 ? 'wu' : !data.filter(item => item.projectName === '头颈')[0].flag,
        jzFlag: data.filter(item => item.projectName === '脊柱').length === 0 ? 'wu' : !data.filter(item => item.projectName === '脊柱')[0].flag,
        pfFlag: data.filter(item => item.projectName === '皮肤').length === 0 ? 'wu' : !data.filter(item => item.projectName === '皮肤')[0].flag,
        szgjFlag: data.filter(item => item.projectName === '四肢关节').length === 0 ? 'wu' : !data.filter(item => item.projectName === '四肢关节')[0].flag,
        xbFlag: data.filter(item => item.projectName === '胸部').length === 0 ? 'wu' : !data.filter(item => item.projectName === '胸部')[0].flag,
        fhlFlag: data.filter(item => item.projectName === '肺活量').length === 0 ? 'wu' : !data.filter(item => item.projectName === '肺活量')[0].flag,
        xssFlag: data.filter(item => item.projectName === '血色素').length === 0 ? 'wu' : !data.filter(item => item.projectName === '血色素')[0].flag,
        ggnFlag: data.filter(item => item.projectName === '肝功能').length === 0 ? 'wu' : !data.filter(item => item.projectName === '肝功能')[0].flag,
        bjFlag: data.filter(item => item.projectName === '便检').length === 0 ? 'wu' : !data.filter(item => item.projectName === '便检')[0].flag,
        xy1Flag: data.filter(item => item.projectName === '血压1').length === 0 ? 'wu' : !data.filter(item => item.projectName === '血压1')[0].flag,
        xy2Flag: data.filter(item => item.projectName === '血压2').length === 0 ? 'wu' : !data.filter(item => item.projectName === '血压2')[0].flag,
        ppdFlag: data.filter(item => item.projectName === 'PPD试验').length === 0 ? 'wu' : !data.filter(item => item.projectName === 'PPD试验')[0].flag,
        slFlag: data.filter(item => item.projectName === '裸眼视力').length === 0 ? 'wu' : !data.filter(item => item.projectName === '裸眼视力')[0].flag,
        jzslFlag: data.filter(item => item.projectName === '矫正视力').length === 0 ? 'wu' : !data.filter(item => item.projectName === '矫正视力')[0].flag,
        syFlag: data.filter(item => item.projectName === '沙眼').length === 0 ? 'wu' : !data.filter(item => item.projectName === '沙眼')[0].flag,
        sjFlag: data.filter(item => item.projectName === '色觉').length === 0 ? 'wu' : !data.filter(item => item.projectName === '色觉')[0].flag,
        jmyFlag: data.filter(item => item.projectName === '结膜炎').length === 0 ? 'wu' : !data.filter(item => item.projectName === '结膜炎')[0].flag
      }
      if (data.filter(item => item.projectName === '心脏').length !== 0) {
        this.xzVal = data.filter(item => item.projectName === '心脏')[0].value1
        this.xzOther = data.filter(item => item.projectName === '心脏')[0].value2
        this.xzOptions = this.myList.filter(item => item.projectName === '心脏')[0].contentList
        this.rea.xzrea = data.filter(item => item.projectName === '心脏')[0].unexamReason
        if (this.xzVal) {
          this.rea.xzrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '肺').length !== 0) {
        this.fVal = data.filter(item => item.projectName === '肺')[0].value1
        this.fOther = data.filter(item => item.projectName === '肺')[0].value2
        this.fOptions = this.myList.filter(item => item.projectName === '肺')[0].contentList
        this.rea.frea = data.filter(item => item.projectName === '肺')[0].unexamReason
        if (this.fVal) {
          this.rea.frea = '4'
        }
      }
      if (data.filter(item => item.projectName === '肝脾').length !== 0) {
        this.gpVal = data.filter(item => item.projectName === '肝脾')[0].value1
        this.gpOther = data.filter(item => item.projectName === '肝脾')[0].value2
        this.gpOptions = this.myList.filter(item => item.projectName === '肝脾')[0].contentList
        this.rea.gprea = data.filter(item => item.projectName === '肝脾')[0].unexamReason
        if (this.gpVal) {
          this.rea.gprea = '4'
        }
      }
      if (data.filter(item => item.projectName === '脉搏').length !== 0) {
        this.xlVal = data.filter(item => item.projectName === '脉搏')[0].value1
        this.xlOther = data.filter(item => item.projectName === '脉搏')[0].value2
        this.xlOptions = this.myList.filter(item => item.projectName === '心率')[0].contentList
        this.rea.xlrea = data.filter(item => item.projectName === '心率')[0].unexamReason
        if (this.xlVal) {
          this.rea.xlrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '头颈').length !== 0) {
        this.tjVal = data.filter(item => item.projectName === '头颈')[0].value1
        this.tjOther = data.filter(item => item.projectName === '头颈')[0].value2
        this.tjOptions = this.myList.filter(item => item.projectName === '头颈')[0].contentList
        this.rea.tjrea = data.filter(item => item.projectName === '头颈')[0].unexamReason
        if (this.tjVal) {
          this.rea.tjrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '脊柱').length !== 0) {
        this.jzVal = data.filter(item => item.projectName === '脊柱')[0].value1
        this.jzOther = data.filter(item => item.projectName === '脊柱')[0].value2
        this.jzOptions = this.myList.filter(item => item.projectName === '脊柱')[0].contentList
        this.rea.jzrea = data.filter(item => item.projectName === '脊柱')[0].unexamReason
        if (this.jzVal) {
          this.rea.jzrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '皮肤').length !== 0) {
        this.pfVal = data.filter(item => item.projectName === '皮肤')[0].value1
        this.pfOther = data.filter(item => item.projectName === '皮肤')[0].value2
        this.pfOptions = this.myList.filter(item => item.projectName === '皮肤')[0].contentList
        this.rea.pfrea = data.filter(item => item.projectName === '皮肤')[0].unexamReason
        if (this.pfVal) {
          this.rea.pfrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '四肢关节').length !== 0) {
        this.szgjVal = data.filter(item => item.projectName === '四肢关节')[0].value1
        this.szgjOther = data.filter(item => item.projectName === '四肢关节')[0].value2
        this.szgjOptions = this.myList.filter(item => item.projectName === '四肢关节')[0].contentList
        this.rea.szgjrea = data.filter(item => item.projectName === '四肢关节')[0].unexamReason
        if (this.szgjVal) {
          this.rea.szgjrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '胸部').length !== 0) {
        this.xbVal = data.filter(item => item.projectName === '胸部')[0].value1
        this.xbOther = data.filter(item => item.projectName === '胸部')[0].value2
        this.xbOptions = this.myList.filter(item => item.projectName === '胸部')[0].contentList
        this.rea.xbrea = data.filter(item => item.projectName === '胸部')[0].unexamReason
        if (this.xbVal) {
          this.rea.xbrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '沙眼').length !== 0) {
        this.syVal = data.filter(item => item.projectName === '沙眼')[0].value1
        this.syOther = data.filter(item => item.projectName === '沙眼')[0].value2
        this.syOptions = this.myList.filter(item => item.projectName === '沙眼')[0].contentList
        this.rea.syrea = data.filter(item => item.projectName === '沙眼')[0].unexamReason
        if (this.syVal) {
          this.rea.syrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '色觉').length !== 0) {
        this.sjVal = data.filter(item => item.projectName === '色觉')[0].value1
        this.sjOther = data.filter(item => item.projectName === '色觉')[0].value2
        this.sjOptions = this.myList.filter(item => item.projectName === '色觉')[0].contentList
        this.rea.sjrea = data.filter(item => item.projectName === '色觉')[0].unexamReason
        if (this.sjVal) {
          this.rea.sjrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '结膜炎').length !== 0) {
        this.jmyVal = data.filter(item => item.projectName === '结膜炎')[0].value1
        this.jmyOther = data.filter(item => item.projectName === '结膜炎')[0].value2
        this.jmyOptions = this.myList.filter(item => item.projectName === '结膜炎')[0].contentList
        this.rea.jmyrea = data.filter(item => item.projectName === '结膜炎')[0].unexamReason
        if (this.jmyVal) {
          this.rea.jmyrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '肝功能').length !== 0) {
        this.ggnVal = data.filter(item => item.projectName === '肝功能')[0].value1
        this.ggnOther = data.filter(item => item.projectName === '肝功能')[0].value2
        this.ggnOptions = this.myList.filter(item => item.projectName === '肝功能')[0].contentList
        this.rea.ggnrea = data.filter(item => item.projectName === '肝功能')[0].unexamReason
        if (this.ggnVal) {
          this.rea.ggnrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '便检').length !== 0) {
        this.bjVal = data.filter(item => item.projectName === '便检')[0].value1
        this.bjOther = data.filter(item => item.projectName === '便检')[0].value2
        this.bjOptions = this.myList.filter(item => item.projectName === '便检')[0].contentList
        this.rea.bjrea = data.filter(item => item.projectName === '便检')[0].unexamReason
        if (this.bjVal) {
          this.rea.bjrea = '4'
        }
      }
      if (data.filter(item => item.projectName === 'PPD试验').length !== 0) {
        this.ppdVal = data.filter(item => item.projectName === 'PPD试验')[0].value1
        this.ppdOther = data.filter(item => item.projectName === 'PPD试验')[0].value2
        this.ppdOptions = this.myList.filter(item => item.projectName === 'ppd试验')[0].contentList
        this.rea.ppdrea = data.filter(item => item.projectName === 'ppd试验')[0].unexamReason
        if (this.ppdVal) {
          this.rea.ppdrea = '4'
        }
      }
      // ******************************************************************************
      if (data.filter(item => item.projectName === '身高').length !== 0) {
        this.sgVal = data.filter(item => item.projectName === '身高')[0].value1
        this.sgCopyVal = this.sgVal
        this.rea.sgrea = data.filter(item => item.projectName === '身高')[0].unexamReason
        if (this.sgVal) {
          this.rea.sgrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '体重').length !== 0) {
        this.tzVal = data.filter(item => item.projectName === '体重')[0].value1
        this.tzCopyVal = this.tzVal
        this.rea.tzrea = data.filter(item => item.projectName === '体重')[0].unexamReason
        if (this.tzVal) {
          this.rea.tzrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '肺活量').length !== 0) {
        this.fhlVal = data.filter(item => item.projectName === '肺活量')[0].value1
        this.rea.fhlrea = data.filter(item => item.projectName === '肺活量')[0].unexamReason
        if (this.fhlVal) {
          this.rea.fhlrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '血色素').length !== 0) {
        this.xssVal = data.filter(item => item.projectName === '血色素')[0].value1
        this.rea.xssrea = data.filter(item => item.projectName === '血色素')[0].unexamReason
        if (this.xssVal) {
          this.rea.xssrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '血压1').length !== 0) {
        this.xy1ssVal = data.filter(item => item.projectName === '血压1')[0].value1
        this.xy1szVal = data.filter(item => item.projectName === '血压1')[0].value2
        this.rea.xy1rea = data.filter(item => item.projectName === '血压1')[0].unexamReason
        if (this.xy1ssVal || this.xy1szVal) {
          this.rea.xy1rea = '4'
        }
      }
      if (data.filter(item => item.projectName === '血压2').length !== 0) {
        this.xy2ssVal = data.filter(item => item.projectName === '血压2')[0].value1
        this.xy2szVal = data.filter(item => item.projectName === '血压2')[0].value2
        this.rea.xy2rea = data.filter(item => item.projectName === '血压2')[0].unexamReason
        if (this.xy2ssVal || this.xy2szVal) {
          this.rea.xy2rea = '4'
        }
      }
      if (data.filter(item => item.projectName === '裸眼视力').length !== 0) {
        this.slyVal = data.filter(item => item.projectName === '裸眼视力')[0].value1
        this.slyCopyVal = this.slyVal
        this.slzVal = data.filter(item => item.projectName === '裸眼视力')[0].value2
        this.slzCopyVal = this.slzVal
        this.rea.slrea = data.filter(item => item.projectName === '裸眼视力')[0].unexamReason
        if (this.slyVal || this.slzVal) {
          this.rea.slrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '矫正视力').length !== 0) {
        this.jzslyVal = data.filter(item => item.projectName === '矫正视力')[0].value1
        this.jzslyCopyVal = this.jzslyVal
        this.jzslzVal = data.filter(item => item.projectName === '矫正视力')[0].value2
        this.jzslzCopyVal = this.jzslzVal
        this.rea.jzslrea = data.filter(item => item.projectName === '矫正视力')[0].unexamReason
        if (this.jzslyVal || this.jzslzVal) {
          this.rea.jzslrea = '4'
        }
      }
    }
  },
  mounted () {
    let bothInput = document.body.querySelectorAll("input[type='checkbox']")
    bothInput.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
    // let a = document.body.querySelectorAll('.xy1ss input')
    // console.log(a[0])
    // a[0].setAttribute('tabindex', '99')
    // console.log(a[0])
    // let b = document.body.querySelectorAll('.xy1sz input')
    // b[0].setAttribute('tabindex', '100')
  },
  created () {
    setTimeout(() => {
      let bothInput = document.body.querySelectorAll("input[type='checkbox']")
      bothInput.forEach(item => {
        item.setAttribute('tabindex', '-1')
      })
    }, 1000)
  }
}
</script>
<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.project-collection {
  .slz-class {
    position: relative;
    top: 47px;
    right: 394px;
  }
  .jzsly-class {
    position: relative;
    right: 394px;
  }
  .jzslz-class {
    position: relative;
    left: 394px;
  }
  .jmy-class {
    position: relative;
    bottom: 47px;
    left: 384px;
  }
  .szy1-class {
    position: relative;
    top: 47px;
    right: 394px;
  }
  .ssy2-class {
    position: relative;
    right: 394px;
  }
  .szy2-class {
    position: relative;
    left: 394px;
  }
  .bj-class {
    position: relative;
    bottom: 47px;
    left: 394px;
    text-align: left !important;
    padding-left: 15px !important;
    .el-input {
      width: 180px !important;
    }
    .el-input__inner {
      width: 180px;
    }
  }
  .other-input {
    margin-top: 5px;
  }
  .table-copy {
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    td,th {
      width: 46px;
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
      tr:nth-child(2) {
        background: #C4D3FE;
      }
    }
    tbody {
      td {
        padding: 5px;
        .el-input {
          width: 180px;
          .el-input__inner {
            height: 36px;
          }
        }
        &:nth-child(1),&:nth-child(4) {
          background: #E6E6E6;
        }
        &:nth-child(2),&:nth-child(5) {
          text-align: left;
          padding-left: 10px;
        }
      }
      tr:nth-child(11), tr:nth-child(13) {
        td:nth-child(1) {
          background: #fff;
          text-align: left;
          padding-left: 10px;
        }
      }
      tr:nth-child(12), tr:nth-child(13) {
        td {
          .el-input {
            width: 100px;
            .el-input__inner {
              height: 36px;
            }
          }
        }
      }
    }
  }
}
</style>
