import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core";

export const billTransactionInputsStyle = makeStyles(() => ({
   addOrCancelButnStyle: {
      width: "192px !important",
      marginTop: "16px",
      "&:last-of-type": { marginLeft: "16px" },
   },
   voidOrCancelButnStyle: {
      width: "195px !important",
      "&:last-of-type": {
         marginLeft: "16px",
         backgroundColor: `${Colors.ThemeRed} !important`,
      },
   },
}));
