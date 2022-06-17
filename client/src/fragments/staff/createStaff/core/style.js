import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";
import StepConnector from "@material-ui/core/StepConnector";

export const createStaffModalStyle = makeStyles(() => ({
   modalDimensions: {
      width: "543px",
      background: "white",
      position: "relative",
      borderRadius: 8,
      overflow: "hidden",
      "@media (max-width: 1400px)": {
         width: "527px",
      },
   },
   positionedButton: {
      position: "absolute",
      right: "8px",
      top: "8px",
   },
   modalTitle: {
      textAlign: "center",
      background: Backgrounds.headerLightBlue,
      paddingTop: "32px",
      paddingBottom: "10px",
   },
   firstStepContainer: {
      "&.hidden": { display: "none" },
   },
   secondStepContainer: {
      "&.hidden": { display: "none" },
   },
   thirdStepContainer: {
      "&.hidden": { display: "none" },
   },
}));

export const stepStyles = makeStyles(() => ({
   stepHeader: {
      background: Backgrounds.headerLightBlue,
      padding: "24px 0 36px 0",
   },
   stepBody: {
      padding: "32px 40px 40px 40px",
      "@media (max-width: 1400px)": {
         padding: "32px",
      },
   },
   buttonsContainer: {
      marginTop: 0,
   },
}));

export const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
   },
   button: {
      marginRight: theme.spacing(1),
   },
   instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
   step_label_root: {
      fontSize: "16px",
      color: `${Colors.TextSecondary}!important`,
      lineHeight: "22px!important",
      fontWeight: "600!important",
   },
}));

export const useColorlibStepIconStyles = makeStyles({
   root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 36,
      height: 36,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      "&::after": {
         content: `''`,
         position: "absolute",
         left: "1px",
         top: "1px",
         width: "34px",
         height: "34px",
         backgroundColor: "transparent",
         borderRadius: "50%",
         border: "1px solid white",
      },
   },
   active: {
      backgroundColor: "#347AF0",
   },
   completed: {
      backgroundColor: "#347AF0",
   },
});

export const ColorlibConnector = withStyles({
   alternativeLabel: {
      top: 22,
      left: "calc(-50% + 38px)",
      right: "calc(50% + 38px)",
   },

   line: {
      border: `1px dashed ${Colors.TextLight}`,
      borderRadius: "unset",
   },
})(StepConnector);
