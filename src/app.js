const express = require("express")
const app = express()
const path = require("path")
const storePath = path.join(__dirname,"./store.json")
const bodyParser = require("body-parser")
const fs = require ("fs")
const { body } = require("express-validator")
const { time } = require("console")
const port = 3000

//const letters = /^[A-Za-z]+$/;




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const readFile = () => {
    let product = JSON.parse(fs.readFileSync(storePath))
    return product
}

const writeFile = (data) => {
    fs.writeFileSync(storePath, JSON.stringify(data),"utf-8")
}

function allLetter(inputtxt)
  {
   var letters = /^[A-Za-z]+$/;
   if(inputtxt.match(/^[A-Za-z]+$/))
     {
      return true;
     }
   else
     {
     console.log("message");
     return false;
     }
  }
  

app.post("/product",(req, res)=>{
    const data = readFile()
    console.log(req);
    console.log(req.body.data.name);
    if (Object.keys(req.body.data).length >= 7)
    {
        console.log("Parameter should not exceed 7");
        process.exit();
    }


    var res1 = allLetter(req.body.data.name);
    
    if (!res1)
    {
        console.log(req.body.data.name)
         res.json({
             Error : "Kindly Enter the Vaild ProductName",
             data : data.name
         })
    }
      
    req.body.data.createdAt = new Date().toLocaleDateString()
    req.body.data.updatedAt = new Date().toLocaleDateString()

    data.product.push({id:Math.floor(Math.random()*10 ),...req.body.data
    })
   
    writeFile(data)
    console.log(bodyParser)
    res.json("Product has been Created..")
})

//findall Products
app.get("/products", (req, res)=>{
    const data = readFile()
    res.json({
        message: "your Products",
        data: data.product 
    })
})



//update APi
app.put("/update/:id" ,(req, res) =>{
    const {product} = readFile()
   
    console.log({product})
    const updatedData = product.map((data)=>{
        if(req.params.id == data.id){

  //  req.body.data.createdAt = new Date().toLocaleDateString()
    req.body.data.updatedAt = new Date().toLocaleDateString()
            return {id: data.id,...req.body.data}
            
        }
        return data
    })
    console.log(updatedData);
    var res1 = allLetter(req.body.data.productCode);
    if (!res1)
    {
        console.log(req.body.data.productCode)
         res.json({
             Error : "Kindly Enter the Vaild Product Code",
             data : data.productCode
         })
    }
    console.log(req.body.product);
    writeFile({product:updatedData})
    res.json({
        message : "The product Has been Updated Successfully",
        data :{
            ...req.body.data
        }
    })
})

app.delete("/delete/:id",(req, res) =>{
    const {product} = readFile()
    const deletedData = product.filter(data =>{
        return req.params.id != data.id
    })
    writeFile({product:deletedData})
    res.json({
        message:"Your product has been Deleted..."
    })
})









app.delete("/product/:id", (req, res)=>{
   // fs.readFile(storePath, "utf8",(err,data) =>{
        const {product} = readFile()
        const deletedData = product.filter(product => {
            return req.params.id != product.id

            
            
             })
        //console.log(deletedData)
        console.log(product)
        writeFile({product: deletedData})
        res.json({
    
             

            message: "your data deleted successfully"
        })
        
    }) 
//})
// 
app.listen(port, ()=>{
       console.log(`app listening on port ${port}`)
    })














