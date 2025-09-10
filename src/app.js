import express from "express";
import 'dotenv/config';
import denunciasRouter from "../src/routers/denunciasRouter.js"
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
      origin: "https://www.devcorebits.com"
})); 
app.use(express.urlencoded({ extended: true }));

app.use("/health", (req, res) => res.send("OK"));
app.use("/denuncias", denunciasRouter);

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
