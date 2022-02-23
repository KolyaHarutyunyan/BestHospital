import { makeStyles } from "@material-ui/core";

export const billsStyle = makeStyles(() => ({
   billsFragmentStyle: {
      display: "flex",
      width: "100%",
      maxWidth: "1780px",
      "&.narrow": { maxWidth: "1622px" },
      marginBottom: "10px",
   },
}));
