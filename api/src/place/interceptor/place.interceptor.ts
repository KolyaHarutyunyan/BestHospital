import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IPlace } from '../interface/place.interface';
import { PlaceDTO } from '../dto';

@Injectable()
export class PlaceSanitizer implements ISanitize {
  sanitize(place: IPlace): PlaceDTO {
    const placeDTO: PlaceDTO = {
      _id: place.id,
      name: place.name,
      code: place.code,
    };
    return placeDTO;
  }

  sanitizeMany(places: IPlace[]): PlaceDTO[] {
    const placeDTOs: PlaceDTO[] = [];
    for (let i = 0; i < places.length; i++) {
      placeDTOs.push(this.sanitize(places[i]));
    }
    return placeDTOs;
  }
}
