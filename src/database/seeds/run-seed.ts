import { NestFactory } from "@nestjs/core";
import { AllSeedService } from "./all/all-seed.service";
import { SeedModule } from "./seed.module";

const runSeed = async () => {
	const app = await NestFactory.create(SeedModule);

	// run

	await app.get(AllSeedService).synchronizeDb();
	await app.get(AllSeedService).seedRoleAndUser();
	// await app.get(AllSeedService).test();

	await app.close();
};

void runSeed();
