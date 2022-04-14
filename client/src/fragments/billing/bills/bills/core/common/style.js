import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const billTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      width: "100%",
      "&.withScroll": {
         minWidth: "1180px",
         "@media(max-width: 1900px)": { minWidth: "880px" },
         "@media(max-width: 1540px)": { minWidth: "780px" },
         "@media(max-width: 1400px)": { minWidth: "650px" },
         "&.narrow": {
            minWidth: "1130px",
            "@media(max-width: 1900px)": { minWidth: "880px" },
            "@media(max-width: 1540px)": { minWidth: "780px" },
            "@media(max-width: 1400px)": { minWidth: "635px" },
         },
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: Shadow.tableTheadShadow,
      backgroundColor: Colors.BackgroundWater,
      padding: "16px 32px",
      "@media(max-width: 1720px)": { padding: "16px 16px" },
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "100px",
      width: "100%",
      "&:not(:last-of-type)": {
         marginRight: "32px",
         "@media(max-width: 1720px)": { marginRight: "16px" },
      },
   },
   tbodyContainerStyle: { width: "100%" },
   tbodyRowStyle: {
      width: "100%",
      "&.withScroll": {
         minWidth: "1180px",
         "@media(max-width: 1900px)": { minWidth: "880px" },
         "@media(max-width: 1540px)": { minWidth: "780px" },
         "@media(max-width: 1400px)": { minWidth: "650px" },
         "&.narrow": {
            minWidth: "1130px",
            "@media(max-width: 1900px)": { minWidth: "880px" },
            "@media(max-width: 1540px)": { minWidth: "780px" },
            "@media(max-width: 1400px)": { minWidth: "635px" },
         },
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      marginTop: "8px",
      padding: "16px 32px",
      "@media(max-width: 1720px)": { padding: "16px 16px" },
      backgroundColor: Colors.BackgroundWhite,
      cursor: "pointer",
      "&:last-of-type": { marginBottom: "8px" },
   },
   tdStyle: {
      maxWidth: "100px",
      width: "100%",
      "&:not(:last-of-type)": {
         marginRight: "32px",
         "@media(max-width: 1720px)": { marginRight: "16px" },
      },
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
   },
}));
