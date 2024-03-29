import React, { useContext, useEffect, useState } from "react";
import { ClaimPaymentsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import {
   httpRequestsOnSuccessActions,
   claimPaymentActions,
   fundingSourceActions,
} from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const ClaimPayments = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const claimPaymentsData = useSelector((state) => state.claimPayment.claimPayments);
   const { funders } = useSelector((state) => state.fundingSource.fundingSourceList);

   const { claimPmt: claimPayments, count } = claimPaymentsData || {};
   const mappedFunders = funders?.map((funder) => ({ id: funder.id, name: funder.name }));

   const loader = FindLoad("GET_CLAIM_PAYMENTS");
   const success = FindSuccess("GET_CLAIM_PAYMENTS");

   useEffect(() => {
      dispatch(claimPaymentActions.getClaimPayments());
      dispatch(fundingSourceActions.getFundingSource({ status: "ACTIVE" }));
   }, []);

   useEffect(
      () => () => {
         if (pageIsChanging) {
            handlePageChange(false);
         }
      },
      [pageIsChanging]
   );

   useEffect(() => {
      if (!!success.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_CLAIM_PAYMENTS"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <ClaimPaymentsFragment
         claimPayments={claimPayments}
         claimPaymentsQty={count}
         page={page}
         handleGetPage={setPage}
         claimPaymentsLoader={loader}
         mappedFunders={mappedFunders}
      />
   );
};
