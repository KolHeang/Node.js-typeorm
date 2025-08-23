import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity("department")
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true,name: "name_en" })
    nameEn: string;

    @Column({ type: "varchar", unique: true, name: "name_kh" })
    nameKh: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[];
}
