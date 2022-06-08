export const manageStatus = (status) => {
   switch (status) {
      case "NOTINVOICED":
         return "Not Invoiced";
      case "INVOICED":
         return "Invoiced";
      case "COMPLETE":
         return "Complete";
      case "PARTIAL":
         return "Partial";
      case "PENDING":
         return "Pending";
      case "CLOSED":
         return "Closed";
      case "SUBMITTED":
         return "Submitted";
      case "POSTED":
         return "Posted";
      case "CHECK":
         return "Check";
      case "CASH":
         return "Cash";
      case "NOTCLAIMED":
         return "Not Claimed";
      case "CLAIMED":
         return "Claimed";
      case "INCOMPLETE":
         return "Incomplete";
      case "PAYERPAID":
         return "Payer Paid";
      case "CLIENTRESP":
         return "Client Resp";
      case "CLIENTPAID":
         return "Client Paid";
      case "PARTIALPAID":
         return "Partial Paid";
      case "OPEN":
         return "Open";
      case "CLOSE":
         return "Close";
      case "RENDERED":
         return "Rendered";
      case "NOTRENDERED":
         return "Not Rendered";
      case "CANCELLED":
         return "Cancelled";
      case "COMPLETED":
         return "Completed";

      default:
         return status;
   }
};

export const manageType = (type) => {
   switch (type) {
      case "DIRECT":
         return "Direct";
      case "INDIRECT":
         return "Indirect";
      case "PRIVATE":
         return "Private Insurance";
      case "PUBLIC":
         return "Public Insurance";
      case "SCHOOL":
         return "School";
      case "Direct":
         return "DIRECT";
      case "Indirect":
         return "INDIRECT";
      case "Private Insurance":
         return "PRIVATE";
      case "Public Insurance":
         return "PUBLIC";
      case "School":
         return "SCHOOL";

      default:
         return type;
   }
};
