// Servidor de Express
const express     = require('express')
const cors        = require('cors')
const dbConection = require('../database/config')
const http        = require('http')
const socketio    = require('socket.io')
const Sockets     = require('./sockets')
const path        = require('path')

class Server {

    constructor() {

        this.app  = express()
        this.port = process.env.PORT

        //connect to Database
        dbConection()
        
        // Http server
        this.server = http.createServer( this.app )
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } )
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) )
        //TODO: habilitar cors
        // parse body
        this.app.use(express.json())
        //CORS
        this.app.use(cors())
        //API endPoints
        this.app.use('/api/users', require('../router/auth'))
        this.app.use('/api/messages', require('../router/message'))
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io )
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares()

        // Inicializar sockets
        this.configurarSockets()

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port )
        })
    }

}

module.exports = Server