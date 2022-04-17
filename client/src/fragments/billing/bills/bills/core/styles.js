import { makeStyles } from "@material-ui/core";

export const billTableStyle = makeStyles(() => ({
   billTableWithoutScrollStyle: {
      maxWidth: "700px",
      "&.narrow": { maxWidth: "500px" },
      "@media(max-width: 1540px)": {
         maxWidth: "500px",
         "&.narrow": { maxWidth: "400px" },
      },
      width: "100%",
      marginBottom: "6px",
   },
   billTableWithScrollStyle: {
      overflow: "auto",
      flexGrow: 1,
      marginBottom: "6px",
   },
}));
