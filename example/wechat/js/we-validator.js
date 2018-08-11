/*!
 * we-validator
 * version: 1.3.6
 * address: https://github.com/ChanceYu/we-validator#readme
 * author:  ChanceYu
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

var _validator = __webpack_require__(1);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 环境检测：
 * 微信小程序
 * 支付宝小程序
 * Nodejs
 */
var isWxMini = typeof wx !== 'undefined' && !!wx.showToast;
var isAliMini = typeof my !== 'undefined' && !!my.showToast;
var isNodeEnv = typeof module !== 'undefined' && module.exports;

var WeValidator = function () {

    /**
     * 获取字段值
     * @param {String} name 字段名称
     */
    function WeValidator() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, WeValidator);

        this.options = Object.assign({}, WeValidator.defaultOptions, options);

        this.checkRules();
    }

    /**
     * 显示错误提示
     */


    /**
     * 动态添加验证规则
     * @param {String} ruleName 规则名称
     * @param {Function} method 规则验证函数
     */


    _createClass(WeValidator, [{
        key: 'showErrorMessage',
        value: function showErrorMessage(data) {
            // 参数配置
            if (typeof this.options.onMessage === 'function') {
                return this.options.onMessage(data);
            }

            // 全局配置
            if (typeof WeValidator.onMessage === 'function') {
                return WeValidator.onMessage(data);
            }

            // 默认配置
            // 微信小程序
            if (isWxMini) {
                return wx.showToast({
                    title: data.msg,
                    icon: 'none'
                });
            }

            // 支付宝小程序
            if (isAliMini) {
                return my.showToast({
                    content: data.msg,
                    type: 'none'
                });
            }

            // Nodejs 不做处理
            if (isNodeEnv) return;

            // 普通浏览器
            alert(data.msg);
        }

        /**
         * 验证配置规则是否无效
         */

    }, {
        key: 'isRuleInvalid',
        value: function isRuleInvalid(ruleName, attr) {
            if (!_validator2.default.hasOwnProperty(ruleName)) {
                console.warn && console.warn('\u6CA1\u6709\u6B64\u9A8C\u8BC1\u7C7B\u578B\uFF1A' + ruleName + '\uFF0C\u5B57\u6BB5\uFF1A' + attr);
                return true;
            }
        }

        /**
         * 验证所有配置规则是否正确
         */

    }, {
        key: 'checkRules',
        value: function checkRules() {
            var _rules_ = this.options.rules;

            // 遍历字段
            for (var attr in _rules_) {
                // 遍历验证规则
                for (var ruleName in _rules_[attr]) {
                    if (this.isRuleInvalid(ruleName, attr)) continue;
                }
            }
        }

        /**
         * 验证表单数据
         */

    }, {
        key: 'checkData',
        value: function checkData(data, onMessage) {
            var _rules_ = this.options.rules;
            var _messages_ = this.options.messages;
            var result = {};

            // 遍历字段
            for (var attr in _rules_) {
                // 遍历验证规则
                for (var ruleName in _rules_[attr]) {
                    if (this.isRuleInvalid(ruleName, attr)) continue;

                    var ruleValue = _rules_[attr][ruleName];
                    var value = '';

                    if (data.hasOwnProperty(attr)) {
                        value = data[attr];
                    }

                    var args = [];

                    args.push(value);

                    switch (Object.prototype.toString.call(ruleValue)) {
                        case '[object Function]':
                            // 动态属性校验时应该使用函数
                            ruleValue = ruleValue(value, data);
                            args.push(ruleValue);
                            break;
                        case '[object Array]':
                            args = args.concat(ruleValue);
                            break;
                        default:
                            args.push(ruleValue);
                            break;
                    }

                    if (_validator2.default[ruleName].apply(_validator2.default, args)) {
                        // 验证通过
                        result[attr] = {
                            name: attr,
                            value: value
                        };
                    } else {
                        // 验证不通过
                        var params = {
                            name: attr,
                            value: args.splice(0, 1)[0],
                            param: args,
                            rule: ruleName,
                            msg: _messages_[attr] && _messages_[attr][ruleName]
                        };

                        if (typeof onMessage === 'function') {
                            onMessage(params);
                        } else {
                            if (_messages_.hasOwnProperty(attr) && _messages_[attr][ruleName]) {
                                this.showErrorMessage(params);
                            }
                        }
                        return false;
                    }
                }
            }

            return result;
        }
    }]);

    return WeValidator;
}();

// validator => WeValidator


WeValidator.defaultOptions = {
    rules: {},
    messages: {},
    onMessage: null };

WeValidator.$value = function (name) {
    return function (value, data) {
        return data[name];
    };
};

WeValidator.addRule = function (ruleName, method) {
    if (_validator2.default.hasOwnProperty(ruleName) || typeof method !== 'function') return;

    _validator2.default[ruleName] = function (value) {
        for (var _len = arguments.length, param = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            param[_key - 1] = arguments[_key];
        }

        return method.call(_validator2.default, value, param);
    };

    WeValidator[ruleName] = _validator2.default[ruleName];
};

for (var attr in _validator2.default) {
    if (!_validator2.default.hasOwnProperty(attr)) continue;

    WeValidator[attr] = _validator2.default[attr];
}

module.exports = WeValidator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rules = __webpack_require__(2);

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 验证函数
 */
var validator = {

    /**
     * 校验通用
     * @param str
     * @param reg
     */
    regex: function regex(str, reg) {
        if (validator.isNull(reg)) {
            return false;
        } else if (validator.isNull(str)) {
            return false;
        }
        return reg.test(str);
    },


    /**
     * 必填
     * @param str
     */
    required: function required(str) {
        return !validator.isNull(str);
    },


    /**
     * 空的校验
     * @param param
     */
    isNull: function isNull(str) {
        if (typeof str === 'undefined' || str === null || str === 'null' || str === '') {
            return true;
        } else {
            return false;
        }
    },


    /**
     * 相同
     * @param str
     * @param str2
     */
    equal: function equal(str, str2) {
        return str === str2;
    },


    /**
     * 大于n的数字
     * @param str
     */
    intGreater: function intGreater(str, n) {
        return parseFloat(str, 10) >= n;
    },


    /**
     * 只能输入n位的数字
     * @param str
     * @param n
     */
    intLength: function intLength(str, n) {
        if (validator.isNull(n)) {
            return false;
        }
        var reg = new RegExp('^\\d{' + n + '}$');
        return validator.regex(str, reg);
    },


    /**
     * 至少n位数字
     * @param str
     * @param n
     */
    intLessLength: function intLessLength(str, n) {
        if (validator.isNull(n)) {
            return false;
        }
        var reg = new RegExp('^\\d{' + n + ',}$');
        return validator.regex(str, reg);
    },


    /**
     * n到m位数字
     * @param str
     * @param n
     * @param m
     */
    intLengthRange: function intLengthRange(str, n, m) {
        if (validator.isNull(n) || validator.isNull(m)) {
            return false;
        }
        var reg = new RegExp('^\\d{' + n + ',' + m + '}$');
        return validator.regex(str, reg);
    },


    /**
     * 只能输入有n位小数的正实数
     * @param str
     * @param n
     */
    decimalLength: function decimalLength(str, n) {
        var reg = new RegExp('^[0-9]+(.[0-9]{' + n + '})?$');
        return validator.regex(str, reg);
    },


    /**
     * 只能输入有n~m位小数的正实数
     * @param str
     * @param n
     * @param m
     */
    decimalLengthRange: function decimalLengthRange(str, n, m) {
        var reg = new RegExp('^[0-9]+(.[0-9]{' + n + ',' + m + '})?$');
        return validator.regex(str, reg);
    },


    /**
     * 长度为n的字符串
     * @param str
     */
    stringLength: function stringLength(str, n) {
        var reg = new RegExp('^.{' + n + '}$');
        return validator.regex(str, reg);
    },


    /**
     * 由26个英文字母组成的字符串
     * @param str
     * @param aorA,大写或小写类型，A表示大写，a表示小写，其它表示不限制大小写
     */
    stringLetter: function stringLetter(str, aorA) {
        var reg;
        if (validator.isNull(aorA)) {
            reg = /^[A-Za-z]+$/;
        } else if (aorA == 'A') {
            reg = /^[A-Z]+$/;
        } else if (aorA == 'a') {
            reg = /^[a-z]+$/;
        } else {
            reg = /^[A-Za-z]+$/;
        }
        return validator.regex(str, reg);
    },


    /**
     * 由数字、26个英文字母或者下划线组成的字符串
     * @param str
     */
    stringLetterDefault: function stringLetterDefault(str) {
        var reg = /^\w+$/;
        return validator.regex(str, reg);
    }
};

validator.rules = _rules2.default;

// rules => validator

var _loop = function _loop(attr) {
    if (!_rules2.default.hasOwnProperty(attr)) return 'continue';

    validator[attr] = function (str) {
        return _rules2.default[attr].test(str);
    };
};

for (var attr in _rules2.default) {
    var _ret = _loop(attr);

    if (_ret === 'continue') continue;
}

module.exports = validator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    // 银行卡
    bankCard: /^(\d{16,19})$/,

    // 手机号（数字）
    mobile: /^1\d{10}$/,

    // 手机号（带空格`131 2233 4455`）
    mobileWithSpace: /^1\d{2}\s?\d{4}\s?\d{4}$/,

    // 身份证
    idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|x|X)$)/,

    // 中文
    chinese: /^[\u4e00-\u9fa5]{0,}$/,

    // 中文（2-8位）
    chinese2to8: /^[\u4e00-\u9fa5\uF900-\uFA2D]{2,8}$/,

    // 整数或小数
    intOrFloat: /^[0-9]+\.{0,1}[0-9]{0,2}$/,

    // 整数
    int: /^[0-9]*$/,

    // 非零开头的数字
    noZeroStart: /^([1-9][0-9]*)$/,

    // 含有^%&',;=?$\"等特殊字符
    specialStr: /[^%&',;=?$\x22]+/,

    // 邮箱
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,

    // InternetURL地址
    httpUrl: /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,

    // 电话号码,正确格式为："XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX"
    tel: /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/,

    // 货币校验
    money: /^\d+\.\d{2}$/,

    // 一年的12月，正确格式为："01"～"09"和"1"～"12"
    month: /^(0?[1-9]|1[0-2])$/,

    // 一个月的31天,正确格式为；"01"～"09"和"1"～"31"。
    day: /^((0?[1-9])|((1|2)[0-9])|30|31)$/,

    // 匹配html标签的正则表达式
    html: /<(.*)>(.*)<\/(.*)>|<(.*)\/>/,

    // 匹配空行的正则表达式
    spaceEnter: /\n[\s| ]*\r/,

    // qq号码
    qq: /^[1-9][0-9]{4,}$/,

    // 邮编
    zip: /^[\d]{6}/,

    // 匹配双字节字符(包括汉字在内)
    doubleByte: /[^\x00-\xff]/
};

/***/ })
/******/ ]);
});