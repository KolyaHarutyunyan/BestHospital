import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const claimPaymentTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: Shadow.tableTheadShadow,
      backgroundColor: Colors.BackgroundWater,
      padding: "16px 32px",
      "@media(max-width: 1720px)": { padding: "16px 16px" },
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "242px",
      width: "100%",
      "&:not(:last-of-type)": {
         marginRight: "32px",
         "@media(max-width: 1720px)": { marginRight: "16px" },
      },
   },
   tbodyContainerStyle: { width: "100%" },
   tbodyRowStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      marginTop: "8px",
      padding: "16px 32px",
      "@media(max-width: 1720px)": { padding: "16px 16px" },
      backgroundColor: Colors.BackgroundWhite,
      cursor: "pointer",
   },
   tdStyle: {
      maxWidth: "242px",
      width: "100%",
      "&:not(:last-of-type)": {
         marginRight: "32px",
         "@media(max-width: 1720px)": { marginRight: "16px" },
      },
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
   },
   lastStepBoxStyle: {
      width: "446px",
      marginBottom: "16px",
   },
}));
