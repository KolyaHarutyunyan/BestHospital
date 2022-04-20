import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const generateInvoiceStyle = makeStyles(() => ({
   generateInvoiceContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWhite,
      padding: "24px",
      "@media(max-width: 1280px)": { padding: "16px" },
   },
   generateInvoiceActionsStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "24px",
   },
   tableAndPaginationBoxStyle: {
      minHeight: "500px",
      display: "flex",
      flexDirection: "column",
   },
   tableBoxStyle: { flexGrow: 1 },
   loaderContainerStyle: {
      minHeight: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   notInvoicedBillsFooterStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   generateOrCancelButnStyle: {
      maxWidth: "540px",
      "@media(max-width: 1440px)": { maxWidth: "446px" },
      width: "100%",
      "& button": {
         width: "262px",
         "@media(max-width: 1440px)": { width: "215px" },
         height: "36px !important",
         fontSize: "14px !important",
         "&:first-of-type": {
            backgroundColor: `${Colors.BackgroundWater} !important`,
         },
      },
   },
}));
