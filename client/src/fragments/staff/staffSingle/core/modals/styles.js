import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core/styles";

export const staffModalsStyle = makeStyles(() => ({
   paycodeBox: {
      display: "flex",
      marginBottom: 16,
      alignItems: "center",
   },
   paycodeBoxTitle: {
      color: Colors.TextPrimary,
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 8,
   },
   paycodeBoxText: {
      color: "#4B5C68B3",
      fontSize: 14,
   },
   activePaycode: {
      color: Colors.TextPrimary,
      fontSize: 16,
      marginLeft: 10,
   },
   codeAndTypeBoxStyle: {
      width: "100%",
      height: "112px",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      backgroundColor: Colors.BackgroundWater,
      marginBottom: "24px",
   },
   paycodeModalStyle: {
      backgroundColor: Colors.BackgroundWhite,
      textAlign: "left",
      "& p": { textAlign: "left" },
      "& button": { backgroundColor: Colors.BackgroundWater },
      paddingBottom: "0",
   },
}));
