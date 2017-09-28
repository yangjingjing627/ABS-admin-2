import {
  Pagination,
  Button,
  Loading,
  MessageBox,
  // Notification,
  Message,
  Select,
  Option,
  Upload,
  DatePicker,
  TimeSelect,
  Popover,
  Table,
  TableColumn,
  // Dialog,
  Tree
} from 'element-ui'
import Input from './input'
import HsySelect from './select'
import goBack from './goback'
import HsyLoading from './loading'
import HsyNotify from './notify/notify'
import Dialog from './dialog'
import HsyPagination from './pagination'
// import Dialog from './Dialog'

const VERSION = '0.0.1'

const install = function(Vue, _opts = {}) {
  if (install.installed) return
  Vue.use(Loading.directive)

  Vue.use(Pagination)
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Upload)
  Vue.use(DatePicker)
  Vue.use(TimeSelect)
  Vue.use(Tree)
  Vue.use(Popover)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.component(Input.name, Input)
  Vue.component(HsySelect.name, HsySelect)
  Vue.component(goBack.name, goBack)
  Vue.component(HsyLoading.name, HsyLoading)
  Vue.component(Dialog.name, Dialog)
  Vue.component(HsyPagination.name, HsyPagination)
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  // Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
  Vue.$notify = Vue.prototype.$notify = new HsyNotify()

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: VERSION,
  install
}
