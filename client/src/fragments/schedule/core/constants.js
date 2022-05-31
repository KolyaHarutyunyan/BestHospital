import { makeCapitalize } from "@eachbase/utils";

export function getBorderColorAndText(eventStatus) {
   switch (eventStatus) {
      case "NOTRENDERED":
         return { color: "#6FD231", text: "Not Rendered" };
      case "RENDERED":
         return { color: "#2A8E6D", text: "Rendered" };
      case "CANCELLED":
         return { color: "#A3B2BD", text: "Cancelled" };
      case "PENDING":
         return { color: "#347AF080", text: "Pending" };
      case "COMPLETED":
         return { color: "#347AF0", text: "Completed" };
      default:
         return { color: "", text: "" };
   }
}

export function getCurrentText(type) {
   switch (type) {
      case "DRIVE":
         return { cardText: "Drive", detailText: "Drive Time" };
      case "PAID":
         return { cardText: "Paid", detailText: "Paid Time Off" };
      case "BREAK":
         return { cardText: "Break", detailText: "Break" };
      case "SERVICE":
         return { cardText: "Service", detailText: "Service Appointment" };
      default:
         return { cardText: "", detailText: "" };
   }
}

export function getServiceAppmtDetails(serviceAppmt) {
   const {
      client,
      authorizedService,
      staff,
      staffPayCode,
      miles,
      address,
      placeService,
   } = serviceAppmt || {};

   const serviceAppmtDetails = [
      {
         detailText: "Client:",
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Authorized Service:",
         detail: authorizedService?.modifiers?.map((modifier) => modifier.name),
      },
      {
         detailText: "Staff Member:",
         detail: !!staff && makeCapitalize(`${staff?.firstName} ${staff?.lastName}`),
      },
      {
         detailText: "Staff Paycode:",
         detail: makeCapitalize(staffPayCode?.name),
      },
      {
         detailText: "Miles:",
         detail: miles,
      },
      {
         detailText: "Client Address:",
         detail: address?.formattedAddress,
      },
      {
         detailText: "Place of Service:",
         detail: placeService?.name,
      },
   ];

   return serviceAppmtDetails.filter((serviceAppmt) => serviceAppmt.detail);
}
