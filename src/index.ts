import "reflect-metadata";
import { Request,Response } from "express";
import { AppDataSource } from "./config/database";
import express from "express";
import { authMiddleware } from "./middleware/auth.middleware";
import { userRoutes } from "./routes/user.routes";
import { authRoutes } from "./routes/auth.routes";
import{ roleRoutes } from "./routes/role.routes";
import { errorHandler } from "./middleware/errorHandler";
import { permissionRoutes } from "./routes/permission.routes";
import { departmentRouter} from "./routes/department.routes";
import {positionRouter} from "./routes/position.routes";
import {employeeRouter} from "./routes/employee.routes";
import { auditMiddleware } from "./middleware/audit.middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Attach fake user (replace with real JWT/session auth)
app.use((req, res, next) => {
    (req as any).user = { id: 1 };
    next();
});

// Apply audit middleware globally
app.use(auditMiddleware);

// Authentification middleware
app.use(authMiddleware);
app.use("/api", roleRoutes);
app.use("/api", permissionRoutes);
app.use("/api", departmentRouter);
app.use("/api", positionRouter);
app.use("/api", employeeRouter);


// Error handler (always last)
app.use(errorHandler);
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