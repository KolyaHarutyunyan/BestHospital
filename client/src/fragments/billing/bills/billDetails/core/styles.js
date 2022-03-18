import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core";

export const billTransactionInputsStyle = makeStyles(() => ({
   addOrCancelButnStyle: {
      width: "192px",
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
   changeStatusButnStyle: {
      width: "195px",
      "&:last-of-type": { marginLeft: "16px" },
   },
   billStatusesBoxStyle: {
      width: "100%",
      display: "flex",
      marginBottom: "24px",
      "& .statusSelectForBill": {
         marginRight: "24px",
         "& li:hover": { backgroundColor: "#EBF2FD !important" },
         "& h6::before, & li::before": { content: "unset" },
      },
   },
   statusSelectorsWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
   },
   transactionVoidingWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
   },
}));
