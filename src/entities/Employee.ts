import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Attendance } from "./Attendance";
import { Department } from "./Department";
import { Position } from "./Position";

@Entity("employees")
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    employee_code: string; // used for attendance linking

    @Column({ type: "varchar" })
    full_name_en: string;

    @Column({ type: "varchar" })
    full_name_kh: string;

    @Column({ type: "varchar", nullable: true , unique: true })
    email: string;

    @Column({ type: "enum", enum: ["M", "F"] })
    gender: string;

    @Column({ type: "date", nullable: true })
    date_of_birth: Date;

    @Column({ type: "varchar", nullable: true, unique: true })
    phone_number: string;

    @ManyToOne(() => Department, (department) => department.employees, { onDelete: "SET NULL" })
    @JoinColumn({ name: "department_id" })
    department: Department;

    @ManyToOne(() => Position, (position) => position.employees, { onDelete: "SET NULL" })
    @JoinColumn({ name: "position_id" })
    position: Position;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    start_work: Date;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
    
    @OneToMany(() => Attendance, (attendance) => attendance.employee)
    attendances: Attendance[];
}
