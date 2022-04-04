import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dummyData, FindLoad } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { GET_CLAIM_BY_ID_SUCCESS } from "@eachbase/store/billing/claim/claim.type";
import { claimActions } from "@eachbase/store";
import { ClaimDetailsFragment } from "@eachbase/fragments";

export const ClaimDetails = () => {
   const params = useParams();

   const dispatch = useDispatch();

   // const claimById = useSelector((state) => state.claim.claimById);

   // temporary
   const claimById = dummyData.CLAIMS.find((claim) => claim._id === params.id);
   // end

   const loader = FindLoad("GET_CLAIM_BY_ID");

   useEffect(() => {
      dispatch(claimActions.getClaimById(params.id));

      return () => {
         dispatch({
            type: GET_CLAIM_BY_ID_SUCCESS,
            payload: { claimById: null },
         });
      };
   }, [params.id]);

   if (!!loader.length) return <Loader />;

   return (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Claims"}
               child={"Claim Details"}
               parentLink={"/claims"}
            />
         </div>
         <ClaimDetailsFragment claimDetails={claimById} />
      </>
   );
};
