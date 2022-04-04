import React, { useContext, useEffect, useState } from "react";
import { ClaimsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { claimActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import {
   dummyData,
   FindLoad,
   FindSuccess,
   PaginationContext,
} from "@eachbase/utils";

export const Claims = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   // const claimsData = useSelector((state) => state.claim.claims);

   // temporary
   const claimsData = { claims: dummyData.CLAIMS, count: 10 };
   // end

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

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <ClaimsFragment
         claims={claims}
         claimsQty={count}
         page={page}
         handleGetPage={setPage}
         claimsLoader={loader}
      />
   );
};
