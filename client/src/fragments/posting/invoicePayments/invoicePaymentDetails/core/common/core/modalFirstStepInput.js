import React, { useContext, useState } from "react";
import { addInvoiceModalInputsCoreStyle } from "./styles";
import { Loader, NoItemText, BillFiltersSelectors } from "@eachbase/components";
import { PaginationContext } from "@eachbase/utils";
import { invoiceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { InvoiceModalTable } from "./common";
import { getFilteredInvoicesForInvoicePmt } from "./constants";

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

   const invoicesWithFilters = getFilteredInvoicesForInvoicePmt(
      invoices,
      filteredDateFrom,
      filteredDateTo,
      filteredDate
   );

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
         <div className={classes.invoiceTableBoxStyle}>
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
      </div>
   );
};
