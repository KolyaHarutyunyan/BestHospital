export function getDisplayFromType(givenType = "") {
   switch (givenType) {
      case "BREAK":
         return "Break";
      case "DRIVE":
         return "Drive";
      case "PAID":
         return "Paid";
      case "SERVICE":
         return "Service";
      default:
         return "";
   }
}
