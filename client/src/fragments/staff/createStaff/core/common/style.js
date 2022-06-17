import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core";

export const staffCoreCommonStyle = makeStyles(() => ({
   otherDetailsTitle: {
      fontSize: "16px",
      color: Colors.TextSecondary,
      fontWeight: "600",
      lineHeight: "22px",
      paddingBottom: "18px",
   },
   flexContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
   selectMargin: {
      width: "100%",
      marginRight: "16px",
      "& .MuiFormLabel-root": {
         fontSize: "16px",
         color: `${Colors.TextPrimary}`,
      },
      "& .MuiInput-underline.Mui-error:after": {
         borderBottomColor: `${Colors.ThemeRed}`,
      },
   },
   titlePadding: { paddingTop: "3px" },
}));
