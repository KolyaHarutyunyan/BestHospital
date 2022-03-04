export const getMenuTitle = (url = "") => {
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
      case "/bills":
         return "Bills";
      case "/claims":
         return "Claims";
      case "/invoices":
         return "Invoices";
      case "/postings":
         return "Postings";

      default:
         return "";
   }
};
