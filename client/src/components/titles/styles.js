import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const titleStyle = makeStyles(() => ({
  tittle: {
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "27px",
    letterSpacing: "0px",
    color: Colors.TextSecondary,
    opacity: "1",
  },
}));
