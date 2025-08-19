import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity("attendance")
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    employee_code: string;

    @Column({ type: "date", default: () => "CURRENT_DATE" })
    attendance_date: Date;

    // store all check-in/out pairs
    @Column({ type: "json", default: [] })
    time_logs: { checkin: string; checkout: string; session: "morning" | "afternoon"; isLate: boolean }[];

    @Column({ type: "time", default: null, nullable: true })
    total_time: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Employee, (employee) => employee.attendances)
    @JoinColumn({ name: "employee_code", referencedColumnName: "employee_code" })
    employee: Employee;

}
