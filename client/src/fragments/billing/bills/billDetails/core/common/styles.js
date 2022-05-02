import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const tableTheadTbodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      borderRadius: "8px",
   },
   thStyle: {
      maxWidth: "195px",
      width: "100%",
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
      "& span": { color: `${Colors.BackgroundWhite}` },
   },
   tbodyContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      marginTop: "4px",
   },
   tbodyRowStyle: {
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWater,
      cursor: "default",
      transition: "background-color 0.2s linear !important",
   },
   tdStyle: {
      display: "flex",
      alignItems: "center",
      maxWidth: "195px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
      padding: "9px 16px",
      "@media(max-width: 1280px)": { padding: "9px 8px" },
      "&:last-of-type": {
         padding: "4px 16px",
         "@media(max-width: 1280px)": { padding: "4px 8px" },
      },
   },
   voidActionStyle: {
      width: "78px",
      height: "28px",
      textAlign: "center",
      borderRadius: "4px",
      border: "none",
      outline: "none",
      boxShadow: "0 0 6px #347AF04D",
      backgroundColor: Colors.ThemeRed,
      fontWeight: 600,
      color: Colors.BackgroundWhite,
      cursor: "pointer",
      "&.voided": {
         boxShadow: "unset",
         backgroundColor: "inherit",
         color: Colors.ThemeRed,
         cursor: "default",
      },
   },
}));
