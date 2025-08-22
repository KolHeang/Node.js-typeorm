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

@Entity("employee")
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    employee_code: string; // used for attendance linking

    @Column({ type: "varchar" })
    full_name_en: string;

    @Column({ type: "varchar" })
    full_name_kh: string;

    @Column({ type: "varchar", nullable: true })
    email: string;

    @Column({ type: "enum", enum: ["Male", "Female", "Other"] })
    gender: string;

    @Column({ type: "varchar", nullable: true })
    phone_number: string;

    @ManyToOne(() => Department, (department) => department.employees)
    @JoinColumn({ name: "department_id" })
    department: Department;

    @ManyToOne(() => Position, (position) => position.employees)
    @JoinColumn({ name: "position_id" })
    position: Position;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @Column({ type: "timestamp", nullable: false })
    start_work: Date;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
    
    @OneToMany(() => Attendance, (attendance) => attendance.employee)
    attendances: Attendance[];
}
