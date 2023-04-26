const variable1 = null 
const nombre1 = variable1 ?? 'Hector';
console.log(nombre1) // Hector

const variable2 = 'Juan' 
const nombre2 = variable2 ?? 'Hector';
console.log(nombre2) // Juan

// Registrador de tickets

class TicketManager {
    #eventos = [];
    #precioBaseDeGanancia = 10;
    getEventos() {
        return this.#eventos;
    }
    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const evento = {
            id: this.#eventos.length + 1,
            nombre,
            lugar,
            precio: precio * 1.15 + this.#precioBaseDeGanancia,
            capacidad,
            fecha,
            participantes: [],
        };
        this.#eventos.push(evento);
        return evento;
    }
}
// Ejemplo de uso
    const ticketManager = new TicketManager();
    ticketManager.agregarEvento("Concierto de rock", "Estadio Nacional", 5000);
    ticketManager.agregarEvento("Feria gastronómica", "Parque de la Exposición", 100);
    console.log(ticketManager.getEventos());