import React from "react";
import { Table } from "@material-ui/core";
import { BillTBodyWithScroll, BillTHeadWithScroll } from "./common";
import { billTableStyle } from "./styles";

export const BillTableWithScroll = ({ bills }) => {
   const classes = billTableStyle();

   return (
      <div className={classes.billTableWithScrollStyle}>
         <Table>
            <BillTHeadWithScroll />
            <BillTBodyWithScroll bills={bills} />
         </Table>
      </div>
   );
};
