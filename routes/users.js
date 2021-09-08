const router = require('koa-router')()
const personModel = require('../module/person')

router.prefix('/users')
// 添加用户
/**
 * @swagger
 * definitions:
 *  loginparam:
 *    properties:
 *      name:
 *        type: "string"
 *        default: ""
 *        description: 姓名
 *      age:
 *        type: "number"
 *        default: ""
 *        description: 年龄
 *      chat:
 *        type: "string"
 *        default: ""
 *        description: chat
 *      height:
 *        type: "string"
 *        default: ""
 *        description: height
 */

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: 添加用户
 *     description: 添加用户
 *     tags:
 *       - user
 *     consumes:
 *      - application/json
 *      - application/xml
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/loginparam'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/add', async(ctx, next) => {
  const postData = ctx.request.body
  const { name } = postData
  const result = await personModel.findOne({ name })
  if (result) {
    ctx.body = {
      code: -1,
      message: '已经存在'
    }
    return
  }
  await personModel.create(postData)
  ctx.body = {
    code: 0,
    message: '保存成功'
  }
})

// 获取用户列表
/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: 获取用户列表
 *     description: 获取用户列表
 *     tags:
 *       - user
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         description: 姓名
 *         type: string
 *       - name: age
 *         in: query
 *         required: false
 *         description: 年龄
 *         type: number
 *     responses:
 *       200:
 *         description: 成功
 */
router.get('/list', async(ctx, next) => {
  const getData = ctx.request.body
  const result = await personModel.find({ ...getData })
  ctx.body = result
})

// 删除用户
/**
 * @swagger
 * /users/remove:
 *   get:
 *     summary: 删除用户
 *     description: 删除用户
 *     tags:
 *       - user
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: 姓名
 *         type: string
 *       - name: age
 *         in: query
 *         required: false
 *         description: 年龄
 *         type: number
 *     responses:
 *       200:
 *         description: 成功
 */
router.get('/remove', async(ctx, next) => {
  const postData = ctx.request.body
  const { name } = postData
  await personModel.remove({ name })
  ctx.body = {
    code: 0,
    message: '删除成功'
  }
})
module.exports = router
