import React, { useState } from "react";
// import { ButtonsTab } from "../buttons";
import { wrapperStyle } from "./styles";
import { SimpleModal } from "../modal";
// import { SelectInput } from "../inputs";
import { ActiveInactiveStatus, enumValues } from "@eachbase/utils";
// import moment from "moment";
import { Loader } from "../loader";
import { UserInputsDropdown } from "@eachbase/components";

export const TableWrapper = ({
   buttonsTab,
   buttonsTabAddButton,
   children,
   //  firstButton,
   //  secondButton,
   loader,
   addButtonText,
   body,
   openCloseInfo,
   handleOpenClose,
   //  getActive,
   //  getInactive,
   handleType,
}) => {
   const classes = wrapperStyle();

   const [selectedStatus, setSelectedStatus] = useState("Active");
   const handleSelection = (selected) => {
      setSelectedStatus(selected);
      handleType && handleType(ActiveInactiveStatus(selected));
   };

   return (
      <div>
         {buttonsTab && (
            <div className={classes.buttonsTabStyle}>
               {/*<ButtonsTab*/}
               {/*    getActive={getActive}*/}
               {/*    getInactive={getInactive}*/}
               {/*    first={firstButton}*/}
               {/*    second={secondButton}*/}
               {/*/>*/}

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
