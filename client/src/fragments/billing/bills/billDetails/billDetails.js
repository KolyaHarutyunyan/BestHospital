import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { billDetailsStyle } from "./styles";
import {
   AddModalButton,
   BillTransactionWrapper,
   CreateChancel,
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
import {
   BillTransactionInputs,
   TransactionsDemoTable,
   BillTotalsDemoTable,
} from "./core";
import Pagination from "@material-ui/lab/Pagination";
import { dummyBillTransactions } from "@eachbase/utils/dummyDatas/dummyBillTransactions";

export const BillDetailsFragment = ({ billDetails }) => {
   const classes = billDetailsStyle();

   const {
      authService,
      billedAmount,
      client,
      clientPaid,
      clientResp,
      dateOfService,
      payerPaid,
      payerTotal,
      totalHours,
      totalUnits,
      _id,
   } = billDetails || {};

   const BILL_TOTALS = {
      billedRate: billedAmount,
      totalAmount: clientPaid + payerPaid,
      payorBalance: payerTotal,
      clientBalance: clientResp,
      totalBalance: clientResp + payerTotal,
   };

   const dispatch = useDispatch();

   const [selectedClaimStatus, setSelectedClaimStatus] = useState(
      enumValues.BILLING_CLAIM_STATUSES[0]
   );
   const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState(
      enumValues.INVOICE_STATUSES[1]
   );
   const [selectedBillStatus, setSelectedBillStatus] = useState(
      enumValues.BILLING_STATUSES[0]
   );
   const [open, setOpen] = useState(false);

   const [claimStatusModalIsOpen, setClaimStatusModalIsOpen] = useState(false);
   const [invoiceStatusModalIsOpen, setInvoiceStatusModalIsOpen] =
      useState(false);
   const [billStatusModalIsOpen, setBillStatusModalIsOpen] = useState(false);
   const [page, setPage] = useState(1);

   const handleOpen = (selectedStatus, handleStatusModalOpen) => {
      handleStatusModalOpen((prevState) => !prevState);
   };

   const handleStatus = (
      selected,
      givenStatus,
      setSelectedStatus,
      selectedStatus,
      setModalIsOpen
   ) => {
      if (selected === givenStatus) {
         if (selectedStatus === givenStatus) return;
         setSelectedStatus(selected);
         // dispatch(.......selected status);
      } else {
         handleOpen(selected, setModalIsOpen);
      }
   };

   const handleOpenClose = () => {
      if (claimStatusModalIsOpen) {
         setClaimStatusModalIsOpen((prevState) => !prevState);
      } else if (invoiceStatusModalIsOpen) {
         setInvoiceStatusModalIsOpen((prevState) => !prevState);
      } else if (billStatusModalIsOpen) {
         setBillStatusModalIsOpen((prevState) => !prevState);
      }
   };

   const handleNewStatusSelect = () => {
      handleOpenClose();
   };

   const modalTitleContent = claimStatusModalIsOpen
      ? "Change Claim Status"
      : invoiceStatusModalIsOpen
      ? "Change Invoice Status"
      : billStatusModalIsOpen
      ? "Change Bill Status"
      : "";
   const modalSubtitleContent = claimStatusModalIsOpen
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Claim"
      : invoiceStatusModalIsOpen
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Invoice"
      : billStatusModalIsOpen
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Bill"
      : "";

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

   const billTransactions = dummyBillTransactions;

   const changePage = (number) => {
      let start = number > 1 ? number - 1 + "0" : 0;
      setPage(number);
   };

   return (
      <>
         <div className={classes.billDetailsContainerStyle}>
            <div className={classes.billStatusesBoxStyle}>
               <UserInputsDropdown
                  dropdownClassName={"statusSelectForBill"}
                  label={"Claim Status"}
                  dropdownOptions={enumValues.BILLING_CLAIM_STATUSES}
                  onPass={(selected) =>
                     handleStatus(
                        selected,
                        "Claim",
                        setSelectedClaimStatus,
                        selectedClaimStatus,
                        setClaimStatusModalIsOpen
                     )
                  }
                  selected={selectedClaimStatus}
               />
               <UserInputsDropdown
                  dropdownClassName={"statusSelectForBill"}
                  label={"Invoice Status"}
                  dropdownOptions={enumValues.INVOICE_STATUSES}
                  onPass={(selected) =>
                     handleStatus(
                        selected,
                        "Not Invoiced",
                        setSelectedInvoiceStatus,
                        selectedInvoiceStatus,
                        setInvoiceStatusModalIsOpen
                     )
                  }
                  selected={selectedInvoiceStatus}
               />
               <UserInputsDropdown
                  dropdownClassName={"statusSelectForBill"}
                  label={"Bill Status"}
                  dropdownOptions={enumValues.BILLING_STATUSES}
                  onPass={(selected) =>
                     handleStatus(
                        selected,
                        "Open",
                        setSelectedBillStatus,
                        selectedBillStatus,
                        setBillStatusModalIsOpen
                     )
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
               <div className={classes.billTransactionsTableBoxStyle}>
                  <TransactionsDemoTable billTransactions={billTransactions} />
                  <div className={classes.paginationBoxStyle}>
                     <Pagination
                        onChange={(event, val) => changePage(val, "vvv")}
                        page={page}
                        count={
                           !!billTransactions.length &&
                           Math.ceil(billTransactions.length / 10)
                        }
                        color={"primary"}
                     />
                  </div>
               </div>
            </div>
            <div className={classes.billDetailsThirdPartStyle}>
               <div className={classes.billDetailsTitleBoxStyle}>
                  <h2 className={classes.billDetailsTitleStyle}>Bill Totals</h2>
               </div>
               <BillTotalsDemoTable billTotals={BILL_TOTALS} />
            </div>
         </div>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillTransactionWrapper
                  onClose={() => setOpen(false)}
                  titleContent={"Add Transaction"}
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
         <SimpleModal
            openDefault={
               claimStatusModalIsOpen ||
               invoiceStatusModalIsOpen ||
               billStatusModalIsOpen
            }
            handleOpenClose={handleOpenClose}
            content={
               <BillTransactionWrapper
                  onClose={handleOpenClose}
                  titleContent={modalTitleContent}
                  subtitleContent={modalSubtitleContent}
               >
                  <CreateChancel
                     butnClassName={classes.addOrCancelButnStyle}
                     //  loader={!!loader.length}
                     create={"Change"}
                     chancel={"Cancel"}
                     onCreate={handleNewStatusSelect}
                     onClose={handleOpenClose}
                     buttonWidth="195px"
                  />
               </BillTransactionWrapper>
            }
         />
      </>
   );
};
