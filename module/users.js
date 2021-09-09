const mongoose = require('../db')
// 2.创建Schema（模型对象）
const Schema = mongoose.Schema

const personSchema = new Schema({
  name: String,
  age: Number,
  sex: {
    type: String,
    default: '男'
  },
  chat: String
})
personSchema.add({
  height: Number
})
const personModel = mongoose.model('person', personSchema)

module.exports = personModel
