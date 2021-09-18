const router = require('koa-router')()
router.prefix('/publicKey')
const { read } = require('../utils/fs')
const { decrypt } = require('../utils/crypto')
// 获取公钥
/**
 * @swagger
 * /publicKey:
 *   get:
 *     summary: 获取公钥
 *     description: 获取公钥
 *     tags:
 *       - publicKey
 *     responses:
 *       200:
 *         description: 成功
 */
router.get('/', async(ctx, next) => {
  const readData = await read('../rsa-pub.pem')
  // console.log(readData)
  ctx.success(readData, '成功')
})

// 验证加密
/**
 * @swagger
 * definitions:
 *  verifyparam:
 *    properties:
 *      password:
 *        type: "string"
 *        default: ""
 *        description: 密码
 */
/**
 * @swagger
 * /publicKey/verify:
 *   post:
 *     summary: 验证加密
 *     description: 验证加密
 *     tags:
 *       - publicKey
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
 *          $ref: '#/definitions/verifyparam'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/verify', async ctx => {
  const postData = ctx.request.body
  const password = postData.password
  // const readData = await read('../rsa-pub.pem')
  // const m = encrypt(password, readData)
  const mdData = await read('../rsa-prv.pem')
  ctx.success(decrypt(password, mdData).toString(), '成功')
})

module.exports = router
