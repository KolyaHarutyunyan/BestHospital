import { Colors } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core/styles";

export const foundingSourceModalStyle = makeStyles(() => ({
   createFoundingSource: {
      background: Colors.BackgroundWhite,
      borderRadius: "8px",
      overflow: "hidden",
   },

   createFoundingSourceBody: {
      width: "100%",
      padding: "40px",
   },
   fundingSourceModalsTitle: {
      fontSize: 18,
      color: Colors.TextPrimary,
      fontWeight: 600,
   },
   addMoreModifiersText: {
      marginLeft: 8,
      fontSize: 14,
      color: "#347AF080",
      cursor: "pointer",
   },
   addmodifiersBlock: {
      display: "flex",
      justifyContent: "flex-end",
      margin: "20px 0 40px",
      alignItems: "center",
   },
   displayCodeBlock: {
      width: "100%",
      padding: "31px 16px",
      background: Colors.BackgroundWater,
   },
   displayCodeBlockText: {
      color: Colors.TextPrimary,
      fontSize: 14,
      fontWeight: 600,
   },
   displayCode: { color: "#4B5C68B3" },
   ModifiresTitle: {
      fontSize: 18,
      color: Colors.TextPrimary,
      fontWeight: 600,
      marginBottom: 16,
      marginTop: 16,
   },
   iconsCursor: { cursor: "pointer" },
   modifierInputsBoxStyle: { marginTop: "32px" },
   modifierServiceBoxStyle: { marginTop: "16px" },
   foundingSourceModalsBodyBlock: {
      width: "100%",
      display: "flex",
      alignItems: "center",
   },
   modifierBoxStyle: {
      width: "100%",
      padding: "40px",
      "@media(max-width: 1280px)": { padding: "32px" },
      borderRadius: "0px 0px 8px 8px",
      backgroundColor: Colors.BackgroundWhite,
   },
}));

export const inputStyle = {
   marginBottom: 8,
};
