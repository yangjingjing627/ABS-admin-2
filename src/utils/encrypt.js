/**
 * 签名工具类
 */
import crypto from 'crypto'

var encrypt = {}
var DEFAULT_CHARSET = 'utf8'
var getMd5Str = function (obj) {
  if (typeof (obj) === 'object') {
    var keys = []
    for (key in obj) {
      if (obj[key] !== '') {
        keys.push(key)
      }
    }
    if (keys.length) {
      keys.sort()
      var md5Str = ''
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (obj[key] != null) {
          var value = md5Obj(obj[key])
          // var value = md5Obj(encodeURI(obj[key]))
          if (value != null) {
            md5Str += '&' + key + '=' + value
          }
        }
      }
      return md5Str ? md5Str.substring(1) : ''
    }
  }
  return ''
}
  /**
   * 获取MD5签名
   */
var md5 = function (str) {
  return crypto.createHash('md5').update(str, DEFAULT_CHARSET).digest('hex')
}
  /**
   * 获取对象的MD5值
   */
var md5Obj = function (obj) {
  if (typeof (obj) === 'object') {
    var md5Str = getMd5Str(obj)
    if (md5Str) {
      return md5(md5Str)
    }
  } else {
    return obj
  }
}
  /**
   * 自定义MD5签名
   */
encrypt.sign = function (obj, signKey) {
  var md5Str = getMd5Str(obj)
  var finalStr = ''
  if (md5Str) {
    finalStr = md5Str + '&' + signKey
  } else {
    finalStr = signKey
  }
  return md5(finalStr).toUpperCase()
}
export default encrypt
