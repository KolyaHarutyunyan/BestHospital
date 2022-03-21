import React from "react";
import { Table } from "@material-ui/core";
import { BillTBodyWithoutScroll, BillTHeadWithoutScroll } from "./common";
import { billTableStyle } from "./styles";

export const BillTableWithoutScroll = ({ bills }) => {
   const classes = billTableStyle();

   return (
      <div className={classes.billTableWithoutScrollStyle}>
         <Table>
            <BillTHeadWithoutScroll />
            <BillTBodyWithoutScroll bills={bills} />
         </Table>
      </div>
   );
};
