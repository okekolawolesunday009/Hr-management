import express from "express";
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { waitForDebugger } from "inspector";
import { kMaxLength } from "buffer";



const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin:"*"
}))

const con = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '', 
    // database:'signup'
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,   
  database: process.env.DBNAME,
  waitForConnection: true,
  connectionLimit: 10,
  queueList: 0
 
})



con.connect(function(err){
   if(err){
    console.log("Error in db con")
   }else{
    console.log("conncetion successful")

   }
  
})
app.put('/home/update/:id', (req,res)=>{

    const id = req.params.id
     const sql = "UPDATE employees set name  = ?, email = ?, address = ? where id = ?"
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
        if(err) return res.json({Error:'error deleting geting employees data id'});
        return res.json({Status:  "success", Result: result})

    })
// console.log(req.body)
})
app.get('/home/employees', (req,res)=>{
const sql = "SELECT * FROM employees"
    con.query(sql, (err,result) => {
        if(err) return res.json({Error:'error geting sql data'});
        return res.json({Status:  "success", Result: result})

    })
})
app.get('/get/:id', (req,res)=>{
    const id = req.params.id
const sql = "SELECT * FROM employees where id = ?"
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
app.post('/home/create', upload.single('image'), (req, res) => {
    const sql = 'INSERT INTO employees (`name`, `email`, `password`, `address`, `image`) VALUES (?)';
    
    // Check if req.file exists (image uploaded)
    if (req.file) {
        // File was uploaded, use req.file.filename for the image filename
        const filename = req.file.filename;
        handleInsert(req, res, sql, filename);
    } else {
        // No file was uploaded, set a default or replacement image filename
        const filename = 'user.png'; // You can set a default image filename
        // Or you can retrieve the replacement image filename from somewhere
        // const filename = getReplacementImageFilename();
        handleInsert(req, res, sql, filename);
    }
});

function handleInsert(req, res, sql, filename) {
    if (req.body.password !== undefined && req.body.password !== null) {
        bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
            if (err) {
                return res.json({ Error: 'error hashing password' });
            }
            const values = [
                req.body.name,
                req.body.email,
                hash,
                req.body.address,
                filename // Use the uploaded filename or replacement filename
            ];
            con.query(sql, [values], (err, result) => {
                if (err) {
                    console.error("Database error:", err.message);
                    return res.json({ Error: 'error in signup query' });
                } else {
                    console.log("Insert successful:", result);
                    return res.json({ Status: 'Success' });
                }
            });
        });
    } else {
        return res.json({ Error: 'Password is undefined or null' });
    }
}

export const port = process.env.PORT || 3306;

app.listen(port, ()=>{
    console.log(`server running yippe`)
})

