import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dummyData, FindLoad } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { invoiceActions } from "@eachbase/store";
import { GET_INVOICE_BY_ID_SUCCESS } from "@eachbase/store/billing/invoice/invoice.type";
import { InvoiceDetailsFragment } from "@eachbase/fragments";

export const InvoiceDetails = () => {
   const params = useParams();

   const dispatch = useDispatch();

   // const invoiceById = useSelector((state) => state.invoice.invoiceById);

   // temporary
   const invoiceById = dummyData.INVOICES.find((invoice) => invoice._id === params.id);
   // end

   const loader = FindLoad("GET_INVOICE_BY_ID");

   useEffect(() => {
      dispatch(invoiceActions.getInvoiceById(params.id));
      return () => {
         dispatch({
            type: GET_INVOICE_BY_ID_SUCCESS,
            payload: { invoiceById: null },
         });
      };
   }, [params.id]);

   if (!!loader.length) return <Loader />;

   return (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Invoices"}
               child={"Invoice Details"}
               parentLink={"/invoices"}
            />
         </div>
         <InvoiceDetailsFragment invoiceDetails={invoiceById} />
      </>
   );
};
