const fs = require('fs')

module.exports = (foldPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(foldPath, (err, files) => {
      if(err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}
