import { Request,Response } from "express";
import { AppDataSource } from "./config/database";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("password", process.env.DB_PASSWORD);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

AppDataSource.initialize()
.then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch((err) => {
    console.log("Database connected failed:", err);
});