import React, { Fragment, useState } from "react";
import { BillTableWithoutScroll, BillTableWithScroll } from "./core";
import { billsStyle } from "./styles";
import {
   NoItemText,
   PaginationItem,
   UserInputsDropdown,
   ValidationInput,
} from "@eachbase/components";

const DUMMY_PAYORS = ["All", "Payor-1", "Payor-2", "Payor-3", "Payor-4"];
const DUMMY_CLIENTS = ["All", "Client-1", "Client-2", "Client-3", "Client-4"];

export const BillsFragment = ({ bills, open }) => {
   const classes = billsStyle();
   const billsTableClassName = `${classes.billsTableStyle} ${
      open ? "narrow" : ""
   }`;

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDate, setFilteredDate] = useState("All");

   return (
      <div>
         <div className={classes.filtersBoxStyle}>
            <UserInputsDropdown
               label={"Payor"}
               dropdownOptions={DUMMY_PAYORS}
               onPass={(selPayor) => setSelectedPayor(selPayor)}
               selected={selectedPayor}
               dropdownClassName={classes.filterDropStyle}
            />
            <UserInputsDropdown
               label={"Client"}
               dropdownOptions={DUMMY_CLIENTS}
               onPass={(selClient) => setSelectedClient(selClient)}
               selected={selectedClient}
               dropdownClassName={classes.filterDropStyle}
            />
            <ValidationInput
               inputLabel={"Submitted Date"}
               variant={"outlined"}
               name={"filterDate"}
               onChange={(ev) => setFilteredDate(ev.target.value)}
               value={filteredDate}
               type={"date"}
               size={"small"}
               style={classes.dateInputStyle}
            />
         </div>
         {!!bills.length ? (
            <Fragment>
               <div className={billsTableClassName}>
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
