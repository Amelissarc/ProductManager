//CREAR CLASE QUE PERMITA GESTIONAR USUARIOS USANDO FS.PROMISES
//El manager debe vivir en una clase, en un archivo externo llamado managerUsuarios.js
//El método "crearUsuario" debe recibir un objeto con los campos ( Nombre, Apellido, Edad, Curso)
//El método debe guardar en un archivo "usuarios.json", deben guardarlos dentro de un arreglo, ya que se trabajaran con múltiples usuarios
//El método "consultarUsuarios" debe poder leer un archivo usuarios.json y devolver el arreglo correspondiente a esos usuarios
import fs from 'fs';

const path = "./files/usuarios.json"; 

export default  class ManagerUsuarios {
    consultarUsuarios = async() => {
        if(fs.existsSync()) {
            const data = await fs.promises.readFile(path, ' utf-8');
            console.log(data);
            const users = JSON.parse(data);
            return users
        } else {
            return [];
        }
    };
    crearUsuarios = async(info) => {
        const users = await this.consultarUsuarios()
        if(users.length === 0) {
            info.id = 1
        } else {
            info.id =  users[users.length - 1].id + 1;
        }
        users.push(info);
        await fs.promises.writeFile(path, JSON.stringify(users, null, '\t'));
        return info
    };
}

const manager = new ManagerUsuarios();

const env = async() =>{
    let primeraConsultaUsuarios = await manager.consultarUsuarios();
    console.log(primeraConsultaUsuarios); //Debe devolver vacío
    let user = {
        nombre:"Mauricio",
        apellido:"Espinosa",
        edad:26,
        curso:"Backend"
    }
    let result = await manager.crearUsuarios(user);
    console.log(result); //Debe devolver al usuario con un id
    let segundaConsultaUsuarios = await manager.consultarUsuarios();
    console.log(segundaConsultaUsuarios); //Debe devolver al usuario instertado
}
env();