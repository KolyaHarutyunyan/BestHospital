import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../../utils";

export const errMessageStyle = makeStyles(() => ({
   errMessageCenterPosition: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      margin: "3px 0 5px",
   },

   errMessageLeftPosition: {
      display: "flex",
      width: "100%",
      padding: "4px 0 4px 16px",
      minHeight: "20px",
   },

   errMessageStyleText: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#F07379",
      // position:'absolute'
   },

   DoneMessage: {
      width: "420px",
      height: "62px",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 0px 12px #0052E01F",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      padding: "20px 16px",
      position: "fixed",
      bottom: "50px",
      right: "40%",
      left: "40%",

      "& p": {
         fontSize: "16px",
         lineHeight: "24px",
         color: "#252E48",
      },
   },

   nameEllipsis: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "150px",
      "@media (min-width: 1919px)": {
         width: "150px",
      },
   },

   addressEllipsis: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "200px",
      "@media (min-width: 1919px)": {
         width: "250px",
      },
   },
   desc: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "200px",
      "@media (min-width: 1919px)": {
         width: "250px",
      },
   },
   responsive: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: "200px",
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.TextPrimary,
      "@media (min-width: 1919px)": {
         maxWidth: "250px",
      },
   },
   emailEllipsis: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "150px",
      "@media (min-width: 1919px)": {
         width: "200px",
      },
   },

   notYetText: {
      fontSize: "16px",
      lineHeight: "24px",
      color: Colors.TextLight,
      fontWeight: "bold",
   },

   notYetCenter: {
      width: "100%",
      display: "flex",
      margin: "16px",
      "@media (min-width: 1918px)": {
         margin: "24px",
      },
   },
}));
