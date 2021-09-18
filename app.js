const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const swagger = require('./utils/swagger')
const { koaSwagger } = require('koa2-swagger-ui')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const cors = require('koa2-cors') // 跨域处理
app.use(
  cors({
    origin: function(ctx) { // 设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return false
      }
      return '*' // 允许来自所有域名请求
    },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
  })
)

const routerResponse = require('./middleware/routerResponse')// 统一接口返回数据

const index = require('./routes/index')
const person = require('./routes/person')
const users = require('./routes/users')
const publicKey = require('./routes/publicKey')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(resolve('public')))

app.use(views(resolve('views'), {
  extension: 'ejs'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(routerResponse())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(person.routes(), person.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(publicKey.routes(), publicKey.allowedMethods())
app.use(swagger.routes(), swagger.allowedMethods())

app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json' // example path to json 其实就是之后swagger-jsdoc生成的文档地址
  }
}))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
