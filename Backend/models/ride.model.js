import mongoose from "mongoose";

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
    }
})

export const RideModel = mongoose.model('RideModel', rideSchema)