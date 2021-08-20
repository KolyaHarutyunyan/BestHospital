import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

export const FundingSourceTableBody = ({key, data }) => {
    console.log(data,'body data')
  const globalClasses = useGlobalStyles()
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
          <TableCell>{data.address?.street ?  data.address?.street : data.address?.city  ? data.address?.city : data.address?.country ? data.address?.country : null  }</TableCell>
          <TableCell>{data.email}</TableCell>
          <TableCell>{data.phoneNumber}</TableCell>
    </TableBodyComponent>
  )
}
