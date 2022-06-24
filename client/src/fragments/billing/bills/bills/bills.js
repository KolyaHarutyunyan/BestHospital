import React, { useContext, useState } from "react";
import { BillTableWithoutScroll, BillTableWithScroll } from "./core";
import { billsStyle } from "./styles";
import {
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
} from "@eachbase/components";
import { DrawerContext, getSkipCount, PaginationContext } from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { getFilteredBills } from "./constants";

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

   const clientsNames = bills.map(
      (bill) => `${bill?.client?.firstName} ${bill?.client?.lastName}`
   );
   const payorsNames = bills.map((bill) => bill?.payer?.name);

   const billsWithFilters = getFilteredBills(
      bills,
      selectedPayor,
      selectedClient,
      filteredDate
   );

   const _limit = 10;

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(billActions.getBills({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   };

   return (
      <div>
         <BillFiltersSelectors
            filterIsFor={"bill"}
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
                  handleChangePage={(number) => changePage(number)}
                  count={billsQty}
                  limitCountNumber={_limit}
               />
            </div>
         ) : (
            <NoItemText text={"No Bills Yet"} />
         )}
      </div>
   );
};
