import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const claimPaymentDetailsStyle = makeStyles(() => ({
   claimPaymentDetailsContainerStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: Shadow.noteModalShadow,
      padding: "24px",
      "@media(max-width: 1280px)": { padding: "16px" },
   },
   claimPaymentDetailsStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
   },
   editAndVoidClaimBoxStyle: {
      display: "flex",
      alignItems: "center",
   },
   editIconStyle: {
      marginRight: "16px",
      cursor: "pointer",
   },
   voidButnStyle: {
      border: "none",
      outline: "none",
      width: "78px",
      height: "36px",
      borderRadius: "8px",
      backgroundColor: Colors.ThemeRed,
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.BackgroundWhite,
      "&.voided": {
         backgroundColor: Colors.BackgroundWater,
         color: Colors.ThemeRed,
         cursor: "default",
      },
   },
   claimPaymentDetailsFirstPartStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #8A8A8A3D",
      marginBottom: "24px",
      padding: "16px",
      "@media(max-width: 1280px)": { padding: "8px" },
   },
   claimPaymentOutlineStyle: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
   },
   claimPaymentIdTextBoxStyle: {
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextSecondary,
   },
   claimPaymentDetailsListStyle: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      "& li": {
         maxWidth: "557px",
         "&.narrow": { maxWidth: "505px" },
         width: "100%",
         padding: "9px 16px",
         "@media(max-width: 1280px)": { padding: "9px 8px" },
         backgroundColor: Colors.BackgroundCatskillWhite,
         borderRadius: "8px",
         marginTop: "8px",
         marginRight: "17px",
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
         "@media(min-width: 1920px)": {
            maxWidth: "540px",
            "&.narrow": { maxWidth: "490px" },
         },
         "@media(max-width: 1919px)": {
            maxWidth: "500px",
            "&.narrow": { maxWidth: "450px" },
         },
         "@media(max-width: 1770px)": {
            maxWidth: "450px",
            "&.narrow": { maxWidth: "400px" },
         },
         "@media(max-width: 1630px)": {
            maxWidth: "400px",
            "&.narrow": { maxWidth: "350px" },
         },
         "@media(max-width: 1470px)": {
            maxWidth: "350px",
            "&.narrow": { maxWidth: "300px" },
         },
         "@media(max-width: 1320px)": {
            maxWidth: "330px",
            "&.narrow": { maxWidth: "280px" },
         },
      },
   },
   claimPaymentInfoBoxStyle: {
      maxWidth: "728px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "8px 16px",
      backgroundColor: "#347AF01A",
      marginBottom: "32px",
      borderRadius: "4px",
      "& > img": { marginRight: "8px" },
   },
   claimPaymentInfoStyle: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 500,
      color: Colors.TextPrimary,
   },
   claimPaymentDetailsSecondPartStyle: { width: "100%" },
   claimPaymentDetailsTitleBoxStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   claimPaymentDetailsTitleStyle: {
      fontSize: "18px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      textTransform: "capitalize",
   },
   paymentRefStyle: {
      color: Colors.BackgroundBlue,
      cursor: "pointer !important",
   },
}));
