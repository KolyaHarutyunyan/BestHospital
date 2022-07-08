import React, { useContext, useEffect, useState } from "react";
import { StaffItem } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import {
   adminActions,
   systemActions,
   noteActions,
   availabilityScheduleActions,
   roleActions,
   authActions,
   historyActions,
} from "@eachbase/store";
import { useParams } from "react-router-dom";
import { Loader } from "@eachbase/components";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const SingleStaff = () => {
   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const success = FindSuccess("GET_CREDENTIAL");

   const staffGeneral = useSelector((state) => state.admins.adminInfoById);
   const staffCredentialList = useSelector((state) => state.admins.credential);
   const { credentials, count } = staffCredentialList || {};

   const [page, setPage] = useState(1);

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
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_CREDENTIAL"));
      }
   }, [success]);

   const dispatch = useDispatch();

   const params = useParams();

   const getAdminByIdLoader = FindLoad("GET_ADMIN_BY_ID");

   useEffect(() => {
      dispatch(adminActions.getCredential(params.id));
      dispatch(adminActions.getAdminById(params.id));
      dispatch(systemActions.getCredentialGlobal());
      dispatch(noteActions.getGlobalNotes(params.id, "Staff"));
      dispatch(historyActions.getHistory("Staff", { onResource: params.id }));
      dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id));
      dispatch(adminActions.getEmployment(params.id));
      dispatch(adminActions.getStaffService(params.id));
      dispatch(adminActions.getTimesheet(params.id));
      dispatch(systemActions.getServices({ limit: 7, skip: 0 }));
      dispatch(roleActions.getRole());
      dispatch(authActions.getAccess(params.id));
   }, []);

   return (
      <>
         {getAdminByIdLoader.length ? (
            <div style={{ height: "85vh" }}>
               <Loader />
            </div>
         ) : (
            <StaffItem
               gen={staffGeneral}
               credentialPage={page}
               credentials={staffCredentialList}
               credentialsCount={count}
               handleGetCredentialPage={setPage}
            />
         )}
      </>
   );
};
