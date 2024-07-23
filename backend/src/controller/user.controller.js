import bcrypt from 'bcrypt';
import {db} from "../../db.js";
import { StatusCodes } from 'http-status-codes';


export const getAllUsers = async (req, res) => {
    const [users] = await db.query("SELECT * FROM users");
    if(!users){
        res.send(StatusCodes.NOT_FOUND);
    }else{
        res
            .status(StatusCodes.OK)
            .send(users);
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).send();
        } else {
            res.status(StatusCodes.OK).send(user);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch user' });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, lastname, password, username, rol } = req.body;

        console.log('Request Body:', req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const [data] = await db.query(
            'INSERT INTO users (name, lastname, password, username, rol) VALUES (?, ?, ?, ?, ?)',
            [name, lastname, hashedPassword, username, rol]
        );

        res.status(StatusCodes.CREATED).send({
            id: data.insertId,
            name: name,
            lastname: lastname,
            rol: rol
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to create user' });
    }
};





