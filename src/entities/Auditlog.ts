// entities/AuditLog.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("audit_log") // 👈 changed here
export class AuditLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    action: string; // create, update, delete, get

    @Column()
    tableName: string;

    @Column({ nullable: true })
    recordId: number;

    @Column("jsonb", { nullable: true })
    oldData: any;

    @Column("jsonb", { nullable: true })
    newData: any;

    @CreateDateColumn({ type: "timestamp"})
    createdAt: Date;
}
