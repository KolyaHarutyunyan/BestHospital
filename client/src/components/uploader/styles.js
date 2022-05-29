import { makeStyles } from "@material-ui/core";
import { Colors, Shadow, Backgrounds, Images } from "@eachbase/utils";

export const fileUploadersStyle = makeStyles(() => ({
   fileTypeInput: {
      display: "flex",
      alignItems: "center",
      "& > div": {
         maxWidth: "238px",
         height: "48px",
      },
   },
   uploadButton: {
      width: "192px",
      height: "48px",
      boxShadow: Shadow.blueButton,
      borderRadius: "8px",
      marginLeft: "16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      color: Colors.TextWhite,
      textTransform: "capitalize",
      "&.disabled": {
         backgroundColor: "#347AF080",
         cursor: "default",
      },
      "&.enable": {
         backgroundColor: Colors.BackgroundBlue,
         cursor: "pointer",
      },
      "&:hover": { backgroundColor: Backgrounds.blueHover },
      "& img": { marginRight: "8px" },
      "& span": {
         fontSize: "14px",
         color: "white",
      },
   },
   authorizationFileSubTitle: {
      fontSize: 16,
      color: Colors.TextSecondary,
      fontWeight: 600,
      padding: "20px 0",
      textTransform: "capitalize",
      textAlign: "left",
   },
   centered: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
   },
   normal: {
      maxHeight: "290px",
      height: "100%",
      overflowY: "scroll",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      paddingBottom: 16,
      "&::-webkit-scrollbar": {
         display: "none",
      },
   },
   fileNameInput: {
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: 40,
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
   downloadIcon: {
      width: 32,
      height: 32,
      cursor: "pointer",
      flex: "0 0 32px",
      marginLeft: 16,
   },
   iconText: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& p": {
         fontSize: 16,
         color: Colors.TextLightGray,
         fontWeight: 600,
         paddingTop: 10,
      },
   },
   percentage: {
      marginTop: -30,
      fontSize: 10,
      color: Colors.BackgroundBlue,
      textAlign: "center",
   },
   errorStyle: {
      display: "flex",
      width: "100%",
      padding: "4px 0 4px 16px",
      minHeight: "22px",
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.ThemeRed,
   },
   uploadOneFileStyle: {
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.BackgroundBlue,
      cursor: "pointer",
      "&::before": {
         content: "''",
         width: "24px",
         height: "24px",
         backgroundImage: `url(${Images.download})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "contain",
         backgroundPosition: "center",
         marginRight: "8px",
      },
   },
}));
