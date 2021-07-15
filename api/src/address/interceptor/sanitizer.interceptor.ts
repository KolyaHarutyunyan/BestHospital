import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { AddressDTO } from '../dto';
import { IAddress } from '../interface';

@Injectable()
export class AddressSanitizer implements ISanitize {
  sanitize(address: IAddress): AddressDTO {
    if (!address) {
      return undefined;
    }
    const sanitizedAddress: AddressDTO = {
      lat: address.lat,
      lng: address.lng,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      formattedAddress: address.formattedAddress,
    };
    return sanitizedAddress;
  }
}
