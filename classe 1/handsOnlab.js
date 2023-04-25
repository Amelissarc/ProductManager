class TicketManager {
    #precioBaseGanancia = 0.15
    constructor(){
        this.eventos = [];
    }

    returnEventos() {
        return this.eventos
    }

    agregarEventos(
        nombre, 
        lugar, 
        precio, 
        capacidad = 50, 
        fecha = new Date().toLocaleDateString()
        ) {
        const evento = {
            nombre,
            lugar,
            precio: precio + precio*this.#precioBaseGanancia,
            capacidad,
            fecha,
            participantes: []
        }

        if(this.eventos.length === 0){
            evento.id = 1;
        } else {
            evento.id = this.eventos[this.eventos.length-1].id + 1;
        }
        this.eventos.push(evento);
    }

    agregarUsuario(idUsuario, idEvento) {
        const eventoIndex = this.eventos.findIndex(evento => evento.id === idEvento)
        if(eventoIndex == -1) {
            console.log("Evento no existe")
        }
        this.eventos[eventoIndex].participantes.push(idUsuario)
    }
}

const manejadorDeEventos = new TicketManager ();
manejadorDeEventos.agregarEventos('evento 1', 'Honduras', 5, 50,)
manejadorDeEventos.agregarUsuario(100, 1)
console.log(manejadorDeEventos.returnEventos())