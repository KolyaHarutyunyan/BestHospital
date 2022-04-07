import React, { useEffect, useState } from "react";
import { Table } from "@material-ui/core";
import { TransactionsDemoTBody, TransactionsDemoTHead } from "./common";
import {
   BillingModalWrapper,
   CreateChancel,
   SimpleModal,
} from "@eachbase/components";
import { billTransactionInputsStyle } from "./styles";
import { useDispatch } from "react-redux";
import { billActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { FindLoad, FindSuccess } from "@eachbase/utils";

export const TransactionsDemoTable = ({ billTransactions = [], billId }) => {
   const classes = billTransactionInputsStyle();

   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);
   const [transactionId, setTransactionId] = useState("");

   const voidTransactionSuccess = FindSuccess("ABORT_BILL_TRANSACTION");
   const voidTransactionLoader = FindLoad("ABORT_BILL_TRANSACTION");

   useEffect(() => {
      if (!!voidTransactionSuccess.length) {
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("ABORT_BILL_TRANSACTION")
         );
         setOpen(false);
      }
   }, [voidTransactionSuccess]);

   return (
      <>
         <Table style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
            <TransactionsDemoTHead />
            <TransactionsDemoTBody
               billTransactionDetails={billTransactions}
               openConfirmingModal={() => setOpen(true)}
               onTrigger={(id) => setTransactionId(id)}
            />
         </Table>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillingModalWrapper
                  wrapperStylesName={classes.transactionVoidingWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={"Void This Transaction?"}
                  subtitleContent={
                     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
                  }
               >
                  <CreateChancel
                     butnClassName={classes.voidOrCancelButnStyle}
                     loader={!!voidTransactionLoader.length}
                     create={"Void"}
                     chancel={"Cancel"}
                     onCreate={() =>
                        dispatch(
                           billActions.abortBillTransaction(
                              billId,
                              transactionId
                           )
                        )
                     }
                     onClose={() => setOpen(false)}
                  />
               </BillingModalWrapper>
            }
         />
      </>
   );
};
