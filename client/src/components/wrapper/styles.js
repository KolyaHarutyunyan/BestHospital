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

   //**Bill Transaction Wrapper Styles */
   billTransactionContainerStyle: {
      position: "relative",
      padding: "40px",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWhite,
      "& > button": {
         position: "absolute",
         top: 8,
         right: 8,
         backgroundColor: "#A3B2BD80",
      },
      "@media (max-width: 1280px)": {
         padding: "32px",
      },
   },
   billTransactionTitleBoxStyle: {
      width: "100%",
      textAlign: "center",
      marginBottom: "40px",
   },
   transactionTitle: {
      fontSize: "32px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      marginBottom: "16px",
   },
   transactionSubtitle: {
      fontSize: "16px",
      fontWeight: 400,
      color: Colors.TextSecondary,
   },
   //**end */
}));
