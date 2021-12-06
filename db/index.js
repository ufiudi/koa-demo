const user = 'gaochengyao'
const password = '12345678a'
const db = 'test'
const url = `mongodb+srv://${user}:${password}@gcylearn.jyjni.mongodb.net/${db}`
const mongoose = require('mongoose')
mongoose.connect(url)
mongoose.connection.once('open', () => {
  console.log('数据库链接成功')
})

module.exports = mongoose
