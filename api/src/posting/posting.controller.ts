import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostingService } from './posting.service';
import { CreatePostingDto, UpdatePostingDto, PostingDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import { ParseObjectIdPipe } from 'src/util';

@Controller('posting')
@ApiTags('Posting Endpoints')
export class PostingController {
  constructor(private readonly postingService: PostingService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createPostingDto: CreatePostingDto) {
    return this.postingService.create(createPostingDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [PostingDto] })
  findAll() {
    return this.postingService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PostingDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postingService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PostingDto })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updatePostingDto: UpdatePostingDto) {
    return this.postingService.update(id, updatePostingDto);
  }
  @Patch(':id/file/add/:fileId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PostingDto })
  addDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('fileId', ParseObjectIdPipe) fileId: string,
  ) {
    return this.postingService.addDocument(id, fileId);
  }
  @Patch(':id/file/delete/:fileId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PostingDto })
  deleteDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('fileId', ParseObjectIdPipe) fileId: string,
  ) {
    return this.postingService.deleteDocument(id, fileId);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postingService.remove(+id);
  // }
}
