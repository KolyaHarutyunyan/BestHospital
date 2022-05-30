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
      marginTop: "20px",
      textTransform: "capitalize",
      textAlign: "left",
   },
   normal: {
      height: "290px",
      "&.singleFile": {
         maxHeight: "290px",
         height: "100%",
      },
      overflowY: "scroll",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      margin: "8px 0px",
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
      margin: "104px 0px",
      textAlign: "center",
   },
   noFilesYetTextStyle: {
      marginTop: "8px",
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextLightGray,
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
