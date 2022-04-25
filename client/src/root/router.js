import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
   FundingSource,
   FundingSourceSingle,
   Management,
   Staff,
   SingleStaff,
   Client,
   ClientSingle,
   System,
   Single,
   Schedule,
   Bills,
   BillDetails,
   Claims,
   ClaimDetails,
   Invoices,
   InvoiceDetails,
   Postings,
   PostingDetails,
   GenerateClaim,
   GenerateInvoice,
   ClaimPayments,
   ClaimPaymentDetails,
   InvoicePayments,
   InvoicePaymentDetails,
} from "@eachbase/pages";

export const Router = () => {
   return (
      <Switch>
         <Route path="/" exact component={FundingSource} />

         <Route path="/fundingSource" exact component={FundingSource} />
         <Route path="/fundingSource/:id" exact component={FundingSourceSingle} />

         <Route path="/staff" exact component={Staff} />
         <Route path="/staff/:id" exact component={SingleStaff} />

         <Route path="/client" exact component={Client} />
         <Route path="/client/:id" exact component={ClientSingle} />

         <Route path="/single" component={Single} />
         <Route path="/management" component={Management} />
         <Route path="/system" component={System} />

         <Route path="/schedule" exact component={Schedule} />

         <Route path="/bills" exact component={Bills} />
         <Route path="/bill/:id" exact component={BillDetails} />

         <Route path="/claims" exact component={Claims} />
         <Route path="/claim/:id" exact component={ClaimDetails} />
         <Route path="/generateClaim" exact component={GenerateClaim} />

         <Route path="/invoices" exact component={Invoices} />
         <Route path="/invoice/:id" exact component={InvoiceDetails} />
         <Route path="/generateInvoice" exact component={GenerateInvoice} />

         <Route path="/postings" exact component={Postings} />
         <Route path="/posting/:id" exact component={PostingDetails} />

         <Route path="/claimPayments" exact component={ClaimPayments} />
         <Route path="/claimPayment/:id" exact component={ClaimPaymentDetails} />

         <Route path="/invoicePayments" exact component={InvoicePayments} />
         <Route path="/invoicePayment/:id" exact component={InvoicePaymentDetails} />

         <Redirect to={"/"} />
      </Switch>
   );
};
