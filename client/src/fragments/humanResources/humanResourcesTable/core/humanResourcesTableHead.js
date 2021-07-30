import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { humanResourcesFragments } from "./styles";
import { useDispatch } from "react-redux";
import { adminActions } from "@eachbase/store";

export const HumanResourcesTableHead = ({}) => {
  const dispatch = useDispatch()
  const classes = humanResourcesFragments();
  return (
    <TableHeadComponent>
      {
        <>
          <TableCell>
            <SearchAndFilter
              handleSearch={ (ev) => dispatch(adminActions.filterAdmins(ev.target.value))} title={"Full Name"} />
          </TableCell>
          <TableCell>
            <SearchAndFilter title={"Role"} />
          </TableCell>
          <TableCell>
            <SearchAndFilter title={"Email Address"} />
          </TableCell>
          <TableCell>
            <SearchAndFilter custom={false} title={"Phone Number"} />
          </TableCell>
        </>
      }
    </TableHeadComponent>
  );
};
