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
    var images = path.resolve(sails.config.appPath + '/assets/images')
    req.file('form-first-image').upload({
      dirname: images
    }, function (err, files) {
      if (err) console.log(err)

      var oldPath = files[0].fd
      var index = oldPath.lastIndexOf('/') + 1
      var path = oldPath.substr(index)
      var newPath = '/assets/images/' + path

      console.log(files)

      // var newFile = path.resolve(sails.config.appPath)
      // console.log(path.resolve(sails.config.appPath))

      sharp(files[0].fd)
        .resize(800, 600)
        .toFile(images + '/a.jpg', function (err) {
          if (err) console.log(err)
        })

      res.json({ file: files })
    })
  }
}
