const mongoose = require('../db')
// 2.创建Schema（模型对象）
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})
const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
