import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';
import { MongooseUtil } from '../util';
import { IComment } from './interface';
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from './dto';
import { CommentStatus } from './comment.constants';
import { ClientService } from '../client/client.service';
import { FundingService } from '../funding/funding.service';
import { StaffService } from '../staff/staff.service';
import { CommentSanitizer } from './interceptor/comment.sanitizer';

@Injectable()
export class CommentService {
  constructor(
    private readonly Client: ClientService,
    private readonly Staff: StaffService,
    private readonly Funder: FundingService,
    private readonly sanitizer: CommentSanitizer,

  ) {
    this.model = CommentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IComment>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateCommentDTO, user: string): Promise<CommentDTO> {
    try {
      const onMod = dto.onModel;
      const resource = await this[onMod].findById(dto.resource);
      const comment = new this.model({
        text: dto.text,
        subject: dto.subject,
        resource: dto.resource,
        onModel: dto.onModel,
        user
      })
      await comment.save()
      return this.sanitizer.sanitize(comment);
    } catch (e) {
      throw e;
    }
  }

  async findAll(onModel: string, resource: string, skip: number, limit: number): Promise<CommentDTO[]> {
    try {
      if (isNaN(skip)) skip = 0;
      if (isNaN(limit)) limit = 10;
      const comments = await this.model.find({ onModel, resource }).skip(skip).limit(limit).populate('user', 'firstName lastName');
      this.checkComment(comments[0])
      return this.sanitizer.sanitizeMany(comments);
    } catch (e) {
      throw e;
    }
  }

  async update(_id: string, dto: UpdateCommentDTO, user: string): Promise<CommentDTO> {
    const comment = await this.model.findById({ _id, user });
    this.checkComment(comment);
    comment.text = dto.text;
    comment.subject = dto.subject;
    await comment.save();
    return this.sanitizer.sanitize(comment)
  }

  async remove(_id: string, user: string) {
    try {
      const comment = await this.model.findByIdAndDelete({ _id, user });
      this.checkComment(comment)
      return comment._id;
    } catch (e) {
      throw e;
    }
  }

  /** Private methods */
  /** if the comment is not found, throws an exception */
  private checkComment(comment: IComment) {
    if (!comment) {
      throw new HttpException(
        'Comment was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
