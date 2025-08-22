import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Commune } from "./Commune";

@Entity("village")
export class Village {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name_kh: string;

    @Column({ type: "varchar" })
    name_en: string;

    @ManyToOne(() => Commune, (commune) => commune.villages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "commune_id" })
    commune: Commune;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
