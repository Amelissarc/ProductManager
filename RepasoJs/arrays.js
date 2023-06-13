/* En un restaurante se reciben pedidos de comida a domicilio. 
Vamos a escribir una función procesarPedido que recibe un pedido, que es un array de platos. 
Lo que debemos hacer es:

El primer elemento lo sacamos del array, ya que es el nombre del cliente.
Añadimos al principio del array la cadena de texto "bebida", ya que es una promoción que tenemos.
Después añadimos al final del array el nombre del usuario que sacamos antes. */


function procesarPedido(pedido) {
    const nombreCliente = pedido.shift(); // Sacar el nombre del cliente del array y guardarlo en una variable
    pedido.unshift("bebida"); // Añadir "bebida" al principio del array
    pedido.push(nombreCliente); // Añadir el nombre del cliente al final del array
    return pedido;
  }
  

const pedido = ["Juan", "Pizza", "Hamburguesa", "Ensalada"];
const pedidoProcesado = procesarPedido(pedido);
console.log(pedidoProcesado);
// Resultado: ["bebida", "Pizza", "Hamburguesa", "Ensalada", "Juan"]


/* Dada una lista de números, escribe una función en JavaScript que devuelva la suma de todos los números pares en la lista. La función deberá iterar sobre cada número en la lista, comprobar si el número es par y, si es así, añadirlo a la suma total. Usa el bucle que quieras para solucionarlo. */

function sumarPares(numeros) {
  let suma = 0

  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
      suma += numeros[i];
    }
  }
  return suma
}

var numeros = [1, 2, 3, 4, 5, 6];
console.log(sumarPares(numeros)); // Devuelve 12

var numeros = [10, 20, 30, 40, 50];
console.log(sumarPares(numeros)); // Devuelve 150

var numeros = [1, 3, 5, 7];
console.log(sumarPares(numeros)); // Devuelve 0, ya que no hay números pares


/* 
Crear una función que reciba un array de palabras y devuelva true si todas las palabras terminan con la letra "a" y false si al menos una palabra no termina con la letra "a".


Usa el método endsWith() de string para resolverlo. */

function acabanEnA(words) {
  for (let palabra of words) {
    if (!palabra.endsWith('a')) {
      return false;
    }
  }
  
  return true;
}

var palabra = ['casa', 'manzana', 'pelota'];
console.log(acabanEnA(palabra)); // Devuelve true

var palabra = ['computadora', 'silla', 'ventana'];
console.log(acabanEnA(palabra)); // Devuelve true

var palabra = ['mar', 'luna', 'sol'];
console.log(acabanEnA(palabra)); // Devuelve false

var palabra = [];
console.log(acabanEnA(palabra)); // Devuelve true, ya que no hay palabras para verificar
