import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AddressComponent,
  AddressType,
  Client,
  GeocodeRequest,
  GeocodeResponse,
  GeocodeResult,
} from '@googlemaps/google-maps-services-js';
import { GOOGLE_API_KEY } from './address.constants';
import { IAddress } from './interface';
import { Model } from 'mongoose';
import { AddressModel } from './address.model';

@Injectable()
export class AddressService {
  constructor() {
    this.mapClient = new Client({});
    this.model = AddressModel;
  }
  private mapClient: Client;
  private model: Model<IAddress>;

  /** Public API */
  async getAddress(address: string): Promise<IAddress> {
    const geocoded: GeocodeResponse = await this.mapClient.geocode(
      this.getGeocodeRequest(address),
    );
    const results: GeocodeResult[] = this.getResults(geocoded);
    const fullAddress = this.convertGeocodedToFullAddress(results[0]);
    return fullAddress;
  }

  /** Private Methods */
  /** Generate geocode request */
  private getGeocodeRequest(address: string): GeocodeRequest {
    if (!address) {
      throw new HttpException(
        'Incorrect or missing address',
        HttpStatus.BAD_REQUEST,
      );
    }
    const geocodeRequest: GeocodeRequest = {
      params: {
        key: GOOGLE_API_KEY,
        address: address,
      },
    };
    return geocodeRequest;
  }

  /** Takes a geocoded response and converts it to FullAddressDTO version */
  private convertGeocodedToFullAddress(geocodeResult: GeocodeResult): IAddress {
    if (!geocodeResult) {
      return null;
    }
    const addressComponents = geocodeResult.address_components;
    const street = this.getStreet(addressComponents);
    const city = this.findAddressComponent(
      addressComponents,
      AddressType.locality,
    );
    const state = this.findAddressComponent(
      addressComponents,
      AddressType.administrative_area_level_1,
    );
    const zip = this.findAddressComponent(
      addressComponents,
      AddressType.postal_code,
    );
    const country = this.findAddressComponent(
      addressComponents,
      AddressType.country,
    );
    const fullAddress: IAddress = new this.model({
      lat: geocodeResult.geometry?.location?.lng,
      lng: geocodeResult.geometry?.location?.lat,
      street: street,
      city: city,
      state: state,
      zip: zip,
      country: country,
      formattedAddress: geocodeResult.formatted_address,
    });
    return fullAddress;
  }

  /** extracts and builds street from address components */
  private getStreet(addressComponents: AddressComponent[]): string {
    const streetNumber = this.findAddressComponent(
      addressComponents,
      'street_number',
    );
    const streetName = this.findAddressComponent(
      addressComponents,
      AddressType.route,
    );
    let street = '';
    if (streetNumber) {
      street = streetNumber;
    }
    if (streetName) {
      street = street + ' ' + streetName;
    }
    return street;
  }

  /** Finds an address component from geocoded address component list */
  private findAddressComponent(
    componentList: AddressComponent[],
    type: string,
  ): string {
    const addressComponent = componentList.find(
      (component) => component.types[0] === type,
    );
    if (addressComponent) {
      return addressComponent.long_name;
    } else {
      return null;
    }
  }

  /** extracts the results from the geocodeResponse */
  private getResults(geocoded: GeocodeResponse): GeocodeResult[] {
    if (geocoded && geocoded.data && geocoded.data.results) {
      const results: GeocodeResult[] = geocoded.data.results;
      if (results.length > 0) {
        // no results was returned
        return results;
      }
    }
    throw new HttpException(
      'Unable to verify the address',
      HttpStatus.BAD_REQUEST,
    );
  }
}
