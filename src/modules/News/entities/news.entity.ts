import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({
	name: "news",
})
export class NewsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({
		type: "text",
	})
	description: string;

	@Column()
	category: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
