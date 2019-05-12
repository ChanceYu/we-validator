const Router = require('koa-router')
const WeValidator = require('we-validator')

let router = new Router()

let validatorInstance = new WeValidator({
  multiCheck: true,
  rules: {
      username: {
          required: true
      },
      pwd: {
          required: true
      },
      repeatPwd: {
          required: true,
          equalTo: 'pwd'
      },
      phoneno: {
          required: true,
          mobile: true
      },
      str: {
          rangeChinese: [1,4]
      }
  },
  messages: {
      username: {
          required: '请输入用户名'
      },
      pwd: {
          required: '请输入密码'
      },
      repeatPwd: {
          required: '请输入确认密码',
          equalTo: '两次密码不一致'
      },
      phoneno: {
          required: '请输入手机号',
          mobile: '手机号格式不正确'
      }
  }
});

// 首页
router.get('/', async (ctx) => {
    await ctx.render('index')
})

// 提交表单
router.post('/form', async (ctx) => {
  let formData = ctx.request.body

  if(!validatorInstance.checkData(formData, onMessage)) return

  ctx.body = {
    status: 'success',
    msg: '校验通过'
  }

  function onMessage(params){
    ctx.body = {
      status: 'failure',
      errors: params
    }
  }
})

module.exports = router;