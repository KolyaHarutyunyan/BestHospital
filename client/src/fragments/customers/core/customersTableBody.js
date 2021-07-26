import React from "react";
import { Switcher, TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images } from "@eachbase/utils";
import { customersFragments } from "./styles";

export const CustomersTableBody = ({}) => {
  const classes = customersFragments();
  return (
    <TableBodyComponent>
      {
        <>
          <TableCell>12345</TableCell>

          <TableCell>
            <div className={classes.customersInfo}>
              <img src={Images.customer} alt={"Offices Icon"} />
              <p>SUNBELT EXPRESS LLC</p>
            </div>
          </TableCell>
          <TableCell>Freight Forwarder</TableCell>
          <TableCell>123456</TableCell>

        </>
      }
    </TableBodyComponent>
  );
};
