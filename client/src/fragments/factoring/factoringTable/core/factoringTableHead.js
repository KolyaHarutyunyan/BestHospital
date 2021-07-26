import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";

export const FactoringTableHead = ({}) => {

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
            <SearchAndFilter title={"Address"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Email Address"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Phone Number"} />
          </TableCell>
        </>
      }
    </TableHeadComponent>
  );
};
