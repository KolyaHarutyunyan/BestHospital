import { makeStyles } from "@material-ui/core";

export const billsStyle = makeStyles(() => ({
   billsTableStyle: {
      display: "flex",
      width: "100%",
      maxWidth: "1780px",
      "&.narrow": { maxWidth: "1622px" },
      marginBottom: "10px",
      "@media (max-width: 1280px)": {
         maxWidth: "1145px",
         "&.narrow": { maxWidth: "990px" },
      },
   },
   tableAndPaginationBoxStyle: {
      minHeight: "700px",
      display: "flex",
      flexDirection: "column",
   },
   tableBoxStyle: { flexGrow: 1 },
   loaderContainerStyle: {
      minHeight: "600px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
}));
