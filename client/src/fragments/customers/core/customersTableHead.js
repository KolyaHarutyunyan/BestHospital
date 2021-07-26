import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { customersFragments } from "./styles";

export const CustomersTableHead = ({}) => {
  const classes = customersFragments();
  return (
    <TableHeadComponent>
      {
        <>
          <TableCell>
            <SearchAndFilter title={"ID"} custom={false} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Type"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter custom={false} title={"MC Number"} />
          </TableCell>
        </>
      }
    </TableHeadComponent>
  );
};
