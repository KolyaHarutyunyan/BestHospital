import React from "react";
import { Table } from "@material-ui/core";
import { TransactionsDemoTBody, TransactionsDemoTHead } from "./common";

export const TransactionsDemoTable = ({}) => {
   return (
      <Table>
         <TransactionsDemoTHead />
         <TransactionsDemoTBody />
      </Table>
   );
};
