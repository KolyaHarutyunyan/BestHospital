import React, { useEffect, useState } from "react";
import {
   BillTransactionWrapper,
   CreateChancel,
   SimpleModal,
   UserInputsDropdown,
} from "@eachbase/components";
import {
   enumValues,
   FindLoad,
   FindSuccess,
   makeCapitalize,
} from "@eachbase/utils";
import { billTransactionInputsStyle } from "./styles";
import { useDispatch } from "react-redux";
import { billActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const StatusSelectors = ({ billId, claim, invoice, bill }) => {
   const classes = billTransactionInputsStyle();

   const dispatch = useDispatch();

   const [claimStatus, setClaimStatus] = useState(
      claim ? makeCapitalize(claim) : "Claimed"
   );
   const [invoiceStatus, setInvoiceStatus] = useState(
      invoice ? makeCapitalize(invoice) : "Not Invoiced"
   );
   const [billStatus, setBillStatus] = useState(
      bill ? makeCapitalize(bill) : "Open"
   );

   const [selClaimStatus, setSelClaimStatus] = useState(claimStatus);
   const [selInvoiceStatus, setSelInvoiceStatus] = useState(invoiceStatus);
   const [selBillStatus, setSelBillStatus] = useState(billStatus);

   const [claimStatusModal, setClaimStatusModal] = useState(false);
   const [invoiceStatusModal, setInvoiceStatusModal] = useState(false);
   const [billStatusModal, setBillStatusModal] = useState(false);

   const claimStatusSuccess = FindSuccess(".....");
   const invoiceStatusSuccess = FindSuccess(".....");
   const billStatusSuccess = FindSuccess("EDIT_BILL_STATUS");

   useEffect(() => {
      if (!!claimStatusSuccess.length) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess(""));
         setSelClaimStatus(makeCapitalize(claim));
         setClaimStatusModal(false);
         return;
      }

      if (!!invoiceStatusSuccess.length) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess(""));
         setSelInvoiceStatus(makeCapitalize(invoice));
         setInvoiceStatusModal(false);
         return;
      }

      if (!!billStatusSuccess.length) {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("EDIT_BILL_STATUS")
         );
         setSelBillStatus(makeCapitalize(bill));
         setBillStatusModal(false);
         return;
      }
   }, [claimStatusSuccess, invoiceStatusSuccess, billStatusSuccess]);

   const claimStatusLoader = FindLoad(".....");
   const invoiceStatusLoader = FindLoad(".....");
   const billStatusLoader = FindLoad("EDIT_BILL_STATUS");

   const loader =
      !!claimStatusLoader.length ||
      !!invoiceStatusLoader.length ||
      billStatusLoader.length;

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
      // handleOpenClose();

      if (claimStatusModal) {
         // setSelClaimStatus(claimStatus);
         // dispatch(......claimStatus)
         return;
      }

      if (invoiceStatusModal) {
         // setSelInvoiceStatus(invoiceStatus);
         // dispatch(......invoiceStatus)
         return;
      }

      if (billStatusModal) {
         // setSelBillStatus(billStatus);
         dispatch(billActions.editBillStatus(billId, billStatus.toUpperCase()));
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
                     loader={loader}
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
