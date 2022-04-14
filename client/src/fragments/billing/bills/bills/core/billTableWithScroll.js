import React, { useContext } from "react";
import { BillTBodyWithScroll, BillTHeadWithScroll } from "./common";
import { billTableStyle } from "./styles";
import { DrawerContext } from "@eachbase/utils";

export const BillTableWithScroll = ({ bills }) => {
   const classes = billTableStyle();

   const { open } = useContext(DrawerContext);

   const tableWithScrollClassName = `${classes.billTableWithScrollStyle} ${
      open ? "narrow" : ""
   }`;

   return (
      <div className={tableWithScrollClassName}>
         <BillTHeadWithScroll />
         <BillTBodyWithScroll bills={bills} />
      </div>
   );
};
