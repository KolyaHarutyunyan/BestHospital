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

   const _isForFundingSource =
      path === "funding" && type === "GET_FUNDING_SOURCE_BY_ID_SUCCESS";

   const handleSelectionChange = (selected) => {
      if (selectedStatus === selected) return;

      const status =
         selected === "Active" ? "active" : selected === "Inactive" ? "inActive" : "";

      if (_isForFundingSource) {
         dispatch(fundingSourceActions.changeFundingSourceStatus(id, status));
      } else {
         const upperCasedStatus = ActiveInactiveStatus(selected);

         if (upperCasedStatus === "ACTIVE" || upperCasedStatus === "INACTIVE") {
            dispatch(fundingSourceActions.setStatus(id, path, status, null, type));
         } else {
            handleOpen(upperCasedStatus);
         }
      }
   };

   useEffect(() => {
      setSelectedStatus(ActiveInactiveStatusReverse(status));
   }, [status]);

   const currentStatuses = _isForFundingSource
      ? enumValues.STATUSES.slice(0, 2)
      : enumValues.STATUSES;

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
                     dropdownOptions={currentStatuses}
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
