let db=require('../databaseConfig')

exports.cartSave =  (req, res)=>{
    let ProductBrand = req.body.ProductBrand
    let ProductPrice = req.body.ProductPrice
    let ProductRating = req.body.ProductRating
    let ProductType = req.body.ProductType
    let unique = req.params.unique
      let value = [[ProductBrand,ProductPrice,ProductRating,ProductType]]
      db.query(`insert into ${unique}(productBrand,productPrice,productRating,productType) values ?`, [value], (err, result)=>{
          if(err) throw err
          else{
             res.send(true)
          }
      })
  }

  exports.getCart=(req,res)=>{
    let unique = req.params.unique
    let sql=`select * from ${unique}`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
} 


exports.deleteCart=(req,res)=>{
    let id=req.params.id
    let unique = req.params.unique
    let sql=`delete from ${unique} where id = ?`
    db.query(sql,[id],(err,result)=>{
        if (err) throw err
        else{
            res.send("Data deleted")
        }
    })
}