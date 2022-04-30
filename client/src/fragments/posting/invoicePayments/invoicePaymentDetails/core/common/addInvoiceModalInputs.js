import React, { useContext, useEffect, useState } from "react";
import { CreateChancel, Loader } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";
import { ModalFirstStepInput, ModalLastStepInput } from "./core";
import { useDispatch, useSelector } from "react-redux";
import {
   httpRequestsOnSuccessActions,
   invoiceActions,
   invoicePaymentActions,
} from "@eachbase/store";

export const AddInvoiceModalInputs = ({ activeStep, handleStep, closeModal }) => {
   const classes = tableTheadTbodyStyle();

   useEffect(() => handleStep && handleStep("first"), []);

   const dispatch = useDispatch();

   const addInvoiceLoader = FindLoad("ADD_INVOICE");
   const addInvoiceSuccess = FindSuccess("ADD_INVOICE");
   const loader = FindLoad("GET_INVOICES");
   const success = FindSuccess("GET_INVOICES");

   const isFirst = activeStep === "first";
   const isLast = activeStep === "last";

   const butnStyle = `${classes.addInvoiceButnStyle} ${
      isFirst ? "atFirstStep" : isLast ? "atLastStep" : ""
   }`;
   const butnText = isFirst ? "Next" : isLast ? "Add Invoice" : "";

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const invoicesData = useSelector((state) => state.invoice.invoices);
   const { invoices, count } = invoicesData || {};

   const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
   const [page, setPage] = useState(1);
   const [invoicePmtIsFilled, setInvoicePmtIsFilled] = useState(false);
   const [invoice, setInvoice] = useState({});

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

   useEffect(() => {
      if (!!addInvoiceSuccess.length) {
         closeModal();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("ADD_INVOICE"));
      }
   }, [addInvoiceSuccess]);

   function handleNext() {
      handleStep && handleStep("last");
   }

   function handleSubmit() {
      // dispatch(invoicePaymentActions.addInvoice(invoice))
   }

   return (
      <div>
         {isFirst &&
            (!!loader && !pageIsChanging ? (
               <div className={classes.loaderContainerStyle}>
                  <Loader circleSize={50} />
               </div>
            ) : (
               <ModalFirstStepInput
                  invoices={invoicesData}
                  invoicesQty={count}
                  page={page}
                  handleGetPage={setPage}
                  invoicesLoader={loader}
                  triggerId={(claimId) => setSelectedInvoiceId(claimId)}
               />
            ))}
         {isLast && (
            <ModalLastStepInput
               invoices={invoicesData}
               selectedInvoiceId={selectedInvoiceId}
               triggerBool={(filled) => setInvoicePmtIsFilled(filled)}
               triggerFilledInvoice={(filledInvoice) => setInvoice(filledInvoice)}
            />
         )}
         <div className={classes.paginationAndActionsBoxStyle}>
            <CreateChancel
               classes={butnStyle}
               loader={!!addInvoiceLoader.length}
               create={butnText}
               chancel={"Cancel"}
               onCreate={isLast ? handleSubmit : handleNext}
               onClose={closeModal}
               disabled={isLast ? !invoicePmtIsFilled : !selectedInvoiceId}
            />
         </div>
      </div>
   );
};
