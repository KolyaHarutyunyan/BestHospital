import { makeStyles } from "@material-ui/core";

export const billTableStyle = makeStyles(() => ({
   billTableWithoutScrollStyle: {
      maxWidth: "850px",
      "&.narrow": { maxWidth: "750px" },
      "@media(max-width: 1565px)": {
         maxWidth: "700px",
         "&.narrow": { maxWidth: "600px" },
      },
      "@media(max-width: 1460px)": {
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
