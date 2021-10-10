import React, { useEffect } from "react";
import { RolePermissions, Role, managementFragments } from "./core";
import { permissionsActions, roleActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const AccessManagement = ({rolesList,permissionsList,role}) => {
  const classes = managementFragments();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(permissionsActions.getPermissions());
    dispatch(roleActions.getRole());
  }, []);

  return (
    <div className={classes.managementFragmentsStyle}>
      <div className={classes.managementFragmentsRole}>
        <Role roleInfo={rolesList} permissionsList={permissionsList} />
      </div>

      <div className={classes.managementFragmentsPermissions}>
        <RolePermissions role={role} permissionsList={permissionsList} />
      </div>
    </div>
  );
};
