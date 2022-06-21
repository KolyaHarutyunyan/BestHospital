import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core/styles";

export const createClientStyle = makeStyles(() => ({
   createFoundingSource: {
      width: 543,
      background: Colors.BackgroundWhite,
      borderRadius: "8px",
      overflow: "hidden",
   },
   createFoundingSourceHeader: {
      width: "100%",
      background: Colors.BackgroundPrimary,
      padding: "8px 0 24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   createFoundingSourceHeaderTop: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "8px",
      marginBottom: "8px",
   },
   createFoundingSourceBody: {
      width: "100%",
      padding: "40px",
      "@media (max-width: 1280px)": { padding: "32px" },
   },
   createFoundingSourceBodyFlex: {
      display: "flex",
      justifyContent: "space-between",
   },
   clientModalBlock: {
      display: "flex",
      justifyContent: "space-between",
   },
   clientModalBox: {
      width: 463,
   },
   inputTextField: {
      marginBottom: "10px",
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: "48px",
      },
      "& .MuiInputLabel-outlined": {
         marginTop: "-3px",
         color: Colors.TextPrimary,
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
         transform: "translate(14px, -2px) scale(0.75)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
   },
}));
