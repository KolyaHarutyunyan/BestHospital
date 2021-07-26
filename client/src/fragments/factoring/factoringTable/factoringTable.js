import React from "react";
import { Paper, Table, TableContainer } from "@material-ui/core";
import { FactoringTableBody, FactoringTableHead } from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import {PaginationItem} from "@eachbase/components";

export const FactoringTable = ({}) => {
  const globalStyle = useGlobalStyles();

  return (
    <div className={globalStyle.tableWrapper}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <FactoringTableHead />


          <FactoringTableBody />
          <FactoringTableBody />
          <FactoringTableBody />
          <FactoringTableBody />


        </Table>

          <PaginationItem page={1}
                          // handleReturn={(number) => changePage(number)}
                          count={5} />
      </TableContainer>
    </div>
  );
};
