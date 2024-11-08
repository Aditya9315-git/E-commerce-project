let express = require('express')
let router =express.Router()
let clientController=require('../controller/clientController.js')
let uploads  = require('../multerConfigue.js')

router.post('/clientSave',uploads.single('image'), clientController.clientSave)

router.post('/clientLogin', clientController.clientLogin)

router.post('/createClient/:unique',clientController.createClient)

router.get('/getClient/:unique',clientController.getClient)

router.get('/verify',clientController.verify)


module.exports = router