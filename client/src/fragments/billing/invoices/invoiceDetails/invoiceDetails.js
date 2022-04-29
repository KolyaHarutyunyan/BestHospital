import React, { useContext } from "react";
import { invoiceDetailsStyle } from "./styles";
import { NoItemText } from "@eachbase/components";
import { DrawerContext, getLimitedVal } from "@eachbase/utils";
import { InvoiceReceivableTable } from "./core";
import { getInvoiceDetails } from "./constants";

export const InvoiceDetailsFragment = ({ invoiceDetails }) => {
   const classes = invoiceDetailsStyle();

   const { _id, receivables } = invoiceDetails || {};

   const { open: drawerOpen } = useContext(DrawerContext);

   const filteredDetails = getInvoiceDetails(invoiceDetails).filter(
      (invoiceDtl) => !!invoiceDtl.detail
   );

   return (
      <>
         <div className={classes.invoiceDetailsContainerStyle}>
            <div className={classes.invoiceDetailsStyle}>
               <div className={classes.invoiceDetailsTitleBoxStyle}>
                  <h2 className={classes.invoiceDetailsTitleStyle}>Invoice Details</h2>
               </div>
            </div>
            <div className={classes.invoiceDetailsFirstPartStyle}>
               <div className={classes.invoiceOutlineStyle}>
                  <span className={classes.invoiceIdTextBoxStyle}>
                     ID: {getLimitedVal(_id, 5)}
                  </span>
               </div>
               {!!filteredDetails.length && (
                  <ol className={classes.invoiceDetailsListStyle}>
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
            <div className={classes.invoiceDetailsSecondPartStyle}>
               <div className={classes.invoiceDetailsTitleBoxStyle}>
                  <h2 className={classes.invoiceDetailsTitleStyle}>Receivables</h2>
               </div>
               {!!receivables?.length ? (
                  <div className={classes.receivablesTableBoxStyle}>
                     <InvoiceReceivableTable invoiceReceivables={receivables} />
                  </div>
               ) : (
                  <NoItemText text={"No Receivables Yet"} />
               )}
            </div>
         </div>
      </>
   );
};
