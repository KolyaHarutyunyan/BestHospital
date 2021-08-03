import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useHistory} from "react-router-dom";

export const FundingSourceTableBody = ({key, data }) => {
  const globalClasses = useGlobalStyles()
  const dispatch = useDispatch()
    const history = useHistory()
  const handleOpenOfficeInfo =(id)=>{
      history.push(`/fundingSource/${id}`)
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
          {/*<TableCell>{data.address.formattedAddress && data.address.formattedAddress}</TableCell>*/}
          <TableCell>Armenia Yerevan</TableCell>
          <TableCell>{data.email}</TableCell>
          <TableCell>{data.phoneNumber}</TableCell>
    </TableBodyComponent>
  )
}
