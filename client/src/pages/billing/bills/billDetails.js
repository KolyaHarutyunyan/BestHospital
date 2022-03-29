import React, { useContext, useEffect, useState } from "react";
import { BillDetailsFragment } from "@eachbase/fragments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";
import { CustomBreadcrumbs, Loader } from "@eachbase/components";
import { billActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { GET_BILL_BY_ID_SUCCESS } from "@eachbase/store/billing/bill/bill.type";

export const BillDetails = () => {
   const params = useParams();

   const [page, setPage] = useState(1);

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const dispatch = useDispatch();

   const billByIdData = useSelector((state) => state.bill.billById);
   const { bills: billById, count } = billByIdData || {};

   const loader = !!FindLoad("GET_BILL_BY_ID").length;
   const success = FindSuccess("GET_BILL_BY_ID");

   useEffect(() => {
      if (!!success.length) {
         if (!pageIsChanging) setPage(1);
         handlePageChange(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_BILL_BY_ID"));
      }
   }, [success]);

   useEffect(() => {
      dispatch(billActions.getBillById(params.id));

      return () => {
         dispatch({
            type: GET_BILL_BY_ID_SUCCESS,
            payload: { billById: null },
         });
      };
   }, [params.id]);

   return loader && !pageIsChanging ? (
      <Loader />
   ) : (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Bills"}
               child={"Bill Details"}
               parentLink={"/bills"}
            />
         </div>
         <BillDetailsFragment
            billDetails={billById}
            transactionQty={count}
            page={page}
            handleGetPage={setPage}
            tsxLoader={loader}
         />
      </>
   );
};
