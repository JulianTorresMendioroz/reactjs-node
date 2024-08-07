import { db } from '../../db.js';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Invalid email or password' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Invalid email or password' });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            rol: user.rol
        };

        res.send({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Internal server error' });
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to destroy session' });
        }
        res.send({ message: 'Logout successful' });
    });
};

export const getProfile = (req, res) => {
    if (!req.session.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Not authenticated' });
    }

    res.send([req.session.user]);
};
