import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const addInvoiceModalInputsCoreStyle = makeStyles(() => ({
   // *Invoice Modal Inputs Styles**
   filtersBoxStyle: { textAlign: "left" },
   paginationBoxStyle: { marginTop: "16px" },
   loaderContainerStyle: {
      minHeight: "200px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   invoiceDetailsContainerStyle: {
      maxWidth: "807px",
      "@media(max-width: 1680px)": { maxWidth: "791px" },
      textAlign: "left",
      width: "100%",
   },
   invoiceDetailsStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
   },
   invoiceDetailsFirstPartStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #8A8A8A3D",
      marginBottom: "24px",
      padding: "16px",
      "@media(max-width: 1280px)": { padding: "8px" },
   },
   invoiceOutlineStyle: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
   },
   invoiceIdTextBoxStyle: {
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextSecondary,
   },
   invoiceDetailsListStyle: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      "& li": {
         maxWidth: "338px",
         width: "100%",
         padding: "9px 16px",
         "@media(max-width: 1280px)": { padding: "9px 8px" },
         backgroundColor: Colors.BackgroundCatskillWhite,
         borderRadius: "8px",
         marginTop: "8px",
         marginRight: "16px",
         "& > span": {
            fontSize: "14px",
            fontWeight: 600,
            color: Colors.TextSecondary,
            "& em": {
               fontSize: "inherit",
               fontWeight: 500,
               color: Colors.TextMiddleGray,
               marginLeft: "8px",
            },
         },
      },
   },
   invoiceDetailsSecondPartStyle: { width: "100%" },
   invoiceDetailsTitleBoxStyle: {
      fontSize: "18px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      textTransform: "capitalize",
   },
   // *end**
}));
