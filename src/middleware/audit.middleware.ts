// middleware/auditMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { logAudit } from "../services/auditLogger.services";
import { AppDataSource } from "../config/database";

export function auditMiddleware(req: Request, res: Response, next: NextFunction) {
    const userId = (req as any).user?.id || null;
    const method = req.method;

    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
        // perform the audit asynchronously without making res.json return a Promise
        (async () => {
        try {
            let action = "";
            switch (method) {
                case "POST": action = "create"; break;
                case "PUT": action = "update"; break;
                case "DELETE": action = "delete"; break;
                case "GET": action = "get"; break;
            }

            const tableName = req.path.split("/")[1]; // assumes /employees/:id → employees
            let recordId = req.params?.id ? Number(req.params.id) : null;

            let oldData = null;
            if ((method === "PUT" || method === "DELETE") && recordId) {
                try {
                    const result = await AppDataSource.query(`SELECT * FROM ${tableName} WHERE id = $1`, [recordId]);
                    oldData = result[0] || null;
                } catch (err) {
                    console.error("Error fetching old data for audit:", err);
                }
            }

            let newData = null;
            if (method === "POST" || method === "PUT") {
                newData = body;
            }

            await logAudit({
                userId,
                action,
                tableName,
                recordId,
                oldData,
                newData,
            });
        } catch (err) {
            console.error("Audit log error:", err);
        }
        })();

        return originalJson(body);
    };

    next();
}
