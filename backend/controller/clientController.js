let db = require('../databaseConfig.js')

let bcrypt=require('bcryptjs')
let jwt=require('jsonwebtoken')


function generatetoken(user){
    return jwt.sign({id: user.id},process.env.jwt_secret,{expiresIn:'1h'})
}


exports.clientSave = async (req, res)=>{
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let image = req.file.filename
  let hash= await bcrypt.hash(password, 10)

    let value = [[username,email,hash, image]]
    db.query('insert into clientDetail(username,email,password,image) values ?', [value], (err, result)=>{
        if(err) throw err
        else{
           res.send("data saved")
        }
    })
}


exports.clientLogin = (req, res)=>{
    let email = req.body.email
    let password = req.body.password

    let sql  = "select * from clientdetail where email = ?"
    db.query(sql, [email],(err, result)=>{
        if(err)  throw err;else{
            bcrypt.compare(password,result[0].password,async (err, isMatch)=>{
                if (err) throw err
                else{
                    if 
                    (isMatch==true){
                        let token=await generatetoken(result[0])
                        console.log(token)
                        res.json({token,isMatch})
                    }
                    else{
                        res.send(false)
                    }
                }
            })
        }
        
    })

}

exports.createClient=(req,res)=>{
    let unique=req.params.unique

    let clientTableQuery=`CREATE TABLE if not exists ${unique}(
        ID INT NOT NULL AUTO_INCREMENT,
        ProductBrand VARCHAR(255) NULL,
        ProductPrice VARCHAR(255) NULL,
        ProductRating VARCHAR(255) NULL,
        ProductType VARCHAR(255) NULL,
        image VARCHAR(255) NULL,
        
        PRIMARY KEY(ID));`
        
        db.query(clientTableQuery,(err,result)=>{
            if (err) throw err 
            else{
                console.log('client table created')
            }
        })
}

exports.getClient=(req,res)=>{
    let unique=req.params.unique
    let sql='select * from clientdetail where email = ?'
    db.query(sql,[unique + '@gmail.com'],(err,result)=>{
        if (err) throw err
        else{
            res.json(result)
        }
    })
}