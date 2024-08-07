import session from 'express-session';
import { configDotenv } from 'dotenv';

configDotenv();

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 día
        secure: false,
        httpOnly: true
    }
});
