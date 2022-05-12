import React, { useContext, useEffect, useState } from "react";
import { CreateChancel, Loader } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";
import { ModalFirstStepInput, ModalLastStepInput } from "./core";
import { useDispatch, useSelector } from "react-redux";
import {
   claimActions,
   claimPaymentActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";

export const AddClaimModalInputs = ({
   activeStep,
   handleStep,
   closeModal,
   claimPaymentId,
}) => {
   const classes = tableTheadTbodyStyle();

   useEffect(() => handleStep && handleStep("first"), []);

   const dispatch = useDispatch();

   const addClaimInClaimPmtLoader = FindLoad("ADD_CLAIM_IN_CLAIM_PAYMENT");
   const addClaimInClaimPmtSuccess = FindSuccess("ADD_CLAIM_IN_CLAIM_PAYMENT");
   const getClaimsLoader = FindLoad("GET_CLAIMS");
   const getClaimsSuccess = FindSuccess("GET_CLAIMS");

   const isFirst = activeStep === "first";
   const isLast = activeStep === "last";

   const butnStyle = `${classes.addClaimButnStyle} ${
      isFirst ? "atFirstStep" : isLast ? "atLastStep" : ""
   }`;
   const butnText = isFirst ? "Next" : isLast ? "Add Claim" : "";

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const claimsData = useSelector((state) => state.claim.claims);
   const { claims, count } = claimsData || {};

   const [selectedClaimId, setSelectedClaimId] = useState("");
   const [page, setPage] = useState(1);
   const [receivablesAreFilled, setReceivablesAreFilled] = useState(false);
   const [filledReceivables, setFilledReceivables] = useState([]);

   useEffect(() => {
      dispatch(claimActions.getClaims());
   }, []);

   useEffect(() => {
      if (!!getClaimsSuccess.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_CLAIMS"));
      }
   }, [getClaimsSuccess]);

   useEffect(() => {
      if (!!addClaimInClaimPmtSuccess.length) {
         closeModal();
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("ADD_CLAIM_IN_CLAIM_PAYMENT")
         );
      }
   }, [addClaimInClaimPmtSuccess]);

   function handleNext() {
      handleStep && handleStep("last");
   }

   function handleSubmit() {
      const claimDataInClaimPmt = {
         claimId: selectedClaimId,
         receivables: filledReceivables.map((receivable) => ({
            receivableId: receivable._id,
            allowedAMT: +receivable.allowedAMT,
            deductible: +receivable.deductible,
            copay: +receivable.copay,
            coINS: +receivable.coINS,
            paidAMT: +receivable.paidAMT,
         })),
      };
      dispatch(
         claimPaymentActions.addClaimInClaimPayment(claimPaymentId, claimDataInClaimPmt)
      );
   }

   return (
      <div>
         {isFirst &&
            (!!getClaimsLoader && !pageIsChanging ? (
               <div className={classes.loaderContainerStyle}>
                  <Loader circleSize={50} />
               </div>
            ) : (
               <ModalFirstStepInput
                  claims={claimsData}
                  claimsQty={count}
                  page={page}
                  handleGetPage={setPage}
                  claimsLoader={getClaimsLoader}
                  triggerId={(claimId) => setSelectedClaimId(claimId)}
               />
            ))}
         {isLast && (
            <ModalLastStepInput
               claims={claimsData}
               selectedClaimId={selectedClaimId}
               triggerBool={(filled) => setReceivablesAreFilled(filled)}
               triggerReceivables={(receivables) => setFilledReceivables(receivables)}
            />
         )}
         <div className={classes.paginationAndActionsBoxStyle}>
            <CreateChancel
               classes={butnStyle}
               loader={!!addClaimInClaimPmtLoader.length}
               create={butnText}
               chancel={"Cancel"}
               onCreate={isLast ? handleSubmit : handleNext}
               onClose={closeModal}
               disabled={isLast ? !receivablesAreFilled : !selectedClaimId}
            />
         </div>
      </div>
   );
};
