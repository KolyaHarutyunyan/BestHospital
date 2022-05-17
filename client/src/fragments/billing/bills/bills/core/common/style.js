import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const billTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      width: "100%",
      "&.withScroll": {
         minWidth: "1300px",
         "@media(max-width: 1900px)": { minWidth: "1000px" },
         "@media(max-width: 1565px)": { minWidth: "900px" },
         "@media(max-width: 1460px)": { minWidth: "800px" },
         "&.narrow": {
            minWidth: "1200px",
            "@media(max-width: 1920px)": { minWidth: "900px" },
            "@media(max-width: 1620px)": { minWidth: "840px" },
            "@media(max-width: 1460px)": { minWidth: "700px" },
            "@media(max-width: 1360px)": { minWidth: "685px" },
         },
         "& > div": { maxWidth: "200px" },
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: Shadow.tableTheadShadow,
      backgroundColor: Colors.BackgroundWater,
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "100px",
      width: "100%",
      padding: "16px 16px",
      "@media(max-width: 1560px)": { padding: "16px 8px" },
   },
   tbodyContainerStyle: { width: "100%" },
   tbodyRowStyle: {
      width: "100%",
      "&.withScroll": {
         minWidth: "1300px",
         "@media(max-width: 1900px)": { minWidth: "1000px" },
         "@media(max-width: 1565px)": { minWidth: "900px" },
         "@media(max-width: 1460px)": { minWidth: "800px" },
         "&.narrow": {
            minWidth: "1200px",
            "@media(max-width: 1920px)": { minWidth: "900px" },
            "@media(max-width: 1620px)": { minWidth: "840px" },
            "@media(max-width: 1460px)": { minWidth: "700px" },
            "@media(max-width: 1360px)": { minWidth: "685px" },
         },
         "& > div": { maxWidth: "200px" },
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      marginTop: "8px",
      backgroundColor: Colors.BackgroundWhite,
      cursor: "pointer",
      "&:last-of-type": { marginBottom: "8px" },
   },
   tdStyle: {
      maxWidth: "100px",
      width: "100%",
      padding: "16px 16px",
      "@media(max-width: 1560px)": { padding: "16px 8px" },
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
   },
}));
