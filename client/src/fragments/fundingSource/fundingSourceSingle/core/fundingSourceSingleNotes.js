import React, {useState} from "react";
import {Notes} from "../../../../components";
import {Images} from "../../../../utils";


export const FundingSourceSingleNotes = () => {

    const headerTitles = [
        {
            title: 'Date',
            sortable: true
        },
        {
            title: 'Creator Name',
            sortable: true
        },
        {
            title: 'Subject',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];
    const bodyTitles = [
        {
            title: '06/11/2021',
        },
        {
            title: 'Gagik Carukyan',
        },
        {
            title: 'Service Request',
        },
        {
            title: <img src={Images.remove} alt="sdasd" style={{ cursor: 'pointer'}}/>,
        }
    ]
    return (
        <Notes bodyTitles={bodyTitles} headerTitles={headerTitles}/>
    )
}