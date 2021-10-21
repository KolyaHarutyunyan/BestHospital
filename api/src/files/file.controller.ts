import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public, ParseObjectIdPipe } from '../util';
import { FileService } from './file.service';
import { CreateImageDTO, FileDTO, EditImageDTO } from './dto';

@Controller('files')
@ApiTags('File Endpoints')
export class FileController {
  constructor(private readonly imagesService: FileService) { }

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    const fileURLs = await this.imagesService.saveImage(file);
    // createRestaurantDTO.logoUrl = fileURLs ? fileURLs.imageUrl : null;
    return fileURLs;
  }

  @Post()
  @Public()
  @ApiOkResponse({ type: FileDTO })
  async create(
    @Body() createDTO: CreateImageDTO): Promise<FileDTO> {
    const image = await this.imagesService.create(createDTO);
    return image;
  }

  @Get(':resource')
  @Public()
  @ApiOkResponse({ type: [FileDTO] })
  async get(@Param('resource', ParseObjectIdPipe) resource: string
  ): Promise<FileDTO[]> {
    const file = await this.imagesService.get(resource);
    return file;
  }

  /** Edit a File profile */
  @Patch(':id')
  // @ApiBody({ type: EditFactoringDTO })
  @ApiOkResponse({ type: FileDTO })
  async edit(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() editDTO: EditImageDTO,
  ): Promise<FileDTO> {
    const file = await this.imagesService.edit(id, editDTO);
    return file;
  }

  @Delete(':id')
  // @ApiOkResponse({type: FileDTO})
  @Public()
  async delete(
    @Param('id', ParseObjectIdPipe) id: string): Promise<any> {
    const file = await this.imagesService.deleteImages(id);
    return file;
  }
}
