import React from "react";
import { RolePermissions, Role, managementFragments } from "./core";

export const AccessManagement = ({
   rolesList,
   permissionsList,
   role,
   rolesCount,
   handleGetPage,
   page,
   roleLoader,
}) => {
   const classes = managementFragments();

   return (
      <div className={classes.managementFragmentsStyle}>
         <div className={classes.managementFragmentsRole}>
            <Role
               roleInfo={rolesList}
               permissionsList={permissionsList}
               handleGetPage={handleGetPage}
               page={page}
               roleLoader={roleLoader}
               rolesCount={rolesCount}
            />
         </div>
         <div className={classes.managementFragmentsPermissions}>
            <RolePermissions role={role} permissionsList={permissionsList} />
         </div>
      </div>
   );
};
