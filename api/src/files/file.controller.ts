import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IRequest, ParseObjectIdPipe } from '../util';
import { FileService } from './file.service';
import { CreateImageDTO, FileDTO, EditImageDTO } from './dto';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('files')
@ApiTags('File Endpoints')
export class FileController {
  constructor(private readonly imagesService: FileService) {}

  // @Post('upload')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(@UploadedFile() file) {
  //   const fileURLs = await this.imagesService.saveImage(file);
  //   // createRestaurantDTO.logoUrl = fileURLs ? fileURLs.imageUrl : null;
  //   return fileURLs;
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  @ApiHeader({ name: ACCESS_TOKEN })
  async uploadImage(
    @Query('includeThumbnail') includeThumbnail: boolean,
    @UploadedFile() file,
    @Req() req: IRequest,
  ): Promise<FileDTO> {
    const uploadedFile = await this.imagesService.create(req.user.id, file, includeThumbnail);
    return uploadedFile;
  }
  @Post('uploadMany')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Query('includeThumbnail') includeThumbnail: boolean,
    @UploadedFiles() files,
    @Req() req: IRequest,
  ) {
    const uploadedFiles = await this.imagesService.createMany(req.user.id, files, includeThumbnail);
    return uploadedFiles;
  }
  @Get(':resource')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [FileDTO] })
  async get(@Param('resource', ParseObjectIdPipe) resource: string): Promise<FileDTO[]> {
    const file = await this.imagesService.get(resource);
    return file;
  }

  /** Edit a File profile */
  // @Patch(':id')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // // @ApiBody({ type: EditFactoringDTO })
  // @ApiOkResponse({ type: FileDTO })
  // async edit(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @Body() editDTO: EditImageDTO,
  // ): Promise<FileDTO> {
  //   const file = await this.imagesService.edit(id, editDTO);
  //   return file;
  // }

  @Delete(':id')
  // @ApiOkResponse({type: FileDTO})
  @ApiHeader({ name: ACCESS_TOKEN })
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<any> {
    const file = await this.imagesService.deleteImages(id);
    return file;
  }
}
