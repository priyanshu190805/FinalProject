import http from "http"
import { app } from "./app.js"
import {initilaizeSocket} from './socket.js'

const port = process.env.PORT || 3000

const server = http.createServer(app)

initilaizeSocket(server) ;

server.listen(port , () => {
    console.log(`Server is running at port ${port}`)
})