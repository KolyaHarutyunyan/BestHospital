import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const claimModalTHeadTBodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      padding: "9px 16px",
      borderRadius: "8px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      "&:not(:last-of-type)": { marginRight: "32px" },
      "& span": { color: `${Colors.BackgroundWhite}` },
   },
   tbodyContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      marginTop: "4px",
   },
   tbodyRowStyle: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 16px",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWater,
      cursor: "default",
      transition: "background-color 0.2s linear !important",
      "&:hover": { backgroundColor: Colors.BackgroundHoverBlue },
      "&.opened": {
         backgroundColor: Colors.BackgroundWater,
         borderRadius: "8px 8px 0 0",
      },
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
      "&:not(:last-of-type)": { marginRight: "32px" },
   },
   arrowTdStyle: {
      display: "flex",
      justifyContent: "flex-end",
      maxWidth: "195px",
      width: "100%",
      "&.opened img": { transform: "rotate(180deg)" },
   },

   commentTextAreaStyle: {
      "& textarea": {
         maxWidth: "406px",
         width: "100%",
         height: "160px",
      },
   },
   closeOrCancelButnStyle: {
      width: "195px",
      "&.cancel": { backgroundColor: `${Colors.BackgroundWater} !important` },
      "&.create": { backgroundColor: `${Colors.ThemeRed} !important` },
   },
   createOrCancelButnStyle: { width: "215px" },
   paginationAndActionsBoxStyle: {
      width: "1448px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },

   // *Claim Modal Table Styles**
   tbodyLabelStyle: {
      width: "100%",
      display: "block",
      marginTop: "4px",
      "& > input": { display: "none" },
      "& input:checked + $tbodyRowStyle": {
         backgroundColor: Colors.BackgroundHoverBlue,
      },
   },
   // *end**
}));
