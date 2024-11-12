//instantiation
const express = require("express")
const app =  express();
const mysql = require("mysql")
const moment = require("moment")

const PORT = process.env.PORT  || 5001

const logger = (req, res, next) => {
  console.log(`
    ${req.protocol}://${req.get("host")} ${req.originalUrl} : ${moment().format()}`
  )
  next();
}

app.use(logger);



const connection = mysql.createConnection({
    host: "bdzen9c82siaaxpkfvsw-mysql.services.clever-cloud.com",
    user: "u8tir7uqflwqklj5",
    password: "YByaajR7V1u1eqRDTQPA",
    database: "bdzen9c82siaaxpkfvsw",
});

connection.connect();

//REPORT - CRUD
app.get("/api/productsInfo", (req, res) => {
    connection.query("SELECT * FROM product_info", (err, rows, fields) =>{
      if(err) throw err;
      res.json(rows)
    })
})


//REPORT - CRUD - SEARCH
app.get("/api/productsInfo/:id", (req, res) => {
    const id = req.params.id
    //res.send(id)
    connection.query(`SELECT * FROM product_info WHERE id=${id}`, (err, rows, fields) => {
      if(err) throw err
      if(rows.length > 0){
        res.json(rows)
      }
      else{
        res.status(400).json({msg:`${id} not found`})
      }

    })
}) 

//POST
//CRUDE CREATE - CRUD
app.use(express.urlencoded({extended:false}))
app.post("/api/productsInfo", (req, res) => {
    const id = req.body.id;//Juan
    const itemName = req.body.itemName;//Dela Cruz
    const unitPrice = req.body.unitPrice;//juan@gmail.com
    const quantity = req.body.quantity;//male
    const supplier = req.body.supplier;

    connection.query(`INSERT INTO product_info (id, itemName, unitPrice, quantity, supplier) VALUES ('${id}', '${itemName}', '${unitPrice}', '${quantity}', '${supplier}')`, (err, rows, fields) => {
      if(err) throw err;
      res.json({msg: `Successfully inserted`})
    })
})


//PUT
//UPDATE - CRUD
app.use(express.urlencoded({extended:false}))
app.put("/api/productsInfo", (req, res) => {
  const id = req.body.id;//Juan
  const itemName = req.body.itemName;//Dela Cruz
  const unitPrice = req.body.unitPrice;//juan@gmail.com
  const quantity = req.body.quantity;//male
  const supplier = req.body.supplier;

  connection.query(`INSERT INTO product_info (id, itemName, unitPrice, quantity, supplier) VALUES ('${id}', '${itemName}', '${unitPrice}', '${quantity}', '${supplier}')`, (err, rows, fields) => {
    if(err) throw err;
    res.json({msg: `Successfully updated`})
  })
})

//DELETE
app.use(express.urlencoded({extended:false}))
app.delete("/api/productsInfo/", (req,res) => {
  const id = req.body.id;
  connection.query(`DELETE FROM userdata  WHERE id = '${id}'`, (err, rows, fields) => {
    if(err) throw err;
    res.json({msg: `Successfully deleted`})
  })

})


app.listen(5001, () => {
    console.log(`Server is running in port ${PORT}`);
})
