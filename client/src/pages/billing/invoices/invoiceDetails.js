import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { invoiceActions } from "@eachbase/store";
import { InvoiceDetailsFragment } from "@eachbase/fragments";

export const InvoiceDetails = () => {
   const params = useParams();

   const dispatch = useDispatch();

   const invoiceById = useSelector((state) => state.invoice.invoiceById);

   const loader = FindLoad("GET_INVOICE_BY_ID");

   useEffect(() => {
      dispatch(invoiceActions.getInvoiceById(params.id));
      return () => {
         dispatch({
            type: "GET_INVOICE_BY_ID_SUCCESS",
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
