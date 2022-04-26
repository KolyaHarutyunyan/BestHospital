import React, { useContext, useState } from "react";
import { invoicesStyle } from "./styles";
import {
   AddButton,
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
} from "@eachbase/components";
import { enumValues, handleCreatedAtDate, PaginationContext } from "@eachbase/utils";
import { invoiceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { InvoiceTable } from "./core";
import { useHistory } from "react-router";

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

   const clientsNames = invoices.map((invoice) => invoice?.client?.firstName);

   const invoicesWithFilters =
      selectedClient === "All" &&
      filteredDateFrom === "" &&
      filteredDateTo === "" &&
      selectedStatus === "All"
         ? invoices
         : selectedClient !== "All"
         ? invoices.filter(
              (invoice) =>
                 invoice?.client?.firstName?.toLowerCase() ===
                 selectedClient.toLowerCase()
           )
         : filteredDateFrom !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.early, 10) ===
                 handleCreatedAtDate(filteredDateFrom, 10)
           )
         : filteredDateTo !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.dateRange?.latest, 10) ===
                 handleCreatedAtDate(filteredDateTo, 10)
           )
         : selectedStatus !== "All"
         ? invoices.filter(
              (invoice) => invoice?.status.toLowerCase() === selectedStatus.toLowerCase()
           )
         : filteredInvoiceDate !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.invoiceDate, 10) ===
                 handleCreatedAtDate(filteredInvoiceDate, 10)
           )
         : [];

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(invoiceActions.getInvoices({ limit: 10, skip: start }));
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
                  handleReturn={(number) => changePage(number)}
                  count={invoicesQty}
                  entries={invoices.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Invoices Yet"} />
         )}
      </div>
   );
};
