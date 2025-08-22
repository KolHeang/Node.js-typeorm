import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Province } from "./Province";
import { Commune } from "./Commune";

@Entity("district")
export class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name_kh: string;

    @Column({ type: "varchar" })
    name_en: string;

    @ManyToOne(() => Province, (province) => province.districts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "province_id" })
    province: Province;

    @OneToMany(() => Commune, (commune) => commune.district)
    communes: Commune[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
