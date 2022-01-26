const user = 'test'
const password = 'test123'
const db = 'test'
// const url = `mongodb+srv://${user}:${password}@106.12.200.48/${db}`
const url = `mongodb://${user}:${password}@106.12.200.48:27017/?authSource=${db}&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
const mongoose = require('mongoose')
mongoose.connect(url)
mongoose.connection.once('open', () => {
  console.log('数据库链接成功')
})

module.exports = mongoose
