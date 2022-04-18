import React, { useContext, useState } from "react";
import { BillTableWithoutScroll, BillTableWithScroll } from "./core";
import { billsStyle } from "./styles";
import {
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
} from "@eachbase/components";
import { DrawerContext, handleCreatedAtDate, PaginationContext } from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

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
   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const billsTableClassName = `${classes.billsTableStyle} ${open ? "narrow" : ""}`;

   const [selectedPayor, setSelectedPayor] = useState("All");
   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDate, setFilteredDate] = useState("");

   const clientsNames = bills.map((bill) => bill?.client?.firstName);
   const payorsNames = bills.map((bill) => bill?.payor?.firstName);

   const billsWithFilters =
      selectedPayor === "All" && selectedClient === "All" && filteredDate === ""
         ? bills
         : selectedPayor !== "All"
         ? bills.filter(
              (bill) =>
                 bill?.payor?.firstName?.toLowerCase() === selectedPayor.toLowerCase()
           )
         : selectedClient !== "All"
         ? bills.filter(
              (bill) =>
                 bill?.client?.firstName?.toLowerCase() === selectedClient.toLowerCase()
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
         <BillFiltersSelectors
            filterIsForBill={true}
            clientsNames={clientsNames}
            payorsNames={payorsNames}
            passPayorHandler={(selPayor) => setSelectedPayor(selPayor)}
            selectedPayor={selectedPayor}
            passClientHandler={(selClient) => setSelectedClient(selClient)}
            selectedClient={selectedClient}
            changeDateInput={(ev) => setFilteredDate(ev.target.value)}
            filteredDate={filteredDate}
         />
         {!!billsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {billsLoader && pageIsChanging ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <div className={billsTableClassName}>
                        <BillTableWithoutScroll bills={billsWithFilters} />
                        <BillTableWithScroll bills={billsWithFilters} />
                     </div>
                  )}
               </div>
               <PaginationItem
                  listLength={billsWithFilters.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={billsQty}
                  entries={billsWithFilters.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Bills Yet"} />
         )}
      </div>
   );
};
