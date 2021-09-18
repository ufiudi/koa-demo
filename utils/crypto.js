const crypto = require('crypto')
const { write } = require('./fs')
const { Buffer } = require('buffer')
const getkeys = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  })
}

exports.getkeys = getkeys

// 生成公钥 私钥
exports.generateKeysfile = () => {
  const keysObj = getkeys()
  write('../rsa-pub.pem', keysObj.publicKey)
  write('../rsa-prv.pem', keysObj.privateKey)
}

// 加密方法
exports.encrypt = (data, key) => {
  key = key.toString('ascii')
  return crypto.publicEncrypt({
    key,
    padding: crypto.RSA_PKCS1_PADDING
  }, Buffer.from(data))
}

// 解密方法
exports.decrypt = (encrypted, key) => {
  key = key.toString('ascii')
  return crypto.privateDecrypt({
    key: encrypted,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(encrypted))
}
