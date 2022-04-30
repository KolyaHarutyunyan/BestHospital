import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors, Shadow } from "@eachbase/utils";

export const wrapperStyle = makeStyles(() => ({
   buttonsTabStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },

   addButton: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
   },

   createOfficesBody: {
      padding: "24px 16px",
      "@media (min-width: 1920px)": {
         padding: "32px 24px",
      },
   },

   createOfficeTableHead: {
      display: "flex",
      alignItems: "center",

      "& p": {
         marginLeft: "4px",
         "@media (min-width: 1920px)": {
            marginLeft: "8px",
         },
      },
   },

   managementWrapper: {
      padding: "16px",
      boxShadow: Shadow.modalShadow,
      width: "100%",
      marginTop: "16px",
      height: "420px",
      background: Backgrounds.whiteModal,

      "@media (min-width: 1920px)": {
         padding: "24px",
         marginTop: "24px",
         height: "444px",
      },
   },

   //tableWrapperGeneralInfo

   inactiveActiveHeader: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "31px",
   },
   breadcrumb: {
      margin: 0,
   },

   inputTextField: {
      alignItems: "flex-end",
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: "48px",
      },
      "& .MuiInputLabel-outlined": {
         marginTop: "-3px",
         color: Colors.TextPrimary,
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
         transform: "translate(14px, -2px) scale(0.75)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
   },

   //**Billing Modal Wrapper Styles */
   wrapperContainerStyle: {
      position: "relative",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWhite,
      "& > button": {
         position: "absolute",
         top: 8,
         right: 8,
         backgroundColor: "#A3B2BD80",
      },
      "& > div": {
         width: "100%",
         textAlign: "center",
         padding: "40px",
         "@media (max-width: 1280px)": { padding: "32px" },
         "&:first-of-type": { borderRadius: "8px 8px 0 0" },
         "&:last-of-type": { borderRadius: "0 0 8px 8px" },
      },
   },
   wrapperTitleStyle: {
      fontSize: "32px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      marginBottom: "16px",
   },
   wrapperSubtitleStyle: {
      maxWidth: "406px",
      width: "100%",
      fontSize: "16px",
      fontWeight: 400,
      color: Colors.TextSecondary,
      lineHeight: "24px",
      marginBottom: "24px",
   },
   //**end */

   //**Checked Items Quantity Info Wrapper Styles */
   qtyInfoContainerStyle: {
      position: "relative",
      width: "100%",
      borderRadius: "8px",
      background: Backgrounds.headerLightBlue,
      paddingTop: "15px",
      paddingBottom: "14px",
      marginBottom: "4px",
   },
   uncheckButnStyle: {
      border: "none",
      outline: "none",
      position: "absolute",
      width: "24px",
      height: "24px",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "inherit",
   },
   //**end */
}));
