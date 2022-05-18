import { getLimitedVal, hooksForTable, makeCapitalize } from "@eachbase/utils";

export function getBillDetails(bill) {
   const { authService, client, payer, dateOfService, totalHours, totalUnits } =
      bill || {};

   const { handleCreatedAtDate } = hooksForTable;

   const billDetails = [
      {
         detailText: "DoS:",
         detail: handleCreatedAtDate(dateOfService),
      },
      {
         detailText: "Payor:",
         detail: !!payer && makeCapitalize(payer?.name),
      },
      {
         detailText: "Client:",
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "Service:",
         detail: getLimitedVal(authService?.authorizationId, 13),
      },
      {
         detailText: "Hrs:",
         detail: totalHours === 0 ? totalHours + "" : totalHours,
      },
      {
         detailText: "Units:",
         detail: totalUnits === 0 ? totalUnits + "" : totalUnits,
      },
   ];

   return billDetails;
}

export function getBillTotals(bill) {
   const { billedRate, billedAmount, clientBalance, balance, payerPaid, payerTotal } =
      bill || {};

   return {
      billedRate: billedRate?.toString() || "---",
      totalAmount: billedAmount?.toString() || "---",
      payorBalance: (payerTotal - payerPaid)?.toString() || "---",
      clientBalance: clientBalance?.toString() || "---",
      totalBalance: balance?.toString() || "---",
   };
}
