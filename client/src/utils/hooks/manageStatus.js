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

      default:
         return status;
   }
};
