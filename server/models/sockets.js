
class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            // Escuchar evento: mensaje-to-server
             
            //TODO: validar jwt
            //TODO: saber que usuario esta activo
            //TODO: emitir todos los usuarios conectados
            //TODO: socket join, unirme a una sala especifica... unir socket a una sala rcon el mismo id
            //TODO: escuchar cuando el cliente manda un mensaje
            //TODO: disconnect, marca a un usuario como desconectado
            //TODO: emitir los usuarios conectados

            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );
                
                this.io.emit('mensaje-from-server', data );
            });
        });
    }


}


module.exports = Sockets;