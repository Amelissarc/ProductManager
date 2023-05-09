/* Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.
Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados. */


const obj = {}

for (let i = 0; i < 10000; i++) {
    let numerito = Math.floor(Math.random() *20 + 1)
    if(!obj[numerito]) obj[numerito] = 1;
    else obj[numerito]++
}

console.log(obj);



// otra forma instalando lodash: 

const _ = require('lodash');

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomNumbers = (count, min, max) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    const randomNumber = generateRandomNumber(min, max);
    numbers.push(randomNumber);
  }
  return numbers;
};

const countOccurrences = (numbers) => {
  return _.countBy(numbers);
};

const numbers = generateRandomNumbers(10000, 1, 20);
const occurrences = countOccurrences(numbers);

console.log('Resultados:');
console.log(occurrences);
