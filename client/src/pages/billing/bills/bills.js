import React, { useEffect } from "react";
import { BillsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { billActions } from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { FindLoad } from "@eachbase/utils";
import { DUMMY_BILLS } from "@eachbase/utils/dummyDatas/dummyBills";

export const Bills = ({ open }) => {
   const dispatch = useDispatch();

   // const bills = useSelector((state) => state.bill.bills);
   const bills = DUMMY_BILLS;

   const loader = !!FindLoad("GET_BILLS").length;

   useEffect(() => {
      dispatch(billActions.getBills());
   }, []);
   console.log(bills, " bills");
   return loader ? <Loader /> : <BillsFragment bills={bills} open={open} />;
};
