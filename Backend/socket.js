import { Server } from "socket.io";
import { UserModal } from './models/user.model.js'
import { CaptainModel } from './models/captain.model.js'

let io;

function initilaizeSocket (server){
    io = new Server(server, {
        cors : {
            origin : '*',
            methods : ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected : ${socket.id}`)

        socket.on('join', async (data) => {
            const {userId, userType} = data;

            console.log(`User ${userId} joined as ${userType}`)


            if (!userId) {
                console.log("User ID missing in join event");
                return;
            }

            if(userType === 'user'){
                await UserModal.findByIdAndUpdate(userId, { socketId : socket.id  })
            }
            else if(userType === 'captain'){
                await CaptainModel.findByIdAndUpdate(userId, { socketId : socket.id })
            }

            console.log(`Updated ${userType} ${userId} with socket ID ${socket.id}`);
        })

        socket.on('update-location-captain', async (data) => {
            const {userId, location} = data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', {message : "Invalid location data"})
            }

            await CaptainModel.findByIdAndUpdate(userId, {
                location : {
                    ltd : location.ltd,
                    lng : location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconected : ${socket.id}`)
        })
    })
}

function sendMessageToSocketId(socketId, messageObject){

    console.log(`Sending message to ${socketId} `, messageObject)

    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data)
    }
    else{
        console.log('socket.io not initialized')
    }
}

export {initilaizeSocket, sendMessageToSocketId}