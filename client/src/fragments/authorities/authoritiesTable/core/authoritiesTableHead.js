import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { authoritiesFragments } from "./styles";

export const AuthoritiesTableHead = ({}) => {
  const classes = authoritiesFragments();
  return (
    <TableHeadComponent>
      {
        <>
          <TableCell>
            <SearchAndFilter title={"Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter
              title={"MC Number"}
              custom={false}
            />
          </TableCell>

          <TableCell>
            <SearchAndFilter
              title={"Office"}
              custom={false}
            />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Address"} />
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
