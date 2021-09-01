module.exports = {
  /**
   * 必填
   */
  required: {
    message: '此字段必填',
    rule(value){
      if(typeof value === 'number'){
        value = value.toString()
      }else if(typeof value === 'boolean'){
        return true
      }
      return !!(value && value.length > 0)
    }
  },
  /**
   * 正则通用
   */
  pattern: {
    message: '不符合此验证规则',
    rule(value, param){
      return param.test(value)
    }
  },
  /**
   * 电子邮件
   */
  email: {
    message: '请输入有效的电子邮件地址',
    rule: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  /**
   * 手机号码
   */
  mobile: {
    message: '请输入 11 位的手机号码',
    rule: /^1[3456789]\d{9}$/
  },
  /**
   * 座机号，例如：010-1234567、0551-1234567
   */
  tel: {
    message: '请输入座机号',
    rule: /^(\d{3,4}-)?\d{7,8}$/
  },
  /**
   * URL网址
   */
  url: {
    message: '请输入有效的网址',
    rule: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  },
  /**
   * 身份证号
   */
  idcard: {
    message: '请输入 18 位的有效身份证',
    rule: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  },
  /**
   * 字段值相同校验（例如：密码和确认密码）
   */
  equalTo: {
    message: '输入值必须和字段 {0} 相同',
    rule(value, param){
      return value === this.data[param]
    }
  },
  /**
   * 字段值不相同校验，与 equalTo 相反
   */
  notEqualTo: {
    message: '输入值不能和字段 {0} 相同',
    rule(value, param){
      return value !== this.data[param]
    }
  },
  /**
   * 是否包含某字符
   */
  contains: {
    message: '输入值必须包含 {0}',
    rule(value, param){
      return value.indexOf(param) > -1
    }
  },
  /**
   * 不能包含某字符
   */
  notContains: {
    message: '输入值不能包含 {0}',
    rule(value, param){
      return value.indexOf(param) === -1
    }
  },
  /**
   * 长度为多少的字符串
   */
  length: {
    message: '请输入 {0} 个字符',
    rule(value, param){
      return value.length == param
    }
  },
  /**
   * 最少多长的字符串
   */
  minlength: {
    message: '最少要输入 {0} 个字符',
    rule(value, param){
      return value.length >= param
    }
  },
  /**
   * 最多多长的字符串
   */
  maxlength: {
    message: '最多可以输入 {0} 个字符',
    rule(value, param){
      return value.length <= param
    }
  },
  /**
   * 某个范围长度的字符串
   */
  rangelength: {
    message: '请输入长度在 {0} 到 {1} 之间的字符',
    rule(value, param){
      return value.length >= param[0] && value.length <= param[1]
    }
  },
  /**
   * 数字
   */
  number: {
    message: '请输入有效的数字',
    rule: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
  },
  /**
   * 正整数数字
   */
  digits: {
    message: '只能输入正整数数字',
    rule: /^\d+$/
  },
  /**
   * 正整数或负整数数字
   */
  integer: {
    message: '只能输入整数数字',
    rule: /^-?\d+$/
  },
  /**
   * 大于多少的数字/字段值
   */
  min: {
    message: '请输入大于 {0} 的数字',
    rule(value, param){
      if(typeof param === 'string') param = this.data[param]
      
      return value >= param
    }
  },
  /**
   * 小于多少的数字/字段值
   */
  max: {
    message: '请输入小于 {0} 的数字',
    rule(value, param){
      if(typeof param === 'string') param = this.data[param]

      return value <= param
    }
  },
  /**
   * 大于且小于多少的数字
   */
  range: {
    message: '请输入大于 {0} 且小于 {1} 的数字',
    rule(value, param){
      return value >= param[0] && value <= param[1]
    }
  },
  /**
   * 中文字符
   */
  chinese: {
    message: '只能输入中文字符',
    rule: /^[\u4e00-\u9fa5]+$/
  },
  /**
   * 最少多少个中文字符
   */
  minChinese: {
    message: '最少输入 {0} 个中文字符',
    rule(value, param){
      return new RegExp(`^[\u4e00-\u9fa5]{${param},}$`).test(value)
    }
  },
  /**
   * 最多多少个中文字符
   */
  maxChinese: {
    message: '最多输入 {0} 个中文字符',
    rule(value, param){
      return new RegExp(`^[\u4e00-\u9fa5]{1,${param}}$`).test(value)
    }
  },
  /**
   * 大于且小于多少个中文字符
   */
  rangeChinese: {
    message: '只能输入 {0} 到 {1} 个中文字符',
    rule(value, param){
      return new RegExp(`^[\u4e00-\u9fa5]{${param[0]},${param[1]}}$`).test(value)
    }
  },
  /**
   * 日期
   */
  date: {
    message: '请输入有效的日期',
    rule(value){
      return !/Invalid|NaN/.test(new Date(value).toString())
    }
  },
  /**
   * 日期（ISO标准格式）例如：2019-09-19，2019/09/19
   */
  dateISO: {
    message: '请输入有效的日期（ISO 标准格式）',
    rule: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  },
  /**
   * ipv4地址
   */
  ipv4: {
    message: '请输入有效的 IPv4 地址',
    rule: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i
  },
  /**
   * ipv6地址
   */
  ipv6: {
    message: '请输入有效的 IPv6 地址',
    rule: /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
  }
}
