import express from 'express';
import mongoose from 'mongoose';
import { estudiantesModel } from './models/estudiantes.models.js';

const app = express();

app.use(express.json());

const connection = mongoose.connect('mongodb+srv://melissarinconft:eVcuhmrX99c0TsRQ@cluster0.n4vtts0.mongodb.net/?retryWrites=true&w=majority');

const students = [{
    "nombre": "Steffen",
    "apellido": "Terzo",
    "edad": 36,
    "dni":"15691240",
    "curso":"Programación Backend",
    "nota":9
  }, {
    "nombre": "Jorgan",
    "apellido": "Matthis",
    "edad": 27,
    "dni":"29358120",
    "curso":"Programación Frontend",
    "nota":6
  }, {
    "nombre": "Haley",
    "apellido": "Proback",
    "edad": 34,
    "dni":"51241268",
    "curso":"Diseño UX/UI",
    "nota":7
  }, {
    "nombre": "Michelina",
    "apellido": "Beaglehole",
    "edad": 34,
    "dni":"24614567",
    "curso":"Diseño UX/UI",
    "nota":6
  }, {
    "nombre": "Jeralee",
    "apellido": "Postans",
    "edad": 26,
    "dni":"97212450",
    "curso":"Programación Frontend",
    "nota":6
  }, {
    "nombre": "Jordain",
    "apellido": "Kerner",
    "edad": 35,
    "dni":"41262234",
    "curso":"Programación Backend",
    "nota":5
  }, {
    "nombre": "Harriett",
    "apellido": "Skeene",
    "edad": 33,
    "dni":"21245129",
    "curso":"Programación Backend",
    "nota":10
  }, {
    "nombre": "Andie",
    "apellido": "McIlrath",
    "edad": 20,
    "dni":"59127389",
    "curso":"Programación Frontend",
    "nota":9
  }, {
    "nombre": "Sapphira",
    "apellido": "Arnholtz",
    "edad": 17,
    "dni":"03128893",
    "curso":"Programación Backend",
    "nota":5
  }, {
    "nombre": "Terra",
    "apellido": "Wadsworth",
    "edad": 31,
    "dni":"02213850",
    "curso":"Diseño UX/UI",
    "nota":10
  }]

  app.post('/students/insertion', async (req, res)=>{
    let result = await estudiantesModel.insertMany(students)
    res.send({result})
})

app.post('/students/', async (req, res)=>{

    const info = req.body
    let result = await estudiantesModel.create(info)
    res.send({result})
})

app.get('/students/', async (req, res)=>{
    let result = await estudiantesModel.find()
    res.send({result})
})

app.put('/students/:id', async (req, res)=>{
    const id  = req.params.id
    const info = req.body
    let result = await estudiantesModel.updateOne({_id: id}, {$set: info})
    res.send({result})
})

app.delete('/students/:id', async (req, res)=>{
    const id  = req.params.id
    let result = await estudiantesModel.deleteOne({_id: id})
    res.send({result})
})

app.listen(8080,()=> {
    console.log('servidor levantado');
});

