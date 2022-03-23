import React, { useContext, useState } from "react";
import { BillTableWithoutScroll, BillTableWithScroll } from "./core";
import { billsStyle } from "./styles";
import {
   Loader,
   NoItemText,
   PaginationItem,
   UserInputsDropdown,
   ValidationInput,
} from "@eachbase/components";
import {
   DrawerContext,
   handleCreatedAtDate,
   PaginationContext,
} from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

const addAllTextToTheList = (list = []) =>
   !!list[0]?.length ? ["All", ...list] : ["All"];

export const BillsFragment = ({
   bills = [],
   billsQty,
   page,
   handleGetPage,
   billsLoader,
}) => {
   const classes = billsStyle();

   const dispatch = useDispatch();

   const { open } = useContext(DrawerContext);
   const { handlePageChange } = useContext(PaginationContext);

   const billsTableClassName = `${classes.billsTableStyle} ${
      open ? "narrow" : ""
   }`;

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDate, setFilteredDate] = useState("");

   const clientsNames = bills.map((bill) => bill?.client?.middleName);
   const payorsNames = bills.map((bill) => bill?.payor?.middleName);

   const billsWithFilters =
      selectedPayor === "All" && selectedClient === "All" && filteredDate === ""
         ? bills
         : selectedPayor !== "All"
         ? bills.filter(
              (bill) =>
                 bill?.payor?.middleName?.toLowerCase() ===
                 selectedPayor.toLowerCase()
           )
         : selectedClient !== "All"
         ? bills.filter(
              (bill) =>
                 bill?.client?.middleName?.toLowerCase() ===
                 selectedClient.toLowerCase()
           )
         : filteredDate !== ""
         ? bills.filter(
              (bill) =>
                 handleCreatedAtDate(bill?.dateOfService, 10) ===
                 handleCreatedAtDate(filteredDate, 10)
           )
         : [];

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(billActions.getBills({ limit: 10, skip: start }));
      handleGetPage(number);
   };

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
         {!!billsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {billsLoader ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <div className={billsTableClassName}>
                        <BillTableWithoutScroll bills={bills} />
                        <BillTableWithScroll bills={bills} />
                     </div>
                  )}
               </div>
               <PaginationItem
                  listLength={bills.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={billsQty}
                  entries={bills.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Bills Yet"} />
         )}
      </div>
   );
};
