import { Tooltip, withStyles } from "@material-ui/core";
import { Backgrounds, Colors } from "@eachbase/utils";

export const HtmlTooltip = withStyles((theme) => ({
   tooltip: {
      background: Backgrounds.Base,
      padding: "8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: 400,
      color: Colors.TextWhite,
   },
}))(Tooltip);
