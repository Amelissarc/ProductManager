function getRandomNumber() {
    // recuperamos un número aleatorio entre 0 y 1
    const random = Math.random() // por ejemplo: 0.6803487380457318
  
    // lo multiplicamos por 10 para que esté entre 0 y 10
    const multiplied = random * 10 // -> 6.803487380457318
  
    // redondeamos hacia abajo para que esté entre 0 y 9
    const rounded = Math.floor(multiplied) // -> 6
  
    // le sumamos uno para que esté entre 1 y 10
    const result = rounded + 1 // -> 7
  
    // devolvemos el resultado
    return result
  }

  // Parametros
  function saludar(nombre) {
    console.log("Hola " + nombre)
  }

  saludar('Melissa')


  // Parametros y argumentos

  // la función suma tiene dos parámetros: a y b
function sumar(a, b) {
    return a + b
  }
  
  // cuando llamamos a la función, le pasamos dos argumentos: 2 y 3
  const resultadoSuma = sumar(2, 3)  // -> 5


  // El orden de los parametros importa: 
  function cocinarMicroondas(plato, tiempo, potencia) {
    if (plato === '🐥' && tiempo === 1 && potencia === 5) {
      return '🍗'
    }
  
    if (plato === '🥚' && tiempo === 2 && potencia === 3) {
      return '🍳'
    }
  
    return '❌ Plato no soportado'
  }

  const resultado = cocinarMicroondas('🐥', 1, 5)
console.log(resultado) // -> 🍗

/* const resultado = cocinarMicroondas(1, 5, '🐥')
console.log(resultado) // -> '❌ Plato no soportado' */

// Una function expression es una función que se asigna a una variable. Por ejemplo:

// esto es una function expression
const sum = function (a, b) {
    return a + b
  }
  
  // esto es una declaración de función
  function sum(a, b) {
    return a + b
  }

  sum(1, 2) // 3

/* 
  Hoisting
El hoisting es un término que se usa para describir cómo JavaScript parece que mueve las declaraciones funciones al principio del código, de forma que las puedes usar incluso antes de declararlas. Por ejemplo: */

sum(1, 2) // 3

function sum(a, b) {
  return a + b
}

// no se puede con las funtion expression
sum(1, 2) // ❌ ReferenceError: sum is not defined

const sum = function (a, b) {
  return a + b
}

/* Las funciones flecha son una forma más concisa de crear funciones en JavaScript, y se han vuelto muy populares en los últimos años debido a su sintaxis simplificada.

La sintaxis básica de una función flecha es la siguiente: */

const miFuncionFlecha = () => {
  // código a ejecutar
}

//Las funciones flecha son siempre funciones anónimas y function expressions. Esto significa que no tienen nombre y que se asignan a una variable.

/* Las funciones flecha tienen varias ventajas sobre las funciones regulares en JavaScript. Algunas son:

Sintaxis más concisa: la sintaxis de las funciones flecha es más corta y más fácil de leer que la sintaxis de las funciones regulares, especialmente cuando se trabaja con funciones de una sola línea.

Return implícito: las funciones flecha puede devolver el valor de la expresión sin usar la palabra clave return cuando son de una sola línea. Esto hace que las funciones flecha sean aún más cortas y más fáciles de leer.

Funciones anónimas más legibles: las funciones flecha son una forma más legible y concisa de crear funciones anónimas en JavaScript, lo cual puede hacer que nuestro código sea más fácil de entender. */

// Declaración de función regular
function sumar(a, b) {
    return a + b
  }
  
  // Función flecha
  const sumarFlecha = (a, b) => {
    return a + b
  }
  
  // Función flecha con return implícito
  const sumarFlechaImplícito = (a, b) => a + b

  /* La recursividad es una técnica de programación que consiste en que una función se llame a sí misma. 
  Qué es la condición base en la recursividad? Una condición que permite evitar que una función se llame infinitamente
  Si no se define una condición base en una función recursiva, la función se llamará infinitamente y eventualmente el programa se bloqueará.
  */

  function cuentaAtras(numero) {
    // Condición base: Si el número que recibe es
    // menor de 0 entonces salimos de la función
    if (numero < 0) { return }
  
    // Si el número era mayor o igual a 0, lo mostramos
    console.log(numero)
  
    // Y llamamos a la función con el número anterior
    cuentaAtras(numero - 1)
  }

  //Si llamamos a la función con el número 3, el resultado será:

cuentaAtras(3)
// -> 3
// -> 2
// -> 1
// -> 0

/* Usando recursividad y devolviendo un valor
La recursividad se usa muchas veces para solucionar algoritmos. Por ejemplo, vamos a crear una función que calcule el factorial de un número.

El factorial de un número es el resultado de multiplicar ese número por todos los anteriores hasta llegar a 1. Por ejemplo, el factorial de 5 es 5 * 4 * 3 * 2 * 1 = 120 */

function factorial(n) {
  // Condición base: Si el número es 0 o 1, devolvemos 1
  // y no llamamos a la función de nuevo
  if (n === 0 || n === 1) {
    return 1
  } else {
    // Si el número es mayor que 1, llamamos a la función
    return n * factorial(n - 1)
  }
}

console.log(factorial(5)) // Resultado: 120
console.log(factorial(3)) // Resultado: 6

