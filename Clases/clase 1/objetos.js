const objetos = [
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2
    },
    {
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4,
    }
];

/* 1. Crea un arreglo de claves únicas en el arreglo "objetos" */
let newArray = [];

objetos.forEach((objeto)=> {
    const keys = Object.keys(objeto);
    keys.forEach(key=>{
        if(!newArray.includes(key)) 
        newArray.push(key);
    })
})

console.log(newArray);  /* 'manzanas', 'peras', 'carne',    'jugos', 'dulces',   'sandias', 'huevos',   'panes' */

/* 2. Imprime los valores de cada clave en cada objeto del arreglo. */

objetos.forEach((objeto)=> console.log(Object.values(objeto))); /* [ 3, 2, 1, 5, 2 ] [ 1, 1, 6, 1, 4 ] */

/* 3. Toma el arreglo "objetos" y crea un objeto que contiene el total de productos de cada tipo en todos los objetos del arreglo original. */

const totalProductos = objetos.reduce((acumulador, objeto) => {
    Object.keys(objeto).forEach((llave) => {
        if (acumulador[llave]) {
            acumulador[llave] += objeto[llave];
        } else {
            acumulador[llave] = objeto[llave];
        }
    });
    return acumulador;
}, {});
console.log(totalProductos); // { manzanas: 4, peras: 2, carne: 1, jugos: 6, dulces: 2, sandias: 1, huevos: 6, panes: 4 }