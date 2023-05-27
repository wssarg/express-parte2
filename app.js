const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json()); // middleware

// GET --> READ SELECT
// POST --> CREATE INSERT
// PUT --> UPDATE
// DELETE --> DELETE

app.get("/", (req, res) => {
    res.send("Hola mundo desde express 3");
});

app.get("/api/usuarios", (req, res) => {
    res.send(['Lucas','Tulio','Julio']);
});


const usuarios = [
    {id:1, nombre:'Lucas'},
    {id:2, nombre:'Tulio'},
    {id:3, nombre:'Julio'}
]

app.get("/api/usuarios/:id", (req, res) => {
    let usuario = usuarios.find( u => u.id === parseInt(req.params.id));
    if(!usuario) res.status(404).send('El usuario no fue encontrado');
    res.send(usuario);
});



app.post("/api/usuarios", (req, res) => {
    const schema = Joi.object(
        {nombre: Joi.string().min(3).required()}
    );

    const result = schema.validate( {nombre: req.body.nombre} );

    if(result.error){
        res.status(404).send(result);    
        return;
    }

    //res.status(200).send(result);

    if(parseInt(req.body.nombre)>0){
        res.status(404).send("Debe ingresar un nombre, que sea cadena");
        return;
    }

    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }
    usuarios.push(usuario);

    res.send(usuario);
});





app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
});
