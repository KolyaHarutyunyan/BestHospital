import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors, Images } from "@eachbase/utils";

export const claimDetailsStyle = makeStyles(() => ({
   claimDetailsContainerStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #347AF033",
      padding: "24px",
   },
   claimDetailsStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "32px",
   },
   closeClaimButnStyle: {
      border: "none",
      outline: "none",
      width: "126px",
      height: "36px",
      borderRadius: "8px",
      backgroundColor: Colors.ThemeRed,
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.BackgroundWhite,
   },
   claimDetailsFirstPartStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #8A8A8A3D",
      padding: "16px",
      marginBottom: "24px",
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
         maxWidth: "557px",
         "&.narrow": { maxWidth: "505px" },
         width: "100%",
         padding: "9px 16px",
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
   claimInfoBoxStyle: {
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
   claimInfoStyle: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 500,
      color: Colors.TextPrimary,
   },
   claimDetailsSecondPartStyle: { width: "100%" },
   claimDetailsTitleBoxStyle: {
      fontSize: "18px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      textTransform: "capitalize",
   },
}));
