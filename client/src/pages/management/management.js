import React, { useState } from "react";
import { managementStyle } from "./styles";
import { AddButton, SimpleModal } from "@eachbase/components";
import { AccessManagement, AddRoleModal } from "@eachbase/fragments";
import { useSelector } from "react-redux";

export const Management = ({}) => {
   const classes = managementStyle();

   const [open, setOpen] = useState(false);

   const { permissionsList, rolesList, role } = useSelector((state) => ({
      permissionsList: state.permissions.permissionsList,
      rolesList: state.roles.rolesList,
      role: state.roles.role,
   }));

   const handleOpenClose = () => {
      setOpen((prevState) => !prevState);
   };

   return (
      <div>
         <div className={classes.managementStyle}>
            <AddButton text={"Add Role"} handleClick={handleOpenClose} />
         </div> 
         <AccessManagement
            rolesList={rolesList}
            permissionsList={permissionsList}
            role={role}
         />
         <SimpleModal
            handleOpenClose={handleOpenClose}
            openDefault={open}
            content={
               <AddRoleModal
                  permissionsList={permissionsList}
                  handleClose={handleOpenClose}
               />
            }
         />
      </div>
   );
};
