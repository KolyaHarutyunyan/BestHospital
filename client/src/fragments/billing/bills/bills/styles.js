import { makeStyles } from "@material-ui/core";

export const billsStyle = makeStyles(() => ({
   billsTableStyle: {
      display: "flex",
      width: "100%",
      marginBottom: "10px",
   },
   tableAndPaginationBoxStyle: {
      minHeight: "700px",
      display: "flex",
      flexDirection: "column",
      marginTop: "24px",
   },
   tableBoxStyle: { flexGrow: 1 },
   loaderContainerStyle: {
      minHeight: "600px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
}));
