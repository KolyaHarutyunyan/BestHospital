import React from "react";
import { Switcher, TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import {Images, useGlobalStyles} from "@eachbase/utils";

export const FactoringTableBody = ({}) => {
  const globalClasses = useGlobalStyles()
  return (
    <TableBodyComponent>
      {
        <>
          <TableCell>12345</TableCell>

          <TableCell>
            <div className={globalClasses.InfoAndImage}>
              <img
                src={Images.factoringOutline}
                alt={"Factoring Outline Icon"}
              />
              <p>PRO FUNDING INC</p>
            </div>
          </TableCell>
          <TableCell>1100 East Broadway #302 Glendale, CA 91205</TableCell>
          <TableCell>outlaws@hotmail.com</TableCell>
          <TableCell>(727) 644-7018</TableCell>
        </>
      }
    </TableBodyComponent>
  );
};
