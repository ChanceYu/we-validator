const WeValidator = require('../../js/we-validator')

WeValidator.onMessage = function(data){
  console.log(data)
}

Page({
  onReady() {
    this.initValidator()
  },
  onSubmitForm(e) {
    let { value } = e.detail

    console.log(value)
    if (!this.oValidator.checkData(value)) return

    // 开始提交表单
    // wx.request
    console.log('submiting')
  },
  initValidator() {
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