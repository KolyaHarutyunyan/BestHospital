import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IHistory } from '..';
import { HistoryDto } from '../dto';

@Injectable()
export class HistorySanitizer implements ISanitize {
  constructor() {}

  sanitize(history: IHistory): HistoryDto {
    const historyrDTO: HistoryDto = {
      id: history.id,
      funderId: history.funderId,
      title: history.title,
      time: history.time,
      date: history.date
    };
    return historyrDTO;
  }


  sanitizeMany(histories: IHistory[]): HistoryDto[] {
    const historyDTOs: HistoryDto[] = [];
    for (let i = 0; i < histories.length; i++) {
        historyDTOs.push(this.sanitize(histories[i]));
    }
    return historyDTOs;
  }
}
