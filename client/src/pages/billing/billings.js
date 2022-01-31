import React, { useEffect } from "react";
import { BillingsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { billingActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { FindLoad } from "@eachbase/utils";

export const Billings = () => {
   const billings = useSelector((state) => state.billing.billings);
   const loader = !!FindLoad("GET_BILLINGS").length;
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(billingActions.getBillings());
   }, []);

   return loader ? <Loader /> : <BillingsFragment billings={billings} />;
};
