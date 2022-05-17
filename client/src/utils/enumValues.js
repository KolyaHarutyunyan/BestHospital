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
   BILLING_INVOICE_STATUSES: ["Invoiced", "Not Invoiced", "Complete"],

   /**Claim Enums */
   CLAIM_STATUSES: ["Pending", "Closed", "Submitted", "Posted"],

   /**Invoice Enums */
   INVOICE_STATUSES: ["Pending", "Closed", "Submitted", "Posted"],

   /**Posting (Payment Type) Enums */
   PAYMENT_STATUSES: ["Open", "Closed", "Voided"],

   /**Payment Types for claim and invoice Enums */
   PAYMENT_TYPES: ["Check", "Ach"],
};
