import React, { Fragment } from "react";
import { BillTableWithoutScroll, BillTableWithScroll } from "./core";
import { billsStyle } from "./styles";
import { NoItemText, PaginationItem } from "@eachbase/components";

export const BillsFragment = ({ bills, open }) => {
   const classes = billsStyle();
   const billsFragmentClassName = `${classes.billsFragmentStyle} ${
      open ? "narrow" : ""
   }`;

   return (
      <div>
         {!!bills.length ? (
            <Fragment>
               <div className={billsFragmentClassName}>
                  <BillTableWithoutScroll bills={bills} />
                  <BillTableWithScroll bills={bills} />
               </div>
               <PaginationItem
                  listLength={bills.length}
                  page={1}
                  count={bills.length}
                  entries={bills.length}
               />
            </Fragment>
         ) : (
            <NoItemText text={"No Bills Yet"} />
         )}
      </div>
   );
};
