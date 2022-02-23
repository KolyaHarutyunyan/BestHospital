import React from "react";
import { TableRow, TableHead } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableHeadComponent = ({ children, tHeadStyle }) => {
   const classes = tableStyle();
   return (
      <TableHead className={classes.tableHead} style={tHeadStyle}>
         <TableRow>{children}</TableRow>
      </TableHead>
   );
};
