import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const scheduleCommonStyle = makeStyles(() => ({
   recurTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: Colors.TextSecondary,
   },
   dateInputs: {
      display: "flex",
      width: "100%",
      margin: "8px 0 24px 0",
   },
   endDate: {
      marginLeft: "16px",
      width: "100%",
   },
}));
