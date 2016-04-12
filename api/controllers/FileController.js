/* globals sails */

/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path')

module.exports = {
  upload (req, res) {
    req.file('form-first-image').upload({
      dirname: path.resolve(sails.config.appPath + '/assets/images')
    }, function (err, files) {
      if (err) {
        console.log(err)
      }

      res.json({ file: files })
    })
  }
}
