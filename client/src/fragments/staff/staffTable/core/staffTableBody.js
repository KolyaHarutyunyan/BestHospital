import React from "react";
import {useHistory} from "react-router-dom";
import {SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images, useGlobalStyles} from "@eachbase/utils";
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
                    <SlicedText type={'name'} size={10} data={`${data.firstName} ${data.lastName}`}/>
                </div>
            </TableCell>
            <TableCell className={classes.tableRow}>
                <SlicedText type={'address'} size={20} data={(data.address   && data.address.formattedAddress ) ? data.address.formattedAddress : 'Not Set'}/>
            </TableCell>
            <TableCell className={classes.tableRow}>
                <SlicedText type={'email'} size={15} data={data.email}/>
            </TableCell>
            <TableCell className={classes.tableRow}>{data.phone}</TableCell>
        </TableBodyComponent>
    )
}
