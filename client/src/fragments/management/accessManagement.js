import React, { useEffect } from "react";
import { RolePermissions, Role, managementFragments } from "./core";
import { permissionsActions, roleActions } from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";
import {PaginationItem} from "@eachbase/components";

export const AccessManagement = ({rolesList,permissionsList,role}) => {
  const classes = managementFragments();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(permissionsActions.getPermissions());



    dispatch(permissionsActions.createPermission());


    dispatch(roleActions.getRole());


  }, []);


  return (
    <div className={classes.managementFragmentsStyle}>
      <div className={classes.managementFragmentsRole}>
        <Role roleInfo={rolesList} permissionsList={permissionsList} />

        <div className={classes.paginate}>
          <PaginationItem page={'1'}  count={'5'}/>
        </div>
      </div>

      <div className={classes.managementFragmentsPermissions}>
        <RolePermissions role={role} permissionsList={permissionsList} />
      </div>
    </div>
  );
};
