const express = require('express') // untuk membuat rest API
const cors = require('cors') // agar frontend bisa akses ke rest API
const bodyParses = require('body-parser') // agar rest API bisa menerima parameter
const mysql = require ('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tokokasih',
    port     : 3306
  });

const PORT = 4000

const app = express()
app.use(cors())
app.use(bodyParses.json())

app.get('/categories',(req,res)=>{
    console.log(req.que)
    const query = `SELECT * FROM categories; `

connection.query(query,(error, results)=> {
  if (error){
      return res.status(500).send(error)
  } 

  res.status(200).send(results)
});

})

app.post('/categories',(req,res)=>{ //tambah data category
    console.log('Query:',req.query)
    console.log('Body:',req.body)
    const query = `INSERT INTO categories  SET ?;`
    connection.query(query, req.body, (error,results)=>{
        if(error){
            return res.status(500).send(error)
        }
        console.log('results:', results)
            
        res.status(200).send(results)

    });
})

app.put('/categories/:id',(req,res)=>{ //edit data category
    console.log(req.params)
    console.log(req.body)

    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    console.log(query)
    connection.query(query,req.body, (err,results)=>{
        if (err){
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.delete('/categories/:id', (req,res)=>{ // delete data
    console.log(req.params)
    const query =` DELETE FROM categories WHERE id=${connection.escape(req.params.id)} `;

    connection.query(query,(err,results)=>{
        if(err){
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.listen(PORT, ()=> console.log(`API berhasil aktif ${PORT}`))