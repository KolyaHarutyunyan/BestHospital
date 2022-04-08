import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const generateClaimCoreStyle = makeStyles(() => ({
   notClaimedBillTableStyle: {
      width: "100%",
      marginBottom: "20px",
   },
   billsQtyInfoStyle: {
      width: "100%",
      textAlign: "center",
      fontSize: "14px",
      color: Colors.TextSecondary,
   },
}));
