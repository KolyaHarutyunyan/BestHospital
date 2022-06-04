import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const tableTheadTbodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
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
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWater,
      cursor: "pointer",
      transition: "background-color 0.2s linear !important",
      "&:hover": { backgroundColor: Colors.BackgroundHoverBlue },
      "&.opened": {
         backgroundColor: Colors.BackgroundWater,
         borderRadius: "8px 8px 0 0",
      },
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
   },
   arrowTdStyle: {
      display: "flex",
      justifyContent: "flex-end",
      maxWidth: "195px",
      width: "100%",
      "&.opened img": { transform: "rotate(180deg)" },
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
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

   //*Add Claim Modal Inputs Styles**
   paginationAndActionsBoxStyle: {
      width: "1448px",
      "@media(max-width: 1680px)": { width: "1152px" },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   addClaimButnStyle: {
      justifyContent: "flex-end !important",
      "&.atFirstStep": { marginTop: "-26px" },
      "&.atLastStep": { marginTop: "16px" },
      "& > button": {
         width: "174px",
         height: "36px !important",
         "&:first-of-type": { marginRight: "7px" },
      },
   },
   loaderContainerStyle: {
      minHeight: "600px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   //*end**
}));
