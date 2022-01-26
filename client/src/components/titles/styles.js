import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const titleStyle = makeStyles(() => ({
   tittle: {
      textAlign: "left",
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "36px",
      letterSpacing: "0px",
      color: Colors.TextPrimary,
      opacity: "1",
   },
}));
