import React from "react";
import { TableRow, TableHead } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableHeadComponent = ({ children, theadClassName }) => {
   const classes = tableStyle();

   return (
      <TableHead className={`${classes.tableHead} ${theadClassName}`}>
         <TableRow>{children}</TableRow>
      </TableHead>
   );
};
