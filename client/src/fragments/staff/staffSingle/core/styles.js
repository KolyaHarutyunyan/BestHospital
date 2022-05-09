import { makeStyles } from "@material-ui/core/styles";
import { Colors, Shadow } from "@eachbase/utils";

export const serviceSingleStyles = makeStyles(() => ({
   // General
   staffGeneralWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
   },
   // Access
   staffAccessWrapper: {
      display: "flex",
      alignItems: "flex-start",
   },
   roleInformation: {
      width: "50%",
      height: "413px",
      flex: "0 0 50%",
      marginLeft: 24,
      border: `1px solid ${Colors.TextCadetBlue}`,
      borderRadius: 8,
      padding: 26,
   },
   cardIcon: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      backgroundColor: Colors.ThemeMangoOrange,
      "&::after": {
         content: `''`,
         position: "absolute",
         left: "1px",
         top: "1px",
         width: "34px",
         height: "34px",
         backgroundColor: "transparent",
         borderRadius: "50%",
         border: "1px solid white",
      },
   },

   roleHeader: {
      display: "flex",
      alignItems: "center",
   },
   roleTitle: {
      fontSize: 24,
      color: Colors.TextSecondary,
      fontWeight: "bold",
      lineHeight: "25px",
      paddingLeft: 16,
   },
   roleSubtitle: {
      fontSize: 16,
      color: Colors.TextSecondary,
      fontWeight: "bold",
      margin: "25px 0 16px",
      lineHeight: "25px",
   },
   permissionsList: {
      height: "120px",
      overflow: "auto",
   },
   roleText: {
      fontSize: 14,
      color: Colors.TextMiddleGray,
      lineHeight: "16px",
   },
   rolePermissionContainer: {
      display: "flex",
      alignItems: "center",
      "&:not(:last-child)": {
         marginBottom: 8,
      },
   },
   rolePermissionName: {
      fontSize: 14,
      color: Colors.TextMiddleGray,
      lineHeight: "21px",
      paddingLeft: 8,
   },

   selectRole: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& p": {
         color: "#4B5C68",
         fontSize: "32px",
         fontWeight: "bold",
         lineHeight: "43px",
      },
   },
   // header
   tabsWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 36,
      "& li:first-child": {
         display: "flex",
      },
   },
   avatar: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      position: "relative",
      border: `1px solid ${Colors.BackgroundBlue}`,
      objectFit: "cover",
      padding: 3,
   },
   nameContent: {
      marginLeft: 19,
   },
   name: {
      fontSize: 18,
      color: Colors.TextSecondary,
      fontWeight: "bold",
      lineHeight: "25px",
      marginBottom: 8,
   },
   tagContent: {
      display: "flex",
      alignItems: "center",
      "& p": {
         fontSize: 12,
         color: Colors.TextSecondary,
         fontWeight: 600,
         backgroundColor: Colors.BackgroundWater,
         padding: "0 16px",
         lineHeight: "25px",
         borderRadius: 13,
      },
      "& p:not(:last-child)": {
         marginRight: 8,
      },
   },

   // timesheet

   timesheetWrapper: {
      display: "flex",
      alignItems: "flex-start",
   },
   bcbaWrapper: {
      marginTop: 30,
      width: "100%",
      padding: 16,
      boxShadow: Shadow.noteModalShadow,
      borderRadius: 8,
      marginLeft: 16,
      "& > p": {
         fontSize: 14,
         color: Colors.TextSecondary,
         paddingBottom: 20,
      },
   },
   bcbaHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 16,
      "& h1": {
         fontSize: 18,
         color: Colors.TextSecondary,
         fontWeight: "bold",
      },
   },
   dateEdite: {
      display: "flex",
      alignItems: "center",
      "& p": {
         fontSize: 14,
         color: Colors.TextSecondary,
      },
      "& img": {
         cursor: "pointer",
         paddingLeft: 16,
      },
   },
   amountContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginTop: 10,
      "& p": {
         fontSize: 14,
         color: Colors.TextSecondary,
         "& span": {
            minWidth: 65,
            display: "inline-block",
            textAlign: "right",
            paddingLeft: 10,
         },
      },
   },
   hours: {
      fontSize: 14,
      color: Colors.TextSecondary,
      fontWeight: "600",
   },
   amount: {
      fontSize: 18,
      color: Colors.TextSecondary,
      fontWeight: "bold",
   },

   clinicalWrapper: {
      display: "flex",
      alignItems: "center",
      "& p": {
         color: Colors.ThemeBlue,
         fontWeight: "bold",
      },
      "& div": {
         margin: "0 24px 0 8px",
      },
   },
   //  History

   searchContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& button": {
         marginLeft: 15,
      },
   },
   dateInput: {
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: 38,
         width: 200,
         color: Colors.TextPrimary,
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
      "& .MuiInputBase-input::placeholder": {
         fontSize: 14,
         color: Colors.TextLightGray,
      },
   },
   headerRight: {
      display: "flex",
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

   switcher: {
      maxWidth: "209px",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors.BackgroundWhite,
      boxShadow: Shadow.noteModalShadow,
      borderRadius: "8px",
      "& > p": {
         padding: "7px 24px",
         cursor: "pointer",
         borderRadius: "8px",
         fontSize: "",
         fontWeight: 600,
      },
   },
   switcherActive: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      background: Colors.ThemeBlue,
      transition: ".5s",
      color: Colors.TextWhite,
   },
   switcherProcessed: {
      width: "50%",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: ".5s",
      color: Colors.TextPrimary,
   },
}));
