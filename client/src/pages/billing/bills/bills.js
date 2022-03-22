import React, { useEffect } from "react";
import { BillsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { billActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { FindLoad } from "@eachbase/utils";

export const Bills = () => {
   const dispatch = useDispatch();

   const bills = useSelector((state) => state.bill.bills);

   const billsLoader = FindLoad("GET_BILLS");

   const loader = !!billsLoader.length;

   useEffect(() => {
      dispatch(billActions.getBills());
   }, []);

   return loader ? <Loader /> : <BillsFragment bills={bills} />;
};
