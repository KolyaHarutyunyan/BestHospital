import React from "react";
import {Notes} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {serviceSingleStyles} from "./styles";


export const ClientNotes = () => {
    const classes  =serviceSingleStyles()
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
            title: <img src={Images.remove} alt="icon" className={classes.iconStyle}/>,
        }
    ]
    return (
        <Notes bodyTitles={bodyTitles} headerTitles={headerTitles}/>
    )
}