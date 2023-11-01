import express from "express";
import { SignIn, SignOut, SignUp } from "../controllers/AuthController.js"
import { userVerification } from "../middlewares/AuthMiddleware.js";


const router = express.Router();

router.post("/signup", SignUp );
router.post("/signin", SignIn );
router.delete("/signout", SignOut );

router.get('/user/info', userVerification, async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id).select('-password');
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
});

export default router