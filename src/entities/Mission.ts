import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {MissionAssignment} from "./MissionAssignment";

@Entity('missions')
export class Mission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar' })
    location: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({ type: 'decimal' , precision:5, scale: 2, default: 0})
    duration: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'assigned_by'})
    assignedBy: User;

    @OneToMany(() => MissionAssignment, assignment => assignment.mission, {cascade: true})
    assignments: MissionAssignment[];
}