import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	Response,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ExpressRequestUserPayload } from "src/utils/types/express.type";
import { FilesService } from "./files.service";

@ApiTags("Files")
@Controller({
	path: "files",
})
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Post("upload")
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				file: {
					type: "string",
					format: "binary",
				},
			},
		},
	})
	@UseInterceptors(FileInterceptor("file"))
	async uploadFile(
		@UploadedFile() file: any,
		@Req() req: ExpressRequestUserPayload
	) {
		return this.filesService.uploadFile(file, req.user.id);
	}

	@Get(":path")
	download(@Param("path") path: string, @Response() response: any) {
		return response.sendFile(path, { root: "./files" });
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete(":path")
	delete(@Param("id") id: string) {
		return this.filesService.delete(id);
	}
}
