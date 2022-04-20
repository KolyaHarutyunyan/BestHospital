import React, { useContext, useEffect, useState } from "react";
import { ClaimPaymentsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { httpRequestsOnSuccessActions, postingActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { dummyData, FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const ClaimPayments = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   // const claimPaymentsData = useSelector((state) => state.....);

   // temporary
   const claimPaymentsData = dummyData.CLAIM_PAYMENTS;
   // end

   const { claimPayments, count } = claimPaymentsData || {};

   const loader = FindLoad("GET_CLAIM_PAYMENTS");
   const success = FindSuccess("GET_CLAIM_PAYMENTS");

   useEffect(() => {
      dispatch(postingActions.getPostings());
   }, []);

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
         claimPayments={claimPaymentsData}
         claimPaymentsQty={count}
         page={page}
         handleGetPage={setPage}
         claimPaymentsLoader={loader}
      />
   );
};
