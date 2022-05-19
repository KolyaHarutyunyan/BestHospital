import { DownloadLink } from "@eachbase/components";
import { hooksForTable, makeCapitalize, manageStatus } from "@eachbase/utils";

const { addSignToValueFromStart, getValueByFixedNumber, handleCreatedAtDate } =
   hooksForTable;

export function getFilteredInvoicesForInvoicePmt(
   invoicesForInvoicePmt = [],
   selDateFrom,
   selDateTo,
   selDate
) {
   return invoicesForInvoicePmt.filter((invoiceForInvoicePmt) => {
      const dateRangeFrom = invoiceForInvoicePmt?.dateRange?.early;
      const invoiceDate = invoiceForInvoicePmt?.invoiceDate;
      const dateRangeTo = invoiceForInvoicePmt?.dateRange?.latest;

      if (selDateFrom === "" && selDate === "" && selDateTo === "") return true;

      if (selDateFrom !== "" && selDate === "" && selDateTo === "")
         return handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom);

      if (selDateFrom === "" && selDate !== "" && selDateTo === "")
         return handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate);

      if (selDateFrom === "" && selDate === "" && selDateTo !== "")
         return handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo);

      if (selDateFrom !== "" && selDate !== "" && selDateTo === "")
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate)
         );

      if (selDateFrom !== "" && selDate === "" && selDateTo !== "")
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (selDateFrom === "" && selDate !== "" && selDateTo !== "")
         return (
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      if (selDateFrom !== "" && selDate !== "" && selDateTo !== "")
         return (
            handleCreatedAtDate(dateRangeFrom) === handleCreatedAtDate(selDateFrom) &&
            handleCreatedAtDate(invoiceDate) === handleCreatedAtDate(selDate) &&
            handleCreatedAtDate(dateRangeTo) === handleCreatedAtDate(selDateTo)
         );

      return false;
   });
}

export function getInvoiceDetailsForInvoicePmt(invoice) {
   const { dateRange, totalAmount, pdfDocument, client, status, totalTime } =
      invoice || {};

   const early = handleCreatedAtDate(dateRange?.early);
   const latest = handleCreatedAtDate(dateRange?.latest);

   const invoiceDetailsForInvoicePmt = [
      {
         detailText: "Date Range:",
         detail: `${early} - ${latest}`,
      },
      {
         detailText: "Client:",
         detail: !!client && makeCapitalize(`${client?.firstName} ${client?.lastName}`),
      },
      {
         detailText: "PDF Document:",
         detail:
            !!pdfDocument || !!"file_pdf.pdf" ? (
               <DownloadLink
                  linkHref={pdfDocument || "file_pdf.pdf"}
                  linkInnerText={"Download"}
                  linkDownload={true}
               />
            ) : null,
      },
      {
         detailText: "Total Time:",
         detail: totalTime === 0 ? totalTime + "" : totalTime,
      },
      {
         detailText: "Status",
         detail: manageStatus(status),
      },
      {
         detailText: "Total Amount:",
         detail: addSignToValueFromStart(getValueByFixedNumber(totalAmount)),
      },
   ];

   return invoiceDetailsForInvoicePmt;
}
