import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { branchesFragments } from "./styles";

export const BranchesTableHead = ({}) => {
  const classes = branchesFragments();
  return (
    <TableHeadComponent>
      {
        <>
          <TableCell>
            <SearchAndFilter title={"Branch Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Office Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Contact Person"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Email Address"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter
              title={"Phone Number"}
              custom={false}
              type={"number"}
            />
          </TableCell>
        </>
      }
    </TableHeadComponent>
  );
};
