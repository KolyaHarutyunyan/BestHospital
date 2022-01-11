import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';
import { IComment } from './interface';
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from './dto';
import { CommentSanitizer } from './interceptor/comment.sanitizer';

@Injectable()
export class CommentService {
  constructor(
    private readonly sanitizer: CommentSanitizer,
  ) {
    this.model = CommentModel;
  }
  private model: Model<IComment>;

  // create a comment
  async create(dto: CreateCommentDTO, user: string): Promise<CommentDTO> {
    try {
      const onMod = dto.onModel;
      const resource = await this[onMod].findById(dto.resource);
      let comment = new this.model({
        text: dto.text,
        subject: dto.subject,
        resource: dto.resource,
        onModel: dto.onModel,
        user,
      });
      comment = await (await comment.save()).populate('user').execPopulate();
      return this.sanitizer.sanitize(comment);
    } catch (e) {
      throw e;
    }
  }

  // find all comments
  async findAll(
    onModel: string,
    resource: string,
    skip: number,
    limit: number,
  ): Promise<CommentDTO[]> {
    try {
      const comments = await this.model
        .find({ onModel, resource })
        .skip(skip)
        .limit(limit)
        .populate('user', 'firstName lastName');
      return this.sanitizer.sanitizeMany(comments);
    } catch (e) {
      throw e;
    }
  }

  // update the comments
  async update(_id: string, dto: UpdateCommentDTO, user: string): Promise<CommentDTO> {
    const comment = await this.model.findById({ _id, user });
    this.checkComment(comment);
    comment.text = dto.text;
    comment.subject = dto.subject;
    await comment.save();
    return this.sanitizer.sanitize(comment);
  }

  // remove the comments
  async remove(_id: string, user: string): Promise<string> {
    try {
      const comment = await this.model.findByIdAndDelete({ _id, user });
      this.checkComment(comment);
      return comment._id;
    } catch (e) {
      throw e;
    }
  }

  /** Private methods */
  /** if the comment is not found, throws an exception */
  private checkComment(comment: IComment) {
    if (!comment) {
      throw new HttpException('Comment was not found', HttpStatus.NOT_FOUND);
    }
  }
}
