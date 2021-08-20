import React from "react";
import {Notes, TableBodyComponent} from "@eachbase/components";
import {fundingSourceSingleStyles} from "./styles";
import {TableCell} from "@material-ui/core";

export const FundingSourceSinglePTModifiers = ({data}) => {
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

    let modifiersItem = (item,index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>  {item.name}  </TableCell>
                <TableCell>  {item.credentialId}  </TableCell>
                <TableCell>  {item.chargeRate}  </TableCell>
                <TableCell>  {item.type}  </TableCell>

            </TableBodyComponent>
        )
    }

    return (
        <div className={classes.fundingSourceSinglePTModifiersStyles}>
            <p className={classes.fundingSourceSinglePTModifiersTitleStyles}>PT Modifiers</p>
            <Notes data={data} items={modifiersItem} headerTitles={headerTitles} defaultStyle={true} />
        </div>
    )
}