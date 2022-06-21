import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const modalHeadersStyle = makeStyles(() => ({
   createFoundingSource: {
      width: 920,
      background: Colors.BackgroundWhite,
      borderRadius: "8px",
      overflow: "hidden",
      padding: 100,
      "@media (max-width: 1280px)": {
         width: "896px",
      },
   },
   createFoundingSourceHeader: {
      position: "relative",
      width: "100%",
      background: Colors.BackgroundWater,
      borderRadius: "8px 8px 0px 0px",
      textAlign: "center",
      padding: "40px",
      "@media (max-width: 1280px)": { padding: "32px" },
   },
   createFoundingSourceHeaderTop: {
      width: "24px",
      height: "24px",
      position: "absolute",
      top: "8px",
      right: "8px",
   },
   createFoundingSourceBody: {
      width: "100%",
      padding: "40px",
      "@media (max-width: 1280px)": { padding: "32px" },
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
   modalText: {
      color: Colors.TextPrimary,
      fontSize: 16,
      marginTop: 16,
      width: 463,
      lineHeight: 1.5,
      textAlign: "center",
   },
}));
