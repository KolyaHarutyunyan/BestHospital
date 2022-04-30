import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const invoicePaymentDetailsCoreStyle = makeStyles(() => ({
   invoiceContainerStyle: {
      width: "100%",
      marginTop: "16px",
   },
   commentTextAreaStyle: {
      "& textarea": {
         maxWidth: "406px",
         width: "100%",
         height: "160px",
      },
   },
   closeOrCancelButnStyle: {
      width: "195px",
      "&.cancel": { backgroundColor: `${Colors.BackgroundWater} !important` },
      "&.create": { backgroundColor: `${Colors.ThemeRed} !important` },
   },

   // *Invoice Payment Modals Styles**
   editClaimPaymentWrapperStyle: {
      "& > div:first-of-type": {
         backgroundColor: Colors.BackgroundWater,
         "& > p": { maxWidth: "446px" },
      },
   },
   warningStyle: {
      fontSize: "16px",
      fontWeight: 700,
      color: Colors.ThemeRed,
   },
   highlightedTextStyle: {
      fontSize: "16px",
      fontWeight: 700,
      color: Colors.ThemeBlue,
   },
   voidClaimPaymentWrapperStyle: {
      "& > div:first-of-type": { paddingBottom: "0px" },
      "& > div:last-of-type": { paddingTop: "8px" },
      "& > button": { backgroundColor: Colors.BackgroundWater },
   },
   addClaimPaymentWrapperStyle: {
      "& > div:first-of-type": { paddingBottom: "0px" },
      "& > div:last-of-type": { paddingTop: "24px" },
   },
   // *end**
}));
