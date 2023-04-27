const suma = (num1, num2)=> {
    return new Promise((resolve, reject) => {
    if(num1 === 0 || num2 === 0) reject ('operación innecesaria')
    if( num1 + num2 < 0) reject ('solo devolver positivos')
    resolve(num1 + num2)
    });
}

const resta = (num1, num2)=> {
    return new Promise((resolve, reject) => {
    if(num1 === 0 || num2 === 0) reject ('operación innecesaria')
    if( num1 - num2 < 0) reject ('solo devolver positivos')
    resolve(num1 - num2)
    });
}

const multiplicacion = (num1, num2)=> {
    return new Promise((resolve, reject) => {
    if(num1 === 0 || num2 === 0) reject ('operación innecesaria')
    if( num1 * num2 < 0) reject ('solo devolver positivos')
    resolve(num1 * num2)
    });
}

const division = (num1, num2)=> {
    return new Promise((resolve, reject) => {
    if(num1 === 0 || num2 === 0) reject ('operación innecesaria')
    if( num1 / num2 < 0) reject ('solo devolver positivos')
    resolve(num1 / num2)
    });
}

const calculos = async () => {
    try {
        let num1 = 10;
        let num2 = 20;

        let resultSuma = await suma(num1,num2)
        console.log(resultSuma)

        let resultResta = await resta(num1,num2)
        console.log(resultResta)

        let resultMultiplicacion = await multiplicacion(num1,num2)
        console.log(resultMultiplicacion)

        let resultDivision = await division(num1,num2)
        console.log(resultDivision)
    }
    catch(e) {
        console.log(e)
    }
}

calculos()