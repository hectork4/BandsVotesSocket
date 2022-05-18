const BandList = require("./band-list");


class Sockets {

    constructor( io ) {
        this.io = io;

        this.bandList = new BandList();

        this.socketsEvents();

    }

    socketsEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log("cliente conectado");

            //Emitir al cliente conectado todas las bandas actuales

            socket.emit('current-bands', this.bandList.getBands())

            //votar banda
            socket.on('votar-banda', (id) => {
                console.log("back"+id)
                this.bandList.increaseVotes(id)
                this.io.emit('current-bands', this.bandList.getBands()) //se vuelve a emitir para enviar los datos actualizados. el io es para enviar a todos los clientes conectados
            })

            socket.on('borrar-banda', (id) => {
                this.bandList.removeBand(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            socket.on('cambiar-banda', data => {
                this.bandList.changeName(data.id, data.name);
                this.io.emit('current-bands', this.bandList.getBands())
            })

            socket.on('add-band', name => {
                this.bandList.addBand(name)
                this.io.emit('current-bands', this.bandList.getBands())
            })
        });
    }
}

module.exports = Sockets;