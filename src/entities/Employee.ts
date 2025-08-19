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
    name: string;

    @Column({ type: "varchar", nullable: true })
    email: string;

    @Column({ type: "varchar", nullable: true })
    phone: string;

    @ManyToOne(() => Department, (department) => department.employees)
    @JoinColumn({ name: "department_id" })
    department: Department;

    @ManyToOne(() => Position, (position) => position.employees)
    @JoinColumn({ name: "position_id" })
    position: Position;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Attendance, (attendance) => attendance.employee)
    attendances: Attendance[];
}
