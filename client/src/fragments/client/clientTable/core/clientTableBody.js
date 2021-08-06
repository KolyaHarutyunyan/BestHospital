import React from "react";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

export const ClientTableBody = ({key, data }) => {
  const globalClasses = useGlobalStyles()
  const dispatch = useDispatch()
    const history = useHistory()
  const handleOpenOfficeInfo =(id)=>{
      // history.push(`/client/${id}`)
  }

  return (
    <TableBodyComponent handleOpenInfo = {() => handleOpenOfficeInfo(data.id)} key={key}>
          <TableCell>
            <div className={globalClasses.InfoAndImage}>
              <img src={Images.clients} alt={"client"} />
              <p>Cristiano Ronaldo</p>
            </div>
          </TableCell>
          <TableCell>07</TableCell>
          <TableCell>Male</TableCell>
          <TableCell>21.21.21</TableCell>
          <TableCell> status </TableCell>
          <TableCell> en</TableCell>
          <TableCell>
              <>
                  <img src={Images.edit} alt="edit" style={{cursor: 'pointer'}} onClick={()=>alert('edit')} />
                  <img src={Images.remove} alt="delete" style={{marginLeft: 16, cursor: 'pointer'}} onClick={()=>alert('ddelete')} />
              </>
          </TableCell>
    </TableBodyComponent>
  )
}
