import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./src/routes/users.routes.js";
import productsRoutes from "./src/routes/products.routes.js";
import loginRoutes from "./src/routes/login.routes.js";
import { configDotenv } from 'dotenv';
import { sessionConfig } from './src/middleware/sessions.js';
import cors from 'cors';



configDotenv();
const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(sessionConfig);
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Home");
})

app.use('/api',usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', loginRoutes);



app.listen(PORT);
console.log(`Server listeninig on PORT: ${PORT}`);