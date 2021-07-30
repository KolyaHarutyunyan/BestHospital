import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import { adminActions } from '@eachbase/store'
import { useDispatch } from "react-redux";

export const HumanResourcesTableBody = ({key, data}) => {
  const globalClasses = useGlobalStyles()
  const dispatch = useDispatch()

  const handleOpenAdminInfo =(id)=>{
    dispatch(adminActions.getAdminById(data))
  }

  
  return (
    <TableBodyComponent handleOpenInfo = {() => handleOpenAdminInfo(data.id)} key={key}>
          <TableCell>
            <div className={globalClasses.InfoAndImage}>
              <img src={Images.human} alt={"Admin Icon"} />
              <p>{`${data.firstName} ${data.lastName}`}</p>
            </div>
          </TableCell>
          <TableCell>{data.role ? data.role : 'Not set'}</TableCell>
          <TableCell>{data.email}</TableCell>
          <TableCell>{data.phoneNumber ? data.phoneNumber : 'Not set'}</TableCell>
    </TableBodyComponent>
  );
}
