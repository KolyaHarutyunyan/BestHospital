import { makeStyles } from "@material-ui/core";

export const billTransactionInputsStyle = makeStyles(() => ({
   addOrCancelButnStyle: {
      width: "192px !important",
      marginTop: "16px",
      "&:last-of-type": { marginLeft: "16px" },
   },
}));
