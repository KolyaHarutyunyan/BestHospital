import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IComment } from '..';
import { CommentDTO } from '../dto';
import { AddressSanitizer } from '../../address';

@Injectable()
export class CommentSanitizer implements ISanitize {
  constructor(private readonly addressSanitizer: AddressSanitizer) {}

  sanitize(comment: IComment): CommentDTO {
    const CommentDTO: CommentDTO = {
        id: comment.id,
        subject: comment.subject,
        text: comment.text,
        resource: comment.resource,
        onModel: comment.onModel,
        user: comment.user,
        created: comment.created
    };
    return CommentDTO;
  }


  sanitizeMany(comments: IComment[]): CommentDTO[] {
    const CommentDTOs: CommentDTO[] = [];
    for (let i = 0; i < comments.length; i++) {
        CommentDTOs.push(this.sanitize(comments[i]));
    }
    return CommentDTOs;
  }
}
