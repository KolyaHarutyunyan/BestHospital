import React, { useContext, useState } from "react";
import { invoicePaymentsStyle } from "./styles";
import {
   AddButton,
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
   SimpleModal,
   BillingModalWrapper,
   TwoStepsContainer,
} from "@eachbase/components";
import { enumValues, PaginationContext } from "@eachbase/utils";
import { invoicePaymentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { InvoicePaymentInputs, InvoicePaymentTable } from "./core";
import { getFilteredInvoicePayments } from "./constants";

export const InvoicePaymentsFragment = ({
   invoicePayments = [],
   invoicePaymentsQty = invoicePayments.length,
   page,
   handleGetPage,
   invoicePaymentsLoader,
   clientsNames,
   invoices,
}) => {
   const classes = invoicePaymentsStyle();

   const dispatch = useDispatch();

   const { handlePageChange } = useContext(PaginationContext);

   const [selectedClient, setSelectedClient] = useState("All");
   const [selectedStatus, setSelectedStatus] = useState("All");
   const [open, setOpen] = useState(false);
   const [activeStep, setActiveStep] = useState("first");

   const titleContent =
      activeStep === "first"
         ? "Create a Payment"
         : activeStep === "last"
         ? "Add Payment Document"
         : "";

   const subtitleContent =
      activeStep === "first" ? (
         <>To create a payment , please fulfill the below fields.</>
      ) : activeStep === "last" ? (
         <>
            Please fulfill the file type to upload a payment document.
            <em className={classes.breakRowStyle} />
            <em className={classes.warningStyle}>*</em>
            Only <em className={classes.highlightedTextStyle}> PDF, PNG, CSV </em> {"&"}
            <em className={classes.highlightedTextStyle}> JPEG </em> formats are
            supported.
         </>
      ) : (
         ""
      );

   const invoiceClientsNames = invoicePayments.map(
      (invoicePayment) =>
         `${invoicePayment?.client?.firstName} ${invoicePayment?.client?.lastName}`
   );

   const invoicePaymentsWithFilters = getFilteredInvoicePayments(
      invoicePayments,
      selectedClient,
      selectedStatus
   );

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(invoicePaymentActions.getInvoicePayments({ limit: 10, skip: start }));
      handleGetPage(number);
   };

   return (
      <div>
         <div className={classes.addButton}>
            <BillFiltersSelectors
               filterIsFor={"invoicePayment"}
               clientsNames={invoiceClientsNames}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               statuses={enumValues.POSTING_PAYMENT_TYPES}
               passStatusHandler={(selStatus) => setSelectedStatus(selStatus)}
               selectedStatus={selectedStatus}
            />
            <AddButton
               addButtonClassName={classes.createinvoicePaymentButnStyle}
               text={"Create a new Payment"}
               handleClick={() => setOpen(true)}
            />
         </div>
         {!!invoicePaymentsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {invoicePaymentsLoader ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <InvoicePaymentTable invoicePayments={invoicePaymentsWithFilters} />
                  )}
               </div>
               <PaginationItem
                  listLength={invoicePaymentsWithFilters.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={invoicePaymentsQty}
                  entries={invoicePayments.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Invoice Payments Yet"} />
         )}
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.invoicePaymentWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={titleContent}
                  subtitleContent={subtitleContent}
                  content={<TwoStepsContainer activeStep={activeStep} />}
               >
                  <InvoicePaymentInputs
                     activeStep={activeStep}
                     handleStep={setActiveStep}
                     closeModal={() => setOpen(false)}
                     client={clientsNames}
                     invoices={invoices}
                  />
               </BillingModalWrapper>
            }
         />
      </div>
   );
};
