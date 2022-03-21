import React, { useContext, useState } from "react";
import { billDetailsStyle } from "./styles";
import {
   AddModalButton,
   BillTransactionWrapper,
   SimpleModal,
} from "@eachbase/components";
import {
   DrawerContext,
   getLimitedVal,
   handleCreatedAtDate,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import {
   BillTransactionInputs,
   TransactionsDemoTable,
   BillTotalsDemoTable,
   StatusSelectors,
} from "./core";
import Pagination from "@material-ui/lab/Pagination";
import { dummyBillTransactions } from "@eachbase/utils/dummyDatas/dummyBillTransactions";

export const BillDetailsFragment = ({ billDetails }) => {
   const classes = billDetailsStyle();

   const { open: drawerOpen } = useContext(DrawerContext);

   const {
      authService,
      billedAmount,
      client,
      payor,
      clientPaid,
      clientResp,
      dateOfService,
      payerPaid,
      payerTotal,
      totalHours,
      totalUnits,
      _id,
      claimStatus,
      invoiceStatus,
      status,
      transaction: billTransactions,
   } = billDetails || {};

   const BILL_TOTALS = {
      billedRate: billedAmount,
      totalAmount: clientPaid + payerPaid,
      payorBalance: payerTotal,
      clientBalance: clientResp,
      totalBalance: clientResp + payerTotal,
   };

   const [open, setOpen] = useState(false);
   const [page, setPage] = useState(1);

   const BILL_DETAILS = [
      {
         detailText: "DoS:",
         detail: handleCreatedAtDate(dateOfService, 10, "/"),
      },
      { detailText: "Payor:", detail: payor ? makeCapitalize(payor) : "" },
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

   const filteredDetails = BILL_DETAILS.filter((billDtl) => billDtl.detail);

   // const billTransactions = dummyBillTransactions;

   console.log(billDetails, "  ssss");

   const changePage = (number) => {
      let start = number > 1 ? number - 1 + "0" : 0;
      setPage(number);
   };

   return (
      <>
         <div className={classes.billDetailsContainerStyle}>
            <StatusSelectors
               billId={_id}
               claim={claimStatus}
               invoice={invoiceStatus}
               bill={status}
            />
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
                        <li key={index} className={drawerOpen ? "narrow" : ""}>
                           <span>
                              {item.detailText} <em> {item.detail} </em>
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
                           !!billTransactions?.length
                              ? Math.ceil(billTransactions?.length / 10)
                              : null
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
                     billId={_id}
                     closeModal={() => setOpen(false)}
                  />
               </BillTransactionWrapper>
            }
         />
      </>
   );
};
