import React, { useContext, useEffect, useState } from "react";
import { InvoicesFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { httpRequestsOnSuccessActions, invoiceActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { dummyData, FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const Invoices = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   // const invoicesData = useSelector((state) => state.invoice.invoices);

   // temporary
   const invoicesData = dummyData.INVOICES;
   // end

   const { invoices, count } = invoicesData || {};

   const loader = FindLoad("GET_INVOICES");
   const success = FindSuccess("GET_INVOICES");

   useEffect(() => {
      dispatch(invoiceActions.getInvoices());
   }, []);

   useEffect(() => {
      if (!!success.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_INVOICES"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <InvoicesFragment
         invoices={invoicesData}
         invoicesQty={count}
         page={page}
         handleGetPage={setPage}
         invoicesLoader={loader}
      />
   );
};
