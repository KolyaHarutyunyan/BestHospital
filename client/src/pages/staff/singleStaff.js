import React, { useEffect } from "react";
import { StaffItem } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import {
   adminActions,
   fundingSourceActions,
   systemActions,
   noteActions,
   availabilityScheduleActions,
   roleActions,
   authActions,
} from "@eachbase/store";
import { useParams } from "react-router-dom";
import { Loader } from "@eachbase/components";
import { FindLoad } from "@eachbase/utils";

export const SingleStaff = () => {
   const staffGeneral = useSelector((state) => state.admins.adminInfoById);
   const dispatch = useDispatch();
   const params = useParams();
   const loader = FindLoad("GET_ADMIN_BY_ID");

   useEffect(() => {
      dispatch(adminActions.getCredential(params.id));
      dispatch(adminActions.getAdminById(params.id));
      dispatch(systemActions.getCredentialGlobal());
      dispatch(noteActions.getGlobalNotes(params.id, "Staff"));
      dispatch(fundingSourceActions.getFundingSourceHistoriesById("Staff"));
      dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id));
      dispatch(adminActions.getEmployment(params.id));
      dispatch(adminActions.getStaffService(params.id));
      dispatch(adminActions.getTimesheet(params.id));
      dispatch(systemActions.getServices());
      dispatch(roleActions.getRole());
      dispatch(authActions.getAccess(params.id));
   }, []);

   return (
      <>
         {loader.length ? (
            <div style={{ height: "85vh" }}>
               <Loader />
            </div>
         ) : (
            <StaffItem gen={staffGeneral} />
         )}
      </>
   );
};
