import React, { useEffect, useState } from "react";
import { CustomBreadcrumbs } from "@eachbase/components";
import { wrapperStyle } from "./styles";
import { SimpleModal } from "../modal";
import { fundingSourceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import {
   ActiveInactiveStatus,
   ActiveInactiveStatusReverse,
   enumValues,
} from "@eachbase/utils";
import { UserInputsDropdown } from "../dropdowns";

export const TableWrapperGeneralInfo = ({
   children,
   body,
   openCloseInfo,
   handleOpenClose,
   title,
   parent,
   parentLink,
   selectStatus,
   status,
   id,
   handleOpen,
   path,
   type,
}) => {
   const classes = wrapperStyle();
   const dispatch = useDispatch();
   const [selectedStatus, setSelectedStatus] = useState("");

   const handleSelectionChange = (selected) => {
      const upperCasedStatus = ActiveInactiveStatus(selected);

      if (upperCasedStatus === "ACTIVE") {
         if (selectedStatus === "Active") return;
         setSelectedStatus(selected);
         dispatch(
            fundingSourceActions.setStatus(id, path, upperCasedStatus, type)
         );
      } else {
         handleOpen(upperCasedStatus);
      }
   };

   useEffect(() => {
      setSelectedStatus(ActiveInactiveStatusReverse(status));
   }, [status]);

   return (
      <React.Fragment>
         <div className={classes.inactiveActiveHeader}>
            <div>
               <CustomBreadcrumbs
                  className={classes.breadcrumb}
                  parent={parent}
                  child={title}
                  parentLink={parentLink}
               />
            </div>
            <div>
               {selectStatus && (
                  <UserInputsDropdown
                     dropdownOptions={enumValues.STATUSES}
                     onPass={handleSelectionChange}
                     selected={selectedStatus}
                  />
               )}
            </div>
         </div>
         <div className={classes.addButton}>
            <SimpleModal
               content={body}
               handleOpenClose={handleOpenClose}
               openDefault={openCloseInfo}
            />
         </div>
         {children}
      </React.Fragment>
   );
};
