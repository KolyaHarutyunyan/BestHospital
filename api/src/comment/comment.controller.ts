import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { CommentService } from './comment.service';
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from './dto';

@Controller('comment')
@ApiTags('Comment Endpoints')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: CommentDTO })
  async create(@Body() createCommentDto: CreateCommentDTO) {
    const user = "610ba0a7b8944a30bcb15da4";
    return await this.commentService.create(createCommentDto, user);
  }

  @Get(':resourceId/:onModel')
  @Public()
  @ApiOkResponse({ type: CommentDTO })
  @ApiQuery({
    name: "skip",
    description: "where",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "limit",
    description: "how",
    required: false,
    type: Number
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Param('resourceId', ParseObjectIdPipe) resourceId: string,
    @Param('onModel') onModel: string
  ) {
    return await this.commentService.findAll(onModel, resourceId, skip, limit);
  }

  /** Update Client By Id */
  @Patch(':id')
  @Public()
  @ApiOkResponse({type: CommentDTO})
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateCommentDto: UpdateCommentDTO) {
    const user = "610ba0a7b8944a30bcb15da4";
    return this.commentService.update(id, updateCommentDto, user);
  }

  /** Delete the comment */
  @Delete(':id/comments')
  @Public()
  @ApiOkResponse({ type: String })
  async remove(
    @Param('id', ParseObjectIdPipe) id: string): Promise<string> {
    const user = "610ba0a7b8944a30bcb15da4"
    return await this.commentService.remove(id, user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentService.remove(+id);
  // }
}
