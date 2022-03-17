import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const tableTheadTbodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      height: "unset !important",
      boxShadow: "unset !important",
      "& tr": {
         backgroundColor: `${Colors.BackgroundBlue} !important`,
         cursor: "default",
         "& th": {
            padding: "9px 16px !important",
            borderBottom: "none",
            "& div div span": {
               color: `${Colors.BackgroundWhite} !important`,
            },
         },
      },
   },
   tbodyRowStyle: {
      boxShadow: "unset !important",
      cursor: "default",
      height: "36px !important",
      "& td": {
         padding: "4px 16px !important",
         borderBottom: "none",
         "& > div": {
            padding: "5px 0",
            color: Colors.TextSecondary,
         },
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
