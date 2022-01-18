import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostingService } from './posting.service';
import { CreatePostingDto, UpdatePostingDto, PostingDto } from './dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';

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
  findAll() {
    return this.postingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostingDto: UpdatePostingDto) {
    return this.postingService.update(+id, updatePostingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postingService.remove(+id);
  }
}
