import express from 'express'
import { body, query } from 'express-validator'
import { calculateFare, confirmRide, createRide, endRide } from '../controller/ride.controller.js'
import { authCaptain, authUser } from '../middlewares/auth.middleware.js'
import { startRide } from '../controller/ride.controller.js'

const router = express.Router()

router.post('/create',authUser, [
    body('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min : 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isLength({min : 3}).withMessage('Invalid vehicle type'),
    body("paymentMethod").isIn(['Cash', 'UPI']).withMessage("Payment method must be Cash or UPI"),
], createRide)

router.get('/get-fare', authUser,[
    query('pickup').isString().isLength({min : 3}).withMessage("Invalid pickup address"),
    query('destination').isString().isLength({min : 3}).withMessage("Invalid destination address")
], calculateFare)

router.post('/confirm', authCaptain, [
    body('rideId').isMongoId().withMessage("Invalid ride id"),
], confirmRide )

router.get('/start-ride', authCaptain, [
    query('rideId').isMongoId().withMessage("Invalid ride id"),
    query('otp').isString().isLength({min : 6, max : 6}).withMessage('Invalid otp')
], startRide    
)

router.post("/end-ride", authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    endRide
)

export default router