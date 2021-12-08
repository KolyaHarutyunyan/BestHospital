import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../authN/dto/user.dto';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ParseObjectIdPipe } from '../util';
import { CommentService } from './comment.service';
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from './dto';

@Controller('comment')
@ApiTags('Comment Endpoints')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: CommentDTO })
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return await this.commentService.create(createCommentDto, createCommentDto.user.id);
  }

  @Get(':resourceId/:onModel')
  @ApiHeader({ name: ACCESS_TOKEN })
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
    @Param('resourceId') resourceId: string,
    @Param('onModel') onModel: string
  ) {
    return await this.commentService.findAll(onModel, resourceId, skip, limit);
  }

  /** Update Client By Id */
  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: CommentDTO})
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateCommentDto: UpdateCommentDTO) {
    return this.commentService.update(id, updateCommentDto, updateCommentDto.user.id);
  }

  /** Delete the comment */
  @Delete(':id/comments')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  async remove(
    @Param('id', ParseObjectIdPipe) id: string, @Body() body: any): Promise<string> {
    return await this.commentService.remove(id, body.user.id);
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
