
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true })
    username!: string;
    @Column()
    password!: string;
    @Column({ unique: true })
    email!: string;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}