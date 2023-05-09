import fs from 'fs';
import crypto from 'crypto';

const path = './files/Usuarios.json';

export default class UserManager {

    getUsers = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const users = JSON.parse(data);
            return users
        } else return [];
    }

    crearUsers = async (usuario) => {
        const usuarios = await this.getUsers();
        usuario.salt = crypto.randomBytes(128).toString('base64');
        usuario.contrasena = crypto.createHmac('sha256', usuario.salt).update(usuario.contrasena).digest('hex');
        usuarios.push(usuario);
        await fs.promises.writeFile(path,JSON.stringify(usuarios, null, '\t'));
        return usuario
    }

    validarUsuario = async (username, contrasena) => {
        const usuarios = await this.getUsers();
        const usuarioIndex = usuarios.findIndex(u => u.nombre_usuario === username);
        if(usuarioIndex === -1) {
            console.log('no esta bro')
        return
        }
        const usuario = usuarios[usuarioIndex];
        const newHash = crypto.createHmac('sha1', usuario.salt).update(contrasena).digest('hex');

        if (newHash === usuario.contrasena) {
            console.log('logueado');
        } else {
            console.log('mala contraseña bro')
        }
    }
}

const userManager = new UserManager();

const prueba = async () => {
    let users = await UserManager.getUsers();
    console.log(users)
    let user =  {
        nombre: 'nombre',
        apellido: 'apellido',
        nombre_usuario: 'lalala',
        contrasena: '123'
    }
    await userManager.crearUsers(user);
    let hacemeUnGet = await userManager.getUsers();
    console.log(hacemeUnGet);
    await userManager.validarUsuario('lalala', '123')
}

prueba();