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
const index = require('./routes/index')
const users = require('./routes/users')
const mongoose = require('mongoose')
const db = require('./db')
mongoose.connect(db.url)
mongoose.connection.once('open', () => {
  console.log('数据库链接成功')
})
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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

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
