import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IClient } from '../interface';
import { ClientDTO } from '../dto';
// import { AddressSanitizer } from '../../address';

@Injectable()
export class ClientSanitizer implements ISanitize {
    constructor(
        //   private readonly addressSanitizer: AddressSanitizer
    ) { }

    sanitize(client: IClient): ClientDTO {
        const clientDTO: ClientDTO = {
            id: client.id,
            firstName: client.firstName,
            middleName: client.middleName,
            lastName: client.lastName,
            code: client.code,
            ethnicity: client.ethnicity,
            language: client.language,
            familyLanguage: client.familyLanguage,
            gender: client.gender,
            birthday: client.birthday,
            termination: client.termination,
            status: client.status
        };
        if (client.enrollment) clientDTO.enrollment = client.enrollment;
        return clientDTO;
    }

    sanitizeMany(clients: IClient[]): ClientDTO[] {
        const clientDTOs: ClientDTO[] = [];
        for (let i = 0; i < clients.length; i++) {
            clientDTOs.push(this.sanitize(clients[i]));
        }
        return clientDTOs;
    }
}
