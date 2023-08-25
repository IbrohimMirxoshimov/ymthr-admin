import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { IsNotExist } from "src/utils/validators/is-not-exists.validator";
import { MainController } from "./controller";
import { NewsEntity } from "./entities/news.entity";
import { NewsService } from "./service";

@Module({
	imports: [TypeOrmModule.forFeature([NewsEntity])],
	controllers: [MainController],
	providers: [IsExist, IsNotExist, NewsService],
	exports: [NewsService],
})
export class NewsModule {}
