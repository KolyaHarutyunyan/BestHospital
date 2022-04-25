import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const claimPaymentsStyle = makeStyles(() => ({
   addButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "100%",
   },
   tableAndPaginationBoxStyle: {
      minHeight: "700px",
      display: "flex",
      flexDirection: "column",
   },
   tableBoxStyle: { flexGrow: 1 },
   loaderContainerStyle: {
      minHeight: "600px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   createClaimPaymentButnStyle: {
      "@media(max-width: 1720px)": { padding: "9px 16px" },
   },
   claimPaymentWrapperStyle: {
      "& > div:first-of-type": { 
         backgroundColor: Colors.BackgroundWater,
         "& > p": { maxWidth: "446px" }
      },
   },
   breakRowStyle: {
      display: "block", 
      marginTop: "16px",
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
}));
