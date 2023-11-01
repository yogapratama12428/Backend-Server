import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import { createSecretToken } from '../utils/SecretToken.js';
import { createRefreshToken } from '../utils/RefreshToken.js';
import dotenv from 'dotenv'
dotenv.config()


export const SignUp = async (req, res, next) => {

  const { email, password, username, createdAt } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const user = await User.create({ 
      email, 
      password: password_hash, 
      username, 
      createdAt 
    });
    
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });

    next();

  } catch (error) {
    console.error(error);
  }
};

export const SignIn = async (req, res) => { 

  const { email, password } = req.body;

    try {
      // check if the user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      // check is the encrypted password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      // return jwt
      const token = createSecretToken(user._id);
      
      const refresh_token = createRefreshToken(user._id);

      const update_token = await User.findOneAndUpdate({ 
        refresh_token: refresh_token
      });

      console.log(update_token)
    
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      res.status(200).json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

export const SignOut = async (req, res) => {

  const refresh_token = req.cookies.token;
  
  if(!refresh_token) return res.sendStatus(204)

  const user = await User.findOneAndDelete({
    refresh_token: refresh_token
  })
    

  if(!user) return res.sendStatus(204)

  res.clearCookie('token');
  return res.sendStatus(200);
}

