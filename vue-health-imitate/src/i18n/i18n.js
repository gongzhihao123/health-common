import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './language'
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n
