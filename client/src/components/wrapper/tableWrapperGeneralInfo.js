import React, { useEffect, useState } from "react";
import { CustomBreadcrumbs } from "@eachbase/components";
import { wrapperStyle } from "./styles";
import { DeleteElement, SimpleModal } from "../modal";
import { adminActions, fundingSourceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import {
   ActiveInactiveStatus,
   ActiveInactiveStatusReverse,
   enumValues,
   FindLoad,
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

   const staffStatusLoader = FindLoad("CHANGE_ADMIN_STATUS");

   const [selectedStatus, setSelectedStatus] = useState("");
   const [staffStatusModalIsOpen, setStaffStatusModalIsOpen] = useState(false);
   const [staffStatus, setStaffStatus] = useState("");

   const _isForFundingSource =
      path === "funding" && type === "GET_FUNDING_SOURCE_BY_ID_SUCCESS";
   const _isForStaff = path === "staff" && type === "GET_ADMIN_BY_ID_SUCCESS";

   function handleSelectionChange(selected) {
      if (selectedStatus === selected) return;
      const _currentStatus =
         selected === "Active" ? "active" : selected === "Inactive" ? "inActive" : "";
      if (_isForFundingSource) {
         dispatch(fundingSourceActions.changeFundingSourceStatus(id, _currentStatus));
      } else if (_isForStaff) {
         setStaffStatusModalIsOpen(true);
         setStaffStatus(_currentStatus);
      } else {
         const upperCasedStatus = ActiveInactiveStatus(selected);
         if (upperCasedStatus === "ACTIVE" || upperCasedStatus === "INACTIVE") {
            dispatch(
               fundingSourceActions.setStatus(id, path, _currentStatus, null, type)
            );
         } else {
            handleOpen(upperCasedStatus);
         }
      }
   }

   useEffect(() => {
      setSelectedStatus(ActiveInactiveStatusReverse(status));
   }, [status]);

   const _currentStatuses =
      _isForFundingSource || _isForStaff
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
                     dropdownOptions={_currentStatuses}
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
         <SimpleModal
            openDefault={staffStatusModalIsOpen}
            handleOpenClose={() => setStaffStatusModalIsOpen(false)}
            content={
               <DeleteElement
                  info="Are you sure you want to change the status?"
                  handleDel={() =>
                     dispatch(adminActions.changeAdminStatus(id, staffStatus))
                  }
                  handleClose={() => setStaffStatusModalIsOpen(false)}
                  innerText={"Change"}
                  loader={!!staffStatusLoader.length}
               />
            }
         />
      </React.Fragment>
   );
};
