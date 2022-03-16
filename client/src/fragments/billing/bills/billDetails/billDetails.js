import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { billDetailsStyle } from "./styles";
import {
   AddModalButton,
   BillTransactionWrapper,
   SimpleModal,
   UserInputsDropdown,
} from "@eachbase/components";
import {
   enumValues,
   getLimitedVal,
   handleCreatedAtDate,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { BillTransactionInputs, TransactionsDemoTable } from "./core";

export const BillDetailsFragment = ({ billDetails }) => {
   const classes = billDetailsStyle();

   const {
      appointment,
      authService,
      authorization,
      billedAmount,
      claimStatus,
      client,
      clientPaid,
      clientResp,
      createdDate,
      dateOfService,
      invoiceStatus,
      location,
      payerPaid,
      payerTotal,
      placeService,
      staff,
      status,
      totalHours,
      totalUnits,
      updatedDate,
      _id,
   } = billDetails || {};

   const dispatch = useDispatch();

   console.log(billDetails, "  billDetails");

   const [selectedBillClaimStatus, setSelectedBillClaimStatus] = useState(
      enumValues.BILLING_CLAIM_STATUSES[0]
   );
   const [selectedBillInvoiceStatus, setSelectedBillInvoiceStatus] = useState(
      enumValues.INVOICE_STATUSES[1]
   );
   const [selectedBillStatus, setSelectedBillStatus] = useState(
      enumValues.BILLING_STATUSES[0]
   );
   const [open, setOpen] = useState(false);

   const handleSelection = (selected, handleSelectedStatus) => {
      handleSelectedStatus(selected);
      dispatch(
         billActions.editBillStatus(billDetails?._id, selected.toUpperCase())
      );
   };

   const BILL_DETAILS = [
      {
         detailText: "DoS:",
         detail: handleCreatedAtDate(dateOfService, 10, "/"),
      },
      { detailText: "Payor:", detail: makeCapitalize("payor name here") },
      { detailText: "Client:", detail: makeCapitalize(client?.middleName) },
      {
         detailText: "Service:",
         detail: getLimitedVal(authService?.authorizationId, 13),
      },
      {
         detailText: "Hrs:",
         detail: totalHours === 0 ? totalHours + "" : totalHours,
      },
      {
         detailText: "Units:",
         detail: totalUnits === 0 ? totalUnits + "" : totalUnits,
      },
   ];

   const filteredDetails = BILL_DETAILS.filter(
      (billDetail) => billDetail.detail
   );

   return (
      <>
         <div className={classes.billDetailsContainerStyle}>
            <div className={classes.billStatusesBoxStyle}>
               <UserInputsDropdown
                  dropdownClassName={"statusSelectForBill"}
                  label={"Claim Status"}
                  dropdownOptions={enumValues.BILLING_CLAIM_STATUSES}
                  onPass={(selected) =>
                     handleSelection(selected, setSelectedBillClaimStatus)
                  }
                  selected={selectedBillClaimStatus}
               />
               <UserInputsDropdown
                  dropdownClassName={"statusSelectForBill"}
                  label={"Invoice Status"}
                  dropdownOptions={enumValues.INVOICE_STATUSES}
                  onPass={(selected) =>
                     handleSelection(selected, setSelectedBillInvoiceStatus)
                  }
                  selected={selectedBillInvoiceStatus}
               />
               <UserInputsDropdown
                  dropdownClassName={"statusSelectForBill"}
                  label={"Bill Status"}
                  dropdownOptions={enumValues.BILLING_STATUSES}
                  onPass={(selected) =>
                     handleSelection(selected, setSelectedBillStatus)
                  }
                  selected={selectedBillStatus}
               />
            </div>
            <div className={classes.billDetailsFirstPartStyle}>
               <div className={classes.billOutlineStyle}>
                  <div className={classes.billIdIconBoxStyle}>
                     <div>
                        <img src={Images.billingOutline} alt="" />
                     </div>
                  </div>
                  <span className={classes.billIdTextBoxStyle}>
                     ID: {getLimitedVal(_id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.billDetailsListStyle}>
                     {filteredDetails.map((item, index) => (
                        <li key={index}>
                           <span>
                              {" "}
                              {item.detailText} <em> {item.detail} </em>{" "}
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.billDetailsSecondPartStyle}>
               <div className={classes.billDetailsTitleBoxStyle}>
                  <h2 className={classes.billDetailsTitleStyle}>
                     Transactions
                  </h2>
                  <AddModalButton
                     buttonClassName={classes.addTransactionButnStyle}
                     text={"Add Transactions"}
                     handleClick={() => setOpen(true)}
                  />
               </div>
               <TransactionsDemoTable />
            </div>
            <div className={classes.billDetailsThirdPartStyle}></div>
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
