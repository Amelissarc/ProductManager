const fs = requiere('fs')

fs.writeFileStync('./ejemplo.txt', " Hola, Coders, estoy en un archivo")

if(fs.existsSync('./ejemplo.txt')){
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')

    console.log(contenido)
    fs.appendFileSync('./ejemplo.txt', 'Más contenido')

    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')

    console.log(contenido);

    fs.unlinkSync('./ejemplo.txt')
}