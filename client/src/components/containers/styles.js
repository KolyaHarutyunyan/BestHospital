import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const containersStyle = makeStyles(() => ({
   stepsContainerStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   stepBoxStyle: { display: "flex", alignItems: "center" },
   stepStyle: {
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      borderRadius: "50%",
      "&::after": {
         content: "''",
         width: "34px",
         height: "34px",
         position: "absolute",
         top: "1px",
         left: "1px",
         borderRadius: "inherit",
         border: `1px solid ${Colors.BackgroundWhite}`,
      },
      "& span": {
         fontSize: "18px",
         fontWeight: 600,
         color: Colors.TextWhite,
      },
      "&.firstStep, &.lastStep.active": {
         backgroundColor: Colors.BackgroundBlue,
      },
      "&.lastStep": { backgroundColor: "#A3B2BD" },
   },
   stepLabelStyle: {
      fontSize: "16px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      marginLeft: "18px",
   },
   stepsLineStyle: {
      flexGrow: 1,
      borderBottom: `1px dashed ${Colors.TextSecondary}`,
      margin: "0 16px",
   },
}));
