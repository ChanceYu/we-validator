import validator from './validator'

/**
 * 简单判断是微信小程序还是支付宝小程序
 */
const isWeChat = typeof wx !== 'undefined'
const isAlipay = typeof my !== 'undefined'

class WeValidator {

    static defaultOptions = {
        rules: {},
        messages: {},
        checkRule: false // 是否校验规则的有效性
    }

    /**
     * 动态添加验证规则
     * @param {String} name 规则名称
     * @param {Function} method 规则验证函数
     */
    static addRule = (name, method) => {
        if(validator.hasOwnProperty(name) || typeof method !== 'function') return
        
        validator[name] = function(str, ...param){
            return method.call(validator, str, param)
        }

        WeValidator[name] = validator[name]
    }

    constructor(options = {}) {
        this.options = Object.assign({}, WeValidator.defaultOptions, options);

        if (this.options.checkRule) {
            this.checkRules()
        }
    }

    /**
     * 显示错误提示
     */
    showErrorMessage(msg) {
        if (isWeChat) {
            wx.showToast({
                title: msg,
                icon: 'none'
            })
        }

        if (isAlipay) {
            my.showToast({
                content: msg,
                type: 'none'
            })
        }
    }

    /**
     * 验证配置规则是否正确，无效，返回 true
     */
    isRuleInvalid(ruleName, attr) {
        if (!validator.hasOwnProperty(ruleName)) {
            console.warn && console.warn(`没有此验证类型：${ruleName}，字段：${attr}`);
            return true
        }
    }

    /**
     * 验证所有配置规则是否正确
     */
    checkRules() {
        let _rules_ = this.options.rules;

        // 遍历字段
        for (let attr in _rules_) {
            // 遍历验证规则
            for (let ruleName in _rules_[attr]) {
                if (this.isRuleInvalid(ruleName, attr)) continue;
            }
        }
    }

    /**
     * 验证表单数据
     */
    checkData(data) {
        let _rules_ = this.options.rules;
        let _messages_ = this.options.messages;
        let result = null;

        // 遍历字段
        for (let attr in _rules_) {
            // 遍历验证规则
            for (let ruleName in _rules_[attr]) {
                if (this.options.checkRule) {
                    if (this.isRuleInvalid(ruleName, attr)) continue;
                }

                let ruleValue = _rules_[attr][ruleName];
                let value = '';

                if (data.hasOwnProperty(attr)) {
                    value = data[attr];
                }

                let args = [];

                args.push(value);

                switch (Object.prototype.toString.call(ruleValue)) {
                    case '[object Function]': // 动态属性校验时应该使用函数
                        ruleValue = ruleValue(value);
                        args.push(ruleValue);
                        break;
                    case '[object Array]':
                        args = args.concat(ruleValue);
                        break;
                    default:
                        args.push(ruleValue);
                        break;
                }

                if (validator[ruleName].apply(validator, args)) {
                    // 验证通过
                    result = result || {};
                    result[attr] = value;
                } else {
                    // 验证不通过
                    if (_messages_.hasOwnProperty(attr) && _messages_[attr][ruleName]) {
                        this.showErrorMessage(_messages_[attr][ruleName]);
                    }
                    return false;
                }
            }
        }

        return data;
    }

}

// validator => WeValidator
Object.keys(validator).forEach((attr) => {
    WeValidator[attr] = validator[attr]
})

module.exports = WeValidator