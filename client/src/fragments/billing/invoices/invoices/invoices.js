import React, { useContext, useState } from "react";
import { invoicesStyle } from "./styles";
import {
   AddButton,
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
} from "@eachbase/components";
import { enumValues, getSkipCount, PaginationContext } from "@eachbase/utils";
import { invoiceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { InvoiceTable } from "./core";
import { useHistory } from "react-router";
import { getFilteredInvoices } from "./constants";

export const InvoicesFragment = ({
   invoices = [],
   invoicesQty = invoices.length,
   page,
   handleGetPage,
   invoicesLoader,
}) => {
   const classes = invoicesStyle();

   const history = useHistory();

   const dispatch = useDispatch();

   const { handlePageChange } = useContext(PaginationContext);

   const [selectedClient, setSelectedClient] = useState("All");
   const [filteredDateFrom, setFilteredDateFrom] = useState("");
   const [filteredDateTo, setFilteredDateTo] = useState("");
   const [selectedStatus, setSelectedStatus] = useState("All");
   const [filteredInvoiceDate, setFilteredInvoiceDate] = useState("");

   const clientsNames = invoices.map(
      (invoice) => `${invoice?.client?.firstName} ${invoice?.client?.lastName}`
   );

   const invoicesWithFilters = getFilteredInvoices(
      invoices,
      selectedClient,
      filteredDateFrom,
      filteredDateTo,
      selectedStatus,
      filteredInvoiceDate
   );

   const _limit = 10;

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(invoiceActions.getInvoices({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   };

   return (
      <div>
         <div className={classes.addButton}>
            <BillFiltersSelectors
               filterIsFor={"invoice"}
               clientsNames={clientsNames}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               changeDateFromInput={(ev) => setFilteredDateFrom(ev.target.value)}
               filteredDateFrom={filteredDateFrom}
               changeDateToInput={(ev) => setFilteredDateTo(ev.target.value)}
               filteredDateTo={filteredDateTo}
               statuses={enumValues.INVOICE_STATUSES}
               passStatusHandler={(selStatus) => setSelectedStatus(selStatus)}
               selectedStatus={selectedStatus}
               changeDateInput={(ev) => setFilteredInvoiceDate(ev.target.value)}
               filteredDate={filteredInvoiceDate}
            />
            <AddButton
               addButtonClassName={classes.generateInvoiceButnStyle}
               text={"Generate Invoice"}
               handleClick={() => history.push("/generateInvoice")}
            />
         </div>
         {!!invoicesWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {invoicesLoader ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <InvoiceTable invoices={invoicesWithFilters} />
                  )}
               </div>
               <PaginationItem
                  listLength={invoicesWithFilters.length}
                  page={page}
                  handleChangePage={(number) => changePage(number)}
                  count={invoicesQty}
                  limitCountNumber={_limit}
               />
            </div>
         ) : (
            <NoItemText text={"No Invoices Yet"} />
         )}
      </div>
   );
};
