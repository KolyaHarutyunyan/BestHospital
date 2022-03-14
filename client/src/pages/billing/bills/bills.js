import React, { useEffect } from "react";
import { BillsFragment } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import {
   billActions,
   clientActions,
   fundingSourceActions,
} from "@eachbase/store";
import { Loader } from "@eachbase/components";
import { FindLoad } from "@eachbase/utils";
// import { DUMMY_BILLS } from "@eachbase/utils/dummyDatas/dummyBills";

export const Bills = () => {
   const dispatch = useDispatch();

   const bills = useSelector((state) => state.bill.bills);
   const clients = useSelector((state) => state.client.clientList.clients);
   const payors = useSelector(
      (state) => state.fundingSource.fundingSourceList.funders
   );
   // const bills = DUMMY_BILLS;

   const billsLoader = FindLoad("GET_BILLS");
   const clientsLoader = FindLoad("GET_CLIENTS");
   const payorsLoader = FindLoad("GET_FUNDING_SOURCE");

   const loader =
      !!billsLoader.length || !!clientsLoader.length || !!payorsLoader.length;

   useEffect(() => {
      dispatch(billActions.getBills());
      dispatch(clientActions.getClients());
      dispatch(fundingSourceActions.getFundingSource());
   }, []);

   return loader ? (
      <Loader />
   ) : (
      <BillsFragment bills={bills} clients={clients} payors={payors} />
   );
};
