import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {adminActions, officeActions} from "@eachbase/store";
import {useHistory} from "react-router-dom";

export const StaffTableBody = ({key, data }) => {
    const globalClasses = useGlobalStyles()
    const dispatch = useDispatch()

    const history = useHistory()

    const handleOpenOfficeInfo =(id)=>{
        // dispatch(adminActions.getAdminById(id))
        history.push(`/staff/${id}`)
    }

    return (
        <TableBodyComponent handleOpenInfo = {() => handleOpenOfficeInfo(data.id)} key={key}>
            <TableCell>
                <div className={globalClasses.InfoAndImage}>
                    <img src={Images.staffOutline} alt={"funding"} />
                    <p>{data.firstName}</p>
                </div>
            </TableCell>
            <TableCell>{'address'}</TableCell>
            {/*<TableCell>{data.address   && data.address.formattedAddress && data.address.formattedAddress}</TableCell>*/}
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phone}</TableCell>
        </TableBodyComponent>
    )
}
