import React from "react";
import {
  Switcher,
  TableBodyComponent,
} from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images } from "@eachbase/utils";
import { authoritiesFragments } from "./styles";

export const AuthoritiesTableBody = ({}) => {
  const classes = authoritiesFragments();
  return (
    <TableBodyComponent>
      {
        <>
          <TableCell>
            <div className={classes.branchesInfo}>
              <img src={Images.authorityBlue} alt={"Authority Icon"} />
              <p>LIBRE EXPRESS INC</p>
            </div>
          </TableCell>

          <TableCell>123456</TableCell>
          <TableCell>Outlaws</TableCell>
          <TableCell>1100 East Broadway #302 Glendale, CA 91205</TableCell>
          <TableCell>(727) 644-7018</TableCell>

        </>
      }
    </TableBodyComponent>
  );
};
