import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IHistory } from '..';
import { HistoryDTO } from '../dto';

@Injectable()
export class HistorySanitizer implements ISanitize {
  constructor() {}

  sanitize(history: IHistory): HistoryDTO {
    const historyrDTO: HistoryDTO = {
      id: history.id,
      user: history.user,
      resource: history.resource,
      onModel: history.onModel,
      title: history.title,
      time: history.time,
      createdDate: history.createdDate,
    };
    return historyrDTO;
  }

  sanitizeMany(histories: IHistory[]): HistoryDTO[] {
    const historyDTOs: HistoryDTO[] = [];
    for (let i = 0; i < histories.length; i++) {
      historyDTOs.push(this.sanitize(histories[i]));
    }
    return historyDTOs;
  }
}
