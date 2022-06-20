import { NoItemText, Role } from "@eachbase/components";
import { FindSuccess, Images } from "@eachbase/utils";
import { serviceSingleStyles } from "./styles";
import React, { useEffect, useState } from "react";

export const StaffAccess = ({ rolesList = [], accessList = [] }) => {
   const classes = serviceSingleStyles();
   const [info, setInfo] = useState(
      accessList ? accessList.roles && accessList.roles[0] : ""
   );

   const sendItem = (item) => {
      setInfo(item);
   };

   const handleRemoveSelected = () => {
      if (accessList && accessList.roles.length) {
         if (accessList && accessList.roles.length === 1) {
            setInfo("");
         } else {
            setInfo(accessList.roles[0]);
         }
      } else {
         setInfo("");
      }
   };

   const newList = rolesList.filter(function (array_el) {
      return (
         accessList &&
         accessList.roles &&
         accessList.roles.filter(function (anotherOne_el) {
            return anotherOne_el.id === array_el.id;
         }).length === 0
      );
   });

   return (
      <div className={classes.staffAccessWrapper}>
         <Role
            newList={newList}
            rolesList={rolesList}
            accessList={accessList}
            sendItem={sendItem}
            handleRemoveSelected={handleRemoveSelected}
         />
         <div className={classes.roleInformation}>
            {info ? (
               <>
                  <div className={classes.roleHeader}>
                     <div className={classes.cardIcon}>
                        <img src={Images.address} alt="role" />
                     </div>
                     <p className={classes.roleTitle}>{info ? info.title : ""}</p>
                  </div>
                  <p className={classes.roleSubtitle}>Description</p>
                  <p className={classes.roleText}>{info ? info.description : ""}</p>
                  <p className={classes.roleSubtitle}>Permissions</p>
                  <div className={classes.permissionsList}>
                     {info &&
                        info.permissions &&
                        info.permissions.map((item, j) => (
                           <div key={j} className={classes.rolePermissionContainer}>
                              <img src={Images.roleManagementActive} alt="permission" />
                              <p className={classes.rolePermissionName}>{item.title}</p>
                           </div>
                        ))}
                  </div>
               </>
            ) : (
               <div className={classes.selectRole}>
                  <p>Select Access</p>
               </div>
            )}
         </div>
      </div>
   );
};
