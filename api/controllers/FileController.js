/* globals sails */

/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path')
var sharp = require('sharp')

module.exports = {
  upload (req, res) {
    var images = path.resolve(sails.config.appPath + '/assets/images/')
    req.file('form-first-image').upload({
      dirname: images
    }, function (err, files) {
      if (err) console.log(err)

      var oldPath = files[0].fd
      var index = oldPath.lastIndexOf('/') + 1
      var path = '/-' + oldPath.substr(index)
      // var newPath = '/assets/images/' + path

      var fimage = sharp(files[0].fd)
      fimage
        .metadata()
        .then(function (metadata) {
          var width = metadata.width
          var height = metadata.height
          if (width > height) {
            return fimage
              .resize(800, null)
              .toFile(images + path, function (err) {
                if (err) console.log(err)
              })
          } else if (width < height) {
            return fimage
              .resize(null, 800)
              .toFile(images + '/' + path, function (err) {
                if (err) console.log(err)
              })
          } else if (width === height) {
            return fimage
              .resize(800, null)
              .toFile(images + '/' + path, function (err) {
                if (err) console.log(err)
              })
          }
        })

      var thumb = sharp(files[0].fd)
      thumb
        .metadata()
        .then(function (metadata) {
          return fimage
            .resize(200, 200)
            .toFile(images + '/thumb_' + path, function (err) {
              if (err) console.log(err)
            })
        })

      res.json({ file: files })
    })
  }
}
