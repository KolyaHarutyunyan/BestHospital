import React from "react";
import { UserInputsDropdown, ValidationInput } from "@eachbase/components";
import { billTableStyle } from "./styles";

function addAllTextToTheList(list = []) {
   return !!list[0]?.length ? ["All", ...list] : ["All"];
}

const styles = { display: "flex" };

export const BillFiltersSelectors = ({
   clientsNames = [],
   payorsNames = [],
   passPayorHandler,
   selectedPayor,
   passClientHandler,
   selectedClient,
   changeDateInput,
   filteredDate,
   changeDateFromInput,
   filteredDateFrom,
   changeDateToInput,
   filteredDateTo,
   statuses = [],
   passStatusHandler,
   selectedStatus,
   filterIsForBill,
   filterIsForNotClaimedBill,
   filterIsForClaim,
   filterIsForInvoice,
}) => {
   const classes = billTableStyle();

   const dateInputLabel = filterIsForNotClaimedBill
      ? "Service"
      : filterIsForInvoice
      ? "Invoice"
      : "Submitted";

   const smallSizeStyle = filterIsForClaim || filterIsForInvoice ? "smallSize" : "";

   function addStyle(initialStyle = "") {
      return `${initialStyle} ${smallSizeStyle}`;
   }

   return (
      <div className={classes.filtersBoxStyle}>
         {!filterIsForInvoice && (
            <UserInputsDropdown
               label={"Funding Source"}
               dropdownOptions={addAllTextToTheList(payorsNames)}
               onPass={passPayorHandler}
               selected={selectedPayor}
               dropdownClassName={addStyle(classes.filterDropStyle)}
            />
         )}
         <UserInputsDropdown
            label={"Client"}
            dropdownOptions={addAllTextToTheList(clientsNames)}
            onPass={passClientHandler}
            selected={selectedClient}
            dropdownClassName={addStyle(classes.filterDropStyle)}
         />
         {(filterIsForClaim || filterIsForInvoice) && (
            <div style={styles}>
               <div style={styles}>
                  <ValidationInput
                     keepLabelArea={true}
                     inputLabel={"Date Range"}
                     variant={"outlined"}
                     name={"filterDateFrom"}
                     onChange={changeDateFromInput}
                     value={filteredDateFrom}
                     type={"date"}
                     size={"small"}
                     style={addStyle(`${classes.dateInputStyle} first`)}
                  />
                  <ValidationInput
                     keepLabelArea={true}
                     variant={"outlined"}
                     name={"filterDateTo"}
                     onChange={changeDateToInput}
                     value={filteredDateTo}
                     type={"date"}
                     size={"small"}
                     style={addStyle(classes.dateInputStyle)}
                  />
               </div>
               <UserInputsDropdown
                  label={"Status"}
                  dropdownOptions={addAllTextToTheList(statuses)}
                  onPass={passStatusHandler}
                  selected={selectedStatus}
                  dropdownClassName={addStyle(classes.filterDropStyle)}
               />
            </div>
         )}
         {(filterIsForBill || filterIsForNotClaimedBill || filterIsForInvoice) && (
            <ValidationInput
               keepLabelArea={true}
               inputLabel={`${dateInputLabel} Date`}
               variant={"outlined"}
               name={"filterDate"}
               onChange={changeDateInput}
               value={filteredDate}
               type={"date"}
               size={"small"}
               style={addStyle(classes.dateInputStyle)}
            />
         )}
      </div>
   );
};
