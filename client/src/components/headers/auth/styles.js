import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../../../utils";

export const authHeaderStyles = makeStyles(() => ({
   AuthHeader: {
      width: "100%",
      borderRadius: 8,
      boxShadow: "0px 0px 6px #8A8A8A3D",
      padding: "16px",
      marginTop: 30,
   },
   AuthHeaderTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
   },
   AuthHeaderTopLeft: {
      display: "flex",
      alignItems: "center",
   },
   AuthHeaderTopLeftTitle: {
      fontSize: 18,
      color: Colors.TextPrimary,
      fontWeight: "bold",
      marginRight: 16,
   },
   activeInactive: {
      display: "flex",
      marginLeft: 24,
      alignItems: "center",
   },
   AuthHeaderTopLeftText: {
      fontSize: 14,
      color: Colors.TextPrimary,
   },
   circle: {
      width: "12px",
      height: "12px",
      marginLeft: 8,
      borderRadius: "50%",
   },
   AuthHeaderBottom: {
      display: "flex",
      justifyContent: "space-between",
   },
   AuthHeaderBottomBox: {
      width: "32.5%",
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
      background: "#F2F4F8",
      borderRadius: " 8px",
   },
   AuthHeaderBottomBoxTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: Colors.TextPrimary,
   },
   AuthHeaderBottomBoxText: {
      fontSize: "14px",
      color: Colors.TextPrimary,
      marginLeft: 8,
      "&.statusStyle": {
         display: "flex",
         alignItems: "center",
         "&::before": {
            content: "''",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            marginRight: "8px",
         },
         "&.ACTIVE::before": { backgroundColor: Colors.ThemeGreen },
         "&.INACTIVE::before": { backgroundColor: Colors.TextSecondary },
         "&.HOLD::before": { backgroundColor: Colors.ThemeBlue },
         "&.TERMINATE::before": { backgroundColor: Colors.ThemeRed },
      },
   },
   AuthHeaderTopRight: {
      display: "flex",
      alignItems: "center",
   },
   fileListStyle: {
      width: "24px",
      height: "24px",
      marginRight: "16px",
      cursor: "pointer",
      "& > img": { width: "100%" },
   },
   editIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
      "& > img": { width: "100%" },
   },
   removeIconStyle: {
      width: "24px",
      height: "24px",
      marginLeft: "16px",
      cursor: "pointer",
      "& > img": { width: "100%" },
   },
   editTextStyle: {
      color: Colors.ThemeBlue,
      fontSize: "14px",
      fontWeight: 700,
      marginLeft: "8px",
      cursor: "default",
   },
}));
