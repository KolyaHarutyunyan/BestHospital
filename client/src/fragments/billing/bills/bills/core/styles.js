import { makeStyles } from "@material-ui/core";

export const billTableStyle = makeStyles(() => ({
   billTableWithoutScrollStyle: {
      maxWidth: "850px",
      "&.narrow": { maxWidth: "650px" },
      minWidth: "550px",
      width: "100%",
      marginBottom: "6px",
      "& table": {
         borderSpacing: "0px 8px",
         borderCollapse: "separate",
      },
   },
   billTableWithScrollStyle: {
      maxWidth: "930px",
      "&.narrow": { maxWidth: "830px" },
      width: "100%",
      overflowX: "auto",
      "& table": {
         borderSpacing: "0px 8px",
         borderCollapse: "separate",
      },
   },
}));
