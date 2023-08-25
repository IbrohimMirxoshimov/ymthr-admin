import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SystemRolesEnum } from 'src/modules/roles/roles.enum';
import { ApiEnum } from 'src/utils/swagger/ApiEnum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Admin' })
  @Column()
  name: string;

  @ApiEnum(SystemRolesEnum)
  @Column()
  @IsEnum(SystemRolesEnum)
  system: SystemRolesEnum;

  // @ApiProperty({
  //   example: [1, 2, 3],
  //   description: 'Array of permissions values',
  // })
  // @Column('int', { array: true, nullable: true })
  // permissions: number[];
}
