import React, { useContext, useEffect, useState } from "react";
import { GenerateClaimFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { billActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const GenerateClaim = () => {
   const dispatch = useDispatch();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const billsData = useSelector((state) => state.bill.bills);

   const notClaimedBills = billsData?.bills?.filter(
      (bill) => bill.claimStatus === "NOTCLAIMED"
   );

   const loader = FindLoad("GET_BILLS");
   const success = FindSuccess("GET_BILLS");

   useEffect(() => {
      dispatch(billActions.getBills());
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
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_BILLS"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Claims"}
               child={"Generate Claims"}
               parentLink={"/claims"}
            />
         </div>
         <GenerateClaimFragment
            notClaimedBills={notClaimedBills}
            notClaimedBillsQty={notClaimedBills?.length}
            page={page}
            handleGetPage={setPage}
            notClaimedBillsLoader={loader}
         />
      </>
   );
};
