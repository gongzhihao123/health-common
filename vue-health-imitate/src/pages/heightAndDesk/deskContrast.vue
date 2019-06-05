<template>
  <div class='school-basic-heightContrast'>
    <el-button class="download" @click="setDesk"><img src="../../assets/img/btn_set.png">设置</el-button>
    <div class="content-table">
        <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="学生身高范围(cm)"
          show-overflow-tooltip
          label-class-name="head">
          <template slot-scope="scope">
            <span v-if="scope.row.heightMin && !scope.row.heightMax">{{scope.row.heightMin}}以上</span>
            <span v-if="!scope.row.heightMin && scope.row.heightMax">{{scope.row.heightMax}}以下</span>
            <span v-if="scope.row.heightMin === scope.row.heightMax">{{scope.row.heightMin}}</span>
            <span v-if="scope.row.heightMin && scope.row.heightMax">{{scope.row.heightMin}} ~ {{scope.row.heightMax}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desk"
          label="课桌椅型号"
          show-overflow-tooltip
          label-class-name="head">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label-class-name="head"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button  @click="editDesk(scope.row)">编辑</el-button>
            <el-button  @click="deleteDesk(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="课桌椅型号"
        :visible.sync="dialog"
        class="addDia"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="dialog">
          <el-form-item label="学生身高范围(cm):" prop="minHeight">
            <el-input v-model.trim="ruleForm.minHeight" id="in"></el-input>
            <i class="el-icon-minus"></i>
          </el-form-item>
          <el-form-item prop="maxHeight">
            <el-input v-model.trim="ruleForm.maxHeight" id="ax"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="tip">注：只填下限表示所填值以上，只填上限表示所填值以下。</p>
          </el-form-item>
          <el-form-item label="课桌椅型号:" prop="size">
              <el-input v-model.trim="ruleForm.size" placeholder="最多请输入10个字符"></el-input>
          </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            <el-button @click="dialog = false">取 消</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { notice } from '../../../src/utils/index.js'
export default {
  name: 'school-basic-heightContrast',
  data () {
    var minHeight = (rule, value, callback) => {
      if (this.ruleForm.minHeight !== '') {
        if (parseInt(this.ruleForm.minHeight) > 300) {
          callback(new Error('输入数值最大值不能超过300'))
        }
        var num = new RegExp(/^[0-9]*$/)
        var numre = num.exec(value)
        if (!numre) {
          callback(new Error('输入值只能是整数'))
        } else {
          callback()
        }
        if (this.ruleForm.minHeight < 0) {
          callback(new Error('输入数值不能为负值'))
        }
        var re = new RegExp(/^[0-9]+([.][0-9]{1}){0,1}$/)
        var result = re.exec(value)
        if (!result) {
          callback(new Error('输入数值只能到小数点后一位'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var maxHeight = (rule, value, callback) => {
      if (this.ruleForm.maxHeight !== '') {
        if (parseInt(this.ruleForm.maxHeight) > 300) {
          callback(new Error('输入数值最大值不能超过300'))
        }
        var num = new RegExp(/^[0-9]*$/)
        var numre = num.exec(value)
        if (!numre) {
          callback(new Error('输入值只能是数字'))
        } else {
          callback()
        }
        if (this.ruleForm.maxHeight < 0) {
          callback(new Error('输入数值不能为负值'))
        }
        var re = new RegExp(/^[0-9]+([.][0-9]{1}){0,1}$/)
        var result = re.exec(value)
        if (!result) {
          callback(new Error('输入数值只能到小数点后一位'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      dialog: false,
      input: '',
      tableData: [],
      edit: 1,
      pageSize: 10,
      totalCount: 0,
      currentPage: 1,
      loading: false,
      Min: '',
      Max: '',
      restaurants: [],
      id: '',
      ruleForm: {
        size: '',
        minHeight: '',
        maxHeight: ''
      },
      rules: {
        minHeight: [
          { validator: minHeight, trigger: 'blur' }
        ],
        maxHeight: [
          { validator: maxHeight, trigger: 'blur' }
        ],
        size: [
          { required: true, message: '课桌型号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setDesk () {
      this.dialog = true
      this.ruleForm = {
        minHeight: '',
        maxHeight: '',
        size: ''
      }
      this.edit = 1
    },
    async editDesk (row) {
      this.ruleForm = {
        minHeight: '',
        maxHeight: '',
        size: ''
      }
      this.edit = 2
      this.id = row.id
      this.dialog = true
      if (row.heightMin) {
        this.ruleForm.minHeight = row.heightMin
      }
      if (row.heightMax) {
        this.ruleForm.maxHeight = row.heightMax
      }
      this.ruleForm.size = row.desk
      // this.ruleForm = {
      //   // minHeight: row.heightMin !== '' ? row.heightMin : '',
      //   // maxHeight: row.heightMax !== '' ? row.heightMax : '',
      //   size: row.desk
      // }
    },
    async deleteDesk (id) {
      await this.$store.dispatch('deleteDesk', {
        id: id
      })
      await this.getDeskList()
    },
    handleSelect () {},
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleClose () {
      this.dialog = false
    },
    submitForm (formName) {
      if (this.ruleForm.minHeight + this.ruleForm.maxHeight === '' || this.ruleForm.minHeight + this.ruleForm.maxHeight === 0) {
        notice('身高最大值和身高最小值不能同时为空或0')
        return
      }
      if (this.ruleForm.minHeight !== '' && this.ruleForm.maxHeight === '') {
        this.ruleForm.maxHeight = ''
      }
      if (this.ruleForm.maxHeight !== '' && this.ruleForm.minHeight === '') {
        this.ruleForm.minHeight = ''
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.ruleForm.minHeight && this.ruleForm.maxHeight && (this.ruleForm.minHeight > this.ruleForm.maxHeight)) {
            notice('身高最小值不能超过身高最大值')
            return
          }
          if (this.edit === 1) {
            await this.$store.dispatch('updateDesk', {
              min: this.ruleForm.minHeight,
              max: this.ruleForm.maxHeight,
              desk: this.ruleForm.size
            })
          } else {
            await this.$store.dispatch('updateDesk', {
              min: this.ruleForm.minHeight,
              max: this.ruleForm.maxHeight,
              desk: this.ruleForm.size,
              id: this.id
            })
          }
          this.dialog = false
          await this.getDeskList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async updateDesk () {
      await this.$store.dispatch('updateDesk', {
        min: this.ruleForm.minHeight,
        max: this.ruleForm.maxHeight,
        desk: this.ruleForm.size,
        id: ''
      })
    },
    async getDeskList () {
      this.loading = true
      this.tableData = await this.$store.dispatch('getDeskList')
      this.loading = false
    }
  },
  watch: {
  },
  async created () {
    await this.getDeskList()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.school-basic-heightContrast {
  &>.el-button {
    img {
      margin-right: 12px;
    }
  }
  .tip {
    font-size: 12px;
    color: #C9C9C9;
    padding: 0px;
    margin: 0px;
    height: 20px;
    float: left;
    line-height: 20px;
    // margin-left: 35px;
  }
  .download {
    position: relative;
  }
  .content-table {
    background: #fff;
    min-height: 772px;
    border-radius: 4px;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    /* top: 20px; */
    /* left: 20px; */
    width: inherit;
  }
  &>.el-input {
    width: 300px;
    float: right;
    &>.el-input__inner {
      width: 300px;
      height: 36px;
    }
  }
  &>.el-button {
    /* float: right; */
    padding: 10px 25px;
    background: #73D586;
    border-color: #73D586;
    color: #fff;
    /* margin-left: 20px; */
  }
  .el-table {
    margin-top: 20px;
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
        background: #73D586;
        border-color: #73D586;
        color: #fff;
        &:last-child {
          padding: 10px 18px;
          background: #F17B7B;
          border-color: #F17B7B;
          color: #fff;
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
    .addDia {
      .el-form {
        @extend .clearfix;
      }
    .el-dialog {
      width: 500px;
      height: 325px;
      position: relative;
    }
    .el-dialog .el-dialog__header span {
      font-size: 16px;
    }
    .el-dialog__body {
      @extend .clearfix;
    }
    .el-form-item__content {
      @extend .clearfix;
      // margin-left: 150px !important;
        .el-input {
          float: left;
          width: 140px;
        }
        i {
          display: inline-block;
          float: left;
          margin: 0px 5px;
          line-height: 40px;
        }
    }
    .el-form-item {
      position: relative;
      .buy {
        width: 130px;
        height: 25px;
        background: #fff;
        display: inline-block;
        position: absolute;
        top: 7px;
        left: 2px;
      }
      height: 40px;
      margin-bottom: 25px;
      &:first-child {
        // width: 60%;
        float: left;
        .el-input {
          // float: left;
          .el-input__inner {
            width: 140px;
            height: 30px;
            line-height: 30px;
            padding-right: 0px;
          }
        }
        .el-form-item__content {
          margin-left: 150px !important;
        }
      }
      &:nth-child(2) {
        width: 30%;
        float: left;
        @extend .clearfix;
        .el-input {
          width: 140px;
        }
        .el-input__inner {
          width: 140px;
            height: 30px;
            line-height: 30px;
            padding-right: 0px;
        }
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
      &:nth-child(3) {
        // .el-form-item__content {
        //   height: 30px;
        // }
        clear: both;
        margin-bottom: 0px;
      }
      &:last-child {
         @extend .clearfix;
        .el-input {
          width: 305px;
        }
        .el-input__inner {
          width: 305px;
        }
      }
      .el-input__inner {
        height: 33px;
      }
      .el-form-item__content {
        margin-left: 150px !important;
      }
    }
    .el-form-item__label {
      display: block;
      text-align: justify;
      padding: 0px;
      height: 40px;
      width: 140px !important;
      &::before {
        display: none;
      }
      &:after{
        display: inline-block;
        content: '';
        overflow: hidden;
        width: 100%;
        height: 0;
        line-height: 0;
      }
    }
    .el-dialog .el-dialog__footer {
        width: 90%;
        position: absolute;
        bottom: 20px;
        padding-bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
      .dialog-footer {
        .el-button {
          padding: 10px 32px;
          color: #fff;
          &:first-child {
            background: #6E94FF;
            border-color: #6E94FF;
          }
          &:nth-child(2) {
            background: #F17B7B;
            border-color: #F17B7B;
          }
        }
      }
    }
  }
}
</style>
