import { Notification } from 'element-ui'

const titleS = '成功'
const titleW = '警告'
const titleI = '消息'
const titleE = '失败'

/**
 *
 * 通用消息
 * @class Notification
 */
class hsyNotify {
  constructor() {
    this.$notify = Notification
  }

  success(msg, title = titleS, duration = 3000) {
    return this.$notify.success({title: title, message: msg, duration: duration})
  }

  warning(msg, title = titleW, duration = 3000) {
    return this.$notify.warning({title: title, message: msg, duration: duration})
  }

  info(msg, title = titleI, duration = 3000) {
    return this.$notify.info({title: title, message: msg, duration: duration})
  }

  error(msg, title = titleE, duration = 3000) {
    return this.$notify.error({title: title, message: msg, duration: duration})
  }

};
export default hsyNotify
