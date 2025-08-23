import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity("position")
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, name:"name_en" })
    nameEn: string;

    @Column({ type: "varchar", unique: true, name:"name_kh" })
    nameKh: string;

    @CreateDateColumn({ type: "timestamp", default: Date.now })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: Date.now })
    updated_at: Date;

    @OneToMany(() => Employee, (employee) => employee.position)
    employees: Employee[];
}
