/* PROMESAS
Maneja 3 estados:
    Pending -> pendiente
    Fulfilled/Resolved -> Cumplido
    Rejected -> Rechazada
*/

const dividir = (dividendo, divisor) => {
    return new Promise ((resolve,reject) => {
        if(divisor===0){
            reject("No se pueden hacer divisiones entre cero")
        } else {
            resolve(dividendo/divisor);
        }
    })
}

dividir(6,3)
.then(resultado=>{
    console.log(resultado)
})
.catch(error=>{
    console.log(error)
})

dividir(5,0)
.then(resultado=>{
    console.log(resultado)
})
.catch(error=>{
    console.log(error)
})

// ENCADENAMIENTO DE PROMESAS
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
})
.then(result => {
    console.log(result); // 1
    return result * 2;
})
.then(result => {
    console.log(result); // 2
    return result * 2;
})
.then(result => {
    console.log(result); // 4
    return result * 2; 
})

// SINCRONISMO

function funA(){
    console.log(11)
    funB()
    console.log(12)
}
function funB(){
    console.log(13)
    funC()
    console.log(14)
}
function funC(){
    console.log(15)
}

funA()

// ASINCRONISMO

const escribirArchivo = require('./calculadora.js')

console.log('inicio del programa')

escribirArchivo('Hola mundo',() => {
    console.log('terminé de escribir el archivo')
})

console.log('fin del programa')

