import React, { useEffect } from "react";
import { ClaimPaymentDetailsFragment } from "@eachbase/fragments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { claimPaymentActions, fundingSourceActions } from "@eachbase/store";

export const ClaimPaymentDetails = () => {
   const params = useParams();

   const dispatch = useDispatch();

   const claimPaymentById = useSelector((state) => state.claimPayment.claimPaymentById);
   const { funders } = useSelector((state) => state.fundingSource.fundingSourceList);

   const mappedFunders = funders?.map((funder) => ({ id: funder.id, name: funder.name }));

   const loader = FindLoad("GET_CLAIM_PAYMENT_BY_ID");

   useEffect(() => {
      dispatch(claimPaymentActions.getClaimPaymentById(params.id));
      dispatch(fundingSourceActions.getFundingSource());
      return () => {
         dispatch({
            type: "GET_CLAIM_PAYMENT_BY_ID_SUCCESS",
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
         <ClaimPaymentDetailsFragment
            claimPaymentDetails={claimPaymentById}
            mappedFunders={mappedFunders}
         />
      </>
   );
};
