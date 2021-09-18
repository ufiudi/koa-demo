const fs = require('fs')
const path = require('path')
function pathResolve(dir) {
  return path.join(__dirname, dir)
}
exports.write = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathResolve(filename), data, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(console.log('写入完成'))
    })
  })
}

exports.read = dir => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathResolve(dir), 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        console.log('读完成')
        resolve(data)
      }
    })
  })
}
