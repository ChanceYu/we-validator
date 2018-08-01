import rules from './rules'

/**
 * 验证函数
 */
const validator = {

    /**
     * 校验通用
     * @param str
     * @param reg
     */
    regex(str, reg) {
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
    required(str) {
        return !validator.isNull(str);
    },

    /**
     * 空的校验
     * @param param
     */
    isNull(str) {
        if (typeof (str) === 'undefined' || str === null || str === 'null' || str === '') {
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
    equal(str, str2){
        return str === str2
    },

    /**
     * 大于n的数字
     * @param str
     */
    intGreater(str, n) {
        return parseFloat(str, 10) >= n;
    },

    /**
     * 只能输入n位的数字
     * @param str
     * @param n
     */
    intLength(str, n) {
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
    intLessLength(str, n) {
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
    intLengthRange(str, n, m) {
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
    decimalLength(str, n) {
        var reg = new RegExp('^[0-9]+(.[0-9]{' + n + '})?$');
        return validator.regex(str, reg);
    },

    /**
     * 只能输入有n~m位小数的正实数
     * @param str
     * @param n
     * @param m
     */
    decimalLengthRange(str, n, m) {
        var reg = new RegExp('^[0-9]+(.[0-9]{' + n + ',' + m + '})?$');
        return validator.regex(str, reg);
    },

    /**
     * 长度为n的字符串
     * @param str
     */
    stringLength(str, n) {
        var reg = new RegExp('^.{' + n + '}$');
        return validator.regex(str, reg);
    },

    /**
     * 由26个英文字母组成的字符串
     * @param str
     * @param aorA,大写或小写类型，A表示大写，a表示小写，其它表示不限制大小写
     */
    stringLetter(str, aorA) {
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
    stringLetterDefault(str) {
        var reg = /^\w+$/;
        return validator.regex(str, reg);
    }
}

validator.rules = rules

// rules => validator
for (let attr in rules) {
    if(!rules.hasOwnProperty(attr)) continue

    validator[attr] = (str) => rules[attr].test(str)
}

module.exports = validator