import { makeStyles } from "@material-ui/styles";
import { Images, Backgrounds, Shadow, Colors } from "@eachbase/utils";

export const scheduleCommonStyle = makeStyles(() => ({
   infoWrapper: {
      position: "relative",
      background: Backgrounds.whiteModal,
      boxShadow: Shadow.blueButton,
      borderRadius: "8px",
      minWidth: "645px",
      height: "569px",
      padding: "32px",
      marginTop: "16px",
   },
   titleWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      "& p": {
         fontSize: "18px",
         fontWeight: "bold",
         color: Colors.TextSecondary,
      },
      "& button": {
         border: "none",
         outline: "none",
         background: "transparent",
      },
      "& button:first-of-type": {
         marginRight: "16px",
      },
   },
   recurAndEditBoxStyle: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
   },
   recurEdit: {
      display: "flex",
      alignItems: "center",
      cursor: "default",
      "& > p": {
         fontSize: "14px",
         color: Colors.ThemeBlue,
      },
      "& > img": { cursor: "pointer" },
   },
   recurButnStyle: { marginRight: "0px !important" },
   editButnStyle: {
      marginRight: "0px !important",
      marginLeft: "20px",
   },
   infoDate: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#4B5C68",
   },
   dateAndStatusBoxStyle: {
      width: "100%",
      display: "flex",
      alignItems: "center",
   },
   eventStatusStyle: {
      fontSize: "14px",
      fontWeight: 700,
      marginLeft: "16px",
   },
   itemsWrap: { margin: "32px 0 18px" },
   signatureActionsBoxStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
   },
   signatureBoxStyle: {
      display: "flex",
      alignItems: "center",
      marginTop: "4px",
   },
   signatureTextStyle: {
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.TextSecondary,
      marginRight: "16px",
   },
   downloadSignatureStyle: {
      fontSize: "12px",
      fontWeight: 600,
      "& img": { width: "18px", height: "18px" },
      marginTop: "18px",
      marginRight: "16px",
   },
   openModalButnStyle: {
      display: "flex",
      alignItems: "center",
      border: "none",
      outline: "none",
      backgroundColor: "inherit",
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.BackgroundBlue,
      "&::after": {
         content: "''",
         width: "24px",
         height: "24px",
         backgroundImage: `url(${Images.forwardBlue})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "contain",
         marginLeft: "16px",
      },
   },
   statusActionsBoxStyle: {
      position: "absolute",
      bottom: "32px",
      right: "32px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "& > div:last-of-type": { marginLeft: "16px" },
   },
   changeStatusButnStyle: { padding: "7px 24px" },
   signatureModalWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
      "& > div:first-of-type": {
         textAlign: "left",
         "& > p": { marginBottom: "0px" },
      },
      "& > div:last-of-type": { paddingTop: "0px" },
   },
   addAuthFilesButnStyle: { marginTop: "32px" },
}));
