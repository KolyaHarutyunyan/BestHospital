import { Paper, Table, TableContainer } from "@material-ui/core";
import { AuthoritiesTableBody, AuthoritiesTableHead, authoritiesFragments } from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import {PaginationItem} from "@eachbase/components";
import React from "react";

export const AuthoritiesTable = ({}) => {
  const globalStyle =useGlobalStyles()
  return (
    <div className={globalStyle.tableWrapper}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <AuthoritiesTableHead />
          <AuthoritiesTableBody />
          <AuthoritiesTableBody />
          <AuthoritiesTableBody />
          <AuthoritiesTableBody />
          <AuthoritiesTableBody />
        </Table>

        <PaginationItem page={1}
                        // handleReturn={(number) => changePage(number)}
                        count={5} />

      </TableContainer>
    </div>
  );
};
