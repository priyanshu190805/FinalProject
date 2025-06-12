import mongoose, { Schema } from "mongoose";

const rideSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserModal',
        required : true
    },
    captain : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'CaptainModel',
    },
    pickup : {
        type : String,
        required : true
    },
    destination : {
        type : String,
        required : true
    },
    fare : {
        type : Number,
        required : true
    },
    paymentMethod: {
        type : String,
        required : true,
        enum : ['Cash', 'UPI'],
    },
    status : {
        type : String,
        enum : ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default : 'pending'
    },
    duration : {
        type : Number,
    },
    distance : {
        type : Number,
        require : true
    },
    paymentID : {
        type : String
    },
    orderId : {
        type : String
    },
    signature : {
        type : String
    },
    otp : {
        type : String,
        select : false,
        required : true
    },
    notifiedCaptains : [{
        type : mongoose.Schema.ObjectId,
        ref : 'CaptainModel'
    }]
})

export const RideModel = mongoose.model('RideModel', rideSchema)