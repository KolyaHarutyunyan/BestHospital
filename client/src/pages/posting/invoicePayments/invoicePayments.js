import React, { useContext, useEffect, useState } from "react";
import { InvoicePaymentsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { httpRequestsOnSuccessActions, invoicePaymentActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { dummyData, FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const InvoicePayments = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   // const invoicePaymentsData = useSelector((state) => state.invoicePayment.invoicePayments);

   // temporary
   const invoicePaymentsData = dummyData.INVOICE_PAYMENTS;
   // end

   const { invoicePayments, count } = invoicePaymentsData || {};

   const loader = FindLoad("GET_INVOICE_PAYMENTS");
   const success = FindSuccess("GET_INVOICE_PAYMENTS");

   useEffect(() => {
      dispatch(invoicePaymentActions.getInvoicePayments());
   }, []);

   useEffect(() => {
      if (!!success.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_INVOICE_PAYMENTS"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <InvoicePaymentsFragment
         invoicePayments={invoicePaymentsData}
         invoicePaymentsQty={count}
         page={page}
         handleGetPage={setPage}
         invoicePaymentsLoader={loader}
      />
   );
};
