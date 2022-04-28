import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const invoiceModalTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
      "& span": { color: `${Colors.BackgroundWhite}` },
   },
   tbodyContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      marginTop: "4px",
   },
   tbodyRowStyle: {
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWater,
      cursor: "default",
      transition: "background-color 0.2s linear !important",
      "&:hover": { backgroundColor: Colors.BackgroundHoverBlue },
      "&.active": { backgroundColor: Colors.BackgroundHoverBlue },
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      width: "100%",
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
   },
   paidAmountInputStyle: { maxWidth: "100%" },
   actionBoxStyle: {
      display: "flex",
      alignItems: "center",
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   tbodyLabelStyle: {
      width: "100%",
      display: "block",
      marginTop: "4px",
      "& > input": { display: "none" },
      "& input:checked + $tbodyRowStyle": {
         backgroundColor: Colors.BackgroundHoverBlue,
      },
   },
}));
