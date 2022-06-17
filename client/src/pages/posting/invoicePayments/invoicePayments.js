import React, { useContext, useEffect, useState } from "react";
import { InvoicePaymentsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import {
   clientActions,
   httpRequestsOnSuccessActions,
   invoicePaymentActions,
} from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const InvoicePayments = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const invoicePaymentsData = useSelector(
      (state) => state.invoicePayment.invoicePayments
   );
   const { clients } = useSelector((state) => state.client.clientList);

   const { invPmt: invoicePayments, count } = invoicePaymentsData || {};
   const mappedClients = clients?.map((client) => ({
      id: client.id,
      name: `${client.firstName} ${client.lastName}`,
   }));

   const loader = FindLoad("GET_INVOICE_PAYMENTS");
   const success = FindSuccess("GET_INVOICE_PAYMENTS");

   useEffect(() => {
      dispatch(invoicePaymentActions.getInvoicePayments());
      dispatch(clientActions.getClients({ status: "ACTIVE" }));
   }, []);

   useEffect(
      () => () => {
         if (pageIsChanging) {
            handlePageChange(false);
         }
      },
      [pageIsChanging]
   );

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
         invoicePayments={invoicePayments}
         invoicePaymentsQty={count}
         page={page}
         handleGetPage={setPage}
         invoicePaymentsLoader={loader}
         mappedClients={mappedClients}
      />
   );
};
