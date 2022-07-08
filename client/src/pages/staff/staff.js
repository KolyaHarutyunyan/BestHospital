import React, { useContext, useEffect, useState } from "react";
import { Loader, TableWrapper } from "@eachbase/components";
import { CreateStaff, StaffTable } from "@eachbase/fragments";
import {
   adminActions,
   httpRequestsOnSuccessActions,
   systemActions,
} from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";

export const Staff = () => {
   const dispatch = useDispatch();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const success = FindSuccess("GET_ADMINS");
   const loader = FindLoad("GET_ADMINS");

   const globalDepartments = useSelector((state) => state.system.departments);
   const adminsList = useSelector((state) => state.admins.adminsList);
   const { staff, count } = adminsList || {};

   const [open, setOpen] = useState(false);
   const [page, setPage] = useState(1);
   const [status, setStatus] = useState("ACTIVE");

   useEffect(() => {
      dispatch(adminActions.getAdmins({ status: status, skip: 0, limit: 10 }));
      dispatch(systemActions.getDepartments());
   }, []);

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
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_ADMINS"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   function handleActiveOrInactive(status) {
      setStatus(status);
      handlePageChange(true);
      setPage(1);
      dispatch(adminActions.getAdmins({ status: status, skip: 0, limit: 10 }));
   }

   return (
      <TableWrapper
         handleType={handleActiveOrInactive}
         firstButton={"Active"}
         secondButton={"Inactive"}
         buttonsTab={true}
         buttonsTabAddButton={true}
         addButtonText={"Add Staff Member"}
         openCloseInfo={open}
         handleOpenClose={() => setOpen((prevState) => !prevState)}
         body={
            <CreateStaff
               globalDepartments={globalDepartments}
               adminsList={adminsList && adminsList.staff}
               resetData={true}
               handleClose={() => setOpen(false)}
            />
         }
      >
         <StaffTable
            staff={staff}
            staffLoader={!!loader.length}
            staffCount={count}
            page={page}
            status={status}
            handleGetPage={setPage}
         />
      </TableWrapper>
   );
};
