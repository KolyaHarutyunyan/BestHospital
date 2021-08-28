import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiProperty, ApiPropertyOptional, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FundingService } from './funding.service';
import { HistoryService } from '../history/history.service';

import { CreateFundingDTO, FundingDTO, UpdateFundingDto, ServiceDTO, UpdateServiceDto, CreateServiceDTO, CreateModifierDto, UpdateModifierDto, ModifyDTO } from './dto';
import { HistoryDTO } from '../history/dto';
import { Public, ParseObjectIdPipe } from '../util';
import { CreateCommentDTO } from './dto/comment.dto';

@Controller('funding')
@ApiTags('Funding Endpoints')
export class FundingController {
  constructor(
    private readonly fundingService: FundingService,
    private readonly historyService: HistoryService,
  ) { }
  /** Test a new Test */
  // @Get()
  // @Public()
  // @ApiOkResponse({ type: FundingDTO })
  // async test(): Promise<string> {
  //   return 'Hello World!'
  // }

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
  @ApiOkResponse({ type: ServiceDTO })
  async createService(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createServiceDTO: CreateServiceDTO): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const service = await this.fundingService.createService(createServiceDTO, id);
    return service
  }

  /** Create a new modifier */
  @Post(':id/modifier')
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async createModifier(@Param('id', ParseObjectIdPipe) id: string,
    @Body() createModifierDTO: CreateModifierDto): Promise<ModifyDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.fundingService.createModifier(createModifierDTO, id);
    return modifier
  }

  /** Add a new comment */
  // @Post(':id/comment')
  // @Public()
  // // @ApiOkResponse({ type: CommentDto })
  // async addComment(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @Body() dto: CreateCommentDTO): Promise<any> {
  //   console.log(dto)
  //   const user = "610ba0a7b8944a30bcb15da4"
  //   return await this.fundingService.addComment(id, dto.text, user);
  // }

  /** Get all funders */
  @Get()
  @Public()
  @ApiOkResponse({ type: [FundingDTO] })
  @ApiQuery({
    name: "skip",
    description: "where",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "limit",
    description: "how",
    required: false,
    type: Number
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number): Promise<FundingDTO[]> {
    return await this.fundingService.findAll(skip, limit);
  }

  /** Get all services */
  @Get(':id/service')
  @Public()
  @ApiOkResponse({ type: [ServiceDTO] })
  async findAllServices(@Param('id', ParseObjectIdPipe) id: string): Promise<ServiceDTO[]> {
    return await this.fundingService.findAllServices(id);
  }
  /** Get service by Id */
  @Get(':serviceId/service')
  @Public()
  @ApiOkResponse({ type: [ServiceDTO] })
  async findService(@Param('id', ParseObjectIdPipe) id: string): Promise<ServiceDTO[]> {
    return await this.fundingService.findService(id);
  }

  /** Get all comments */
  // @Get(':id/comments')
  // @Public()
  // @ApiQuery({
  //   name: "skip",
  //   description: "where",
  //   required: false,
  //   type: Number
  // })
  // @ApiQuery({
  //   name: "limit",
  //   description: "how",
  //   required: false,
  //   type: Number
  // })
  // // @ApiOkResponse({ type: [CommentDto] })
  // async getComments(@Param('id', ParseObjectIdPipe) id: string,
  //   @Query('skip') skip: number,
  //   @Query('limit') limit: number): Promise<any> {
  //   return await this.fundingService.getComments(id, skip, limit);
  // }

  /** Get all histories */
  // @Get(':id/histories')
  // @Public()
  // @ApiOkResponse({ type: [HistoryDTO] })
  // async findAllHistories(@Param('id', ParseObjectIdPipe) id: string): Promise<any> {
  //   return await this.fundingService.findAllHistories(id);
  // }

  /** Get Funder By Id */
  @Get(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async findById(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.findById(id);
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
  @ApiOkResponse({ type: ServiceDTO })
  async updateService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const service = await this.fundingService.updateService(serviceId, updateServiceDto);
    return service
  }


  /** Edit the Modifier */
  @Patch(':modifyId/modifier')
  @Public()
  // @ApiOkResponse({ type: FundingDTO })
  async updateModify(@Param('modifyId', ParseObjectIdPipe) modifyId: string, @Body() updateModifierDto: UpdateModifierDto): Promise<any> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.fundingService.updateModifier(modifyId, updateModifierDto);
    return modifier;
  }


  /** Delete the funder */
  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: FundingDTO })
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<FundingDTO> {
    return await this.fundingService.remove(id);
  }

  /** Delete the comment */
  // @Delete(':id/comments/:commentId')
  // @Public()
  // // @ApiOkResponse({ type: CommentDto })
  // async removeComment(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @Param('commentId', ParseObjectIdPipe) commentId: string): Promise<string> {
  //     const user = "610ba0a7b8944a30bcb15da4"
  //   return await this.fundingService.removeComment(id, commentId, user);
  // }
}
