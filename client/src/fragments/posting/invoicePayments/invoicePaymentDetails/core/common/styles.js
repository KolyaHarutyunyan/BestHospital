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
      cursor: "default",
      transition: "background-color 0.2s linear !important",
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

   //*Add Invoice Modal Inputs Styles**
   paginationAndActionsBoxStyle: {
      width: "807px",
      "@media(max-width: 1680px)": { width: "791px" },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   addInvoiceButnStyle: {
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
      minHeight: "415px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   //*end**
}));
