export const enumValues = {
   // enum types
   FUNDING_SOURCE_TYPES: ["Private Insurance", "Public Insurance", "School"],
   FUNDING_MODIFIER_TYPES: ["Direct", "Indirect"],
   PAYMENT_TYPES: ["Check", "Ach"],
   // end

   // enum statuses
   STATUSES: ["Active", "Inactive", "On Hold", "Terminated"],
   BILLING_STATUSES: ["Open", "Close"],
   BILLING_TRANSACTION_TYPES: [
      "Payer Paid",
      "Client Resp",
      "Client Paid",
      "Partial Paid",
   ],
   BILLING_CLAIM_STATUSES: ["Claimed", "Not Claimed", "Complete"],
   BILLING_INVOICE_STATUSES: ["Invoiced", "Not Invoiced", "Complete"],
   CLAIM_STATUSES: ["Pending", "Closed", "Submitted", "Posted"],
   INVOICE_STATUSES: ["Pending", "Closed", "Submitted", "Posted"],
   PAYMENT_STATUSES: ["Open", "Closed", "Voided"],
   // end

   // enums for Staff
   RESIDENCIES: ["US", "citizen", "pcitizen", "work", "visa"],
   ISSUING_STATES: ["1", "2"],
   GENDER_OPTIONS: ["male", "female", "other"],
   EMPLOYMENT_TYPES: ["Full-time", "Part-time", "Intern", "Contractor"],
   // end
};
