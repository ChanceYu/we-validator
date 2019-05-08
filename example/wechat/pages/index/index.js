const WeValidator = require('../../js/we-validator')

Page({
  onReady() {
    this.initValidator()
  },
  onSubmitForm(e) {
    let { value } = e.detail

    console.log(value)
    if (!this.validatorInstance.checkData(value)) return

    // 开始提交表单
    // wx.request
    console.log('submiting')
  },
  initValidator() {
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