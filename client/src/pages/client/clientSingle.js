import React, { useEffect } from "react";
import { ClientItem } from "@eachbase/fragments/client";
import {
   clientActions,
   fundingSourceActions,
   noteActions,
   availabilityScheduleActions,
} from "@eachbase/store";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "@eachbase/components";
import { FindLoad } from "@eachbase/utils";

export const ClientSingle = () => {
   const dispatch = useDispatch();
   const params = useParams();
   const loader = FindLoad("GET_CLIENT_BY_ID");

   useEffect(() => {
      dispatch(clientActions.getClientsById(params.id));
      dispatch(clientActions.getClientsContacts(params.id));
      dispatch(clientActions.getClientsEnrollment(params.id));
      dispatch(clientActions.getClientsAuthorizations(params.id));
      dispatch(noteActions.getGlobalNotes(params.id, "Client"));
      dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id));
      dispatch(fundingSourceActions.getFundingSource({ status: "ACTIVE" }));
      dispatch(fundingSourceActions.getFundingSourceHistoriesById("Client"));
   }, []);

   return (
      <>
         {loader.length ? (
            <div style={{ height: "85vh" }}>
               <Loader />
            </div>
         ) : (
            <ClientItem />
         )}
      </>
   );
};
