import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FundingService } from './funding.service';
import { HistoryService } from '../history/history.service';

import { CreateFundingDTO, FundingDTO, CreateCommentDTO, UpdateFundingDto } from './dto';
import { ServiceDTO, UpdateServiceDto } from '../service/dto';
import { HistoryDto } from '../history/dto';
import { CreateServiceDto } from '../service/dto';
import { Public, ParseObjectIdPipe } from '../util';

@Controller('funding')
@ApiTags('Funding Endpoints')
export class FundingController {
  constructor(
    private readonly fundingService: FundingService,
    private readonly historyService: HistoryService,
  ) { }

  /** Create a new funder */
  @Post()
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async create(@Body() createFundingDTO: CreateFundingDTO): Promise<FundingDTO> {
    return await this.fundingService.create(createFundingDTO);
  }

  /** Create a new service */
  @Post(':id/service')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async createService(@Param('id', ParseObjectIdPipe) id: string,
    @Body() createServiceDTO: CreateServiceDto): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const service = await this.fundingService.createService(createServiceDTO, id);
    // await this.historyService.create({ type: "service", modify: "create", staffId, funderId: service.funderId });
    return service
  }

  /** Add a new comment */
  @Post(':id/comment')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async addComment(@Param('id', ParseObjectIdPipe) id: string, @Body('text') text: string): Promise<FundingDTO> {
    return await this.fundingService.addComment(id, text);
  }

  /** Get all funders */
  @Get()
  @Public()
  @ApiOkResponse({ type: [FundingDTO] })
  async findAll(): Promise<FundingDTO[]> {
    return await this.fundingService.findAll();
  }

  /** Get all services */
  @Get(':id/service')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async findAllServices(@Param('id', ParseObjectIdPipe) id: string): Promise<ServiceDTO[]> {
    return await this.fundingService.findAllServices(id);
  }

  /** Get all comments */
  @Get(':id/comments')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async getComments(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO[]> {
    return await this.fundingService.getComments(id);
  }

  /** Get all histories */
  @Get(':id/histories')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async findAllHistories(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO[]> {
    return await this.fundingService.findAllHistories(id);
  }

  /** Get Funder By Id */
  @Get(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.findOne(id);
  }

  /** Edit the Funder */
  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateFundingDto: UpdateFundingDto): Promise<FundingDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const funder = await this.fundingService.update(id, updateFundingDto);
    return funder;

  }

  /** Edit the Service */
  @Patch('/service/:serviceId')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async updateService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const service = await this.fundingService.updateService(serviceId, updateServiceDto);
    // await this.historyService.create({ type: "service", modify: "update", staffId, funderId: service.funderId });
    return service
  }

  /** Delete the funder */
  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.remove(id);
  }

  /** Delete the comment */
  @Delete(':funderId/comments/:id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async removeComment(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string): Promise<string> {
    return await this.fundingService.removeComment(id, funderId);
  }
}
