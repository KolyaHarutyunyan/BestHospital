export const getDynamicContent = (content, info, type) => {
   const staticText =
      content === "TITLE" ? "" : content === "SUBTITLE" ? ", please fulfill the below fields." : "";

   const dynamicText =
      content === "TITLE"
         ? info
            ? "Edit the"
            : "Add a"
         : content === "SUBTITLE"
         ? info
            ? "To edit the"
            : "To add a"
         : "";

   switch (type) {
      case "Paid":
         return `${dynamicText} Paid Time Off${staticText}`;
      case "Break":
         return `${dynamicText} Break${staticText}`;
      case "Drive":
         return `${dynamicText} Drive${staticText}`;
      case "Service Appointment":
         return `${dynamicText} Service Appointment${staticText}`;
      default:
         return "";
   }
};
