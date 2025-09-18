// utils/auditLogger.ts
import { AppDataSource } from "../config/database"
import { AuditLog } from "../entities/Auditlog";

export async function logAudit({
    userId,
    action,
    tableName,
    recordId = null,
    oldData = null,
    newData = null,
}: {
        userId: number;
        action: string;
        tableName: string;
        recordId?: number | null;
        oldData?: any;
        newData?: any;
    }) {
    try {
        const repo = AppDataSource.getRepository(AuditLog);
        const log = repo.create({
            userId,
            action,
            tableName,
            recordId,
            oldData,
            newData,
        });
        await repo.save(log);
    } catch (err) {
        console.error("Failed to log audit:", err);
    }
}
