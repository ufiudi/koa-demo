const router = require('koa-router')()
const UserModel = require('../module/users')
router.prefix('/users')
const { read } = require('../utils/fs')
const { decrypt } = require('../utils/crypto')

// 用户测试接口
/**
 * @swagger
 * /users/test:
 *   get:
 *     summary: 用户测试接口
 *     description: 用户测试接口
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: 成功
 */
router.get('/test', async ctx => {
  ctx.success('users works...', '成功')
})

// 注册用户
/**
 * @swagger
 * definitions:
 *  registerparam:
 *    properties:
 *      name:
 *        type: "string"
 *        default: ""
 *        description: name
 *      email:
 *        type: "number"
 *        default: ""
 *        description: 邮箱
 *      password:
 *        type: "string"
 *        default: ""
 *        description: 密码
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 注册用户
 *     description: 注册用户
 *     tags:
 *       - users
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
 *          $ref: '#/definitions/registerparam'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/register', async ctx => {
  const postData = ctx.request.body
  // 通过邮箱判读是否注册过
  const findResult = await UserModel.find({ email: postData.email })
  if (findResult.length) {
    ctx.fail('邮箱已被占用', '-1')
  } else {
    // 没查到
    // 解密
    const addmdData = await read('../rsa-prv.pem')
    console.log(postData.password)
    console.log('--------------------------')
    const decmPass = decrypt(postData.password, addmdData).toString()
    console.log(decmPass)
    const newUser = new UserModel({
      name: postData.name,
      email: postData.email,
      password: decmPass
    })

    const user = await newUser.save()
    ctx.success(user, '成功')
  }
})

module.exports = router
