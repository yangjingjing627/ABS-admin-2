/**
 * 签名工具类
 */
// import CryptoJS from 'crypto-js'
import crypto from 'crypto-js'
var encrypt = {}

var getMd5Str = function (params) {
  var keys = []
  for (var i in params) {
    keys.push(i)
  }
  keys = keys.sort()
  var salt = ''
  for (var key in keys) {
    var param = keys[key]
    var value = params[param]
    console.log(param + '----------param-')
    console.log(value + '----------value-')
    if (!value) {
      continue
    }
    salt += param + '=' + params[param] + '&'
  }
  console.log(salt + '----------salt-')
  console.log(salt.length)
  return salt
}

// var getMd5Str = function (obj) {
//   if (typeof (obj) === 'object') {
//     var keys = []
//     for (key in obj) {
//       if (obj[key] !== '') {
//         keys.push(key)
//       }
//     }
//     if (keys.length) {
//       keys.sort()
//       var md5Str = ''
//       for (var i = 0; i < keys.length; i++) {
//         var key = keys[i]
//         if (obj[key] != null) {
//           var value = md5Obj(obj[key])
//           // var value = md5Obj(encodeURI(obj[key]))
//           if (value != null) {
//             md5Str += '&' + key + '=' + value
//           }
//         }
//       }
//       return md5Str ? md5Str.substring(1) : ''
//     }
//   }
//   return ''
// }

/**
 * 获取MD5签名
 */
var md5 = function (str) {
  return crypto.MD5(str)
}

/**
 * 自定义MD5签名
 */
encrypt.sign = function (obj, signKey) {
  var md5Str = getMd5Str(obj)
  var finalStr = ''
  if (md5Str) {
    finalStr = md5Str + signKey
  } else {
    finalStr = signKey
  }
  console.info(finalStr + '---------finalStr')
  console.info(md5(finalStr) + '==-------md5(finalStr).toUpperCase()---')
  console.info(finalStr.length)
  var returnSalt = ' ' + md5(finalStr)

  return returnSalt ? returnSalt.substring(1) : ''
}
export default encrypt
