import { validationResult } from "express-validator"
import { getFare, RideCreate, rideEnd, rideStart } from "../services/ride.service.js"
import { getCaptainsInTheRadius, getCoordinateAddress } from "../services/maps.service.js"
import { sendMessageToSocketId } from "../socket.js"
import { RideModel } from "../models/ride.model.js"
import { rideConfirm } from "../services/ride.service.js"


const createRide = async (req, res, next) => {

    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()})
        }

        const {pickup , destination , vehicleType, paymentMethod} = req.body

        const ride = await RideCreate({user: req.user._id, pickup, destination, vehicleType, paymentMethod});

        const pickupCoordinates = await getCoordinateAddress(pickup)

        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 1)

        const filteredCaptains = captainsInRadius.filter(
            captain => captain?.vehicle.vehicleType === vehicleType
        )

        ride.notifiedCaptains = filteredCaptains.map(captain => captain._id)
        await ride.save()

        const rideWithUser = await RideModel.findOne({_id : ride._id}).populate('user')

        filteredCaptains.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event : 'new-ride',
                data : rideWithUser
            })
        })

        return res.status(200).json(rideWithUser)
    } catch (err) {
        return res.status(400).json({message : err.message})
    }

}

const calculateFare = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()})
        }

        const {pickup, destination} = req.query

        const fare = await getFare(pickup, destination)

        res.status(201).json(fare)
    } catch (err) {
        return res.status(500).json({message : err.message})
    }
}

const confirmRide = async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await rideConfirm({rideId, captain : req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-confirmed',
            data : ride
        })

        return res.status(200).json(ride)
    } catch (err) {
        return res.status(500).json({message  : err.message})
    }
}

const startRide = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
    }

    const {rideId, otp} = req.query

    try {
        const ride = await rideStart({rideId, otp, captain : req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-started',
            data : ride,
        })

        return res.status(200).json(ride);
    } catch (err) {
        if (err.code === "INVALID_OTP") {
            return res.status(402).json({ error: "Invalid OTP" });
        }
        return res.status(500).json({ message: err.message });
    }
}

const endRide = async (req, res, next ) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await rideEnd({rideId, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-ended',
            data : ride,
        })

        return res.status(200).json(ride)
    } catch (err) {
        return res.status(500).json({message : err.message})
    }
}

const cancelRide = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await RideModel.findById(rideId).populate("notifiedCaptains")

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        ride.notifiedCaptains.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event : 'user-cancelled-ride',
                data : ride?._id
            })
        })


        await RideModel.findByIdAndDelete(rideId);

        return res.status(200).json({ message: "Ride cancelled successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const rideCancelledByCaptain = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await RideModel.findById(rideId).populate("user")

        console.log(ride)

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if(ride?.user.socketId){
            sendMessageToSocketId(ride?.user.socketId,{
                event : "ride-cancelled-by-captain",
                data : rideId,
            })
        }

        await RideModel.findByIdAndDelete(rideId)
        return res.status(200).json({ message: 'Ride cancelled by captain successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const makePayment = async (req, res) => {
    console.log("clicked")
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await RideModel.findById(rideId).populate("user")

        console.log(ride)

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if(ride?.user.socketId){
            sendMessageToSocketId(ride?.user.socketId,{
                event : "make-payment",
                data : rideId,
            })
        }
        return res.status(200).json({ message: 'Make the payment' });
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
}

export { createRide, calculateFare , confirmRide, startRide, endRide, cancelRide, rideCancelledByCaptain, makePayment}