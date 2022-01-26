const router = require('koa-router')() // 引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerDefinition = {
  info: {
    title: '个人网站api接口',
    version: '1.0.0',
    description: 'API'
  },
  host: '0.0.0.0:3000',
  //   schemes: ['https', 'http'],
  basePath: '/' // Base path (optional)
}
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js')]
}
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async ctx => {
  ctx.set('Content-Type', 'application/json')
  ctx.body = swaggerSpec
})
module.exports = router
