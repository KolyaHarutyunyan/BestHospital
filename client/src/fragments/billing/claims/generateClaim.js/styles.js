import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const generateClaimStyle = makeStyles(() => ({
   generateClaimContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWhite,
      padding: "24px",
   },
   generateClaimActionsStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "24px",
   },
   mergeBillsBoxStyle: {
      display: "flex",
      alignItems: "center",
      marginBottom: "-10px",
   },
   mergeBillsTitleStyle: {
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.TextSecondary,
   },
   mergeBillsSwitcherStyle: { marginRight: "-10px" },
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
   notClaimedBillsFooterStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   generateOrCancelButnStyle: {
      maxWidth: "540px",
      width: "100%",
      "& button": {
         width: "262px",
         height: "36px !important",
         fontSize: "14px !important",
         "&:first-of-type": {
            backgroundColor: `${Colors.BackgroundWater} !important`,
         },
      },
   },
}));
