<div align="center">
  <img width="400" src="assets/v2.png" alt="we-validator" />
  <br>

  <p><a href="https://www.npmjs.com/package/we-validator"><img src="https://nodei.co/npm/we-validator.png?compact=true" /></a></p>

  <a href="https://travis-ci.org/ChanceYu/we-validator"><img src="https://travis-ci.org/ChanceYu/we-validator.svg?branch=master" /></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/language-JavaScript-brightgreen.svg" /></a>
  <a href="https://opensource.org/licenses/mit-license.php"><img src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>

</div>

> v2 和 v1 版本差别较大，如果要使用老版本，可以查看 [v1 版本](https://github.com/ChanceYu/we-validator/tree/v1)。

简单灵活的表单验证插件，支持小程序、浏览器、Nodejs。小程序端支持：微信、支付宝、百度智能、今日头条，小程序默认提示使用 `showToast`。

## 特点

- 使用简单灵活
- 不依赖任何框架
- 既支持原生小程序方式，也支持 mpvue、wepy等小程序框架使用
- 支持web浏览器以及Nodejs端使用
- [支持自定义规则](#wevalidatoraddrulerulename-ruleoption)
- [支持动态添加或移除字段校验](#addrulesoptions)
- 支持[实例化](#new-wevalidatoroptions--object)和[单独校验某个字段](#wevalidatorcheckfieldrulename-value-param)两种使用方式
- [支持自定义错误消息提示](#自定义错误消息提示)
- [支持多个字段同时校验并显示错误](#多个字段同时校验并显示错误)
- [默认支持各种规则类型](#默认支持的规则)



## 安装
使用 npm:

```bash
npm install we-validator --save
```

使用 cdn:

```html
<script src="https://unpkg.com/we-validator/lib/we-validator.js"></script>
```

也可以直接引入 lib 目录下的 `we-validator.js` 到项目


## 使用
下面是微信小程序的用法，支付宝小程序类似

<details>
<summary>点击查看栗子 :chestnut: </summary>

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
    },
    onSubmitForm(e){
        let { value } = e.detail

        if(!this.validatorInstance.checkData(value)) return

        // 开始提交表单
        // wx.request
    },
    initValidator(){
        // 实例化
        this.validatorInstance = new WeValidator({
            rules: {
                username: {
                    required: true
                },
                phoneno: {
                    required: true,
                    mobile: true
                },
                str: {
                    length: 3
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
                    length: '请输入长度为3的字符串'
                },
            },
        })
    },
})
```

</details>

您也可参考当前项目下对应示例
- [原生微信小程序使用方式](./example/wechat/pages/index/index.js)
- [mpvue 使用方式](./example/mpvue/src/pages/index/index.vue)
- [web 浏览器使用方式](./example/web/index.html)


## API
 - [new WeValidator(options)](#new-wevalidatoroptions--object)
    - [.checkData(data, onMessage)](#checkdatadata-onmessage--boolean) 校验数据，会显示错误提示信息
    - [.isValid(data)](#isvaliddata--boolean) 校验数据是否有效，仅校验无提示
    - [.addRules(options)](#addrulesoptions) 动态添加字段校验
    - [.removeRules(fields)](#removerulesfields) 动态移除字段校验


## Static API
 - [WeValidator](#static-api)
    - [.addRule(ruleName, ruleOption)](#wevalidatoraddrulerulename-ruleoption) 添加自定义规则
    - [.checkField(ruleName, value, param)](#wevalidatorcheckfieldrulename-value-param) 校验单个字段
    - [.onMessage](#自定义错误消息提示) 设置全局错误提示


## 默认支持的规则

具体规则内容可查看[源码](./src/rules.js)

| 规则 | 描述 | 默认提示 |
| --- | --- | --- |
| `required: true` | 必填 | 此字段必填 |
| `regex: /^\d+$/` | 正则通用 | 不符合此验证规则 |
| `email: true` | 电子邮件格式 | 请输入有效的电子邮件地址 |
| `mobile: true` | 11位手机号 | 请输入11位的手机号码 |
| `tel: true` | 座机号<br>例如：010-1234567、0551-1234567 | 请输入座机号 |
| `url: true` | URL网址 | 请输入有效的网址 |
| `idcard: true` | 身份证号 | 请输入18位的有效身份证 |
| `equalTo: 'field'` | 值相同校验<br>例如：密码和确认密码 `equalTo: 'pwd1'` | 输入值必须和 `field` 相同 |
| `contains: 'str'` | 是否包含某字符 | 输入值必须包含 `str` |
| `length: 5` | 长度为多少的字符串 | 请输入 `5` 个字符 |
| `minlength: 2` | 最少多长的字符串 | 最少要输入 `2` 个字符 |
| `maxlength: 6` | 最多多长的字符串 | 最多可以输入 `6` 个字符 |
| `rangelength: [2, 6]` | 某个范围长度的字符串 | 请输入长度在 `2` 到 `6` 之间的字符 |
| `number: true` | 数字 | 请输入有效的数字 |
| `digits: true` | 整数数字 | 只能输入整数数字 |
| `min: 3` | 大于多少的数字<br>（最小只能多少） | 请输入大于 `3` 的数字 |
| `max: 9` | 小于多少的数字<br>（最大只能多少） | 请输入小于 `9` 的数字 |
| `range: [3, 9]` | 大于且小于多少的数字 | 请输入大于 `3` 且小于 `9` 的数字 |
| `chinese: true` | 中文字符 | 只能输入中文字符 |
| `minChinese: 3` | 最少多少个中文字符 | 最少输入 `3` 个中文字符 |
| `maxChinese: 9` | 最多多少个中文字符 | 最多输入 `9` 个中文字符 |
| `rangeChinese: [3, 9]` | 大于且小于多少个中文字符 | 只能输入 `3` 到 `9` 个中文字符 |
| `date: true` | 日期（默认使用 `new Date(value)` 校验） | 请输入有效的日期 |
| `dateISO: true` | 日期（ISO标准格式）<br>例如：2019-09-19，2019/09/19 | 请输入有效的日期（ISO标准格式） |


### new WeValidator(options) ⇒ <code>object</code>
实例化

**返回**: <code>object</code> -  <code>validatorInstance</code>

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| [options.rules] | <code>object</code> |  | 验证字段的规则 |
| [options.messages] | <code>object</code> |  | 验证字段错误的提示信息 |
| [options.onMessage] | <code>function</code> |  | 错误提示显示方式<br>默认会自动检测环境。小程序默认使用`showToast`<br>普通web浏览器默认使用`alert`<br>Nodejs端不做处理建议自己配置，[详情](#自定义错误消息提示) |
| [options.multiCheck] | <code>boolean</code> | `false` | 是否校验多个字段<br>需要一次校验多个字段并显示错误信息时使用，[详情](#多个字段同时校验并显示错误) |

<details>
<summary>点击查看栗子 :chestnut: </summary>

```javascript
const WeValidator = require('we-validator')

new WeValidator({
    rules: {
        username: {
            required: true
        },
        phoneno: {
            required: true,
            mobile: true
        }
    },
    messages: {
        username: {
            required: '请输入用户名'
        },
        phoneno: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
        }
    }
})
```

</details>

### .checkData(data, onMessage) ⇒ <code>boolean</code>
校验数据

**返回**: <code>boolean</code>

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| data | <code>object</code> |  | 需要校验的表单数据 |
| onMessage | <code>function</code> |  | 自定义错误消息提示，[详情](#自定义错误消息提示) |

### .isValid(data) ⇒ <code>boolean</code>
校验数据是否有效，无提示

**返回**: <code>boolean</code>

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| data | <code>object</code> |  | 需要校验的表单数据 |

### .addRules(options)
动态添加字段校验

`options` 参数和实例化 `new WeValidator(options)` 一样，[详情](#new-wevalidatoroptions--object)


<details>
<summary>点击查看栗子 :chestnut: </summary>

```javascript
const WeValidator = require('we-validator')

const validatorInstance = new WeValidator({
    rules: {
        username: {
            required: true
        }
    },
    messages: {
        username: {
            required: '请输入用户名'
        }
    }
})

// 动态添加校验
validatorInstance.addRules({
    rules: {
        phoneno: {
            required: true,
            mobile: true
        }
    },
    messages: {
        phoneno: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
        }
    }
})
```

</details>

### .removeRules(fields)
动态移除字段校验

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| rules | <code>Array</code> |  | 需要移除校验的表单字段 |

```javascript
validatorInstance.removeRules(['username'])
```

### WeValidator.addRule(ruleName, ruleOption)
静态方法：添加自定义规则

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| ruleName | <code>string</code> |  | 规则名称 |
| ruleOption | <code>object</code> |  | 规则配置 |
| [ruleOption.message] | <code>string</code> |  | 默认错误提示文字<br>可以动态插入参数，例如 `请输入长度在 {0} 到 {1} 之间的字符`，[参考](#https://github.com/ChanceYu/we-validator/blob/master/src/rules.js#L108) |
| [ruleOption.rule] | <code>function\|regexp</code> |  | 规则校验函数，需要返回一个 `boolean`。<br>也可以直接写一个正则表达式（如果只是正则类型的校验）。 |

<details>
<summary>点击查看栗子 :chestnut: </summary>

```javascript
const WeValidator = require('we-validator')

// 添加自定义规则（这两种写法一样）
WeValidator.addRule('theRuleName', {
  message: '默认错误提示文字',
  rule(value, param){
    return !this.required(value) || /\d/.test(value)
  }
})
WeValidator.addRule('theRuleName', {
  message: '默认错误提示文字',
  rule: /\d/
})

// 使用方式一，实例化
new WeValidator({
    rules: {
        field1: {
            theRuleName: true
        }
    },
    messages: {
        field1: {
            theRuleName: '提示信息'
        }
    }
})

// 使用方式二，调用函数
WeValidator.checkField('theRuleName', 'str')
```

</details>

#### 注意
使用函数添加自定义规则时，`!this.required(value)` 判断不能少，参考上面。


### WeValidator.checkField(ruleName, value, param)
静态方法：单独校验某个字段

支持默认提供的所有正则规则类型，[默认支持的规则](#默认支持的规则)

```javascript
let b1 = WeValidator.checkField('min', 'str', 6) // 不能小于6的数字
let b2 = WeValidator.checkField('range', 'str', [2, 5]) // 大于2小于5的数字
```

#### 自定义错误消息提示

可以全局配置一个，也可以单独配置。

优先级是：`.checkData(data, onMessage)` > `new WeValidator({ onMessage })` > `WeValidator.onMessage` > 默认检测

<details>
<summary>点击查看栗子 :chestnut: </summary>

```javascript
const WeValidator = require('we-validator')

// 1、全局配置
WeValidator.onMessage = function(data){
    /*
    data 参数
    {
        msg, // 提示文字
        name, // 表单控件的 name
        value, // 表单控件的值
        param // rules 验证字段传递的参数
    }
    */
}

// 2、实例化配置
new WeValidator({
    rules: {},
    message: {},
    onMessage: function(data){
        alert(data.msg)
    }
})

// 3、验证的时候配置 onMessage（nodejs端校验可以使用此方式）
function onMessage(data){
  alert(data.msg)
}
if(!obj.checkData(formData, onMessage)){
     return
}
```

</details>

#### 多个字段同时校验并显示错误
显示如下，**注意：当`multiCheck`为`true`时，建议使用自定义`onMessage`**

![we-validator](./assets/demo_multi.png)

<details>
<summary>点击查看栗子 :chestnut: </summary>

```javascript
var validatorInstance = new WeValidator({
  multiCheck: true,
  onMessage: function(data){
    console.log(data);
    
    // 根据自己的项目去处理
  },
  rules: {
      username: {
          required: true
      },
      phoneno: {
          required: true,
          mobile: true
      }
  },
  messages: {
      username: {
          required: '请输入用户名'
      },
      phoneno: {
          required: '请输入手机号',
          mobile: '手机号格式不正确'
      }
  }
});
```

</details>

## 协议

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/we-validator
[url-npm]: https://www.npmjs.com/package/we-validator
[url-travis]: https://travis-ci.org/ChanceYu/we-validator
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/we-validator.png?compact=true
[img-travis]: https://travis-ci.org/ChanceYu/we-validator.svg?branch=master
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

