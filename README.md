# we-validator
小程序表单验证插件

[![NPM][img-npm]][url-npm]

[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]

小程序表单验证插件，支持微信小程序和支付宝小程序使用。使用简单，不依赖任何框架，但是能和任何框架结合使用，例如mpvue、wepy等


## 安装

```bash
npm install we-validator --save
```


## 使用
下面是微信小程序的用法，支付宝小程序类似
```html
<form bindsubmit="onSubmitForm">
    <input type="text" name="username" placeholder="用户名" />
    <input type="number" name="phoneno" placeholder="手机号" />
    <input type="text" name="str" placeholder="长度为3的字符串" />

    <button type="default" formType="submit">提交</button>
</form>
```

```javascript
const WeValidator = require('we-validator')

Page({
    onReady(){
        this.initValidator()
    }
    onSubmitForm(e){
        let { value } = e.detail

        if(!this.oValidator.checkData(value)) return

        // 开始提交表单
        // wx.request
    },
    initValidator(){
        this.oValidator = new WeValidator({
            rules: {
                username: {
                    required: true
                },
                phoneno: {
                    required: true,
                    mobile: true
                },
                str: {
                    required: true,
                    stringLength: 3
                },
            },
            messages: {
                username: {
                    required: '请输入用户名'
                },
                phoneno: {
                    required: '请输入手机号',
                    mobile: '手机号格式不正确'
                },
                str: {
                    required: '请输入字符串',
                    stringLength: '字符串长度不对'
                },
            },
        })
    },
})
```

## 参数

- `rules` - 验证字段的规则
- `messages` - 验证字段错误的提示信息
- `checkRule` - 是否校验规则的有效性，默认不校验。如果校验的话，在插件初始化和调用 `checkData` 方法时会校验规则的有效性，如果无效会在控制台提示，并忽略此规则

## 支持的正则类型

- `bankCard` - 银行卡
- `mobile` -  手机号
- `mobileWithSpace` -  手机号（带空格`131 2233 4455`）
- `idCard` -  身份证
- `chinese` -  中文
- `chinese2to8` -  中文（2-8位）
- `intOrFloat` -  整数或小数
- `int` -  整数
- `noZeroStart` -  非零开头的数字
- `specialStr` -  含有^%&',;=?$\"等特殊字符
- `email` -  邮箱
- `httpUrl` -  InternetURL地址
- `tel` -  电话号码,正确格式为："XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX"
- `money` -  货币
- `month` -  一年的12月，正确格式为："01"～"09"和"1"～"12"
- `day` -  一个月的31天,正确格式为；"01"～"09"和"1"～"31"
- `html` -  匹配html标签
- `spaceEnter` -  匹配空行
- `qq` -   qq号码
- `zip` -  邮编
- `doubleByte` -  匹配双字节字符(包括汉字在内)


## 规则
除了以上所有正则规则，以下特殊规则也支持，可动态传参

- `required`: true，必填
- `regex`: RegExp，正则通用校验
- `intGreater`: n，大于n的数字
- `intLength`: n，只能输入n位的数字
- `intLessLength`: n，至少n位数字
- `intLengthRange`: [n, m]，n到m位数字
- `decimalLength`: n，只能输入有n位小数的正实数
- `decimalLengthRange`: [n, m]，只能输入有n~m位小数的正实数
- `stringLength`: n，长度为n的字符串
- `stringLetter`: aorA，由26个英文字母组成的字符串，大写或小写类型，A表示大写，a表示小写，不指定或其他置顶表示不限制大小写
- `stringLetterDefault`: true，由数字、26个英文字母或者下划线组成的字符串

##### 动态参数的使用
```javascript
const WeValidator = require('we-validator')

new WeValidator({
    rules: {
        field1: {
            intGreater: 6 // 大于6的数字
        },
        field2: {
            intLengthRange: [2, 5] // 2-5位数字
        }
    },
    messages: {
        field1: {
            intGreater: '请输入大于6的数字'
        },
        field2: {
            intLengthRange: '请输入2-5位数字'
        }
    }
})
```

## 方法
#### addRule 添加自定义规则
```javascript
const WeValidator = require('we-validator')

WeValidator.addRule('theRuleName', function(value, param){
    return /\d/.test(value)
})
```

## 注意
默认错误的提示使用的是小程序中的 `showToast`

## 协议

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/we-validator
[url-npm]: https://www.npmjs.com/package/we-validator
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/we-validator.png?compact=true
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

