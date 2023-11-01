import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/UserModel.js';
dotenv.config()

export const userVerification = (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.json({ status: false })
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    console.log(data)
    if (err) {
      return res.json({ status: false })
    } else {
      // const user = await User.findById(data.id)
      // if (user) return res.json({ status: true, user: user.username })
      // else return res.json({ status: false })
      return res.json(data.id)
    }
  })

}