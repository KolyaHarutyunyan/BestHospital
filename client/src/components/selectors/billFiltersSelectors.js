import React from "react";
import { UserInputsDropdown, ValidationInput } from "@eachbase/components";
import { selectorsStyle } from "./styles";

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
   filterIsFor,
}) => {
   const classes = selectorsStyle();

   const filterIsForBill = filterIsFor === "bill";
   const filterIsForNotClaimedBill = filterIsFor === "notClaimedBill";
   const filterIsForNotInvoicedBill = filterIsFor === "notInvoicedBill";
   const filterIsForClaim = filterIsFor === "claim";
   const filterIsForInvoice = filterIsFor === "invoice";
   const filterIsForClaimPayment = filterIsFor === "claimPayment";
   const filterIsForInvoicePayment = filterIsFor === "invoicePayment";
   const filterIsForClaimInModal = filterIsFor === "claimInModal";
   const filterIsForInvoiceInModal = filterIsFor === "invoiceInModal";

   const smallSizeStyle = filterIsForClaim || filterIsForInvoice ? "smallSize" : "";

   function addStyle(initialStyle = "") {
      return `${initialStyle} ${smallSizeStyle}`;
   }

   const funderLabel = filterIsForBill ? "Payor" : "Funding Source";
   const dateInputLabel =
      filterIsForNotClaimedBill || filterIsForNotInvoicedBill
         ? "Service"
         : filterIsForInvoice || filterIsForInvoiceInModal
         ? "Invoice"
         : "Submitted";

   const shouldRenderFundingSourceInput =
      !filterIsForInvoice &&
      !filterIsForNotInvoicedBill &&
      !filterIsForInvoicePayment &&
      !filterIsForClaimInModal &&
      !filterIsForInvoiceInModal;

   const shouldRenderClientInput = !filterIsForInvoiceInModal;

   const shouldRenderDateRangeAndOrStatusInputs =
      filterIsForClaim ||
      filterIsForInvoice ||
      filterIsForClaimPayment ||
      filterIsForInvoicePayment ||
      filterIsForClaimInModal ||
      filterIsForInvoiceInModal;

   const shouldRenderDateRangeInputs =
      !filterIsForClaimPayment && !filterIsForInvoicePayment;

   const shouldRenderStatusInput = !filterIsForClaimInModal && !filterIsForInvoiceInModal;

   const shouldRenderDateInput =
      filterIsForBill ||
      filterIsForNotClaimedBill ||
      filterIsForInvoice ||
      filterIsForNotInvoicedBill ||
      filterIsForInvoiceInModal;

   return (
      <div style={styles}>
         {shouldRenderFundingSourceInput && (
            <UserInputsDropdown
               label={funderLabel}
               dropdownOptions={addAllTextToTheList(payorsNames)}
               onPass={passPayorHandler}
               selected={selectedPayor}
               dropdownClassName={addStyle(classes.filterDropStyle)}
            />
         )}
         {shouldRenderClientInput && (
            <UserInputsDropdown
               label={"Client"}
               dropdownOptions={addAllTextToTheList(clientsNames)}
               onPass={passClientHandler}
               selected={selectedClient}
               dropdownClassName={addStyle(classes.filterDropStyle)}
            />
         )}
         {shouldRenderDateRangeAndOrStatusInputs && (
            <div style={styles}>
               {shouldRenderDateRangeInputs && (
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
               )}
               {shouldRenderStatusInput && (
                  <UserInputsDropdown
                     label={"Status"}
                     dropdownOptions={addAllTextToTheList(statuses)}
                     onPass={passStatusHandler}
                     selected={selectedStatus}
                     dropdownClassName={addStyle(classes.filterDropStyle)}
                  />
               )}
            </div>
         )}
         {shouldRenderDateInput && (
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
