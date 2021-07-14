import { HttpException, HttpStatus } from '@nestjs/common';
import { MONGO_DUPLICATE_KEY } from '../constants';

export class MongooseUtil {
  checkDuplicateKey = (err, message: string) => {
    if (err && err.code == MONGO_DUPLICATE_KEY) {
      throw new HttpException(message, HttpStatus.CONFLICT);
    }
  };
}
