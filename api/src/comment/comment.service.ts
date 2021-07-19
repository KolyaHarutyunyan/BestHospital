import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentModel } from './comment.model';
import { MongooseUtil } from '../util';
import { IComment } from './interface';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor() {
    this.model = CommentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IComment>;
  private mongooseUtil: MongooseUtil;
  async create(funderId: string, text: string): Promise<CommentDto> {
    try {
      const data = {
        user: '60f01ec194abb63ff8f0aa75',
        text
      }
      const comment = new this.model({
        text,
        funder: funderId,
        user: data.user
      });

      await comment.save();
      return comment
      // return this.sanitizer.sanitize(funder);
    } catch (e) {
      throw e;
    }
  }

  async findAll(funderId: string, skip: number, limit: number): Promise<CommentDto[]> {
    try {

      if(isNaN(skip)) skip = 0;
      if(isNaN(limit)) limit = 10;

      const comments = await this.model.find({ funder: funderId }).skip(skip).limit(limit).populate('user', 'firstName lastName');
      this.checkComment(comments[0])
      return comments;
      // return this.sanitizer.sanitize(funder);
    } catch (e) {
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(_id: string) {
    try {
      const comment = await this.model.findOneAndDelete({ _id });
      this.checkComment(comment)
      return comment._id;
      // return this.sanitizer.sanitize(funder);
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
