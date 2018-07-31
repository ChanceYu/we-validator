import rules from './rules'

/**
 * 验证函数
 */
const validator = {

    /**
     * 校验通用
     * @param str
     * @param reg
     * @returns
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
     * @returns
     */
    required(str) {
        return !validator.isNull(str);
    },

    /**
     * 空的校验
     * @param param
     * @returns {Boolean}
     */
    isNull(str) {
        if (typeof (str) === 'undefined' || str === null || str === 'null' || str === '') {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 大于n的数字
     * @param str
     * @returns
     */
    intGreater(str, n) {
        return parseFloat(str, 10) >= n;
    },

    /**
     * 只能输入n位的数字
     * @param str
     * @param n
     * @returns
     */
    intLength(str, n) {
        if (validator.isNull(n)) {
            return false;
        }
        var reg = new RegExp('^\\d{' + n + '}$');
        return validator.regex(reg, str);
    },

    /**
     * 至少n位数字
     * @param str
     * @param n
     * @returns
     */
    intLessLength(str, n) {
        if (validator.isNull(n)) {
            return false;
        }
        var reg = new RegExp('^\\d{' + n + ',}$');
        return validator.regex(reg, str);
    },

    /**
     * n到m位数字
     * @param str
     * @param n
     * @param m
     * @returns
     */
    intLengthRange(str, n, m) {
        if (validator.isNull(n) || validator.isNull(m)) {
            return false;
        }
        var reg = new RegExp('^\\d{' + n + ',' + m + '}$');
        return validator.regex(reg, str);
    },

    /**
     * 只能输入有n位小数的正实数
     * @param str
     * @param n
     * @returns
     */
    decimalLength(str, n) {
        var reg = new RegExp('^[0-9]+(.[0-9]{' + n + '})?$');
        return validator.regex(reg, str);
    },

    /**
     * 只能输入有n~m位小数的正实数
     * @param str
     * @param n
     * @param m
     * @returns
     */
    decimalLengthRange(str, n, m) {
        var reg = new RegExp('^[0-9]+(.[0-9]{' + n + ',' + m + '})?$');
        return validator.regex(reg, str);
    },

    /**
     * 长度为n的字符串
     * @param str
     * @returns
     */
    stringLength(str, n) {
        var reg = new RegExp('^.{' + n + '}$');
        return validator.regex(reg, str);
    },

    /**
     * 由26个英文字母组成的字符串
     * @param str
     * @param aorA,大写或小写类型，A表示大写，a表示小写，不指定或其他置顶表示不限制大小写
     * @returns
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
        return validator.regex(reg, str);
    },

    /**
     * 由数字、26个英文字母或者下划线组成的字符串
     * @param str
     * @returns
     */
    stringLetterDefault(str) {
        var reg = /^\w+$/;
        return validator.regex(reg, str);
    }
}

validator.rules = rules

for (let attr in rules) {
    validator[attr] = function (str) {
        return rules[attr].test(str)
    }
}

module.exports = validator