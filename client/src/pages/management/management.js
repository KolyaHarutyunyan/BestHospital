import React, { useContext, useEffect, useState } from "react";
import { managementStyle } from "./styles";
import { AddButton, Loader, SimpleModal } from "@eachbase/components";
import { AccessManagement, AddRoleModal } from "@eachbase/fragments";
import { useDispatch, useSelector } from "react-redux";
import { FindLoad, FindSuccess, PaginationContext } from "@eachbase/utils";
import {
   httpRequestsOnSuccessActions,
   permissionsActions,
   roleActions,
} from "@eachbase/store";

export const Management = ({}) => {
   const classes = managementStyle();

   const { permissionsList, rolesList, role } = useSelector((state) => ({
      permissionsList: state.permissions.permissionsList,
      rolesList: state.roles.rolesList,
      role: state.roles.role,
   }));

   const { roles, count } = rolesList || {};

   const dispatch = useDispatch();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const [page, setPage] = useState(1);
   const [open, setOpen] = useState(false);

   const loader = FindLoad("GET_ROLE");
   const success = FindSuccess("GET_ROLE");

   useEffect(() => {
      dispatch(permissionsActions.getPermissions());
      dispatch(roleActions.getRole({ limit: 10, skip: 0 }));
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
         dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_ROLE"));
      }
   }, [success]);

   if (!!loader.length && !pageIsChanging) return <Loader />;

   return (
      <div>
         <div className={classes.managementStyle}>
            <AddButton text={"Add Role"} handleClick={() => setOpen(true)} />
         </div>
         <AccessManagement
            rolesList={roles}
            permissionsList={permissionsList}
            role={role}
            rolesCount={count}
            handleGetPage={setPage}
            page={page}
            roleLoader={!!loader.length}
         />
         <SimpleModal
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            openDefault={open}
            content={
               <AddRoleModal
                  permissionsList={permissionsList}
                  handleClose={() => setOpen(false)}
               />
            }
         />
      </div>
   );
};
