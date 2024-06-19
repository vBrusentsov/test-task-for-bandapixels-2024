import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', length: 255, nullable: true })
    link?: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title?: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    subtitle?: string | null;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    description?: string | null;

    @Column({ type: 'float', nullable: true })
    price?: number | null;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    specification?: string | null;

    @Column({ type: 'varchar', length: 128, nullable: true })
    type?: string | null;

    @Column({ type: 'varchar', length: 1024, nullable: true })
    profileImage?: string | null;

    @Column({ type: 'enum', enum: ['rozetka', 'telemart'], nullable: true })
    source?: string | null;
}
