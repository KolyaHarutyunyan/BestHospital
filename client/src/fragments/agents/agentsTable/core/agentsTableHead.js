import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { agentsFragments } from "./styles";
import { useDispatch } from "react-redux";
import { adminActions } from "@eachbase/store";

export const AgentsTableHead = ({}) => {
  const dispatch = useDispatch()
  const classes = agentsFragments();
  return (
    <TableHeadComponent>
      {
        <>
          <TableCell>
            <SearchAndFilter
              handleSearch={ (ev) => dispatch(adminActions.filterAdmins(ev.target.value))
              }

              title={"Name"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Office"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Branch"} />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Email Address"} />
          </TableCell>

          {/*<TableCell>*/}
          {/*  <SearchAndFilter custom={false} title={"Phone Number"} />*/}
          {/*</TableCell>*/}

        </>
      }
    </TableHeadComponent>
  );
};
