import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const notInvoicedBillTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      padding: "9px 16px",
      borderRadius: "8px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      marginRight: "16px",
      "&:first-of-type": { maxWidth: "34px" },
      "&:last-of-type": { marginRight: "0" },
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
      padding: "9px 16px",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWater,
      cursor: "default",
      transition: "background-color 0.2s linear !important",
      "&:hover": { backgroundColor: Colors.BackgroundHoverBlue },
      "&.checked-box": { backgroundColor: Colors.BackgroundHoverBlue },
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      "&.checkbox-td": { maxWidth: "34px" },
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
      marginRight: "16px",
      "&.signature-td": { marginRight: "0" },
   },
   billCheckboxStyle: { padding: "0" },
}));
