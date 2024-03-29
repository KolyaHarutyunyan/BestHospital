import React, { useContext, useState } from "react";
import { invoicePaymentsStyle } from "./styles";
import {
   AddButton,
   Loader,
   NoItemText,
   PaginationItem,
   BillFiltersSelectors,
   SimpleModal,
   ModalContentWrapper,
   TwoStepsContainer,
} from "@eachbase/components";
import { enumValues, getSkipCount, PaginationContext } from "@eachbase/utils";
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
   mappedClients,
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

   const _limit = 10;

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(invoicePaymentActions.getInvoicePayments({ limit: _limit, skip: _skip }));
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
               statuses={enumValues.PAYMENT_STATUSES}
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
                  handleChangePage={(number) => changePage(number)}
                  count={invoicePaymentsQty}
                  limitCountNumber={_limit}
               />
            </div>
         ) : (
            <NoItemText text={"No Invoice Payments Yet"} />
         )}
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <ModalContentWrapper
                  wrapperClassName={classes.invoicePaymentWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={titleContent}
                  subtitleContent={subtitleContent}
                  content={<TwoStepsContainer activeStep={activeStep} />}
               >
                  <InvoicePaymentInputs
                     activeStep={activeStep}
                     handleStep={setActiveStep}
                     closeModal={() => setOpen(false)}
                     mappedClients={mappedClients}
                  />
               </ModalContentWrapper>
            }
         />
      </div>
   );
};
