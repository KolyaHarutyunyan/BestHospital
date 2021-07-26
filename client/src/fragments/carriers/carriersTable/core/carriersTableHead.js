import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { officesFragments } from "./styles";

export const CarriersTableHead = ({}) => {
  const classes = officesFragments();
  return (
    <TableHeadComponent>
      {
        <>
          <TableCell>
            <SearchAndFilter title={"Company Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Carrier Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Company Address"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter
              custom={false}
              type={"number"}
              title={"Phone Number"}
            />
          </TableCell>




        </>
      }
    </TableHeadComponent>
  );
}
