// Ejemplo de operación síncrona
console.log("Iniciando tarea");
console.log("Realizando la operación");
console.log("Continuando operación");
console.log("Tarea finalizada");

// setTimeout ; Asincronía
const temporizador = (callback) => {
    setTimeout(()=>{
        callback();
    },5000)
}

let operacion = () => console.log("Realizando operación")

console.log("Iniciando tarea")
temporizador(operacion);
console.log("Tarea finalizada");

// Ejemplo de operación síncrona
console.log("Iniciando tarea");
console.log("Continuando operación");
for(let contador = 1; contador <=5; contador++) {
    console.log(contador);
}
console.log("Tarea finalizada")

// setInterval ; Asincronía

let contador = () => {
    let counter=1;
    console.log("Realizando operación");
    let timer = setInterval(() =>{
        console.log(counter++);
        if(counter>5){
            clearInterval(timer);
        }
    },1000)
}
console.log("Iniciando tarea");
contador();
console.log("tarea finalizada")


