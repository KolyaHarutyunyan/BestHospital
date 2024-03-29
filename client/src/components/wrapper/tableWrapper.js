import React, { useState } from "react";
import { wrapperStyle } from "./styles";
import { SimpleModal } from "../modal";
import { ActiveInactiveStatus, enumValues } from "@eachbase/utils";
import { Loader } from "../loader";
import { UserInputsDropdown } from "@eachbase/components";

export const TableWrapper = ({
   buttonsTab,
   buttonsTabAddButton,
   children,
   loader,
   addButtonText,
   body,
   openCloseInfo,
   handleOpenClose,
   handleType,
}) => {
   const classes = wrapperStyle();

   const [selectedStatus, setSelectedStatus] = useState("Active");

   const handleSelection = (selected) => {
      if (selectedStatus === selected) return;

      setSelectedStatus(selected);
      handleType && handleType(ActiveInactiveStatus(selected));
   };

   const _currentStatuses =
      addButtonText === "Add Funding Source" || addButtonText === "Add Staff Member"
         ? enumValues.STATUSES.slice(0, 2)
         : enumValues.STATUSES;

   return (
      <div>
         {buttonsTab && (
            <div className={classes.buttonsTabStyle}>
               <UserInputsDropdown
                  dropdownOptions={_currentStatuses}
                  onPass={handleSelection}
                  selected={selectedStatus}
               />
               {buttonsTabAddButton && (
                  <div className={classes.addButton}>
                     <SimpleModal
                        addButton={addButtonText}
                        content={body}
                        handleOpenClose={handleOpenClose}
                        openDefault={openCloseInfo}
                     />
                  </div>
               )}
            </div>
         )}
         {loader ? (
            <div style={{ height: "85vh" }}>
               <Loader />
            </div>
         ) : (
            children
         )}
      </div>
   );
};
