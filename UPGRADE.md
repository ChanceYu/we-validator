## 1.x 升级到 2.x 指南

2.x 和 1.x 版本有所差别，如果您要升级到 2.x 版本，请根据以下内容做修改。

### 添加自定义规则
> WeValidator.addRule

1.x 版本
```javascript
WeValidator.addRule('theRuleName', function(value, param){
    return /\d/.test(value)
})
```
2.x 版本
```javascript
WeValidator.addRule('theRuleName', {
  message: '默认错误提示文字',
  rule(value, param){
    return /\d/.test(value)
  }
})

// 或者
WeValidator.addRule('theRuleName', {
  message: '默认错误提示文字',
  rule: /\d/
})
```

### 单独校验某个内容
> WeValidator.checkValue

1.x 版本
```javascript
let b1 = WeValidator.mobile('str')
let b2 = WeValidator.chinese('str')
```
2.x 版本
```javascript
let b1 = WeValidator.checkValue('mobile', 'str')
let b2 = WeValidator.checkValue('chinese', 'str')
```

### 默认校验规则的变化
2.x 的校验规则大部分重写，删除了不常用的规则，并添加了新的规则

##### 删除的规则（可使用 2.x 相关规则替代）
```diff
- bankCard: true
+ range: [16, 19]

- mobileWithSpace
+ pattern: /^1\d{2}\s?\d{4}\s?\d{4}$/

- noZeroStart
+ pattern: /^([1-9][0-9]*)$/

- specialStr
+ pattern: /[^%&',;=?$\x22]+/

- money
+ pattern: /^\d+\.\d{2}$/

- month
+ pattern: /^(0?[1-9]|1[0-2])$/

- day
+ pattern: /^((0?[1-9])|((1|2)[0-9])|30|31)$/

- html
+ pattern: /<(.*)>(.*)<\/(.*)>|<(.*)\/>/

- spaceEnter
+ pattern: /\n[\s| ]*\r/

- qq
+ pattern: /^[1-9][0-9]{4,}$/

- zip
+ pattern: /^[\d]{6}/

- doubleByte
+ pattern: /[^\x00-\xff]/

- intLength: 2
+ pattern: /^\d{2}$/

- decimalLength: 2
+ pattern: /^[0-9]+(.[0-9]{2}$/

- decimalLengthRange: [2, 4]
+ pattern: /^[0-9]+(.[0-9]{2,4}$/

- stringLetter: 'a'
+ pattern: /^[a-z]+$/

- stringLetterDefault
+ pattern: /^\w+$/
```

##### 规则名称变化
```diff
- idCard
+ idcard

- chinese2to8: true
+ rangeChinese: [2, 8]

- intOrFloat
+ number

- int
+ digits

- httpUrl
+ url

- equal: WeValidator.$value('field')
+ equalTo: 'field'

- intLessLength: 2
+ min: 2

- intGreater: 2
+ max: 2

- intLengthRange: [2, 6]
+ range: [2, 6]

- stringLength: 6
+ length: 6
```

##### 2.x 新增规则[参考](./README.md#默认支持的规则)