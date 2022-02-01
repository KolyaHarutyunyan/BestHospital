export const enumValues = {
   STATUSES: ["Active", "Inactive", "On Hold", "Terminated"],

   /**Billing Enums */
   BILLING_STATUSES: ["Open", "Close"],
   BILLING_TRANSACTION_TYPES: ["Payer Paid", "Client Resp", "Client Paid", "Partial Paid"],
   BILLING_CLAIM_STATUSES: ["Not Claimed", "Claimed", "Incomplete", "Complete", "Partial"],

   /**Claim Enums */
   CLAIM_STATUSES: ["Pending", "Closed", "Submitted", "Posted"],

   /**Invoice Enums */
   INVOICE_STATUSES: ["Not Invoiced", "Invoiced", "Complete", "Partial"],

   /**Posting (Payment Type) Enums */
   POSTING_PAYMENT_TYPES: ["Check", "Submitted", "Cash"],
};
