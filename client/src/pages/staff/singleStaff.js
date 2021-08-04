import React, {} from "react";
import {StaffItem} from "@eachbase/fragments/staff";

export const SingleStaff = ({general}) => {

    let raw = {
        name: 'aaaa',
        age: 25,
        max: 2,
        min: 16,
        cds: 0,
        lastName: 'nbbbb'
    }

    const allowed = ['age', 'cds'];

    const filtered = Object.keys(raw)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
        }, {});

    console.log(filtered,'filtered')

    return (
        <>
            <StaffItem />
        </>
    );
}
