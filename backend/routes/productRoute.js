let express=require('express')
let router=express.Router()
let uploads=require('../multerConfigue')


let productController=require('../controller/productController')

router.post('/productSave',uploads.single('image'),productController.productSave)

router.get('/getProduct',productController.getProduct)

router.delete('/deleteProduct/:id',productController.deleteProduct)

router.put('/UpdateProduct/:id',productController.UpdateProduct)

router.get('/getProductById/:id', productController.getProductById)

router.get('/searchProduct/:inp', productController.searchProduct)




module.exports=router