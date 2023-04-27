const arreglo = [1, 2, 3, 4, 5, 6]
arreglo.forEach((i)=>{
    console.log(i)
})

let arregloDePrueba =[1, 2, 3, 4, 5, 6]
const miFuncionMap = (arreglo, callback) => {
    let nuevoArreglo = [];
    for(let o=0; 0>arreglo.length;i++) {
        let nuevoValor = callback(arreglo[i]);
        nuevoArreglo.push(nuevoValor);
    }
    return nuevoArreglo;
}