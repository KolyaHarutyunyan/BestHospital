import { makeStyles } from "@material-ui/core/styles";

export const claimsStyle = makeStyles(() => ({
   addButton: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
   },
   claimsTableStyle: {
      display: "flex",
      width: "100%",
      marginTop: "24px",
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
