import RULES from './rules'

const requiredFn = RULES.required.rule

/**
 * 环境检测
 */
const isWx = typeof wx !== 'undefined' && !!wx.showToast // 微信小程序
const isMy = typeof my !== 'undefined' && !!my.showToast // 支付宝小程序
const isSwan = typeof swan !== 'undefined' && !!swan.showToast // 百度智能小程序
const isTt = typeof tt !== 'undefined' && !!tt.showToast // 字节跳动小程序
const isBrowser = typeof window !== 'undefined' && !!window.alert  // 普通浏览器

const objString = Object.prototype.toString

const isArray = Array.isArray || ((v) => objString.call(v) === '[object Array]')
const isFunction = (v) => (objString.call(v) === '[object Function]')
const isRegExp = (v) => (objString.call(v) === '[object RegExp]')

class WeValidator {

    /**
     * 默认参数
     * @param {object} options
     * @param {object} [options.rules] 验证字段的规则
     * @param {object} [options.messages] 验证字段错误的提示信息
     * @param {function} [options.onMessage] 错误信息显示方式
     * @param {boolean} [options.multiCheck] 是否同时校验多个字段
     */
    constructor(options = {}) {
        this.options = options

        this.required = requiredFn
        this._checkAllRules()
    }

    /**
     * 所有校验规则
     */
    static RULES = {}

    /**
     * 动态添加验证规则
     * @param {string} ruleName 规则名称
     * @param {object} ruleOption 规则配置
     * @param {string} [ruleOption.message] 默认错误信息文字
     * @param {regexp|function} [ruleOption.rule] 验证规则
     */
    static addRule = function (ruleName, ruleOption) {
        WeValidator.RULES[ruleName] = ruleOption
    }

    /**
     * 验证单个字段数据
     * @param {string} ruleName 规则名称
     * @param {string} value 要验证的值
     * @param {any} param 传递的验证参数
     * @param {boolean} skip 未填跳过校验，仅供内部使用
     */
    static checkValue = function (ruleName, value, param, skip){
      let rule = WeValidator.RULES[ruleName].rule

      if(isRegExp(rule)){
        if(skip){
          return !requiredFn(value) || rule.test(value)
        }else{
          return rule.test(value)
        }
      }

      if(isFunction(rule)){
        if(ruleName === 'required'){
          return param && requiredFn(value)
        }else{
          if(skip){
            return !requiredFn(value) || rule.call(this, value, param)
          }else{
            return rule.call(this, value, param)
          }
        }
      }
    }

    /**
     * 显示错误信息
     * @param {object} params 错误信息
     * @param {function} onMessage 自定义提示函数
     */
    _showErrorMessage(params, onMessage) {
        // validatorInstance.checkData(data, onMessage)
        if(isFunction(onMessage)){
            return onMessage(params)
        }

        // 参数形式 new WeValidator({ onMessage })
        if(isFunction(this.options.onMessage)){
            return this.options.onMessage(params)
        }

        // 全局配置 WeValidator.onMessage
        if(isFunction(WeValidator.onMessage)){
            return WeValidator.onMessage(params)
        }
        
        // 微信小程序
        if(isWx) {
            return wx.showToast({
                title: params.msg,
                icon: 'none'
            })
        }
        
        // 支付宝小程序
        if(isMy){
            return my.showToast({
                content: params.msg,
                type: 'none'
            })
        }

        // 百度小程序
        if(isSwan){
            return swan.showToast({
                title: params.msg,
                icon: 'none'
            })
        }

        // 字节跳动小程序
        if(isTt){
            return tt.showToast({
                title: params.msg,
                icon: 'none'
            })
        }

        // 浏览器端
        if(isBrowser) alert(params.msg)
    }

    /**
     * 获取错误信息内容
     * @param {string} ruleName 规则名称
     * @param {string} attr 字段名称
     * @param {any} param 规则参数
     */
    _getErrorMessage(ruleName, attr, param){
      let messages = this.options.messages
      let defaultMessage = WeValidator.RULES[ruleName].message

      if(messages && messages.hasOwnProperty(attr) && messages[attr][ruleName]){
        defaultMessage = messages[attr][ruleName]
      }

      if(defaultMessage){
        defaultMessage = defaultMessage.replace(/\{(\d)\}/g, function($0, $1){
          if(isArray(param)){
            return param[$1]
          }else{
            return param
          }
        })
        
        return defaultMessage
      }
    }

    /**
     * 验证配置规则是否无效
     * @param {string} ruleName 规则名称
     * @param {string} attr 字段名称
     */
    _isRuleInvalid(ruleName, attr) {
        if (!WeValidator.RULES.hasOwnProperty(ruleName)) {
            console.warn && console.warn(`没有此验证规则：${ruleName}，字段：${attr}`)
            return true
        }
    }

    /**
     * 验证所有配置规则是否正确
     */
    _checkAllRules() {
        let _rules_ = this.options.rules

        // 遍历字段
        for (let attr in _rules_) {
            // 遍历验证规则
            for (let ruleName in _rules_[attr]) {
                if (this._isRuleInvalid(ruleName, attr)) continue
            }
        }
    }

    /**
     * 校验数据，会验证所有配置的字段规则
     * @param {object} data 验证的数据对象
     * @param {function} onMessage 自定义错误信息提示
     * @param {boolean} showMessage 是否显示提示信息，默认显示（内部使用）
     * @param {object} fieldMap 校验的字段，默认校验所有字段（内部使用）
     */
    checkData(data, onMessage, showMessage = true, fieldMap) {
        let _rules_ = this.options.rules
        let multiCheck = this.options.multiCheck
        let hasError = false
        let errorData = {}

        this.data = data

        // 遍历字段
        for (let attr in _rules_) {
            if(fieldMap && !fieldMap.hasOwnProperty(attr)) continue
          
            // 遍历验证规则
            for (let ruleName in _rules_[attr]) {
                if (this._isRuleInvalid(ruleName, attr)) continue

                if(fieldMap){
                  let res = fieldMap[attr]
                  if(isArray(res) && res.indexOf(ruleName) === -1) continue
                }

                let ruleParam = _rules_[attr][ruleName]
                let value = ''

                if (data.hasOwnProperty(attr)) {
                    value = data[attr]
                }

                if(isFunction(ruleParam)){
                  ruleParam = ruleParam.call(this, value)
                }

                let isFieldValid = WeValidator.checkValue.call(this, ruleName, value, ruleParam, true)

                // 验证不通过
                if (!isFieldValid) {
                  hasError = true

                  let msg = this._getErrorMessage(ruleName, attr, ruleParam)
                  let errorParam = null

                  if (showMessage && msg) {
                      errorParam = {
                          name: attr,
                          value: value,
                          param: ruleParam,
                          rule: ruleName,
                          msg: msg
                      }
                      errorData[attr] = errorParam
                  }
                  
                  if(!multiCheck){
                    if (errorParam) {
                      this._showErrorMessage(errorParam, onMessage);
                    }
                    return false
                  }
                }
            }
        }

        if(hasError){
          if(multiCheck && showMessage){
            this._showErrorMessage(errorData, onMessage)
          }
          return false
        }

        return true
    }

    /**
     * 校验数据，只校验对应的字段规则
     * @param {object} data 验证的数据对象
     * @param {array} fields 校验的字段
     * @param {function} onMessage 自定义错误信息提示
     * @param {boolean} showMessage 是否显示提示信息，默认显示（内部使用）
     */
    checkFields(data, fields, onMessage, showMessage = true) {
      if(!isArray(fields)) throw new Error('第二个参数须为数组')

      // fields: [ '[field]:[rule]' ]
      // fields: [ 'phoneNo' ]  =>  { phoneNo: true }
      // fields: [ 'phoneNo:required' ]  =>  { phoneNo: ['required'] }
      // fields: [ 'phoneNo:required,mobile' ]  =>  { phoneNo: ['required', 'mobile'] }
      let fieldMap = {}

      fields.forEach((item) => {
        let arr = item.split(':')
        let field = arr[0]
        let rules = arr[1]

        if(rules){
          // 只校验特定规则
          rules = rules.split(',')
          fieldMap[field] = rules
        }else{
          // 校验 field 字段的所有规则
          fieldMap[field] = true
        }
      })
      
      return this.checkData(data, onMessage, showMessage, fieldMap)
    }

    /**
     * 校验数据，不会提示错误信息
     * @param {object} data 验证的数据对象
     * @param {array} fields 校验的字段。如果有，只校验对应的字段规则，默认校验所有配置的字段规则
     */
    isValid(data, fields) {
      if(isArray(fields)){
        return this.checkFields(data, fields, null, false)
      }else{
        return this.checkData(data, null, false)
      }
    }

    /**
     * 动态添加字段校验
     * @param {object} options 配置参数
     * @param {object} [options.rules] 规则
     * @param {object} [options.messages] 提示消息
     */
    addRules(options = {}) {
      Object.assign(this.options.rules, options.rules || {})
      Object.assign(this.options.messages, options.messages || {})

      this._checkAllRules()
    }

    /**
     * 动态移除字段校验
     * @param {array} fields 要删除校验的字段
     */
    removeRules(fields) {
      if(!isArray(fields)) throw new Error('参数须为数组')
      
      for(let i = 0; i < fields.length; i++){
        let key = fields[i]

        delete this.options.rules[key]
      }
    }

}

WeValidator.RULES = RULES
WeValidator.required = requiredFn

module.exports = WeValidator
