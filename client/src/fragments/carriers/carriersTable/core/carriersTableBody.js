import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import moment from 'moment';
import {useDispatch} from "react-redux";
import {officeActions} from "@eachbase/store";

export const CarriersTableBody = ({key, data }) => {
  const globalClasses = useGlobalStyles()
  const dispatch = useDispatch()

  const handleOpenOfficeInfo =(id)=>{
    dispatch(officeActions.getOfficeById(id))
  }

  return (
    <TableBodyComponent
        // handleOpenInfo = {() => handleOpenOfficeInfo(data.id)} key={key}
    >
          <TableCell>
            <div className={globalClasses.InfoAndImage}>
              <img src={Images.carrier} alt={"carrier Icon"} />
              <p>{'BLACKTOP TRANSPORT LLC'}</p>
            </div>
          </TableCell>
          <TableCell>{'Harvir Binepal'}</TableCell>
          <TableCell>{'1100 East Broadway #302 Glendale, CA 91205'}</TableCell>
          <TableCell>{'(727) 644-7018'}</TableCell>
    </TableBodyComponent>
  )
}
