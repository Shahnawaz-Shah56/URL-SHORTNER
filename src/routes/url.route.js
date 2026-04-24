const express = require('express');
const urlController = require('../controllers/url.controller')
const authcreditedby = require('../middlewares/auth.middleware')

const route = express.Router();


route.post('/shortUrl',authcreditedby,urlController.shortUrl);
route.get('/:shortId',urlController.redirectURL)
route.delete('/:shortId', urlController.deleteUrl)


module.exports = route;