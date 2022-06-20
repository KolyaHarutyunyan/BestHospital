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
      maxWidth: "463px",
      width: "100%",
      "&.hidden": { display: "none" },
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
      boxShadow: "0px 0px 6px #347AF03D",
      "&.error": { border: `1px solid ${Colors.ThemeRed}` },
   },
   displayCodeBlockText: {
      color: Colors.TextPrimary,
      fontSize: 14,
      fontWeight: 600,
   },
   availableModfiers: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      "&.notApplicable": { justifyContent: "center" },
      marginTop: "16px",
   },
   modifiersStyle: {
      margin: "4px",
      borderRadius: 14,
      padding: "4px 16px",
      background: "#347AF080",
      color: "#fff",
      border: "none",
      cursor: "default",
   },
   modifierNamesStyle: {
      width: 19,
      height: 20,
      overflow: "hidden",
   },
   availableModfier: {
      margin: "4px",
      border: "1px solid #4B5C6880",
      borderRadius: 14,
      padding: "4px 16px",
      cursor: "pointer",
      "&.checked": {
         backgroundColor: "#347AF0",
         color: "#fff",
      },
      "&.chosen": {
         backgroundColor: "#347AF080",
         cursor: "default",
      },
      "&.hidden": { display: "none" },
      "&:disabled": {
         cursor: "default",
         color: Colors.TextWhite,
      },
   },
   loaderBoxStyle: {
      justifySelf: "center",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   displayCode: {
      color: "#4B5C68B3",
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
   serviceModifiersContainerStyle: {
      display: "flex",
      alignItems: "center",
   },
   notApplicableStyle: {
      marginLeft: "8px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      "&.hidden": { display: "none" },
   },
}));
