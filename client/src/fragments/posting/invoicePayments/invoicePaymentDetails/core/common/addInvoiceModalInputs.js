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

export const AddInvoiceModalInputs = ({
   activeStep,
   handleStep,
   closeModal,
   invoicePaymentId,
}) => {
   const classes = tableTheadTbodyStyle();

   useEffect(() => handleStep && handleStep("first"), []);

   const dispatch = useDispatch();

   const addInvoiceInInvoicePmtLoader = FindLoad("ADD_INVOICE_IN_INVOICE_PAYMENT");
   const addInvoiceInInvoicePmtSuccess = FindSuccess("ADD_INVOICE_IN_INVOICE_PAYMENT");
   const getInvoicesLoader = FindLoad("GET_INVOICES");
   const getInvoicesSuccess = FindSuccess("GET_INVOICES");

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
   const [receivablesAreFilled, setReceivablesAreFilled] = useState(false);
   const [filledReceivables, setFilledReceivables] = useState([]);

   useEffect(() => {
      dispatch(invoiceActions.getInvoices());
   }, []);

   useEffect(() => {
      if (!!getInvoicesSuccess.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_INVOICES"));
      }
   }, [getInvoicesSuccess]);

   useEffect(() => {
      if (!!addInvoiceInInvoicePmtSuccess.length) {
         closeModal();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("ADD_INVOICE_IN_INVOICE_PAYMENT")
         );
      }
   }, [addInvoiceInInvoicePmtSuccess]);

   function handleNext() {
      handleStep && handleStep("last");
   }

   function handleSubmit() {
      const invoiceDataInInvoicePmt = {
         invoiceId: selectedInvoiceId,
         receivables: filledReceivables.map((receivable) => ({
            receivableId: receivable._id,
            paidAMT: +receivable.paidAMT,
         })),
      };
      dispatch(
         invoicePaymentActions.addInvoiceInInvoicePayment(
            invoicePaymentId,
            invoiceDataInInvoicePmt
         )
      );
   }

   return (
      <div>
         {isFirst &&
            (!!getInvoicesLoader && !pageIsChanging ? (
               <div className={classes.loaderContainerStyle}>
                  <Loader circleSize={50} />
               </div>
            ) : (
               <ModalFirstStepInput
                  invoices={invoicesData}
                  invoicesQty={count}
                  page={page}
                  handleGetPage={setPage}
                  invoicesLoader={getInvoicesLoader}
                  triggerId={(claimId) => setSelectedInvoiceId(claimId)}
               />
            ))}
         {isLast && (
            <ModalLastStepInput
               invoices={invoicesData}
               selectedInvoiceId={selectedInvoiceId}
               triggerBool={(filled) => setReceivablesAreFilled(filled)}
               triggerReceivables={(receivables) => setFilledReceivables(receivables)}
            />
         )}
         <div className={classes.paginationAndActionsBoxStyle}>
            <CreateChancel
               classes={butnStyle}
               loader={!!addInvoiceInInvoicePmtLoader.length}
               create={butnText}
               chancel={"Cancel"}
               onCreate={isLast ? handleSubmit : handleNext}
               onClose={closeModal}
               disabled={isLast ? !receivablesAreFilled : !selectedInvoiceId}
            />
         </div>
      </div>
   );
};
