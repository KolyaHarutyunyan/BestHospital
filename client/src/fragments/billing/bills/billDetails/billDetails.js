import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { billDetailsStyle } from "./styles";
import {
   AddModalButton,
   BillTransactionWrapper,
   SimpleModal,
   UserInputsDropdown,
} from "@eachbase/components";
import { enumValues } from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { BillTransactionInputs } from "./core";

export const BillDetailsFragment = ({ billDetails }) => {
   const classes = billDetailsStyle();
   const dispatch = useDispatch();

   const [selectedStatus, setSelectedStatus] = useState("Open");
   const [open, setOpen] = useState(false);

   const handleSelection = (selected) => {
      setSelectedStatus(selected);
      dispatch(
         billActions.editBillStatus(billDetails?._id, selected.toUpperCase())
      );
   };

   const params = useParams();

   return (
      <>
         <div>
            <h1>{`bill ${billDetails?._id} details here`}</h1>
            <UserInputsDropdown
               dropdownOptions={enumValues.BILLING_STATUSES}
               onPass={handleSelection}
               selected={selectedStatus}
            />
            <AddModalButton
               text={"Add a transaction"}
               handleClick={() => setOpen(true)}
            />
         </div>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillTransactionWrapper
                  onClose={() => setOpen(false)}
                  titleContent={"Add Transcation"}
                  subtitleContent={
                     "Please fill out the below fields to add a transaction."
                  }
               >
                  <BillTransactionInputs
                     billId={billDetails?._id}
                     closeModal={() => setOpen(false)}
                  />
               </BillTransactionWrapper>
            }
         />
      </>
   );
};
