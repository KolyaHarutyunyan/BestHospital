import React, {useState} from "react";
import {Notes} from "@eachbase/components";
import {fundingSourceSingleStyles} from "./styles";


export const FundingSourceSinglePTModifiers = () => {
    const classes = fundingSourceSingleStyles()
    const headerTitles = [
        {
            title: 'Modifier',
            sortable: false
        },
        {
            title: 'Credential',
            sortable: false
        },
        {
            title: 'Charge Rate',
            sortable: false
        },
        {
            title: 'Type',
            sortable: false
        },
    ];
    const bodyTitles = [
        {
            title: 'body title 1',
        },
        {
            title: 'body title 2',
        },
        {
            title: 'b t 3',
        },
        {
            title: 'b t 3',
        }
    ]
    return (
        <div className={classes.fundingSourceSinglePTModifiersStyles}>
            <p className={classes.fundingSourceSinglePTModifiersTitleStyles}>PT Modifiers</p>
            <Notes bodyTitles={bodyTitles} headerTitles={headerTitles} defaultStyle={true} />
        </div>
    )
}