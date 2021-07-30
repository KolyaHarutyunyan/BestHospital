import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
}
