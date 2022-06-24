import React, { useContext, useState } from "react";
import { claimPaymentsStyle } from "./styles";
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
import { claimPaymentActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { ClaimPaymentInputs, ClaimPaymentTable } from "./core";
import { getFilteredClaimPayments } from "./constants";

export const ClaimPaymentsFragment = ({
   claimPayments = [],
   claimPaymentsQty = claimPayments.length,
   page,
   handleGetPage,
   claimPaymentsLoader,
   mappedFunders,
}) => {
   const classes = claimPaymentsStyle();

   const dispatch = useDispatch();

   const { handlePageChange } = useContext(PaginationContext);

   const [selectedPayor, setSelectedPayor] = useState("All");
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
      (claimPayment) => claimPayment?.fundingSource?.name
   );

   const claimPaymentsWithFilters = getFilteredClaimPayments(
      claimPayments,
      selectedPayor,
      selectedStatus
   );

   const _limit = 10;

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(claimPaymentActions.getClaimPayments({ limit: _limit, skip: _skip }));
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
               statuses={enumValues.PAYMENT_STATUSES}
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
                  handleChangePage={(number) => changePage(number)}
                  count={claimPaymentsQty}
                  limitCountNumber={_limit}
               />
            </div>
         ) : (
            <NoItemText text={"No Claim Payments Yet"} />
         )}
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <ModalContentWrapper
                  wrapperClassName={classes.claimPaymentWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={titleContent}
                  subtitleContent={subtitleContent}
                  content={<TwoStepsContainer activeStep={activeStep} />}
               >
                  <ClaimPaymentInputs
                     activeStep={activeStep}
                     handleStep={setActiveStep}
                     closeModal={() => setOpen(false)}
                     mappedFunders={mappedFunders}
                  />
               </ModalContentWrapper>
            }
         />
      </div>
   );
};
