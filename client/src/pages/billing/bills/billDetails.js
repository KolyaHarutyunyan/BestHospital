import React, { useEffect } from "react";
import { BillDetailsFragment } from "@eachbase/fragments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad } from "@eachbase/utils";
import { Loader } from "@eachbase/components";
import { billActions } from "@eachbase/store";
import { GET_BILL_BY_ID_SUCCESS } from "@eachbase/store/billing/bill/bill.type";

export const BillDetails = () => {
   const billById = useSelector((state) => state.bill.billById);
   const loader = !!FindLoad("GET_BILL_BY_ID").length;
   const dispatch = useDispatch();
   const params = useParams();

   useEffect(() => {
      dispatch(billActions.getBillById(params.id));
      return () => {
         dispatch({
            type: GET_BILL_BY_ID_SUCCESS,
            payload: { billById: null },
         });
      };
   }, [params.id]);

   return loader ? <Loader /> : <BillDetailsFragment billDetails={billById} />;
};