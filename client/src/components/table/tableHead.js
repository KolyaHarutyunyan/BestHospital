import React from "react";
import { TableRow, TableHead } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableHeadComponent = ({
   children,
   tHeadStyle,
   hasIndividualStyles,
}) => {
   const classes = tableStyle();

   const tableHeadClassName = `${classes.tableHead} ${
      hasIndividualStyles ? "individual" : ""
   }`;

   return (
      <TableHead className={tableHeadClassName} style={tHeadStyle}>
         <TableRow>{children}</TableRow>
      </TableHead>
   );
};
