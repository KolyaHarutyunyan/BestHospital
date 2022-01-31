import React, { useState } from "react";
import { billingDetailsStyle } from "./styles";
import {
   AddModalButton,
   BillingTransactionWrapper,
   CloseButton,
   SimpleModal,
   UserInputsDropdown,
} from "@eachbase/components";
import { enumValues } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { billingActions } from "@eachbase/store";
import { BillingTransactionInputs } from "./core";

export const BillingDetailsFragment = ({ billingDetails }) => {
   const classes = billingDetailsStyle();
   const dispatch = useDispatch();

   const [selectedStatus, setSelectedStatus] = useState("Open");
   const [open, setOpen] = useState(false);

   const handleSelection = (selected) => {
      setSelectedStatus(selected);
      dispatch(billingActions.editBillingStatus(billingDetails.id, selected.toUpperCase()));
   };

   return (
      <>
         <div>
            <h1>billing details here</h1>
            <UserInputsDropdown
               dropdownOptions={enumValues.BILLING_STATUSES}
               onPass={handleSelection}
               selected={selectedStatus}
            />
            <AddModalButton text={"Add a transaction"} handleClick={() => setOpen(true)} />
         </div>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillingTransactionWrapper onClose={() => setOpen(false)}>
                  <BillingTransactionInputs billingId={billingDetails?.id} />
               </BillingTransactionWrapper>
            }
         />
      </>
   );
};
