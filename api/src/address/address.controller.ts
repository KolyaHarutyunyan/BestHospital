import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../util/decorators';
import { IAddress } from '.';
import { AddressService } from './address.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddressDTO, ConvertAddressDTO } from './dto';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /** Converts the address to a geocoded full address */
  @Post()
  @Public()
  @ApiBody({ type: ConvertAddressDTO })
  @ApiOkResponse({ type: AddressDTO })
  async convertAddress(@Body('address') address: string): Promise<IAddress> {
    const addressResponse = await this.addressService.getAddress(address);
    return addressResponse;
  }
}
