import axios from "axios";
import { response } from "express";
import { CaptainModel } from "../models/captain.model.js";

const  getCoordinateAddress = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url)
        if(response.data.status === 'OK'){
            const location = response.data.results[ 0 ].geometry.location;
            return{
                ltd : location.lat,
                lng : location.lng
            }
        }
        else{
            throw new Error('Unable to fetch the coordinates')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getTimeDistance = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error("Origin and destination required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS'){
                throw new Error("No routes found")
            }
            return response.data.rows[ 0 ].elements[ 0 ]
        }
        else {
            throw new Error('Unable to fetch distance and time')
        }

    } catch (error) {
        console.log(error)
        throw error
    }

}

const autoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error('Input not found')
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url)
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else {
            throw new Error("Unable to fetch suggestions")
        }
    } catch (error) {
        console.log(err)
        throw err
    }
}

const getCaptainsInTheRadius = async (ltd, lng, radius) => {

    //Radius should be in km

    const captains = await CaptainModel.find({
        location : {
            $geoWithin : {
                $centerSphere : [[ ltd, lng], radius / 6371]
            }
        }
    })

    return captains;
}

export {getCoordinateAddress, getTimeDistance, autoCompleteSuggestions, getCaptainsInTheRadius}