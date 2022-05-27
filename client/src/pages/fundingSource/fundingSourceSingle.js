import React, { useEffect } from "react";
import { FundingSourceItem } from "@eachbase/fragments/fundingSource";
import { useDispatch } from "react-redux";
import {
   adminActions,
   fundingSourceActions,
   httpRequestsOnSuccessActions,
   systemActions,
   noteActions,
} from "@eachbase/store";
import { useParams } from "react-router-dom";
import { FindLoad } from "@eachbase/utils";
import { Loader } from "@eachbase/components";

export const FundingSourceSingle = () => {
   const dispatch = useDispatch();
   const params = useParams();
   const loader = FindLoad("GET_FUNDING_SOURCE_BY_ID");

   useEffect(() => {
      dispatch(adminActions.getAdmins());
      dispatch(fundingSourceActions.getFundingSourceById(params.id));
      dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id));
      dispatch(fundingSourceActions.getFundingSourceHistoriesById("Funder"));
      dispatch(noteActions.getGlobalNotes(params.id, "Funder"));
      dispatch(systemActions.getServices());
      dispatch(systemActions.getCredentialGlobal());
      dispatch(httpRequestsOnSuccessActions.removeSuccess());
   }, []);

   return (
      <>
         {!!loader.length ? (
            <div style={{ height: "85vh" }}>
               <Loader />
            </div>
         ) : (
            <FundingSourceItem />
         )}
      </>
   );
};
