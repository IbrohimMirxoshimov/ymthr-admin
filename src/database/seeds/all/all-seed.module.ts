import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AllSeedService } from "./all-seed.service";
import { User } from "src/modules/users/entities/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [AllSeedService],
	exports: [AllSeedService],
})
export class AllSeedModule {}
