import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";

export const claimReceivableTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundWhite}`,
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
      "& span": {
         fontSize: "14px",
         fontWeight: 700,
         color: `${Colors.TextSecondary}`,
      },
   },
   tbodyContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      marginTop: "4px",
   },
   tbodyRowStyle: {
      display: "flex",
      justifyContent: "space-between",
      background: Backgrounds.catskillWhite,
      cursor: "default",
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextPrimary,
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },

   // *CLaim Modal Table Styles**
   claimModalTableStyle: {
      width: "100%",
      marginTop: "24px",
   },
   receivableContainerStyle: {
      width: "100%",
      marginTop: "16px",
   },
   // *end**
}));
