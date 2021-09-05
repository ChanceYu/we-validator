/*!
 * we-validator
 * version: 2.1.16
 * address: https://github.com/ChanceYu/we-validator#readme
 * author:  ChanceYu <i.fish@foxmail.com>
 * license: MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WeValidator", [], factory);
	else if(typeof exports === 'object')
		exports["WeValidator"] = factory();
	else
		root["WeValidator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rules = __webpack_require__(1);

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requiredFn = _rules2.default.required.rule;

/**
 * 环境检测
 */
var isWx = typeof wx !== 'undefined' && !!wx.showToast; // 微信小程序
var isMy = typeof my !== 'undefined' && !!my.showToast; // 支付宝小程序
var isSwan = typeof swan !== 'undefined' && !!swan.showToast; // 百度智能小程序
var isTt = typeof tt !== 'undefined' && !!tt.showToast; // 字节跳动小程序
var isBrowser = typeof window !== 'undefined' && !!window.alert; // 普通浏览器

var objString = Object.prototype.toString;

var isArray = Array.isArray || function (v) {
  return objString.call(v) === '[object Array]';
};
var isFunction = function isFunction(v) {
  return objString.call(v) === '[object Function]';
};
var isRegExp = function isRegExp(v) {
  return objString.call(v) === '[object RegExp]';
};

var WeValidator = function () {

  /**
   * 默认参数
   * @param {object} options
   * @param {object} [options.rules] 验证字段的规则
   * @param {object} [options.messages] 验证字段错误的提示信息
   * @param {function} [options.onMessage] 错误信息显示方式
   * @param {boolean} [options.multiCheck] 是否同时校验多个字段
   */
  function WeValidator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WeValidator);

    this.options = options;

    this.required = requiredFn;
    this._checkAllRules();
  }

  /**
   * 所有校验规则
   */


  /**
   * 动态添加验证规则
   * @param {string} ruleName 规则名称
   * @param {object} ruleOption 规则配置
   * @param {string} [ruleOption.message] 默认错误信息文字
   * @param {regexp|function} [ruleOption.rule] 验证规则
   */


  /**
   * 验证单个字段数据
   * @param {string} ruleName 规则名称
   * @param {string} value 要验证的值
   * @param {any} param 传递的验证参数
   * @param {boolean} skip 未填跳过校验，仅供内部使用
   */


  _createClass(WeValidator, [{
    key: '_showErrorMessage',


    /**
     * 显示错误信息
     * @param {object} params 错误信息
     * @param {function} onMessage 自定义提示函数
     */
    value: function _showErrorMessage(params, onMessage) {
      // validatorInstance.checkData(data, onMessage)
      if (isFunction(onMessage)) {
        return onMessage(params);
      }

      // 参数形式 new WeValidator({ onMessage })
      if (isFunction(this.options.onMessage)) {
        return this.options.onMessage(params);
      }

      // 全局配置 WeValidator.onMessage
      if (isFunction(WeValidator.onMessage)) {
        return WeValidator.onMessage(params);
      }

      // 微信小程序
      if (isWx) {
        return wx.showToast({
          title: params.msg,
          icon: 'none'
        });
      }

      // 支付宝小程序
      if (isMy) {
        return my.showToast({
          content: params.msg,
          type: 'none'
        });
      }

      // 百度小程序
      if (isSwan) {
        return swan.showToast({
          title: params.msg,
          icon: 'none'
        });
      }

      // 字节跳动小程序
      if (isTt) {
        return tt.showToast({
          title: params.msg,
          icon: 'none'
        });
      }

      // 浏览器端
      if (isBrowser) alert(params.msg);
    }

    /**
     * 获取错误信息内容
     * @param {string} ruleName 规则名称
     * @param {string} attr 字段名称
     * @param {any} param 规则参数
     */

  }, {
    key: '_getErrorMessage',
    value: function _getErrorMessage(ruleName, attr, param) {
      var messages = this.options.messages;
      var defaultMessage = WeValidator.RULES[ruleName].message;

      if (messages && messages.hasOwnProperty(attr) && messages[attr][ruleName]) {
        defaultMessage = messages[attr][ruleName];
      }

      if (defaultMessage) {
        defaultMessage = defaultMessage.replace(/\{(\d)\}/g, function ($0, $1) {
          if (isArray(param)) {
            return param[$1];
          } else {
            return param;
          }
        });

        return defaultMessage;
      }
    }

    /**
     * 验证配置规则是否无效
     * @param {string} ruleName 规则名称
     * @param {string} attr 字段名称
     */

  }, {
    key: '_isRuleInvalid',
    value: function _isRuleInvalid(ruleName, attr) {
      if (!WeValidator.RULES.hasOwnProperty(ruleName)) {
        console.warn && console.warn('\u6CA1\u6709\u6B64\u9A8C\u8BC1\u89C4\u5219\uFF1A' + ruleName + '\uFF0C\u5B57\u6BB5\uFF1A' + attr);
        return true;
      }
    }

    /**
     * 验证所有配置规则是否正确
     */

  }, {
    key: '_checkAllRules',
    value: function _checkAllRules() {
      var _rules_ = this.options.rules;

      // 遍历字段
      for (var attr in _rules_) {
        // 遍历验证规则
        for (var ruleName in _rules_[attr]) {
          if (this._isRuleInvalid(ruleName, attr)) continue;
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

  }, {
    key: 'checkData',
    value: function checkData(data, onMessage) {
      var showMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var fieldMap = arguments[3];

      var _rules_ = this.options.rules;
      var multiCheck = this.options.multiCheck;
      var hasError = false;
      var errorData = {};

      this.data = data;

      // 遍历字段
      for (var attr in _rules_) {
        if (fieldMap && !fieldMap.hasOwnProperty(attr)) continue;

        // 遍历验证规则
        for (var ruleName in _rules_[attr]) {
          if (this._isRuleInvalid(ruleName, attr)) continue;

          if (fieldMap) {
            var res = fieldMap[attr];
            if (isArray(res) && res.indexOf(ruleName) === -1) continue;
          }

          var ruleParam = _rules_[attr][ruleName];
          var value = '';

          if (data.hasOwnProperty(attr)) {
            value = data[attr];
          }

          if (isFunction(ruleParam)) {
            ruleParam = ruleParam.call(this, value);
          }

          var isFieldValid = WeValidator.checkValue.call(this, ruleName, value, ruleParam, true);

          // 验证不通过
          if (!isFieldValid) {
            hasError = true;

            var msg = this._getErrorMessage(ruleName, attr, ruleParam);
            var errorParam = null;

            if (showMessage && msg) {
              errorParam = {
                name: attr,
                value: value,
                param: ruleParam,
                rule: ruleName,
                msg: msg
              };
              errorData[attr] = errorParam;
            }

            if (!multiCheck) {
              if (errorParam) {
                this._showErrorMessage(errorParam, onMessage);
              }
              return false;
            }
          }
        }
      }

      if (hasError) {
        if (multiCheck && showMessage) {
          this._showErrorMessage(errorData, onMessage);
        }
        return false;
      }

      return true;
    }

    /**
     * 校验数据，只校验对应的字段规则
     * @param {object} data 验证的数据对象
     * @param {array} fields 校验的字段
     * @param {function} onMessage 自定义错误信息提示
     * @param {boolean} showMessage 是否显示提示信息，默认显示（内部使用）
     */

  }, {
    key: 'checkFields',
    value: function checkFields(data, fields, onMessage) {
      var showMessage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (!isArray(fields)) throw new Error('第二个参数须为数组');

      // fields: [ '[field]:[rule]' ]
      // fields: [ 'phoneNo' ]  =>  { phoneNo: true }
      // fields: [ 'phoneNo:required' ]  =>  { phoneNo: ['required'] }
      // fields: [ 'phoneNo:required,mobile' ]  =>  { phoneNo: ['required', 'mobile'] }
      var fieldMap = {};

      fields.forEach(function (item) {
        var arr = item.split(':');
        var field = arr[0];
        var rules = arr[1];

        if (rules) {
          // 只校验特定规则
          rules = rules.split(',');
          fieldMap[field] = rules;
        } else {
          // 校验 field 字段的所有规则
          fieldMap[field] = true;
        }
      });

      return this.checkData(data, onMessage, showMessage, fieldMap);
    }

    /**
     * 校验数据，不会提示错误信息
     * @param {object} data 验证的数据对象
     * @param {array} fields 校验的字段。如果有，只校验对应的字段规则，默认校验所有配置的字段规则
     */

  }, {
    key: 'isValid',
    value: function isValid(data, fields) {
      if (isArray(fields)) {
        return this.checkFields(data, fields, null, false);
      } else {
        return this.checkData(data, null, false);
      }
    }

    /**
     * 动态添加字段校验
     * @param {object} options 配置参数
     * @param {object} [options.rules] 规则
     * @param {object} [options.messages] 提示消息
     */

  }, {
    key: 'addRules',
    value: function addRules() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Object.assign(this.options.rules, options.rules || {});
      Object.assign(this.options.messages, options.messages || {});

      this._checkAllRules();
    }

    /**
     * 动态移除字段校验
     * @param {array} fields 要删除校验的字段
     */

  }, {
    key: 'removeRules',
    value: function removeRules(fields) {
      if (!isArray(fields)) throw new Error('参数须为数组');

      for (var i = 0; i < fields.length; i++) {
        var key = fields[i];

        delete this.options.rules[key];
      }
    }
  }]);

  return WeValidator;
}();

WeValidator.RULES = {};

WeValidator.addRule = function (ruleName, ruleOption) {
  WeValidator.RULES[ruleName] = ruleOption;
};

WeValidator.checkValue = function (ruleName, value, param, skip) {
  var rule = WeValidator.RULES[ruleName].rule;

  if (isRegExp(rule)) {
    if (skip) {
      return !requiredFn(value) || rule.test(value);
    } else {
      return rule.test(value);
    }
  }

  if (isFunction(rule)) {
    if (ruleName === 'required') {
      return param && requiredFn(value);
    } else {
      if (skip) {
        return !requiredFn(value) || rule.call(this, value, param);
      } else {
        return rule.call(this, value, param);
      }
    }
  }
};

WeValidator.RULES = _rules2.default;
WeValidator.required = requiredFn;

module.exports = WeValidator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  /**
   * 必填
   */
  required: {
    message: '此字段必填',
    rule: function rule(value) {
      if (typeof value === 'number') {
        value = value.toString();
      } else if (typeof value === 'boolean') {
        return true;
      }
      return !!(value && value.length > 0);
    }
  },
  /**
   * 正则通用
   */
  pattern: {
    message: '不符合此验证规则',
    rule: function rule(value, param) {
      return param.test(value);
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
    rule: function rule(value, param) {
      return value === this.data[param];
    }
  },
  /**
   * 字段值不相同校验，与 equalTo 相反
   */
  notEqualTo: {
    message: '输入值不能和字段 {0} 相同',
    rule: function rule(value, param) {
      return value !== this.data[param];
    }
  },
  /**
   * 是否包含某字符
   */
  contains: {
    message: '输入值必须包含 {0}',
    rule: function rule(value, param) {
      return value.indexOf(param) > -1;
    }
  },
  /**
   * 不能包含某字符
   */
  notContains: {
    message: '输入值不能包含 {0}',
    rule: function rule(value, param) {
      return value.indexOf(param) === -1;
    }
  },
  /**
   * 长度为多少的字符串
   */
  length: {
    message: '请输入 {0} 个字符',
    rule: function rule(value, param) {
      return value.length == param;
    }
  },
  /**
   * 最少多长的字符串
   */
  minlength: {
    message: '最少要输入 {0} 个字符',
    rule: function rule(value, param) {
      return value.length >= param;
    }
  },
  /**
   * 最多多长的字符串
   */
  maxlength: {
    message: '最多可以输入 {0} 个字符',
    rule: function rule(value, param) {
      return value.length <= param;
    }
  },
  /**
   * 某个范围长度的字符串
   */
  rangelength: {
    message: '请输入长度在 {0} 到 {1} 之间的字符',
    rule: function rule(value, param) {
      return value.length >= param[0] && value.length <= param[1];
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
    rule: function rule(value, param) {
      if (typeof param === 'string') param = this.data[param];

      return value >= param;
    }
  },
  /**
   * 小于多少的数字/字段值
   */
  max: {
    message: '请输入小于 {0} 的数字',
    rule: function rule(value, param) {
      if (typeof param === 'string') param = this.data[param];

      return value <= param;
    }
  },
  /**
   * 大于且小于多少的数字
   */
  range: {
    message: '请输入大于 {0} 且小于 {1} 的数字',
    rule: function rule(value, param) {
      return value >= param[0] && value <= param[1];
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
    rule: function rule(value, param) {
      return new RegExp('^[\u4E00-\u9FA5]{' + param + ',}$').test(value);
    }
  },
  /**
   * 最多多少个中文字符
   */
  maxChinese: {
    message: '最多输入 {0} 个中文字符',
    rule: function rule(value, param) {
      return new RegExp('^[\u4E00-\u9FA5]{1,' + param + '}$').test(value);
    }
  },
  /**
   * 大于且小于多少个中文字符
   */
  rangeChinese: {
    message: '只能输入 {0} 到 {1} 个中文字符',
    rule: function rule(value, param) {
      return new RegExp('^[\u4E00-\u9FA5]{' + param[0] + ',' + param[1] + '}$').test(value);
    }
  },
  /**
   * 日期
   */
  date: {
    message: '请输入有效的日期',
    rule: function rule(value) {
      return !/Invalid|NaN/.test(new Date(value).toString());
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
};

/***/ })
/******/ ]);
});