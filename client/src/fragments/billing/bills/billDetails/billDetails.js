import React, { useContext, useState } from "react";
import { billDetailsStyle } from "./styles";
import {
   AddModalButton,
   ModalContentWrapper,
   Loader,
   NoItemText,
   SimpleModal,
} from "@eachbase/components";
import {
   DrawerContext,
   getLimitedVal,
   hooksForTable,
   Images,
   PaginationContext,
   useWidth,
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
import { getBillDetails, getBillTotals } from "./constants";

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
   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [open, setOpen] = useState(false);

   const {
      _id,
      claimStatus,
      invoiceStatus,
      status,
      transaction: billTransactions,
   } = billDetails || {};

   const filteredDetails = getBillDetails(billDetails).filter(
      (billDtl) => !!billDtl.detail
   );

   const billTotals = getBillTotals(billDetails);

   const changePage = (event, value) => {
      if (page === value) return;
      handlePageChange(true);
      let start = value > 1 ? value - 1 + "0" : 0;
      dispatch(billActions.getBillById(_id, { limit: 10, skip: start }));
      handleGetPage(value);
   };

   const width = useWidth();

   const { getTextDependsOnWidth } = hooksForTable;

   function getDetailDisplay(detail) {
      return getTextDependsOnWidth(width, 1480, detail, 14);
   }

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
                              {item.detailText} <em> {getDetailDisplay(item.detail)} </em>
                           </span>
                        </li>
                     ))}
                  </ol>
               )}
            </div>
            <div className={classes.billDetailsSecondPartStyle}>
               <div className={classes.billDetailsTitleBoxStyle}>
                  <h2 className={classes.billDetailsTitleStyle}>Transactions</h2>
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
                           {tsxLoader && pageIsChanging ? (
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
               <BillTotalsDemoTable billTotals={billTotals} />
            </div>
         </div>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <ModalContentWrapper
                  onClose={() => setOpen(false)}
                  titleContent={"Add Transaction"}
                  subtitleContent={
                     "Please fill out the below fields to add a transaction."
                  }
               >
                  <BillTransactionInputs billId={_id} closeModal={() => setOpen(false)} />
               </ModalContentWrapper>
            }
         />
      </>
   );
};
