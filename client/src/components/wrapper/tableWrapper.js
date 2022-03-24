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

   return (
      <div>
         {buttonsTab && (
            <div className={classes.buttonsTabStyle}>
               <UserInputsDropdown
                  dropdownOptions={enumValues.STATUSES}
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
