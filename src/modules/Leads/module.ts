import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeadsController } from "./controller";
import { LeadService } from "./service";
import { LeadEntity } from "./entities/leads.entity";

@Module({
	imports: [TypeOrmModule.forFeature([LeadEntity])],
	controllers: [LeadsController],
	providers: [LeadService],
	exports: [LeadService],
})
export class LeadsModule {}
