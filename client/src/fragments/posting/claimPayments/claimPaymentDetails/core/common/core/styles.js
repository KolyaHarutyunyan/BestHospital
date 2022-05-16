import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const claimReceivableTableStyle = makeStyles(() => ({
   claimRecTableStyle: {
      width: "100%",
      padding: "24px",
      boxShadow: Shadow.modalShadow,
      borderRadius: "0 0 8px 8px",
      "@media(max-width: 1280px)": { padding: "16px 8px" },
   },
   claimRecContainerStyle: { width: "100%" },
   claimRecTitleStyle: {
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextSecondary,
      "@media(max-width: 1280px)": { paddingLeft: "6px" },
   },
   claimReceivableContainerStyle: {
      width: "100%",
      marginTop: "25px",
   },

   // *Claim Modal Inputs Styles**
   filtersBoxStyle: { textAlign: "left" },
   paginationBoxStyle: { marginTop: "16px" },
   loaderContainerStyle: {
      minHeight: "500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   claimDetailsContainerStyle: {
      maxWidth: "1448px",
      "@media(max-width: 1680px)": { maxWidth: "1152px" },
      textAlign: "left",
      width: "100%",
   },
   claimDetailsStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
   },
   claimDetailsFirstPartStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #8A8A8A3D",
      marginBottom: "24px",
      padding: "16px",
      "@media(max-width: 1280px)": { padding: "8px" },
   },
   claimOutlineStyle: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
   },
   claimIdTextBoxStyle: {
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextSecondary,
   },
   claimDetailsListStyle: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      "& li": {
         maxWidth: "338px",
         width: "100%",
         padding: "9px 16px",
         "@media(max-width: 1280px)": { padding: "9px 8px" },
         backgroundColor: Colors.BackgroundCatskillWhite,
         borderRadius: "8px",
         marginTop: "8px",
         marginRight: "16px",
         "& > span": {
            fontSize: "14px",
            fontWeight: 600,
            color: Colors.TextSecondary,
            "& em": {
               fontSize: "inherit",
               fontWeight: 500,
               color: Colors.TextMiddleGray,
               marginLeft: "8px",
            },
         },
      },
   },
   claimDetailsSecondPartStyle: { width: "100%" },
   claimDetailsTitleBoxStyle: {
      fontSize: "18px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      textTransform: "capitalize",
   },
   // *end**
}));
