import express from "express";
import usersRoutes from "./src/routes/users.routes.js";

const app = express();
const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Home");
})

app.use('/api',usersRoutes);

app.listen(PORT);
console.log(`Server listeninig on PORT: ${PORT}`);