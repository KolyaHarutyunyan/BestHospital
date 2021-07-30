import React from "react";
import {
  Switcher,
  TableBodyComponent,
} from "@eachbase/components";
import { Switch, TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";
import { agentsFragments } from "./styles";

export const AgentsTableBody = ({key, data}) => {
  const classes = agentsFragments();
  const globalClasses = useGlobalStyles()
console.log(data,'ddd')
  return (
    <TableBodyComponent key={key}>
      {
        <>
          <TableCell>
            <div className={globalClasses.InfoAndImage}>
              <img src={Images.agents} alt={"Offices Icon"} />
              <p>{`${data.firstName} ${data.lastName}`}</p>
            </div>
          </TableCell>

          <TableCell>{data.role ? data.role : 'Not set'}</TableCell>
          <TableCell>{data.email}</TableCell>
          <TableCell>{data.email}</TableCell>

          {/*<TableCell>{data.phoneNumber ? data.phoneNumber : 'Not set'}</TableCell>*/}


        </>
      }
    </TableBodyComponent>
  );
}
