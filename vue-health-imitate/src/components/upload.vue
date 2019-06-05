<template>
<div class="vue-image-crop-upload" v-show="value">
    <div class="vicp-wrap">
        <div class="vicp-step3" v-if="step === 3">
            <div class="vicp-upload">
                <span class="vicp-loading" v-if="loading === 1">{{ lang.loading }}</span>
                <div class="vicp-progress-wrap" v-show="loading === 1">
                    <span class="vicp-progress" v-show="loading === 1" :style="progressStyle"></span>
                </div>
                <div class="vicp-error" v-if="hasError">
                    <i class="vicp-icon2"></i> {{ errorMsg }}
                </div>
                <div class="vicp-success" v-if="loading === 2">
                    <i class="vicp-icon3"></i> {{ lang.success }}
                </div>
            </div>
            <div class="vicp-operate" v-if="step === 3" style="left: 500px;">
                <a @click="repeat">重新上传</a>
            </div>
        </div>
        <div class="vicp-step1" v-show="step == 1">
            <div class="vicp-drop-area" >
                <el-button class="upload" type="info" v-show="loading !== 1" @click.native="handleClick">本地上传</el-button>
                <br/>
                <!-- <el-button class="photo" type="success" style="margin: 0;" @click.native="albumimage">相册上传</el-button> -->
                <p style="font-size: 12px;color: #bbb;">只支持上传jpg, png, gif格式的图片，且大小不超过5m。</p>
                <div class="loading-box" key="-2" v-if="uploadLoading && !hasError">
                    <vue-loading type="spiningDubbles" color="#5ab95c"  :size="{width: '50px', height: '50px'}"></vue-loading>
                </div>
                <div class="vicp-error" v-show="hasError">
                    <i class="vicp-icon2"></i> {{ errorMsg }}
                </div>
            </div>
            <input type="file" v-show="false" v-if="step == 1" @change="handleChange" ref="fileinput">
        </div>

        <div class="vicp-step2" style="width: 100%">
            <div class="vicp-crop"  >
                <div class="vicp-crop-left" v-show="true" v-if="step == 2">
                    <div class="vicp-img-container">
                        <img :src="sourceImgUrl" :style="sourceImgStyle" class="vicp-img" draggable="false"
                            @drag="preventDefault"
                            @dragstart="preventDefault"
                            @dragend="preventDefault"
                            @dragleave="preventDefault"
                            @dragover="preventDefault"
                            @dragenter="preventDefault"
                            @drop="preventDefault"
                            @touchstart="imgStartMove"
                            @touchmove="imgMove"
                            @touchend="createImg"
                            @touchcancel="createImg"
                            @mousedown="imgStartMove"
                            @mousemove="imgMove"
                            @mouseup="createImg"
                            @mouseout="createImg"
                            ref="img">
                        <div class="vicp-img-shade vicp-img-shade-1" :style="sourceImgShadeStyle"></div>
                        <div class="vicp-img-shade vicp-img-shade-2" :style="sourceImgShadeStyle"></div>
                    </div>
                    <div class="vicp-range">
                        <input type="range" :value="scale.range" step="1" min="0" max="100" @input="zoomChange">
                        <i @mousedown="startZoomSub" @mouseout="endZoomSub" @mouseup="endZoomSub" class="vicp-icon5"></i>
                        <i @mousedown="startZoomAdd" @mouseout="endZoomAdd" @mouseup="endZoomAdd" class="vicp-icon6"></i>
                    </div>
                </div>
                <div class="vicp-crop-right">
                    <div class="vicp-preview">
                        <p style="text-align: left; padding-left: 40px;">头像预览</p>
                        <div class="vicp-preview-item" style="width: 100px; height: 100px;text-align: center;">
                            <img :src="createImgUrl" width="96" height="96" style="border-radius: 100%;">
                            <span>96*96 px</span>
                        </div>
                        <div class="vicp-preview-item" style="width: 50px; height: 50px; text-align: center;">
                            <img :src="createImgUrl" width="48" height="48" style=" border-radius: 100%;">
                            <span>48*48 px</span>
                        </div>
                        <div class="vicp-preview-item" style="width: 50px; height: 50px;text-align: center;">
                            <img :src="createImgUrl" width="30" height="30">
                            <span>30*30 px</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vicp-operate" v-if="step == 2">
                <a @click="setStep(1)" >重新上传</a>
                <a class="vicp-operate-btn" @click="upload">保存</a>
            </div>
        </div>

        <canvas v-show="false" :width="width" :height="height" ref="canvas"></canvas>
    </div>

    <el-dialog title="插入图片" v-model="dialogVisible" size="tiny" @click.native.stop>
      <div class="select">
        <el-select v-model="imgsId" placeholder="请选择" @change="albumimage">
          <el-option
            v-for="item in imgs"
            :label="item.name"
            :value="item.id"
            :key="item.id">
          </el-option>
        </el-select>
      </div>
      <transition-group tag="div" name="list" class="img-box">
        <div
          v-for="(item) in imgList"
          :key="item.id"
          class="img-list"
          @click="imgSelect(item)">
          <img :src="item.filePath | cutImg(130, 130)" alt="img" width="130px;" height="130px">
        </div>
        <p v-if="imgList.length === 0" class="no-message" key="-1">
            <img src="../assets/images/leftMenu_1.png" alt="" width="150px;">
            <br/>
        <span>暂无图片</span>
        </p>
        <div class="loading-box" key="-2" v-if="photoLoading">
            <vue-loading type="spiningDubbles" color="#5ab95c"  :size="{width: '50px', height: '50px'}"></vue-loading>
        </div>
      </transition-group>
    </el-dialog>
</div>

</template>

<script>
import vueLoading from 'vue-loading-template'
// import { mapGetters } from "vuex"
import { notice } from '../utils/index.js'
const mimes = {
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif'
}
// database64文件格式转换为2进制
const data2blob = function (data, mime) {
  // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  // canvas.toDataURL 返回的默认格式就是 image/png
  return new Blob([ia], {
    type: mime
  })
}

export default {
  props: {
    field: {
      type: String,
      default: 'avatar'
    },
    ki: {
      default: 0
    },
    value: {
      default: true
    },
    url: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: null
    },
    headers: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 80
    },
    height: {
      type: Number,
      default: 80
    },
    maxSize: {
      type: Number,
      default: 5108
    },
    langType: {
      type: String,
      default: 'zh'
    },
    langExt: {
      type: Object,
      default: null
    },
    imgFormat: {
      type: String,
      default: 'png'
    }
  },
  data () {
    let that = this
    // createImgUrl = this.user.userFace,
    let { imgFormat, langType, langExt, width, height } = that
    let isSupported = true
    let allowImgFormat = ['jpg', 'png']
    let langBag = {
      zh: {
        hint: '点击，或拖动图片至此处',
        loading: '请稍后……',
        noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
        success: '上传成功',
        fail: '图片上传失败',
        preview: '头像预览',
        btn: {
          off: '取消',
          close: '关闭',
          back: '上一步',
          save: '保存'
        },
        error: {
          onlyImg: '仅限图片格式',
          outOfSize: '单文件大小不能超过 ',
          lowestPx: '图片最低像素为（宽*高）：'
        }
      }
    }
    let tempImgFormat =
        allowImgFormat.indexOf(imgFormat) === -1 ? 'jpg' : imgFormat
    let lang
    lang = langBag[langType] ? langBag[langType] : lang['zh']
    let mime = mimes[tempImgFormat]
    // 规范图片格式
    that.imgFormat = tempImgFormat
    if (langExt) {
      Object.assign(lang, langExt)
    }
    if (typeof FormData !== 'function') {
      isSupported = false
    }
    return {
      mime,
      lang,
      isSupported,
      isSupportTouch: document.hasOwnProperty('ontouchstart'),
      step: 1, // 1选择文件 2剪裁 3上传
      loading: 0, // 0未开始 1正在 2成功 3错误
      progress: 0,
      hasError: false,
      errorMsg: '',
      ratio: width / height,
      sourceImg: null,
      sourceImgUrl: '',
      createImgUrl: '',
      sourceImgMouseDown: {
        on: false,
        mX: 0, // 鼠标按下的坐标
        mY: 0,
        x: 0, // scale原图坐标
        y: 0
      },
      sourceImgContainer: {
        // sic
        width: 240,
        height: 180
      },
      dialogVisible: false,
      imgs: [],
      imgsId: '',
      imgList: [],
      scale: {
        zoomAddOn: false, // 按钮缩放事件开启
        zoomSubOn: false, // 按钮缩放事件开启
        range: 1, // 最大100
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        maxWidth: 0,
        maxHeight: 0,
        minWidth: 0, // 最宽
        minHeight: 0,
        naturalWidth: 0, // 原宽
        naturalHeight: 0
      },
      isLocal: true,
      photoLoading: false,
      uploadLoading: false
    }
  },
  components: {
    vueLoading
  },
  computed: {
    progressStyle () {
      let { progress } = this
      return {
        width: progress + '%'
      }
    },
    // ...mapGetters(['user']),
    sourceImgStyle () {
      let { scale, sourceImgMasking } = this
      let top = scale.y + sourceImgMasking.y + 'px'
      let left = scale.x + sourceImgMasking.x + 'px'
      return {
        top,
        left,
        width: scale.width + 'px',
        height: scale.height + 'px'
      }
    },
    // 原图蒙版属性
    sourceImgMasking () {
      let { width, height, ratio, sourceImgContainer } = this
      let sic = sourceImgContainer
      let sicRatio = sic.width / sic.height // 原图容器宽高比
      let x = 0
      let y = 0
      let w = sic.width
      let h = sic.height
      let scale = 1
      if (ratio < sicRatio) {
        scale = sic.height / height
        w = sic.height * ratio
        x = (sic.width - w) / 2
      }
      if (ratio > sicRatio) {
        scale = sic.width / width
        h = sic.width / ratio
        y = (sic.height - h) / 2
      }
      return {
        scale, // 蒙版相对需求宽高的缩放
        x,
        y,
        width: w,
        height: h
      }
    },
    // 原图遮罩样式
    sourceImgShadeStyle () {
      let { sourceImgMasking, sourceImgContainer } = this
      let sic = sourceImgContainer
      let sim = sourceImgMasking
      let w = sim.width === sic.width ? sim.width : (sic.width - sim.width) / 2
      let h =
          sim.height === sic.height ? sim.height : (sic.height - sim.height) / 2
      return {
        width: w + 'px',
        height: h + 'px'
      }
    }
  },
  watch: {
    value (newValue) {
      if (newValue && this.loading !== 1) {
        this.reset()
      }
    }
  },
  methods: {
    repeat () {
      this.step = 1
      this.reset()
    },
    imgSelect (item) {
      this.photoLoading = true
      this.uploadLoading = true
      setTimeout(async () => {
        this.dialogVisible = false
        const { data } = await this.$https.get(
          `/albumimage/zoneAlbumImageStr?imageId=${item.id}`
        )
        this.sourceImgUrl = data.result
        this.startCrop()
        this.photoLoading = false
      }, 500)
    },
    async albumimage () {
      this.imgList = []
      this.dialogVisible = true
      this.photoLoading = true
      if (!this.imgsId) {
        this.photoLoading = false
        return
      }
      setTimeout(async () => {
        const { data } = await this.$https
          .get(`/albumimage/zoneAlbumImageList?albumId=${this.imgsId}`)
          .catch(() => {
            notice('连接超时')
            this.photoLoading = false
          })
        if (data.code !== 1) notice(this, data.message, 2000)
        else {
          this.imgList = data.result.map(item => ({
            filePath: item.imgPath,
            name: item.imageName,
            id: item.id
          }))
        }
        this.photoLoading = false
      }, 1000)
    },
    ripple (e) {
      this.createImgUrl = this.$store.state.user.face
    },
    // 关闭控件
    off () {
      let that = this
      setTimeout(function () {
        that.$emit('input', false)
        if (that.step === 3 && that.loading === 2) {
          that.setStep(1)
        }
      }, 200)
    },
    // 设置步骤
    setStep (no) {
      this.hasError = false
      let that = this
      setTimeout(function () {
        that.step = no
        if (no === 1) {
          that.createImgUrl = this.$store.state.user.face
        }
      }, 200)
    },
    // 图片选择区域函数绑定
    preventDefault (e) {
      e.preventDefault()
      return false
    },
    handleClick (e) {
      // this.isLocal = true
      if (this.loading !== 1) {
        if (e.target !== this.$refs.fileinput) {
          e.preventDefault()
          if (document.activeElement !== this.$refs) {
            this.$refs.fileinput.click()
          }
        }
      }
    },
    handleChange (e) {
      e.preventDefault()
      this.uploadLoading = true
      if (this.loading !== 1) {
        let files = e.target.files || e.dataTransfer.files
        this.reset()
        if (this.checkFile(files[0])) {
          this.setSourceImg(files[0])
        }
      }
    },
    // 检测选择的文件是否合适
    checkFile (file) {
      let that = this
      let { lang, maxSize } = that
      // 仅限图片
      if (file.type.indexOf('image') === -1) {
        that.hasError = true
        that.errorMsg = '只能上传jpg, png, gif格式的图片。'
        return false
      }

      // 超出大小
      if (file.size / 1024 > maxSize) {
        that.hasError = true
        that.errorMsg = lang.error.outOfSize + maxSize + 'kb'
        return false
      }
      return true
    },
    // 重置控件
    reset () {
      let that = this
      that.loading = 0
      that.hasError = false
      that.errorMsg = ''
      that.progress = 0
    },
    // 设置图片源
    setSourceImg (file) {
      let that = this
      let fr = new FileReader()
      fr.onload = function (e) {
        that.sourceImgUrl = fr.result
        that.startCrop()
      }
      fr.readAsDataURL(file)
    },
    // 剪裁前准备工作
    startCrop () {
      let that = this
      let {
        width,
        height,
        ratio,
        scale,
        sourceImgUrl,
        sourceImgMasking,
        lang
      } = that
      let sim = sourceImgMasking
      let img = new Image()
      img.src = sourceImgUrl
      img.onload = function () {
        let nWidth = img.naturalWidth
        let nHeight = img.naturalHeight
        let nRatio = nWidth / nHeight
        let w = sim.width
        let h = sim.height
        let x = 0
        let y = 0
        // 图片像素不达标
        if (nWidth < width || nHeight < height) {
          that.hasError = true
          that.errorMsg = lang.error.lowestPx + width + '*' + height
          return false
        }
        if (ratio > nRatio) {
          h = w / nRatio
          y = (sim.height - h) / 2
        }
        if (ratio < nRatio) {
          w = h * nRatio
          x = (sim.width - w) / 2
        }
        scale.range = 0
        scale.x = x
        scale.y = y
        scale.width = w
        scale.height = h
        scale.minWidth = w
        scale.minHeight = h
        scale.maxWidth = nWidth * sim.scale
        scale.maxHeight = nHeight * sim.scale
        scale.naturalWidth = nWidth
        scale.naturalHeight = nHeight
        that.sourceImg = img
        setTimeout(() => {
          that.createImg()
          that.setStep(2)
        }, 1000)
      }
    },
    // 鼠标按下图片准备移动
    imgStartMove (e) {
      e.preventDefault()
      // 支持触摸事件，则鼠标事件无效
      if (this.isSupportTouch && !e.targetTouches) {
        return false
      }
      let et = e.targetTouches ? e.targetTouches[0] : e
      let { sourceImgMouseDown, scale } = this
      let simd = sourceImgMouseDown
      simd.mX = et.screenX
      simd.mY = et.screenY
      simd.x = scale.x
      simd.y = scale.y
      simd.on = true
    },
    // 鼠标按下状态下移动，图片移动
    imgMove (e) {
      e.preventDefault()
      // 支持触摸事件，则鼠标事件无效
      if (this.isSupportTouch && !e.targetTouches) {
        return false
      }
      let et = e.targetTouches ? e.targetTouches[0] : e
      let {
        sourceImgMouseDown: { on, mX, mY, x, y },
        scale,
        sourceImgMasking
      } = this
      let sim = sourceImgMasking
      let nX = et.screenX
      let nY = et.screenY
      let dX = nX - mX
      let dY = nY - mY
      let rX = x + dX
      let rY = y + dY
      if (!on) return
      if (rX > 0) {
        rX = 0
      }
      if (rY > 0) {
        rY = 0
      }
      if (rX < sim.width - scale.width) {
        rX = sim.width - scale.width
      }
      if (rY < sim.height - scale.height) {
        rY = sim.height - scale.height
      }
      scale.x = rX
      scale.y = rY
    },
    // 按钮按下开始放大
    startZoomAdd (e) {
      let that = this
      let { scale } = that
      scale.zoomAddOn = true

      function zoom () {
        if (scale.zoomAddOn) {
          let range = scale.range >= 100 ? 100 : ++scale.range
          that.zoomImg(range)
          setTimeout(function () {
            zoom()
          }, 60)
        }
      }
      zoom()
    },
    // 按钮松开或移开取消放大
    endZoomAdd (e) {
      this.scale.zoomAddOn = false
    },
    // 按钮按下开始缩小
    startZoomSub (e) {
      let that = this
      let { scale } = that
      scale.zoomSubOn = true

      function zoom () {
        if (scale.zoomSubOn) {
          let range = scale.range <= 0 ? 0 : --scale.range
          that.zoomImg(range)
          setTimeout(function () {
            zoom()
          }, 60)
        }
      }
      zoom()
    },
    // 按钮松开或移开取消缩小
    endZoomSub (e) {
      let { scale } = this
      scale.zoomSubOn = false
    },
    zoomChange (e) {
      this.zoomImg(e.target.value)
    },
    // 缩放原图
    zoomImg (newRange) {
      let that = this
      let { sourceImgMasking, scale } = this
      let {
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        width,
        height,
        x,
        y
      } = scale
      let sim = sourceImgMasking
      // 蒙版宽高
      let sWidth = sim.width
      let sHeight = sim.height
      // 新宽高
      let nWidth = minWidth + (maxWidth - minWidth) * newRange / 100
      let nHeight = minHeight + (maxHeight - minHeight) * newRange / 100
      // 新坐标（根据蒙版中心点缩放）
      let nX = sWidth / 2 - nWidth / width * (sWidth / 2 - x)
      let nY = sHeight / 2 - nHeight / height * (sHeight / 2 - y)

      // 判断新坐标是否超过蒙版限制
      if (nX > 0) {
        nX = 0
      }
      if (nY > 0) {
        nY = 0
      }
      if (nX < sWidth - nWidth) {
        nX = sWidth - nWidth
      }
      if (nY < sHeight - nHeight) {
        nY = sHeight - nHeight
      }

      // 赋值处理
      scale.x = nX
      scale.y = nY
      scale.width = nWidth
      scale.height = nHeight
      scale.range = newRange
      setTimeout(function () {
        if (scale.range === newRange) {
          that.createImg()
        }
      }, 300)
    },
    // 生成需求图片
    createImg (e) {
      let that = this
      let {
        mime,
        sourceImg,
        scale: { x, y, width, height },
        sourceImgMasking: { scale }
      } = that
      let canvas = that.$refs.canvas
      let ctx = canvas.getContext('2d')
      if (e) {
        // 取消鼠标按下移动状态
        that.sourceImgMouseDown.on = false
      }
      ctx.clearRect(0, 0, that.width, that.height)
      ctx.drawImage(
        sourceImg,
        x / scale,
        y / scale,
        width / scale,
        height / scale
      )
      that.createImgUrl = canvas.toDataURL(mime)
      this.uploadLoading = false
    },
    // 上传图片
    upload () {
      let that = this
      let {
        lang,
        imgFormat,
        mime,
        url,
        headers,
        field,
        ki,
        createImgUrl
      } = this
      let fmData = new FormData()
      fmData.append(
        field,
        data2blob(createImgUrl, mime),
        field + '.' + imgFormat
      )
      // const file = data2blob(createImgUrl, mime)

      // 监听进度回调
      const uploadProgress = function (event) {
        if (event.lengthComputable) {
          that.progress = 100 * Math.round(event.loaded) / event.total
        }
      }
      // 上传文件
      that.reset()
      that.loading = 1
      that.setStep(3)
      new Promise(function (resolve, reject) {
        let client = new XMLHttpRequest()
        client.open('POST', url, true)
        client.onreadystatechange = function () {
          if (this.readyState !== 4) {
            return
          }
          if (this.status === 200) {
            resolve(JSON.parse(this.responseText))
          } else {
            reject(this.status)
          }
        }
        client.upload.addEventListener('progress', uploadProgress, false) // 监听进度
        // 设置header
        if (typeof headers === 'object' && headers) {
          Object.keys(headers).forEach(k => {
            client.setRequestHeader(k, headers[k])
          })
        }
        client.send(fmData)
      }).then(
        // 上传成功
        function (res) {
          if (that.value && res.code === 1) {
            that.loading = 2
            that.$emit('crop-upload-success', res)
          } else {
            that.loading = 3
            that.hasError = true
            that.errorMsg = res.message
            that.$emit('crop-upload-fail', res, field, ki)
            that.createImgUrl = this.$store.state.user.face
          }
        },
        // 上传失败
        function (sts) {
          if (that.value) {
            that.loading = 3
            that.hasError = true
            that.errorMsg = lang.fail
            that.$emit('crop-upload-fail', sts, field, ki)
            that.createImgUrl = this.$store.state.user.face
          }
        }
      )
    }
  },
  async created () {
    if (this.$store.state.user.face) {
      let data = await this.$store.dispatch('getUserFace', {
        userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
      })
      this.createImgUrl = data
    }
    // const { data } = await this.$store.dispatch('')
    // if (data.code !== 1) notice(this, data.mesage, 2000)
    // else {
    //   this.imgs = data.result.map(item => ({ name: item.name, id: item.id }))
    //   if (this.imgs.length === 0) return
    //   this.imgsId = this.imgs[0].id
    // }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/main.scss";
@-webkit-keyframes vicp_progress {
  0% {
    background-position-y: 0;
  }
  100% {
    background-position-y: 40px;
  }
}
@keyframes vicp_progress {
  0% {
    background-position-y: 0;
  }
  100% {
    background-position-y: 40px;
  }
}

@-webkit-keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
    transform: scale(0) translatey(-60px);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
    transform: scale(1) translatey(0);
  }
}

@keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
    transform: scale(0) translatey(-60px);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
    transform: scale(1) translatey(0);
  }
}

.vue-image-crop-upload {
  position: fixed;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
  .el-dialog__header {
    border-bottom: 1px solid $background;
    padding: $width;
    span {
      font-size: 16px;
    }
  }
  .el-dialog__body {
    padding: $width/2 !important;
    .select {
      padding-left: $width;
      padding-bottom: $width/2;
      border-bottom: 1px solid $background;
      .el-select {
        width: 200px;
      }
    }
    .img-box {
      position: relative;
      padding: $width/2;
      display: flex;
      flex-wrap: wrap;
      height: 300px;
      overflow-y: auto;
      position: relative;
      .no-message {
        margin-top: 20px;
        width: 100%;
        text-align: center;
        font-size: 16px;
        padding: 10px 0;
        color: #999;
        img {
          margin-left: 14px;
        }
        span {
          display: block;
          margin-top: 10px;
        }
      }
      .img-list {
        position: relative;
        cursor: pointer;
        border: 1px solid $background;
        margin: 6px 10px;
        width: 130px;
        height: 130px;
        overflow: hidden;
        .list-success {
          position: absolute;
          background: $green;
          right: -24px;
          top: -14px;
          width: 60px;
          height: 40px;
          transform: rotate(45deg);
          color: white;
          box-shadow: 0 1px 1px #ccc;
          i {
            font-size: 14px;
            margin-top: 20px;
            margin-left: 20px;
            transform: rotate(-45deg) scale(0.8);
          }
        }
      }
    }
  }
}
.loading-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 999;
  .vue-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.vue-image-crop-upload .vicp-wrap {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  position: fixed;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 600px;
  height: 330px;
  padding: 25px;
  background-color: #fff;
  border-radius: 2px;
  -webkit-animation: vicp 0.12s ease-in;
  animation: vicp 0.12s ease-in;
}
.vue-image-crop-upload .vicp-wrap .vicp-close {
  position: absolute;
  right: -30px;
  top: -30px;
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4 {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  -webkit-transition: -webkit-transform 0.18s;
  transition: -webkit-transform 0.18s;
  transition: transform 0.18s;
  transition: transform 0.18s, -webkit-transform 0.18s;
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after,
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::before {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  content: "";
  position: absolute;
  top: 12px;
  left: 4px;
  width: 20px;
  height: 3px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: #fff;
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:hover {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  height: 310px;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
  overflow: hidden;
  .el-button {
    padding: 10px 40px;
  }
  p {
    margin-top: 20px;
  }
}
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 {
  display: block;
  margin: 0 auto 6px;
  width: 42px;
  height: 42px;
  overflow: hidden;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-icon1
  .vicp-icon1-arrow {
  display: block;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);
  border-left: 14.7px solid transparent;
  border-right: 14.7px solid transparent;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-icon1
  .vicp-icon1-body {
  display: block;
  width: 12.6px;
  height: 14.7px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-icon1
  .vicp-icon1-bottom {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  height: 12.6px;
  border: 6px solid rgba(0, 0, 0, 0.3);
  border-top: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-no-supported-hint {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  width: 100%;
  height: 60px;
  line-height: 30px;
  background-color: #eee;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop {
  overflow: hidden;
}
.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left {
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container {
  position: relative;
  display: block;
  width: 240px;
  height: 180px;
  background-color: #e5e5e0;
  overflow: hidden;
  margin: 0 auto;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img {
  position: absolute;
  display: block;
  cursor: move;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade {
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  position: absolute;
  background-color: rgba(241, 242, 243, 0.8);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade.vicp-img-shade-1 {
  top: 0;
  left: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade.vicp-img-shade-2 {
  bottom: 0;
  right: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range {
  position: relative;
  margin: 30px auto 0;
  width: 240px;
  height: 18px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5,
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6 {
  position: absolute;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5:hover,
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6:hover {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.14);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5 {
  left: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5::before {
  position: absolute;
  content: "";
  display: block;
  left: 3px;
  top: 8px;
  width: 12px;
  height: 2px;
  background-color: #fff;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6 {
  right: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6::before {
  position: absolute;
  content: "";
  display: block;
  left: 3px;
  top: 8px;
  width: 12px;
  height: 2px;
  background-color: #fff;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6::after {
  position: absolute;
  content: "";
  display: block;
  top: 3px;
  left: 8px;
  width: 2px;
  height: 12px;
  background-color: #fff;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"] {
  display: block;
  padding-top: 5px;
  margin: 0 auto;
  width: 180px;
  height: 8px;
  vertical-align: top;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus {
  outline: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-webkit-slider-thumb {
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  -webkit-appearance: none;
  appearance: none;
  margin-top: -3px;
  width: 12px;
  height: 12px;
  background-color: #61c091;
  border-radius: 100%;
  border: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-moz-range-thumb {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  -moz-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background-color: #61c091;
  border-radius: 100%;
  border: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-thumb {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  appearance: none;
  width: 12px;
  height: 12px;
  background-color: #61c091;
  border: none;
  border-radius: 100%;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:active::-moz-range-thumb {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  width: 14px;
  height: 14px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:active::-ms-thumb {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  width: 14px;
  height: 14px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:active::-webkit-slider-thumb {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  margin-top: -4px;
  width: 14px;
  height: 14px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-webkit-slider-runnable-track {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 6px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  background-color: rgba(68, 170, 119, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-moz-range-track {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 6px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  background-color: rgba(68, 170, 119, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-track {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
  height: 6px;
  border-radius: 2px;
  border: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-fill-lower {
  background-color: rgba(68, 170, 119, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-fill-upper {
  background-color: rgba(68, 170, 119, 0.15);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-webkit-slider-runnable-track {
  background-color: rgba(68, 170, 119, 0.5);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-moz-range-track {
  background-color: rgba(68, 170, 119, 0.5);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-ms-fill-lower {
  background-color: rgba(68, 170, 119, 0.45);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-ms-fill-upper {
  background-color: rgba(68, 170, 119, 0.25);
}
.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right {
  float: right;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview {
  height: 150px;
  overflow: hidden;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item {
  position: relative;
  padding: 5px;
  width: 100px;
  height: 100px;
  float: left;
  margin-bottom: 30px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item
  span {
  position: absolute;
  bottom: -20px;
  width: 100%;
  font-size: 14px;
  color: #bbb;
  display: block;
  text-align: center;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item
  img {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 3px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 340px;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
  border: 1px dashed #ddd;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-loading {
  display: block;
  padding: 15px;
  font-size: 16px;
  color: #999;
  margin-top: 120px;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap {
  margin-bottom: 120px;
  border-radius: 3px;
  padding: 0 20px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step3
  .vicp-upload
  .vicp-progress-wrap
  .vicp-progress {
  position: relative;
  display: block;
  height: 5px;
  border-radius: 3px;
  background-color: #4a7;
  -webkit-box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);
  box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);
  -webkit-transition: width 0.15s linear;
  transition: width 0.15s linear;
  background-image: -webkit-linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  -webkit-animation: vicp_progress 0.5s linear infinite;
  animation: vicp_progress 0.5s linear infinite;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step3
  .vicp-upload
  .vicp-progress-wrap
  .vicp-progress::after {
  content: "";
  position: absolute;
  display: block;
  top: -3px;
  right: -3px;
  width: 9px;
  height: 9px;
  border: 1px solid rgba(245, 246, 247, 0.7);
  -webkit-box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
  box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
  border-radius: 100%;
  background-color: #4a7;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-error,
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-success {
  height: 100px;
  line-height: 100px;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate a {
  position: relative;
  float: left;
  display: block;
  margin-left: 10px;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: #4a7;
  border-radius: 2px;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate a:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
.vue-image-crop-upload .vicp-wrap .vicp-error,
.vue-image-crop-upload .vicp-wrap .vicp-success {
  display: block;
  font-size: 14px;
  line-height: 24px;
  height: 24px;
  color: #d10;
  text-align: center;
  vertical-align: top;
}
.vue-image-crop-upload .vicp-wrap .vicp-success {
  color: #4a7;
}
.vue-image-crop-upload .vicp-wrap .vicp-icon3 {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  top: 4px;
}
.vue-image-crop-upload .vicp-wrap .vicp-icon3::after {
  position: absolute;
  top: 3px;
  left: 6px;
  width: 6px;
  height: 10px;
  border-width: 0 2px 2px 0;
  border-color: #4a7;
  border-style: solid;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  content: "";
}
.vue-image-crop-upload .vicp-wrap .vicp-icon2 {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  top: 4px;
}
.vue-image-crop-upload .vicp-wrap .vicp-icon2::after,
.vue-image-crop-upload .vicp-wrap .vicp-icon2::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 4px;
  width: 13px;
  height: 2px;
  background-color: #d10;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.vue-image-crop-upload .vicp-wrap .vicp-icon2::after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.e-ripple {
  position: absolute;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  background-clip: padding-box;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
  opacity: 1;
}
.e-ripple.z-active {
  opacity: 0;
  -webkit-transform: scale(2);
  -ms-transform: scale(2);
  transform: scale(2);
  -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, transform 0.6s ease-out,
    -webkit-transform 0.6s ease-out;
}
</style>
