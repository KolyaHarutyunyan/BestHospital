import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors, Images, Shadow } from "@eachbase/utils";

export const scheduleStyle = makeStyles(() => ({
   wrapper: {
      padding: 20,
      backgroundColor: "white",
      height: " calc(100vh - 115px)",
      borderRadius: 8,
      position: "relative",
   },

   dateStyle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: Colors.BackgroundBlue,
   },

   selectButtonsLabel: {
      marginBottom: "20px",
   },

   calendarNextPrewButtons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },

   buttonsWrapper: {
      display: "flex",
      alignItems: "center",
   },

   navigationButtons: {
      marginLeft: "10px",
      marginTop: "2px",
   },

   searchWrapper: {
      display: "flex",
      "& button": {
         marginLeft: "24px",
      },
   },

   filtersWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
   },

   filtersWrapperRow: {
      display: "flex",
   },

   label: {
      color: Colors.ThemeBlue,
      fontWeight: "bold",
      fontSize: "14px",
   },

   listWrapper: {
      display: "flex",
      width: "100%",
   },

   wrapp: {
      width: "100%",
      height: "100%",
      maxHeight: "550px",
      overflow: "auto",
      marginTop: "13px",
   },

   cardWrapper: {
      background: Backgrounds.whiteModal,
      boxShadow: "0px 0px 6px #347AF04D",
      borderRadius: "8px",
      margin: "3px 16px 16px 5px ",
      padding: "16px",
   },

   cardTitle: {
      marginBottom: "16px",
      fontSize: "14px",
      fontWeight: "bold",
      color: Colors.ThemeBlue,
   },

   hoverClass: {
      height: "50px",
      background: "white",
      marginBottom: "8px",
      "& :hover": {
         background: "#EBF2FD80 0% 0% no-repeat padding-box",
         "& div": {
            background: "none",
         },
         "& p": {
            background: "none",
         },
      },
   },
   cardItemWrapper: {
      cursor: "pointer",
      height: "50px",
      background: "none",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",

      boxShadow: "0px 0px 6px #347AF04D",
      //
      "& :hover": {
         // background: '#EBF2FD80 0% 0% no-repeat padding-box',
         // height: '100%',
         // borderRadius: '8px',
         // display: 'flex',
         // alignItems: 'center',
         "& p": {
            background: "none",
         },
      },
   },

   cardItem: {
      cursor: "pointer",
      width: "100%",
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      lineHeight: "25px",
   },

   infoWrapper: {
      position: "relative",
      background: Backgrounds.whiteModal,
      boxShadow: Shadow.blueButton,
      borderRadius: "8px",
      width: "75%",
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

   infoDate: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#4B5C68",
   },

   infoItems: {
      height: "36px",
      background: "#F2F4F8 0% 0% no-repeat padding-box",
      borderRadius: "8px",
      marginBottom: "8px",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      "& p": {
         fontSize: "14px",
         fontWeight: "600",
         color: Colors.TextSecondary,
      },
      "& span": {
         fontSize: "14px",
         color: Colors.TextMiddleGray,
         marginLeft: "8px",
      },
   },

   itemsWrap: {
      margin: "32px 0 18px",
   },

   link: {
      color: Colors.ThemeBlue,
   },

   download: {
      marginLeft: "8px",
   },

   addEvent: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      "& div": {
         width: "36px",
         height: "36px",
         background: Backgrounds.blue,
         boxShadow: Shadow.blueButton,
         borderRadius: "20px",
         color: "white",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         fontSize: "32px",
         marginRight: "8px",
      },
      "& p": {
         fontSize: "14px",
         fontWeight: "600",
         color: "#347AF0",
      },
   },
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
   downloadSignatureStyle: {
      fontSize: "12px",
      fontWeight: 600,
      "& img": { width: "18px", height: "18px" },
      marginTop: "18px",
      marginRight: "16px",
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
   recurAndEditBoxStyle: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
   },
   editButnStyle: {
      marginRight: "0px !important",
      marginLeft: "20px",
   },
   recurButnStyle: { marginRight: "0px !important" },
}));
