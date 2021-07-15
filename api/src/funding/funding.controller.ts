import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FundingService } from './funding.service';
import { CreateFundingDTO, FundingDTO, CreateCommentDTO } from './dto';

import { UpdateFundingDto } from './dto/edit.dto';
import { Public, ParseObjectIdPipe } from '../util';

@Controller('funding')
@ApiTags('Funding Endpoints')
export class FundingController {
  constructor(private readonly fundingService: FundingService) { }

  /** Create a new funder */
  @Post()
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async create(@Body() createFundingDTO: CreateFundingDTO): Promise<FundingDTO> {
    return await this.fundingService.create(createFundingDTO);
  }

  /** Add a new comment */
  @Post(':id/comment')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async addComment(@Param('id', ParseObjectIdPipe) id: string, @Body('text') text: string): Promise<FundingDTO> {
    return await this.fundingService.addComment(id, text);
  }

  /** Get All Funders */
  @Get()
  @Public()
  @ApiOkResponse({ type: [FundingDTO] })
  async findAll(): Promise<FundingDTO[]> {
    return await this.fundingService.findAll();
  }

  /** Get Funder By Id */
  @Get(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO[]> {
    return await this.fundingService.findOne(id);
  }

  /** Edit the Funder */
  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateFundingDto: UpdateFundingDto): Promise<FundingDTO> {
    return await this.fundingService.update(id, updateFundingDto);
  }

  /** Delete the funder */
  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.remove(id);
  }
}
