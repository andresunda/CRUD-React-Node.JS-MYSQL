//FUNCIONES MYSQL (CONEXION, CREAR, LEER, MODIFICAR, ELIMINAR)
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

//midleware que fuuncionara como API
app.use(cors());
app.use(express.json());

//-------------conexion a la base de datos-----------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
  } else {
    console.log("Conexión a MySQL exitosa");
  }
});


//----------------------Funcion crear-------------------
app.post("/create",(req,res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anos = req.body.anos;

  db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anos) VALUES (?,?,?,?,?)', [nombre,edad,pais,cargo,anos],
  (err,result) => {
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
  });
});
//---------------------------Funcion leer--------------------------
app.get("/empleados",(req,res) => {
  db.query('SELECT * FROM empleados',
  (err,result) => {
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
  });
});
//---------------------------Funcion modificar/actualizar----------------------
app.put("/update",(req,res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anos = req.body.anos;

  db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anos=? WHERE id =?', [nombre,edad,pais,cargo,anos,id],
  (err,result) => {
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
  });
});
//============Funcion eliminar un usuario============================
app.delete("/delete/:id",(req,res) => {
  const id = req.params.id;
  db.query('DELETE FROM empleados WHERE id =?',id,
  (err,result) => {
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
  });
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001");
})