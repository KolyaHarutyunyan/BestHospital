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

export const AddClaimModalInputs = ({ activeStep, handleStep, closeModal }) => {
   const classes = tableTheadTbodyStyle();

   useEffect(() => handleStep && handleStep("first"), []);

   const dispatch = useDispatch();

   const addClaimLoader = FindLoad("ADD_CLAIM");
   const addClaimSuccess = FindSuccess("ADD_CLAIM");
   const loader = FindLoad("GET_CLAIMS");
   const success = FindSuccess("GET_CLAIMS");

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
      if (!!success.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_CLAIMS"));
      }
   }, [success]);

   useEffect(() => {
      if (!!addClaimSuccess.length) {
         closeModal();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("ADD_CLAIM"));
      }
   }, [addClaimSuccess]);

   function handleNext() {
      handleStep && handleStep("last");
   }

   function handleSubmit() {
      // dispatch(claimPaymentActions.addClaim(filledReceivables))
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
                  claims={claimsData}
                  claimsQty={count}
                  page={page}
                  handleGetPage={setPage}
                  claimsLoader={loader}
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
               loader={!!addClaimLoader.length}
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
