import fs from 'fs';
import { Blob } from 'buffer';

const escribir = async() => {
    const data = await fs.promises.readFile('./package.json', 'utf-8')

    const info = {
        contenidoString: data,
        contenidoObj:JSON.parse(data),
        size: new Blob([data]).size,
    }
    console.log(info)
    await fs.promises.writeFile('./package.json', JSON.stringify(info, null, '\t'))
}

escribir();