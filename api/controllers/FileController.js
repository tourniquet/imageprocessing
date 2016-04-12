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
    req.file('form-first-image').upload({
      dirname: path.resolve(sails.config.appPath + '/assets/images')
    }, function (err, files) {
      if (err) {
        console.log(err)
      }

      console.log(files[0].fd)

      res.json({ file: files })
    })
  }
}
