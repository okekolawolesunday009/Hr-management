import express from "express";
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    port:'8080',
    database:'signup'
})

export {con, app};

con.connect(function(err){
    if(err){
        console.log('Error in Connection')
    }else{
        console.log("succesful")
    }
})
app.put('/home/update/:id', (req,res)=>{

    const id = req.params.id
     const sql = "UPDATE employee set name  = ?, email = ?, address = ? where id = ?"
    con.query(sql,[req.body.name,req.body.email, req.body.address, id], (err,result) => {
        if(err) return res.json({Error:'error updating geting employee data id'});
        return res.json({Status:  "success", Result: result})

    })
// console.log(req.body)
})

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 }
});
app.delete('/home/delete/:id', (req,res)=>{

    const id = req.params.id
     const sql = "Delete FROM employee WHERE id = ?"
    con.query(sql,[id], (err,result) => {
        if(err) return res.json({Error:'error deleting geting employee data id'});
        return res.json({Status:  "success", Result: result})

    })
// console.log(req.body)
})
app.get('/home/employees', (req,res)=>{
const sql = "SELECT * FROM employee"
    con.query(sql, (err,result) => {
        if(err) return res.json({Error:'error geting sql data'});
        return res.json({Status:  "success", Result: result})

    })
})
app.get('/get/:id', (req,res)=>{
    const id = req.params.id
const sql = "SELECT * FROM employee where id = ?"
    con.query(sql,[id], (err,result) => {
        if(err) return res.json({Error:'error geting employee data id'});
        return res.json({Status:  "success", Result: result})

    })
})
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users Where email = ? AND password = ?'
    con.query(sql, [req.body.email,req.body.password], (err, result) =>{
        if(err) return res.json({Error: "errr in server"});
        if(result.length > 0){
            return res.json({Status:  "success", Error: 'error in running query'})
        }else{
            return res.json({Status:  "error", Error: 'error  email or password'})
        }
    })

})
app.post('/home/create',upload.single('image'),(req, res) => {
   const sql = 'INSERT INTO employee (`name`, `email`,`password`,`address`,`image`) VALUES (?)'
   bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if(err) return res.json({Error:'error hasshing password'})
    const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.address,
        req.file.filename

    ]
    con.query(sql, [values], (err, result) => {
        if(err){
            return res.json({Error: 'error in singup query'})
        }else{
            return res.json({Status:'Success'})

        }
        
    })
   })

})
const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`server running ${port}`)
})

