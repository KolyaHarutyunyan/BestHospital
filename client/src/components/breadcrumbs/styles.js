import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const breadcrumbsStyle = makeStyles((theme) => ({
   root: {
      margin: "5px 0 30px 0",
   },
   parent: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "24px",
      color: Colors.TextDarkGrey,
   },
   child: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "24px",
      color: Colors.TextSecondary,
   },
}));
