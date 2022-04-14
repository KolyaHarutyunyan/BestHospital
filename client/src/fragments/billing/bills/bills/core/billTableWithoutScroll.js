import React, { useContext } from "react";
import { DrawerContext } from "@eachbase/utils";
import { BillTBodyWithoutScroll, BillTHeadWithoutScroll } from "./common";
import { billTableStyle } from "./styles";

export const BillTableWithoutScroll = ({ bills }) => {
   const classes = billTableStyle();

   const { open } = useContext(DrawerContext);

   const tableWithoutScrollClassName = `${classes.billTableWithoutScrollStyle} ${
      open ? "narrow" : ""
   }`;

   return (
      <div className={tableWithoutScrollClassName}>
         <BillTHeadWithoutScroll />
         <BillTBodyWithoutScroll bills={bills} />
      </div>
   );
};
