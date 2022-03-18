import React, { useState } from "react";
import { Table } from "@material-ui/core";
import { TransactionsDemoTBody, TransactionsDemoTHead } from "./common";
import {
   BillTransactionWrapper,
   CreateChancel,
   SimpleModal,
} from "@eachbase/components";
import { billTransactionInputsStyle } from "./styles";

export const TransactionsDemoTable = ({ billTransactions }) => {
   const classes = billTransactionInputsStyle();

   const [open, setOpen] = useState(false);

   return (
      <>
         <Table style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
            <TransactionsDemoTHead />
            <TransactionsDemoTBody
               billTransactionDetails={billTransactions}
               openConfirmingModal={() => setOpen(true)}
            />
         </Table>
         <SimpleModal
            openDefault={open}
            handleOpenClose={() => setOpen((prevState) => !prevState)}
            content={
               <BillTransactionWrapper
                  wrapperStylesName={classes.transactionVoidingWrapperStyle}
                  onClose={() => setOpen(false)}
                  titleContent={"Void This Transaction?"}
                  subtitleContent={
                     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
                  }
               >
                  <CreateChancel
                     butnClassName={classes.voidOrCancelButnStyle}
                     // loader={!!loader.length}
                     create={"Void"}
                     chancel={"Cancel"}
                     // onCreate={handleSubmit}
                     onClose={() => setOpen(false)}
                  />
               </BillTransactionWrapper>
            }
         />
      </>
   );
};
