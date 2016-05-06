const path = require('path')
const sharp = require('sharp')

module.exports = {
  upload (sailsFiles) {
    var dirname = path.resolve(sails.config.appPath + '/assets/images/')
    return new Promise((resolve, reject) => {
      sailsFiles.upload({
        dirname,
        maxBytes: 256 * 1024 * 1024
      }, (err, files) => {
        if (err) {
          return reject(err)
        }
        resolve(files)
      })
    })
  },
  resizeAll (files) {
    var promises = []
    files.forEach((file) => {
      var newFile = file.fd.replace(/\/[^\/]*$/, '') + '/' + file.filename
      promises.push(this.resize(file.fd, newFile))
    })
    return Promise.all(promises)
  },
  resize (originalFile, newFile) {
    return new Promise((resolve, reject) => {
      var image = sharp(originalFile)
      image
        .metadata()
        .then((metadata) => {
          var args = (metadata.width >= metadata.height ? [800, null] : [null, 800])
          image
            .resize.apply(image, args)
            .toFile(newFile, (err) => {
              if (err) {
                return reject(err)
              }
              resolve(newFile)
            })
        })
    })
  }
}