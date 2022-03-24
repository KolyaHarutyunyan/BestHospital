import React, { useContext, useState } from "react";
import { billDetailsStyle } from "./styles";
import {
   AddModalButton,
   BillTransactionWrapper,
   Loader,
   NoItemText,
   SimpleModal,
} from "@eachbase/components";
import {
   DrawerContext,
   getLimitedVal,
   handleCreatedAtDate,
   Images,
   makeCapitalize,
   PaginationContext,
} from "@eachbase/utils";
import {
   BillTransactionInputs,
   TransactionsDemoTable,
   BillTotalsDemoTable,
   StatusSelectors,
} from "./core";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch } from "react-redux";
import { billActions } from "@eachbase/store";

export const BillDetailsFragment = ({
   billDetails,
   transactionQty,
   page,
   handleGetPage,
   tsxLoader,
}) => {
   const classes = billDetailsStyle();

   const dispatch = useDispatch();

   const { open: drawerOpen } = useContext(DrawerContext);
   const { handlePageChange } = useContext(PaginationContext);

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

   const changePage = (event, value) => {
      if (page === value) return;
      handlePageChange(true);
      let start = value > 1 ? value - 1 + "0" : 0;
      dispatch(billActions.getBillById(_id, { limit: 10, skip: start }));
      handleGetPage(value);
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
                  {!!billTransactions?.length ? (
                     <>
                        <div className={classes.tableContainerStyle}>
                           {tsxLoader ? (
                              <div className={classes.loaderContainerStyle}>
                                 <Loader circleSize={40} />
                              </div>
                           ) : (
                              <TransactionsDemoTable
                                 billTransactions={billTransactions}
                                 billId={_id}
                              />
                           )}
                        </div>
                        <div className={classes.paginationBoxStyle}>
                           <Pagination
                              onChange={changePage}
                              page={page}
                              count={Math.ceil(transactionQty / 10)}
                              color={"primary"}
                              size={"small"}
                           />
                        </div>
                     </>
                  ) : (
                     <NoItemText text={"No Transactions Yet"} />
                  )}
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
