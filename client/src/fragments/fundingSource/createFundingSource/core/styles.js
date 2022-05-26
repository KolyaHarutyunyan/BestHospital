import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core/styles";

export const createFoundingSourceStyle = makeStyles(() => ({
   createFoundingSource: {
      width: 920,
      background: Colors.BackgroundWhite,
      borderRadius: "8px",
      overflow: "hidden",
      "@media (max-width: 1280px)": {
         width: "896px",
      },
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
   },
   createFoundingSourceBodyBlock: {
      display: "flex",
      "& > div:not(:first-of-type), & > div > button:not(:first-of-type)": {
         marginLeft: "40px",
      },
   },
   createFoundingSourceBodyBox: {
      width: 400,
   },
   createFundingSourceHeaderBottom: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "0 40px",
      marginTop: 24,
      position: "relative",
   },
   createFundingSourceHeaderBottomBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   createFundingSourceHeaderBottomCircle: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: Colors.BackgroundBlue,
      color: Colors.TextWhite,
      marginBottom: 13,
   },
   createFundingSourceHeaderBottomText: {
      fontSize: 18,
      color: Colors.TextPrimary,
      fontWeight: 600,
   },
   createFundingSourceHeaderBottomLine: {
      width: "75%",
      borderTop: `1px dashed ${Colors.TextDarkGrey}`,
      position: "absolute",
      top: 16,
      margin: "auto",
      left: 0,
      right: 0,
   },
   createFundingSourceHeaderBottomPosition: {
      position: "relative",
      width: 64,
      background: "inherit",
      marginRight: "75px",
   },
}));

export const inputStyle = {
   marginBottom: 8,
};
