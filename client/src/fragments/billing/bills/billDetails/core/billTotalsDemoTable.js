import React from "react";
import { Table } from "@material-ui/core";
import { BillTotalsDemoTBody, BillTotalsDemoTHead } from "./common";

export const BillTotalsDemoTable = ({ billTotals }) => {
   return (
      <Table style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
         <BillTotalsDemoTHead />
         <BillTotalsDemoTBody billTotals={billTotals} />
      </Table>
   );
};
