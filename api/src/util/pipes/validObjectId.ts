import { HttpException, HttpStatus } from "@nestjs/common";

const ObjectId = require('mongoose').Types.ObjectId;
export function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    throw new HttpException(
        'Invalid Id for the resource',
        HttpStatus.BAD_REQUEST,
    );
}