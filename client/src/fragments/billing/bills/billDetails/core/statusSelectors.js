import React, { useState } from "react";
import {
   BillTransactionWrapper,
   CreateChancel,
   SimpleModal,
   UserInputsDropdown,
} from "@eachbase/components";
import { enumValues } from "@eachbase/utils";
import { billTransactionInputsStyle } from "./styles";
// import { useDispatch } from "react-redux";

export const StatusSelectors = () => {
   const classes = billTransactionInputsStyle();

   // const dispatch = useDispatch();

   const [claimStatus, setClaimStatus] = useState("Claimed");
   const [invoiceStatus, setInvoiceStatus] = useState("Not Invoiced");
   const [billStatus, setBillStatus] = useState("Open");

   const [selClaimStatus, setSelClaimStatus] = useState("Claimed");
   const [selInvoiceStatus, setSelInvoiceStatus] = useState("Not Invoiced");
   const [selBillStatus, setSelBillStatus] = useState("Open");

   const [claimStatusModal, setClaimStatusModal] = useState(false);
   const [invoiceStatusModal, setInvoiceStatusModal] = useState(false);
   const [billStatusModal, setBillStatusModal] = useState(false);

   const modalTitleContent = claimStatusModal
      ? "Change Claim Status"
      : invoiceStatusModal
      ? "Change Invoice Status"
      : billStatusModal
      ? "Change Bill Status"
      : "";
   const modalSubtitleContent = claimStatusModal
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Claim"
      : invoiceStatusModal
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Invoice"
      : billStatusModal
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Bill"
      : "";

   const handleOpenClose = () => {
      if (claimStatusModal) {
         setClaimStatusModal((prevState) => !prevState);
         return;
      }

      if (invoiceStatusModal) {
         setInvoiceStatusModal((prevState) => !prevState);
         return;
      }

      if (billStatusModal) {
         setBillStatusModal((prevState) => !prevState);
         return;
      }
   };

   const handleStatus = (
      selected,
      setSelectedStatus,
      selectedStatus,
      setModalIsOpen
   ) => {
      if (selected === selectedStatus) return;

      setSelectedStatus(selected);
      setModalIsOpen(true);
   };

   const handleNewStatusSelect = () => {
      // temporary
      handleOpenClose();

      if (claimStatusModal) {
         setSelClaimStatus(claimStatus);
         // dispatch(......claimStatus)
         return;
      }

      if (invoiceStatusModal) {
         setSelInvoiceStatus(invoiceStatus);
         // dispatch(......invoiceStatus)
         return;
      }

      if (billStatusModal) {
         setSelBillStatus(billStatus);
         // dispatch(......billStatus)
         return;
      }
   };

   return (
      <>
         <div className={classes.billStatusesBoxStyle}>
            <UserInputsDropdown
               dropdownClassName={"statusSelectForBill"}
               label={"Claim Status"}
               dropdownOptions={enumValues.BILLING_CLAIM_STATUSES}
               onPass={(selected) =>
                  handleStatus(
                     selected,
                     setClaimStatus,
                     selClaimStatus,
                     setClaimStatusModal
                  )
               }
               selected={selClaimStatus}
            />
            <UserInputsDropdown
               dropdownClassName={"statusSelectForBill"}
               label={"Invoice Status"}
               dropdownOptions={enumValues.INVOICE_STATUSES}
               onPass={(selected) =>
                  handleStatus(
                     selected,
                     setInvoiceStatus,
                     selInvoiceStatus,
                     setInvoiceStatusModal
                  )
               }
               selected={selInvoiceStatus}
            />
            <UserInputsDropdown
               dropdownClassName={"statusSelectForBill"}
               label={"Bill Status"}
               dropdownOptions={enumValues.BILLING_STATUSES}
               onPass={(selected) =>
                  handleStatus(
                     selected,
                     setBillStatus,
                     selBillStatus,
                     setBillStatusModal
                  )
               }
               selected={selBillStatus}
            />
         </div>
         <SimpleModal
            openDefault={
               claimStatusModal || invoiceStatusModal || billStatusModal
            }
            handleOpenClose={handleOpenClose}
            content={
               <BillTransactionWrapper
                  wrapperStylesName={classes.statusSelectorsWrapperStyle}
                  onClose={handleOpenClose}
                  titleContent={modalTitleContent}
                  subtitleContent={modalSubtitleContent}
               >
                  <CreateChancel
                     butnClassName={classes.changeStatusButnStyle}
                     //  loader={!!loader.length}
                     create={"Change"}
                     chancel={"Cancel"}
                     onCreate={handleNewStatusSelect}
                     onClose={handleOpenClose}
                  />
               </BillTransactionWrapper>
            }
         />
      </>
   );
};
