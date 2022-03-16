import React, { useContext, useState } from "react";
import { BillTableWithoutScroll, BillTableWithScroll } from "./core";
import { billsStyle } from "./styles";
import {
   NoItemText,
   PaginationItem,
   UserInputsDropdown,
   ValidationInput,
} from "@eachbase/components";
import { DrawerContext } from "@eachbase/utils";

const addAllTextToTheList = (list = []) => ["All", ...list];

export const BillsFragment = ({ bills = [], clients = [], payors = [] }) => {
   const classes = billsStyle();

   const clientsNames = clients.map((client) => client.firstName);
   const payorsNames = payors.map((payor) => payor.name);

   const { open } = useContext(DrawerContext);

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
               dropdownOptions={addAllTextToTheList(payorsNames)}
               onPass={(selPayor) => setSelectedPayor(selPayor)}
               selected={selectedPayor}
               dropdownClassName={classes.filterDropStyle}
            />
            <UserInputsDropdown
               label={"Client"}
               dropdownOptions={addAllTextToTheList(clientsNames)}
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
            <>
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
            </>
         ) : (
            <NoItemText text={"No Bills Yet"} />
         )}
      </div>
   );
};
