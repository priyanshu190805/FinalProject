import express from "express"
import { body } from "express-validator"
import { changePassword, changeUsername, deleteProfilePhoto, getUserProfile, loginUser, logoutUser, registerUser, uploadProfilePhoto } from "../controller/user.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min : 3}).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({min : 6}).withMessage("Password must be atleast 6 characters long")

], registerUser)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body("password").isLength({min : 6}).withMessage("Password must be atleast 6 characters long")
], loginUser)

router.post('/change-password', [
    body('oldPassword').isLength({min : 6}).withMessage('Password must be atleast 6 characters long'),
    body('newPassword').isLength({min : 6}).withMessage('Password must be atleast 6 characters long')
], authUser, changePassword)

router.post('/change-username', [
    body('fullname.firstname').isLength({min :3}).withMessage('First name must be atleast 3 characters long'),
], authUser, changeUsername)

router.get('/profile', authUser, getUserProfile)
router.get('/logout', authUser, logoutUser)

router.post('/upload-photo', authUser, upload.single('image'), uploadProfilePhoto)
router.get('/delete-photo', authUser, deleteProfilePhoto)

export default router 