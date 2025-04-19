import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
const app = express();
import { connectToDb } from "./db/db.js";
import userRoutes  from "./routes/user.routes.js"
import captainRoutes  from "./routes/captain.routes.js"
import cookieParser from "cookie-parser";
import mapsRoutes from './routes/maps.routes.js'
import rideRoutes from './routes/ride.routes.js'

connectToDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapsRoutes)
app.use('/rides', rideRoutes)

export { app }