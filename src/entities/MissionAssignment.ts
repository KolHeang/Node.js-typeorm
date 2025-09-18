import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn
} from "typeorm";
import { Mission } from "./Mission";
import { Employee } from "./Employee";

@Entity("mission_assignments")
export class MissionAssignment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Mission, mission => mission.assignments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "mission_id" })
    mission: Mission;

    @ManyToOne(() => Employee, { eager: true })
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

    @Column({ type: "enum",enum: ["pending", "in_progress", "completed", "cancelled"], default: "pending"})
    status: string;

    @CreateDateColumn()
    created_at: Date;
}
