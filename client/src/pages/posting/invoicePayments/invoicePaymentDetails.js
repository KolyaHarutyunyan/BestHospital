import React, { useEffect } from "react";
import { InvoicePaymentDetailsFragment } from "@eachbase/fragments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dummyData, FindLoad } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { invoicePaymentActions } from "@eachbase/store";

export const InvoicePaymentDetails = () => {
   const params = useParams();

   const dispatch = useDispatch();

   const invoicePaymentById = useSelector(
      (state) => state.invoicePayment.invoicePaymentById
   );

   // temporary
   // const invoicePaymentById = dummyData.INVOICE_PAYMENTS.find(
   //    (invoicePmt) => invoicePmt._id === params.id
   // );
   // end

   const loader = FindLoad("GET_INVOICE_PAYMENT_BY_ID");

   useEffect(() => {
      dispatch(invoicePaymentActions.getInvoicePaymentById(params.id));
      return () => {
         dispatch({
            type: "GET_INVOICE_PAYMENT_BY_ID_SUCCESS",
            payload: { invoicePaymentById: null },
         });
      };
   }, [params.id]);

   if (!!loader.length) return <Loader />;

   return (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Invoice Payments"}
               child={"Payment Details"}
               parentLink={"/invoicePayments"}
            />
         </div>
         <InvoicePaymentDetailsFragment invoicePaymentDetails={invoicePaymentById} />
      </>
   );
};
