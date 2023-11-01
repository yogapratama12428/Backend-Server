import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

export const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN, {
        expiresIn: 1 * 24 * 60 * 60,
    });
}

