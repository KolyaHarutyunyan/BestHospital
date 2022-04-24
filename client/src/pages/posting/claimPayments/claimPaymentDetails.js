import React, { useEffect } from "react";
import { ClaimPaymentDetailsFragment } from "@eachbase/fragments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dummyData, FindLoad } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { postingActions } from "@eachbase/store";
import { GET_POSTING_BY_ID_SUCCESS } from "@eachbase/store/billing/posting/posting.type";

export const ClaimPaymentDetails = () => {
   const params = useParams();

   const dispatch = useDispatch();

   // const claimPaymentById = useSelector((state) => state.claimPayment.claimPaymentById);

   // temporary
   const claimPaymentById = dummyData.CLAIM_PAYMENTS.find((claimPmt) => claimPmt._id === params.id);
   // end

   const loader = FindLoad("GET_CLAIM_PAYMENT_BY_ID");
 
   useEffect(() => {
      dispatch(postingActions.getPostingById(params.id));
      return () => {
         dispatch({
            type: GET_POSTING_BY_ID_SUCCESS,
            payload: { claimPaymentById: null },
         });
      };
   }, [params.id]);

   if (!!loader.length) return <Loader />;

   return (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Claim Payments"}
               child={"Payment Details"}
               parentLink={"/claimPayments"}
            />
         </div>
         <ClaimPaymentDetailsFragment claimPaymentDetails={claimPaymentById} />
      </>
   );
};

