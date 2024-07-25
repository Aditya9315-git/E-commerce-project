const express=require('express')
const cors=require('cors')
const db=require('./databaseConfig.js')
const dotenv=require('dotenv')

dotenv.config({
path:'./.env'
})


let productRouter = require('./routes/productRoute.js')
let adminRoute=require('./routes/adminRoute.js')
let cartRouter=require('./routes/cartRoutes.js')
let clientRouter=require('./routes/clientRoute.js')


let app=express()
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))

db.connect((err)=>{
    if(err) throw err
    else{
        console.log("database connected")
    }
})

let productTableQuery=`CREATE TABLE if not exists product(
ID INT NOT NULL AUTO_INCREMENT,
ProductBrand VARCHAR(255) NULL,
ProductPrice VARCHAR(255) NULL,
ProductRating VARCHAR(255) NULL,
ProductType VARCHAR(255) NULL,
image VARCHAR(255) NULL,

PRIMARY KEY(ID));`

db.query(productTableQuery,(err,result)=>{
    if (err) throw err 
    else{
        console.log('Product table created')
    }
})



let cartTableQuery=`CREATE TABLE if not exists cart(
    ID INT NOT NULL AUTO_INCREMENT,
    ProductBrand VARCHAR(255) NULL,
    ProductPrice VARCHAR(255) NULL,
    ProductRating VARCHAR(255) NULL,
    ProductType VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    
    PRIMARY KEY(ID));`
    
    db.query(cartTableQuery,(err,result)=>{
        if (err) throw err 
        else{
            console.log('cart table created')
        }
    })



let clientDetailsTableQuery=`CREATE TABLE if not exists clientDetail(
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        password VARCHAR(255) NULL,
        image VARCHAR(255) NULL,
        
        PRIMARY KEY(id));`
        
        db.query(clientDetailsTableQuery,(err,result)=>{
            if (err) throw err 
            else{
                console.log('clientDetail table created')
            }
        })


app.post('/submit',(req,res)=>{
    let{ProductBrand, ProductPrice, ProductRating, ProductType}=req.body
})



app.use('/api',productRouter)  
app.use('/api',adminRoute)  
app.use('/api',cartRouter)  
app.use('/api',clientRouter)



app.listen(process.env.Port,()=>{
    console.log(`Server is running  ${process.env.Port}`)
})