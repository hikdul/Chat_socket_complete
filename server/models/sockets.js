const { userConnect,userDisconnect, getUsers, saveMessage } = require("../controller/socket.controller");
const { VerifyJWT } = require("../helpers/jwt/jwt");

class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            const [ok, uid] = VerifyJWT(socket.handshake.query['x-token'])
            if (!ok) {
                console.log('socket no identificado')
                return socket.disconnect()
            }

            // Escuchar evento: mensaje-to-server
            //console.log('Cliente Conectado...', {uid})
            await userConnect(uid)
            // ** unir al usuario a una sala de socket.io
            socket.join(uid)
            //mensaje-personal
            socket.on('mensaje-personal', async(payload) =>{
                const msg = await saveMessage(payload)
                this.io.to(payload.from).emit('mensaje-personal', msg)
                this.io.to(payload.to).emit('mensaje-personal', msg)
            })
            
            //TODO: emitir todos los usuarios conectados
            this.io.emit('list-users',await getUsers())
            
            
            //TODO: socket join, unirme a una sala especifica... unir socket a una sala rcon el mismo id
            //TODO: escuchar cuando el cliente manda un mensaje
            //TODO: emitir los usuarios conectados

            socket.on('mensaje-to-server', (data) => {
                console.log(data);

                this.io.emit('mensaje-from-server', data);
            });

            socket.on('disconnect', async () => {
                userDisconnect(uid)
                this.io.emit('list-users',await getUsers())
            })
        });
    }


}


module.exports = Sockets;