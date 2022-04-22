import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";

export const claimReceivableTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundWhite}`,
      padding: "9px 16px",
      borderRadius: "8px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      "&:not(:last-of-type)": { marginRight: "32px" },
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
      padding: "9px 16px",
      background: Backgrounds.catskillWhite,
      cursor: "default",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextPrimary,
      "&:not(:last-of-type)": { marginRight: "32px" },
   },
}));
