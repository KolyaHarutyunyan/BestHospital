import React from "react";
import { TableRow, TableHead } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableHeadComponent = ({ children }) => {
  const classes = tableStyle();
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>{children}</TableRow>
    </TableHead>
  );
};
