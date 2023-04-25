// CREACIÓN DE UNA CLASE CONTADOR

/* Definir clase Contador simulando un banco monetario
La clase se creará con un nombre, representando al responsable del contador.
El contador debe inicializarse en 0 
Debe existir una variable estática que funcione como contador global de todas las instancias de contador creadas.

Definir el método getResponsable, el cual debe devolver el responsable de dicho contador.
Definir el método contar, el cual debe incrementar, tanto su cuenta individual, como la cuenta global.
Definir el método getCuentaIndividual, el cual debe devolver sólo la cuenta individual del contador
Definir el método getCuentaGlobal, el cual debe devolver la variable estática con el conteo global.
Realizar prueba de individualidad entre las instancias.
*/

class Contador {
    constructor(respondable) {
        this.responsable = respondable
        this.contador = 0  // cuenta individual
    }

    // propiedad estatica
    static contadorGlobal = 0 // cuenta global

    getResponsable = () => {
        return this.responsable
    }

    contar = () => {
        this.contador++
        Contador.contadorGlobal++
    }

    getCuentaIndividual= () => {
        return this.contador
    }

    getCuentaGlobal= () => {
        return Contador.contadorGlobal
    }

}

const cuenta1 = new Contador('Maria')
cuenta1.contar()  // acá se "deposita el dinero a la cuenta"
cuenta1.contar()

console.log(cuenta1.getCuentaIndividual())

const cuenta2 = new Contador('Juan')
cuenta2.contar()  // acá se "deposita el dinero a la cuenta"

console.log(cuenta2.getCuentaIndividual())
console.log(cuenta1.getCuentaGlobal())

const cuenta3 = new Contador('Pedro')
cuenta3.contar()  // acá se "deposita el dinero a la cuenta"

console.log(cuenta3.getCuentaIndividual())
console.log(cuenta3.getCuentaGlobal())