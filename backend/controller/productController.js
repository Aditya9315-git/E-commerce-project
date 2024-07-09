let db=require('../databaseConfig')

exports.productSave =  (req, res)=>{
    let productBrand = req.body.productBrand
    let productPrice = req.body.productPrice
    let productRating = req.body.productRating
    let productType = req.body.productType
    let image = req.file.filename


      let value = [[productBrand,productPrice,productRating,productType,image]]
      db.query('insert into product(productBrand,productPrice,productRating,productType,image) values ?', [value], (err, result)=>{
          if(err) throw err
          else{
             res.send("data saved")
          }
      })
  }

exports.getProduct=(req,res)=>{
    let sql="select * from product"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
} 

exports.deleteProduct=(req,res)=>{
    let id=req.params.id
    let sql='delete from product where id= ?'
    db.query(sql,[id],(err,result)=>{
        if (err) throw err
        else{
            res.send("Data deleted")
        }
    })
}

exports.UpdateProduct=(req,res)=>{
    let id=req.params.id
    let newdata=req.body
    let sql='update product set ? where id= ?'

    db.query(sql,[newdata,id],(err,result)=>{
        if(err) throw err
        else{
            res.send('data updated')
        }
    })
}

exports.getProductById = (req, res)=>{
    let id = req.params.id
    let sql = "select * from product where id  = ?"
    db.query(sql,[id], (err, result)=>{
      if(err) throw err
      else{
        res.json(result)
      }
    })
  }

exports.searchProduct=(req,res)=>{
    let inp=req.params.inp
    let sql='select * from product where ProductType like ?'
    db.query(sql,['%' +inp +'%'],(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
  }
