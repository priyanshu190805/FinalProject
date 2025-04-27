import { RideModel} from "../models/ride.model.js"
import { sendMessageToSocketId } from "../socket.js"
import { getTimeDistance } from "./maps.service.js"
import crypto from 'crypto'

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await getTimeDistance(pickup, destination)


    const baseFare = {
        auto : 20,
        car : 40, 
        bike : 10
    }

    const perKmRate = {
        auto : 10,
        car : 20,
        bike : 8,
    }

    const perMinRate = {
        auto : 2,
        car : 3,
        bike : 1.5,
    }

    if(distanceTime.distance.value/1000 > 70){
        throw new Error("No routes found")
    }

    const fare = {
        auto : Math.round(baseFare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value/60) * perMinRate.auto)),
        car : Math.round(baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value/60) * perMinRate.car)),
        bike : Math.round(baseFare.bike + ((distanceTime.distance.value/1000) * perKmRate.bike) + ((distanceTime.duration.value/60) * perMinRate.bike)),
    }

    return fare;
}

function getOtp (num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;
    }

    return generateOtp(num)
}

const RideCreate = async ({user, pickup, destination, vehicleType, paymentMethod} ) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required")
    }

    const distanceTime = await getTimeDistance(pickup, destination);
    const fare = await getFare(pickup, destination)

    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        otp : getOtp(6),
        fare : fare[ vehicleType ],
        paymentMethod,
        distance : Math.round(distanceTime.distance.value / 1000)
    })

    return ride;
}

const rideConfirm = async ({rideId, captain}) => {
    if(!rideId) {
        throw new Error("Ride id is required")
    }

    await RideModel.findOneAndUpdate({_id : rideId}, {
        status : 'accepted',
        captain : captain._id
    })

    const ride = await RideModel.findOne({_id : rideId}).populate('user').populate('captain').select('+otp')

    if(!ride) {
        throw new Error('Ride not found')
    }

    return ride;
}

const rideStart = async ({rideId, otp, captain}) =>{
    if(!rideId || !otp){
        throw new Error("Ride and otp is required")
    }

    const ride = await RideModel.findOne({_id : rideId}).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error("Ride not found")
    }

    if(ride.status !== 'accepted'){
        throw new Error("Ride not accepted")
    }

    if(ride.otp !== otp){
        throw new Error("Invalid otp")
    }

    await RideModel.findOneAndUpdate({_id : rideId}, {
        status : 'Ongoing'
    })
    
    return ride;
     
}

const rideEnd = async ({rideId, captain}) => {
    if(!rideId){
        throw new Error("Ride id is required")
    }

    const ride = await RideModel.findOne({_id : rideId, captain : captain._id}).populate('user').populate('captain').select("+otp")

    if(!ride){
        throw new Error("Ride not found")
    }

    if(!ride.status === 'ongoing'){
        throw new Error("Ride not ongoing")
    }

    await RideModel.findOneAndUpdate({_id : rideId}, {
        status : 'Completed'
    })

    return ride;
}


export {RideCreate, getFare, rideConfirm, rideStart, rideEnd}