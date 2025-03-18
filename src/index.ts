import "reflect-metadata";
import { Request,Response } from "express";
import { AppDataSource } from "./config/database";
import express from "express";
import { authentification } from "./middleware/auth.middleware";
import { userRoutes } from "./routes/user.routes";
import { authRoutes } from "./routes/auth.routes";
import{ roleRoutes } from "./routes/role.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Authentification middleware
app.use(authentification);
app.use("/api", roleRoutes);

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