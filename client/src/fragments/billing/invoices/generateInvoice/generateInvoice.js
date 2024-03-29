import React, { useContext, useEffect, useState } from "react";
import { NotInvoicedBillTable } from "./core";
import { generateInvoiceStyle } from "./styles";
import {
   CreateChancel,
   Loader,
   NoItemText,
   BillFiltersSelectors,
} from "@eachbase/components";
import {
   CheckupContext,
   FindLoad,
   getSkipCount,
   PaginationContext,
} from "@eachbase/utils";
import { billActions, invoiceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router";
import { getFilteredNotInvoicedBills, mapBills } from "./constants";

export const GenerateInvoiceFragment = ({
   notInvoicedBills = [],
   notInvoicedBillsQty = 0,
   page,
   handleGetPage,
   notInvoicedBillsLoader,
}) => {
   const classes = generateInvoiceStyle();

   const history = useHistory();

   const dispatch = useDispatch();

   const generateInvoiceLoader = FindLoad("GENERATE_INVOICE");

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredServiceDate, setFilteredServiceDate] = useState("");
   const [bills, setBills] = useState(mapBills(notInvoicedBills, false));

   useEffect(() => {
      if (itemsAreChecked) {
         setBills(mapBills(bills, true));
      }
   }, [itemsAreChecked]);

   function handleTriggeredBill(triggeredBill) {
      return setBills(
         bills.map((bill) => {
            if (bill._id === triggeredBill._id) {
               return triggeredBill;
            }
            return bill;
         })
      );
   }

   const clientsNames = bills.map(
      (bill) => `${bill?.client?.firstName} ${bill?.client?.lastName}`
   );

   const notInvoicedBillsWithFilters = getFilteredNotInvoicedBills(
      bills,
      selectedClient,
      filteredServiceDate
   );

   const _limit = 10;

   function changePage(number) {
      if (page === number) return;
      handlePageChange(true);
      handleItemsCheckup(false);
      setBills(mapBills(bills, false));
      const _skip = getSkipCount(number, _limit);
      dispatch(billActions.getBills({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   }

   const checkedBillsIdList = bills
      .filter((bill) => bill.isChecked)
      .map((bill) => bill._id);

   return (
      <div className={classes.generateInvoiceContainerStyle}>
         <div className={classes.generateInvoiceActionsStyle}>
            <BillFiltersSelectors
               filterIsFor={"notInvoicedBill"}
               clientsNames={clientsNames}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               changeDateInput={(ev) => setFilteredServiceDate(ev.target.value)}
               filteredDate={filteredServiceDate}
            />
         </div>
         {!!notInvoicedBillsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {notInvoicedBillsLoader && pageIsChanging ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <NotInvoicedBillTable
                        notInvoicedBills={notInvoicedBillsWithFilters}
                        triggerBill={handleTriggeredBill}
                        uncheckAllBills={() => setBills(mapBills(bills, false))}
                     />
                  )}
               </div>
               <div className={classes.notInvoicedBillsFooterStyle}>
                  <Pagination
                     onChange={(event, value) => changePage(value)}
                     page={page}
                     count={Math.ceil(notInvoicedBillsQty / _limit)}
                     color={"primary"}
                  />
                  <CreateChancel
                     classes={classes.generateOrCancelButnStyle}
                     loader={!!generateInvoiceLoader.length}
                     create={"Generate Invoices"}
                     chancel={"Cancel"}
                     onCreate={() =>
                        dispatch(
                           invoiceActions.generateInvoice({
                              bills: checkedBillsIdList,
                           })
                        )
                     }
                     onClose={() => history.push("/invoices")}
                     disabled={!checkedBillsIdList.length}
                  />
               </div>
            </div>
         ) : (
            <NoItemText text={"No Not Invoiced Bills Yet"} />
         )}
      </div>
   );
};
