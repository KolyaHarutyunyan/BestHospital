import React, { useContext, useEffect, useState } from "react";
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
   makeEnum,
   manageStatus,
   PaginationContext,
} from "@eachbase/utils";
import { billTransactionInputsStyle } from "./styles";
import { useDispatch } from "react-redux";
import { billActions, httpRequestsOnSuccessActions } from "@eachbase/store";

export const StatusSelectors = ({
   billId,
   claim = "",
   invoice = "",
   bill = "",
}) => {
   const classes = billTransactionInputsStyle();

   const dispatch = useDispatch();

   const [claimStatus, setClaimStatus] = useState(manageStatus(claim));
   const [invoiceStatus, setInvoiceStatus] = useState(manageStatus(invoice));
   const [billStatus, setBillStatus] = useState(manageStatus(bill));

   const [selClaimStatus, setSelClaimStatus] = useState(claimStatus);
   const [selInvoiceStatus, setSelInvoiceStatus] = useState(invoiceStatus);
   const [selBillStatus, setSelBillStatus] = useState(billStatus);

   const [claimStatusModal, setClaimStatusModal] = useState(false);
   const [invoiceStatusModal, setInvoiceStatusModal] = useState(false);
   const [billStatusModal, setBillStatusModal] = useState(false);

   const claimStatusSuccess = FindSuccess("EDIT_BILL_CLAIM_STATUS");
   const invoiceStatusSuccess = FindSuccess("EDIT_BILL_INVOICE_STATUS");
   const billStatusSuccess = FindSuccess("EDIT_BILL_STATUS");

   useEffect(() => {
      if (!!claimStatusSuccess.length) {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("EDIT_BILL_CLAIM_STATUS")
         );
         setSelClaimStatus(manageStatus(claim));
         setClaimStatusModal(false);
         return;
      }

      if (!!invoiceStatusSuccess.length) {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess(
               "EDIT_BILL_INVOICE_STATUS"
            )
         );
         setSelInvoiceStatus(manageStatus(invoice));
         setInvoiceStatusModal(false);
         return;
      }

      if (!!billStatusSuccess.length) {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("EDIT_BILL_STATUS")
         );
         setSelBillStatus(manageStatus(bill));
         setBillStatusModal(false);
         return;
      }
   }, [claimStatusSuccess, invoiceStatusSuccess, billStatusSuccess]);

   const claimStatusLoader = FindLoad("EDIT_BILL_CLAIM_STATUS");
   const invoiceStatusLoader = FindLoad("EDIT_BILL_INVOICE_STATUS");
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
      if (claimStatusModal) {
         dispatch(
            billActions.editBillClaimStatus(billId, makeEnum(claimStatus))
         );
         return;
      }

      if (invoiceStatusModal) {
         dispatch(
            billActions.editBillInvoiceStatus(billId, makeEnum(invoiceStatus))
         );
         return;
      }

      if (billStatusModal) {
         dispatch(billActions.editBillStatus(billId, makeEnum(billStatus)));
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
