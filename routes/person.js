const router = require('koa-router')()
const PersonModel = require('../module/person')

router.prefix('/person')
// 添加用户
/**
 * @swagger
 * definitions:
 *  addparam:
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
 * /person/add:
 *   post:
 *     summary: 添加用户
 *     description: 添加用户
 *     tags:
 *       - person
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
 *          $ref: '#/definitions/addparam'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/add', async(ctx, next) => {
  const postData = ctx.request.body
  const { name } = postData
  const result = await PersonModel.findOne({ name })
  if (result) {
    ctx.fail('用户已经存在', -1)
    return
  }
  const saveData = await PersonModel.create(postData)
  ctx.success(saveData._id, '保存成功')
})

// 获取用户列表
/**
 * @swagger
 * /person/list:
 *   get:
 *     summary: 获取用户列表
 *     description: 获取用户列表
 *     tags:
 *       - person
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
  const getData = ctx.query
  const result = await PersonModel.find({ ...getData })
  ctx.success(result, '成功')
})

// 删除用户
/**
 * @swagger
 * /person/remove:
 *   get:
 *     summary: 删除用户
 *     description: 删除用户
 *     tags:
 *       - person
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: 姓名
 *         type: string
 *     responses:
 *       200:
 *         description: 成功
 */
router.get('/remove', async(ctx, next) => {
  const postData = ctx.query
  await PersonModel.remove({ ...postData })
  ctx.success('', '删除成功')
})

/**
 * @swagger
 * definitions:
 *  updateparam:
 *    properties:
 *      _id:
 *        type: "string"
 *        default: ""
 *        description: id
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
 * /person/update:
 *   post:
 *     summary: 更新用户
 *     description: 更新用户
 *     tags:
 *       - person
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
 *          $ref: '#/definitions/updateparam'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/update', async(ctx, next) => {
  const postData = ctx.request.body
  const { _id } = postData

  if (!_id) {
    ctx.fail('无效的id', '-1')
    return
  }
  await PersonModel.updateOne({ _id }, postData)
  ctx.success('', '更新成功')
})
module.exports = router
