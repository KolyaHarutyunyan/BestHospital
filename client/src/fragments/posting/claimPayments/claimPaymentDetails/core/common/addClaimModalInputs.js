import React, { useContext, useEffect, useState } from "react";
import { CreateChancel, Loader } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";
import { ModalFirstStepInput, ModalLastStepInput } from "./core";
import { useDispatch, useSelector } from "react-redux";
import { claimActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const AddClaimModalInputs = ({ activeStep, handleStep, closeModal }) => {
   const classes = tableTheadTbodyStyle();

   useEffect(() => handleStep && handleStep("first"), []);

   const dispatch = useDispatch();

   const addClaimLoader = FindLoad("ADD_CLAIM");
   const addClaimSuccess = FindSuccess("ADD_CLAIM");

   const isFirst = activeStep === "first";
   const isLast = activeStep === "last";

   const butnText = isFirst ? "Next" : isLast ? "Add Claim" : "";

   const [selectedClaimId, setSelectedClaimId] = useState("");

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const claimsData = useSelector((state) => state.claim.claims);
   const { claims, count } = claimsData || {};

   const loader = FindLoad("GET_CLAIMS");
   const success = FindSuccess("GET_CLAIMS");

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

   function triggerIdHandler(claimId) {
      setSelectedClaimId(claimId);
   }

   function handleNext() {
      handleStep && handleStep("last");
   }

   function handleSubmit() {}

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
                  triggerId={triggerIdHandler}
               />
            ))}
         {isLast && (
            <ModalLastStepInput claims={claimsData} selectedClaimId={selectedClaimId} />
         )}
         <div className={classes.paginationAndActionsBoxStyle}>
            <CreateChancel
               classes={classes.addClaimButnStyle}
               loader={!!addClaimLoader.length}
               create={butnText}
               chancel={"Cancel"}
               onCreate={isLast ? handleSubmit : handleNext}
               onClose={closeModal}
               disabled={!selectedClaimId}
            />
         </div>
      </div>
   );
};
