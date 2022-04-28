import React, { useContext, useState } from "react";
import { addInvoiceModalInputsCoreStyle } from "./styles";
import { Loader, NoItemText, BillFiltersSelectors } from "@eachbase/components";
import { handleCreatedAtDate, PaginationContext } from "@eachbase/utils";
import { invoiceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { InvoiceModalTable } from "./common";

export const ModalFirstStepInput = ({
   invoices = [],
   invoicesQty = invoices.length,
   page,
   handleGetPage,
   invoicesLoader,
   triggerId,
}) => {
   const classes = addInvoiceModalInputsCoreStyle();

   const dispatch = useDispatch();

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [filteredDateFrom, setFilteredDateFrom] = useState("");
   const [filteredDateTo, setFilteredDateTo] = useState("");
   const [filteredDate, setFilteredDate] = useState("");

   const invoicesWithFilters =
      filteredDateFrom === "" && filteredDateTo === "" && filteredDate === ""
         ? invoices
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
         : filteredDate !== ""
         ? invoices.filter(
              (invoice) =>
                 handleCreatedAtDate(invoice?.invoiceDate, 10) ===
                 handleCreatedAtDate(filteredDate, 10)
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
         <div className={classes.filtersBoxStyle}>
            <BillFiltersSelectors
               filterIsFor={"invoiceInModal"}
               changeDateFromInput={(ev) => setFilteredDateFrom(ev.target.value)}
               filteredDateFrom={filteredDateFrom}
               changeDateToInput={(ev) => setFilteredDateTo(ev.target.value)}
               filteredDateTo={filteredDateTo}
               changeDateInput={(ev) => setFilteredDate(ev.target.value)}
               filteredDate={filteredDate}
            />
         </div>
         {!!invoicesWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {!!invoicesLoader && pageIsChanging ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <InvoiceModalTable
                        invoices={invoicesWithFilters}
                        triggerId={triggerId}
                     />
                  )}
               </div>
               <div className={classes.paginationBoxStyle}>
                  <Pagination
                     onChange={(event, number) => changePage(number)}
                     page={page}
                     count={Math.ceil(invoicesQty / 10)}
                     color={"primary"}
                     size={"small"}
                  />
               </div>
            </div>
         ) : (
            <NoItemText text={"No Invoices Yet"} />
         )}
      </div>
   );
};
