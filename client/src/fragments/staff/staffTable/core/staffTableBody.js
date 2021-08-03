import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {adminActions, officeActions} from "@eachbase/store";
import {getAdminById} from "../../../../store/admin/admin.action";

export const StaffTableBody = ({key, data }) => {
    const globalClasses = useGlobalStyles()
    const dispatch = useDispatch()
    const handleOpenOfficeInfo =(id)=>{
        dispatch(adminActions.getAdminById(id))
    }

    return (
        <TableBodyComponent handleOpenInfo = {() => handleOpenOfficeInfo(data.id)} key={key}>
            <TableCell>
                <div className={globalClasses.InfoAndImage}>
                    <img src={Images.fundingSourceOutline} alt={"funding"} />
                    <p>{data.name}</p>
                </div>
            </TableCell>
            <TableCell>{'Type'}</TableCell>
            <TableCell>{data.address   && data.address.formattedAddress && data.address.formattedAddress}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phoneNumber}</TableCell>
        </TableBodyComponent>
    )
}
