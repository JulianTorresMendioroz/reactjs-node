import {db} from '../../db.js';
import { StatusCodes } from 'http-status-codes';


export const getAllProducts = async (req, res) => {
    const [products] = await db.query("SELECT * FROM products");
    if(!products){
        res.send(StatusCodes.NOT_FOUND);
    }else{
        res
            .status(StatusCodes.OK)
            .send(products);
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (!product) {
            res.status(StatusCodes.NOT_FOUND).send();
        } else {
            res.status(StatusCodes.OK).send(product);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch product' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock} = req.body;

        console.log('Request Body:', req.body);

        const [product] = await db.query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description, price, stock]
        );

        res.status(StatusCodes.CREATED).send({
            id: product.insertId,
            name: name,
            description: description,
            price: price,
            stock: stock
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to create product' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send({ error: 'Product not found' });
        }
        
        await db.query('DELETE FROM products WHERE id = ?', [id]);

        res.status(StatusCodes.OK).send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to delete user' });
    }
};


