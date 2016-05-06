/* globals sails */

/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path')
var sharp = require('sharp')
var resizeAll = ImageService.resizeAll.bind(ImageService)

module.exports = {
  upload (req, res) {
    var errorHandler = res.serverError.bind(res)
    var respond = res.jsonx.bind(res)

    ImageService
      .upload(req.file('form-first-image'))
      .then(resizeAll, errorHandler)
      .then(respond, errorHandler)
  }
}
