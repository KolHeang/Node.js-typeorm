import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { District } from "./District";
import { Village } from "./Village";

@Entity("commune")
export class Commune {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name_kh: string;

    @Column({ type: "varchar" })
    name_en: string;

    @ManyToOne(() => District, (district) => district.communes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "district_id" })
    district: District;

    @OneToMany(() => Village, (village) => village.commune)
    villages: Village[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
