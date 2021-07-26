import React from "react";
import { Paper, Table, TableContainer } from "@material-ui/core";
import { CustomersTableBody } from "./customersTableBody";
import { CustomersTableHead } from "./customersTableHead";
import {useGlobalStyles} from "@eachbase/utils";
import {PaginationItem} from "@eachbase/components";

export const CustomersTable = ({}) => {
    const globalStyle = useGlobalStyles();

  return (
    <div className={globalStyle.tableWrapper}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <CustomersTableHead />
          <CustomersTableBody />
        </Table>

          <PaginationItem page={1}
                          // handleReturn={(number) => changePage(number)}
                          count={5} />
      </TableContainer>
    </div>
  );
};
