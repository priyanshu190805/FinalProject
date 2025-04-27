import express from "express"
import { body} from "express-validator"
import { changeCaptainDp, changeCaptainPassword, changeVehicleDetails, getCaptainProfile, loginCaptain, logoutCaptain, refreshAccessToken, registerCaptain, updateCaptainName } from "../controller/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router()

router.post("/register", upload.single('profileImage'), [
    body("firstname").isLength({min: 3}).withMessage("First name must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min : 6}).withMessage("Password must be atleast 6 characters long"),
    body("color").isLength({min : 3}).withMessage("Color must be atleast 3 characters long"),
    body("plate").isLength({min : 3}).withMessage("Plate must be atleast 3 characters long"),
    body("capacity").isInt({min : 1}).withMessage("Capacity must be atleast 1"),
    body("vehicleType").isIn(['car', 'bike', 'auto']).withMessage("Vehicle type must be car, bike or auto"),
    body("company").isLength({min : 3}).withMessage("Company must be atleast 3 characters long"),
    body("model").isLength({min : 3}).withMessage("Model must be atleast 3 characters long"),
], registerCaptain)

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min : 6}).withMessage("Invalid credentials")
], loginCaptain)

router.post('/refresh-token', refreshAccessToken)

router.get("/profile", authCaptain, getCaptainProfile)

router.get("/logout", authCaptain, logoutCaptain)

router.post('/captain-dp', authCaptain, upload.single('image'), changeCaptainDp)
router.post('/update-name', authCaptain,
    body("fullname.firstname").isLength({min: 3}).withMessage("First name must be atleast 3 characters long"),
    updateCaptainName)

router.post('/change-password', authCaptain, [
    body("oldPassword").isLength({min : 6}).withMessage("Password must be atleast 6 characters long"),
    body("newPassword").isLength({min : 6}).withMessage("Password must be atleast 6 characters long"),
], changeCaptainPassword)

router.post('/update-vehicle-details', authCaptain, [
    body("color").isLength({min : 3}).withMessage("Color must be atleast 3 characters long"),
    body("plate").isLength({min : 3}).withMessage("Plate must be atleast 3 characters long"),
    body("capacity").isInt({min : 1}).withMessage("Capacity must be atleast 1"),
    body("vehicleType").isIn(['car', 'bike', 'auto']).withMessage("Vehicle type must be car, bike or auto"),
    body("company").isLength({min : 3}).withMessage("Company must be atleast 3 characters long"),
    body("model").isLength({min : 3}).withMessage("Model must be atleast 3 characters long"),
], changeVehicleDetails)



export default router;