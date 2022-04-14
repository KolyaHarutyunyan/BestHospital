import { makeStyles } from "@material-ui/core/styles";

export const claimsStyle = makeStyles(() => ({
   addButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "100%",
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
   generateClaimButnStyle: {
      "@media(max-width: 1720px)": { padding: "9px 16px" },
   },
}));
