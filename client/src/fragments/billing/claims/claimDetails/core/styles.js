import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core/styles";

export const claimDetailsCoreStyle = makeStyles(() => ({
   receivableContainerStyle: {
      width: "100%",
      marginTop: "16px",
   },
   commentTextAreaStyle: {
      "& textarea": {
         maxWidth: "406px",
         width: "100%",
         height: "160px",
      },
   },
   closeOrCancelButnStyle: {
      width: "195px",
      "&.cancel": { backgroundColor: `${Colors.BackgroundWater} !important` },
      "&.create": { backgroundColor: `${Colors.ThemeRed} !important` },
   },
}));
