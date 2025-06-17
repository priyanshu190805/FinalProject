import { UserModal } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { BlackListTokenModel } from "../models/blacklistToken.model.js";
import { CaptainModel } from "../models/captain.model.js";

const authUser = async (req, res, next) => {
<<<<<<< HEAD
    const token = req.cookies.userAccessToken || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message : 'Unauthorized'})
    }
=======
  const token =
    req.cookies.userAccessToken || req.headers.authorization?.split(" ")[1];
>>>>>>> c141779 (favicon updated)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModal.findById(decoded._id);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authCaptain = async (req, res, next) => {
<<<<<<< HEAD
    const token = req.cookies.captainAccessToken || req.headers.authorization?.split(" ")[1];

=======
  const token =
    req.cookies.captainAccessToken || req.headers.authorization?.split(" ")[1];
>>>>>>> c141779 (favicon updated)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await CaptainModel.findById(decoded._id);

    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

<<<<<<< HEAD
export { authUser, authCaptain }
=======
export { authUser, authCaptain };
>>>>>>> c141779 (favicon updated)
