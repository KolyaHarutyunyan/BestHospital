import React, { useEffect } from "react";
import { BillingDetailsFragment } from "@eachbase/fragments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad } from "@eachbase/utils";
import { Loader } from "@eachbase/components";
import { billingActions } from "@eachbase/store";
import { GET_BILLING_BY_ID_SUCCESS } from "../../store/billing/billing.type";

export const BillingDetails = () => {
   const billingById = useSelector((state) => state.billing.billingById);
   const loader = !!FindLoad("GET_BILLING_BY_ID").length;
   const dispatch = useDispatch();
   const params = useParams();

   useEffect(() => {
      dispatch(billingActions.getBillingById(params.id));
      return () => {
         dispatch({
            type: GET_BILLING_BY_ID_SUCCESS,
            payload: { billingById: null },
         });
      };
   }, [params.id]);

   return loader ? <Loader /> : <BillingDetailsFragment billingDetails={billingById} />;
};
