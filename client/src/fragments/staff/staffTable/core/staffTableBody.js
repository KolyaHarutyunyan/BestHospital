import React from "react";
import {TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images, useGlobalStyles} from "@eachbase/utils";
import {useHistory} from "react-router-dom";
import {staffTableStyles} from "./styles";

export const StaffTableBody = ({index, data}) => {
    const globalClasses = useGlobalStyles();
    const classes = staffTableStyles()
    const history = useHistory()
    const handleOpenOfficeInfo = (id) => {
        history.push(`/staff/${id}`)
    }

    return (
        <TableBodyComponent handleOpenInfo={() => handleOpenOfficeInfo(data.id)} index={index}>
            <TableCell className={classes.tableRow}>
                <div className={globalClasses.InfoAndImage}>
                    <img src={Images.staffOutline} alt={"funding"}/>
                    <p className={classes.firstNameStyle}>{data.firstName}</p>
                </div>
            </TableCell>
            {/*<TableCell>{'address'}</TableCell>*/}
            <TableCell className={classes.tableRow}>{(data.address   && data.address.formattedAddress ) ? data.address.formattedAddress : 'address'}</TableCell>
            <TableCell className={classes.tableRow}>{data.email}</TableCell>
            <TableCell className={classes.tableRow}>{data.phone}</TableCell>
        </TableBodyComponent>
    )
}
