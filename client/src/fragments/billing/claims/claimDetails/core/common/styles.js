import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";

export const tableTheadTbodyStyle = makeStyles(() => ({
   tableTheadStyle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${Colors.BackgroundBlue}`,
      padding: "9px 16px",
      borderRadius: "8px",
      "& > div > div > span": { color: `${Colors.BackgroundWhite}` },
   },
   tbodyContainerStyle: {
      width: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      marginTop: "4px",
   },
   tbodyRowStyle: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 16px",
      background: Backgrounds.headerLightBlue,
      cursor: "pointer",
      "&:hover": { background: Backgrounds.lightBlue },
      "&.opened": { background: Backgrounds.headerLightBlue },
   },
   arrowTdStyle: {
      display: "flex",
      justifyContent: "flex-end",
      "&.opened img": { transform: "rotate(180deg)" },
   },
   receivableBillTableStyle: {
      position: "absolute",
      width: "1390px",
      border: "1px solid red",
      backgroundColor: Colors.BackgroundWhite,
      "&:hover": { backgroundColor: Colors.BackgroundWhite },
   },
}));
