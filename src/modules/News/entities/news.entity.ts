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
	name: string;

	@Column({
		type: "text",
	})
	text: string;

	@Column()
	tag: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}