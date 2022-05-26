import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors, Images, Shadow } from "@eachbase/utils";

export const buttonsStyle = makeStyles(() => ({
   buttonsTab: {
      "& .MuiPaper-root": {
         background: "none",
         boxShadow: "none",
      },
      "& span": {
         background: "none",
      },

      "& .MuiTabs-flexContainer": {
         borderRadius: "18px",
         display: "flex",
         alignItems: "center",
      },

      "& .MuiTabs-root": {
         minHeight: "36px !important",
         height: "36px  !important",
         display: "flex",
         alignItems: "center",
         justifyContent: "space-between",
      },

      "& .MuiTabs-fixed": {
         minHeight: "36px",
         display: "flex",
         alignItems: "center",
      },
      "& .PrivateTabIndicator-colorPrimary-30": {
         display: "none",
      },
      "& .MuiTab-root": {
         minWidth: "125px",
         maxWidth: "125px",
         minHeight: "36px",
      },
      "& .MuiTab-textColorPrimary.Mui-selected": {
         minWidth: "125px",
         minHeight: "32px",
         maxHeight: "32px",
         background: Backgrounds.blue,
         borderRadius: "8px",
         fontSize: "14px",
         lineHeight: "19px",
         color: Colors.TextWhite,
         textTransform: "capitalize",
         marginLeft: "2px",

         "& :hover": {
            background: "#0000001A 0% 0% no-repeat padding-box",
            minWidth: "125px",
            minHeight: "32px",
            maxHeight: "32px",
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "19px",
            color: Colors.TextWhite,
            textTransform: "capitalize",
         },
      },
      "& .MuiTab-textColorPrimary": {
         minWidth: "125px",
         minHeight: "32px",
         maxHeight: "32px",
         borderRadius: "8px",
         fontSize: "14px",
         lineHeight: "19px",
         color: Colors.TextSecondary,
         textTransform: "capitalize",
         marginLeft: "2px",

         "& :hover": {
            background: "#E6ECF380 0% 0% no-repeat padding-box",
            minWidth: "125px",
            minHeight: "32px",
            maxHeight: "32px",
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "19px",
            color: Colors.TextSecondary,
            textTransform: "capitalize",
         },
      },
   },

   addButtonStyle: {
      background: Backgrounds.blue,
      boxShadow: Shadow.blueButton,
      borderRadius: "8px",
      width: "auto",
      padding: "0 24px",
      height: "36px",
      fontSize: "14px",
      lineHeight: "19px",
      color: Colors.TextWhite,
      textTransform: "capitalize",
      "&:hover": {
         background: Backgrounds.blueHover,
      },
      "& img": {
         marginRight: "8px",
      },
      "& span": {
         fontSize: "14px",
         color: "white",
      },
   },
   addModalButtonStyle: {
      width: "100%",
      height: "48px",
      background: Backgrounds.blue,
      // boxShadow: "0px 0px 6px #00C8514D",
      borderRadius: "8px",
      padding: "0 15px",
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: "600",
      color: Colors.TextWhite,
      textTransform: "capitalize",
      "&:hover": {
         background: Backgrounds.darkBlue,
      },
      "&:disabled": {
         color: "white",
         backgroundColor: "#347AF080",
      },
   },

   deleteButtonStyle: {
      background: "none",
      border: "none",
      outline: "none",
      "& :hover": {
         borderRadius: "40px",
      },
   },

   addCircleStyle: {
      background: Backgrounds.whiteModal,
      borderRadius: "40px",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
   },

   closeCircleStyle: {
      width: "24px",
      height: "24px",
      backgroundColor: Backgrounds.darkGrey,
      borderRadius: "40px",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&.modalView": { marginRight: "8px" },
   },

   addCircleTextStyle: {
      fontSize: "14px",
      lineHeight: "19px",
      color: Colors.TextPrimary,
      marginLeft: "8px",
   },

   editButtonStyle: {
      width: "73px",
      height: "36px",
      fontSize: "14px",
      color: Colors.TextWhite,
      boxShadow: Shadow.blueButton,
      borderRadius: "18px",
      background: Backgrounds.theme,
      textTransform: "capitalize",
   },

   buttonsWrapper: {
      display: "flex",
   },

   cancelButton: {
      background: "none",
      border: "none",
      outline: "none",
      color: Colors.TextPrimary,
      fontSize: "16px",
      fontWeight: "bold",
      marginRight: "8px",
      height: "36px",
      textTransform: "capitalize",
   },

   saveButton: {
      background: "none",
      border: "none",
      outline: "none",
      color: Colors.ThemeBlue,
      fontSize: "16px",
      fontWeight: "bold",
      marginRight: "8px",
      height: "36px",
      textTransform: "capitalize",
   },

   // ** download link styles **
   downloadLinkStyle: {
      color: "#347AF0",
      display: "inline-flex",
      alignItems: "center",
      "& img": { marginLeft: "8px" },
   },
   // ** end **

   // ** light button styles **
   lightButnStyle: {
      border: "none",
      outline: "none",
      backgroundColor: "inherit",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.BackgroundBlue,
      textTransform: "capitalize",
      "&::before": {
         content: "''",
         width: "24px",
         height: "24px",
         backgroundImage: `url(${Images.addLightIcon})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "contain",
         backgroundPosition: "center",
         marginRight: "8px",
      },
   },
   // ** end **
}));
