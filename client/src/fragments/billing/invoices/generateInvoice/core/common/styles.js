import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const notInvoicedBillTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      "&.checkbox-th": { maxWidth: "50px" },
      "& span": { color: `${Colors.BackgroundWhite}` },
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
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
      "&.checked-box": { backgroundColor: Colors.BackgroundHoverBlue },
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      "&.checkbox-td": { maxWidth: "50px" },
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
      "&.signature-td": { marginRight: "0" },
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   billCheckboxStyle: {
      padding: "0",
      width: "18px",
      height: "18px",
   },
}));
