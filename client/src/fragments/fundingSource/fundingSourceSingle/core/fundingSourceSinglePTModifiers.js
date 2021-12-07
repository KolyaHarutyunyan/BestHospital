import React from "react";
import {NoItemText, Notes, TableBodyComponent} from "@eachbase/components";
import {fundingSourceSingleStyles} from "./styles";
import {TableCell} from "@material-ui/core";


export const FundingSourceSinglePTModifiers = ({data, title, globalCredentials}) => {


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

    let modifiersItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>  {item?.name}  </TableCell>
                <TableCell>  {globalCredentials.find(elem => elem?._id === item?.credentialId && elem?._id)?.name}  </TableCell>
                <TableCell>  {item?.chargeRate}  </TableCell>
                <TableCell>  {item?.type}  </TableCell>
            </TableBodyComponent>
        )
    }
    return (
        <div className={classes.fundingSourceSinglePTModifiersStyles}>
            <p className={classes.fundingSourceSinglePTModifiersTitleStyles}>{`${title && title} Charge Table`}</p>
            {data && data.length ?
                <Notes noItemsYet={true} data={data} items={modifiersItem} headerTitles={headerTitles}
                       defaultStyle={true}/>
                :
                <div className={classes.noItemWrapper}>
                    <p>No Modifier yet</p>
                </div>
            }
        </div>
    )
}