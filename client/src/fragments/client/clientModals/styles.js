import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

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
   },
   clientModalBlock: {
      display: "flex",
      justifyContent: "space-between",
   },
   clientModalBox: {
      width: 463,
   },
   inputInfo: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
   },
   displayCodeBlock: {
      width: "100%",
      padding: "31px 16px",
      background: Colors.BackgroundPrimary,
      margin: "16px 0",
   },
   displayCodeBlock2: {
      width: "100%",
      padding: "24px 16px",
      margin: "16px 0",
      boxShadow: "0px 0px 6px #347AF03D",
   },
   displayCodeBlockText: {
      color: Colors.TextPrimary,
      fontSize: 14,
      fontWeight: 600,
   },
   availableModfiers: {
      display: "flex",
      justifyContent: "center",
      marginTop: 8,
      flexWrap: "wrap",
   },
   availableModfier: {
      margin: "4px",
      border: "1px solid #4B5C6880",
      borderRadius: 14,
      padding: "4px 16px",
      cursor: "pointer",
   },
   displayCode: {
      color: "#4B5C68B3",
   },
   authorizationFileHeader: {
      textAlign: "center",
      paddingBottom: 30,
      "& h1": {
         fontSize: 32,
         color: Colors.TextSecondary,
         fontWeight: "bold",
      },
      "& h2": {
         fontSize: 16,
         color: Colors.TextSecondary,
         fontWeight: "regular",
         padding: "16px 0",
      },
      "& p": {
         fontSize: 16,
         color: Colors.TextSecondary,
         fontWeight: "regular",
      },
      "& span": {
         fontSize: 16,
         color: Colors.BackgroundBlue,
         fontWeight: "bold",
      },
   },
   starIcon: {
      color: `${Colors.ThemeRed}!important`,
   },
   authorizationFileForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
   curently: {
      color: Colors.TextPrimary,
      fontSize: 16,
      marginLeft: 10,
   },
   curentlyCheckbox: {
      display: "flex",
      alignItems: "center",
      marginBottom: 16,
   },
   ddd: {
      border: "1px solid blue !important",
      display: "none !important",
   },
}));
