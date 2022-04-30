import { getLimitedVal, handleCreatedAtDate, makeCapitalize } from "@eachbase/utils";

export function getBillDetails(bill) {
   const { authService, client, payor, dateOfService, totalHours, totalUnits } =
      bill || {};

   const billDetails = [
      {
         detailText: "DoS:",
         detail: handleCreatedAtDate(dateOfService, 10, "/"),
      },
      { detailText: "Payor:", detail: payor ? makeCapitalize(payor) : "" },
      {
         detailText: "Client:",
         detail: makeCapitalize(`${client?.firstName} ${client?.lastName}`),
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
   const { billedAmount, clientPaid, clientResp, payerPaid, payerTotal } = bill || {};

   return {
      billedRate: billedAmount,
      totalAmount: clientPaid + payerPaid,
      payorBalance: payerTotal,
      clientBalance: clientResp,
      totalBalance: clientResp + payerTotal,
   };
}
