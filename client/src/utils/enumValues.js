export const enumValues = {
   STATUSES: ["Active", "Inactive", "On Hold", "Terminated"],

   /**Billing Enums */
   BILLING_STATUSES: ["Open", "Close"],
   BILLING_TRANSACTION_TYPES: [
      "Payer Paid",
      "Client Resp",
      "Client Paid",
      "Partial Paid",
   ],
   BILLING_CLAIM_STATUSES: ["Claimed", "Not Claimed", "Complete"],

   /**Claim Enums */
   CLAIM_STATUSES: ["Pending", "Closed", "Submitted", "Posted"],

   /**Invoice Enums */
   INVOICE_STATUSES: ["Invoiced", "Not Invoiced", "Complete"],

   /**Posting (Payment Type) Enums */
   POSTING_PAYMENT_TYPES: ["Check", "Submitted", "Cash"],
};
