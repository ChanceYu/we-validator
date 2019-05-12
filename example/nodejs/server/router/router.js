const Router = require('koa-router')

const home = require('./home')

// 装载所有子路由
let router = new Router()

router.use('', home.routes(), home.allowedMethods())

module.exports = router;