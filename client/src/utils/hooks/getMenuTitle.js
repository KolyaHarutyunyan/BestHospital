export const getMenuTitle = (url = "") => {
   if (url.startsWith("/fundingSource/")) return "Funding Source";
   if (url.startsWith("/staff/")) return "Staff";
   if (url.startsWith("/client/")) return "Client";
   if (url.startsWith("/bill/")) return "Bills";
   if (url.startsWith("/claim/")) return "Claims";
   if (url.startsWith("/invoice/")) return "Invoices";
   if (url.startsWith("/claimPayment/")) return "Claim Payments";
   if (url.startsWith("/invoicePayment/")) return "Invoice Payments";

   switch (url) {
      // case "/":
      //    return "Home";
      case "/fundingSource":
         return "Funding Source";
      case "/createFundingSource":
         return "Add Office";
      case "/branches":
         return "Branches";
      case "/staff":
         return "Staff";
      case "/client":
         return "Client";
      case "/humanResources":
         return "Human Resources";
      case "/management":
         return "Access Management";
      case "/customers":
         return "Customer";
      case "/factoring":
         return "Factoring Companies";
      case "/schedule":
         return "Schedule";
      case "/bills":
         return "Bills";
      case "/claims":
      case "/generateClaim":
         return "Claims";
      case "/invoices":
      case "/generateInvoice":
         return "Invoices";
      case "/claimPayments":
         return "Claim Payments";
      case "/invoicePayments":
         return "Invoice Payments";

      default:
         return "";
   }
};
