import React, { useContext, useState } from "react";
import { claimPaymentsStyle } from "./styles";
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
import { claimPaymentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { ClaimPaymentInputs, ClaimPaymentTable } from "./core";

export const ClaimPaymentsFragment = ({
   claimPayments = [],
   claimPaymentsQty = claimPayments.length,
   page,
   handleGetPage,
   claimPaymentsLoader,
   fundersNames,
}) => {
   const classes = claimPaymentsStyle();

   const dispatch = useDispatch();

   const { handlePageChange } = useContext(PaginationContext);

   const [selectedPayor, setSelectedPayor] = useState("All");
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

   const payorsNames = claimPayments.map(
      (claimPayment) => claimPayment?.funder?.firstName
   );
   const clientsNames = claimPayments.map(
      (claimPayment) => claimPayment?.client?.firstName
   );

   const claimPaymentsWithFilters =
      selectedPayor === "All" && selectedClient === "All" && selectedStatus === "All"
         ? claimPayments
         : selectedPayor !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.funder?.firstName?.toLowerCase() ===
                 selectedPayor.toLowerCase()
           )
         : selectedClient !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.client?.firstName?.toLowerCase() ===
                 selectedClient.toLowerCase()
           )
         : selectedStatus !== "All"
         ? claimPayments.filter(
              (claimPayment) =>
                 claimPayment?.status.toLowerCase() === selectedStatus.toLowerCase()
           )
         : [];

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(claimPaymentActions.getClaimPayments({ limit: 10, skip: start }));
      handleGetPage(number);
   };

   return (
      <div>
         <div className={classes.addButton}>
            <BillFiltersSelectors
               filterIsFor={"claimPayment"}
               payorsNames={payorsNames}
               passPayorHandler={(selPayor) => setSelectedPayor(selPayor)}
               selectedPayor={selectedPayor}
               clientsNames={clientsNames}
               passClientHandler={(selClient) => setSelectedClient(selClient)}
               selectedClient={selectedClient}
               statuses={enumValues.POSTING_PAYMENT_TYPES}
               passStatusHandler={(selStatus) => setSelectedStatus(selStatus)}
               selectedStatus={selectedStatus}
            />
            <AddButton
               addButtonClassName={classes.createClaimPaymentButnStyle}
               text={"Create a new Payment"}
               handleClick={() => setOpen(true)}
            />
         </div>
         {!!claimPaymentsWithFilters.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {claimPaymentsLoader ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <ClaimPaymentTable claimPayments={claimPaymentsWithFilters} />
                  )}
               </div>
               <PaginationItem
                  listLength={claimPaymentsWithFilters.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={claimPaymentsQty}
                  entries={claimPayments.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Claim Payments Yet"} />
         )}
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.claimPaymentWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={titleContent}
                  subtitleContent={subtitleContent}
                  content={<TwoStepsContainer activeStep={activeStep} />}
               >
                  <ClaimPaymentInputs
                     activeStep={activeStep}
                     handleStep={setActiveStep}
                     closeModal={() => setOpen(false)}
                     fundingSource={fundersNames}
                  />
               </BillingModalWrapper>
            }
         />
      </div>
   );
};
