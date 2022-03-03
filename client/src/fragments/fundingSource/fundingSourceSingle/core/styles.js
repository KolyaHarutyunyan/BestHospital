import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const fundingSourceSingleStyles = makeStyles(() => ({
   inputTextField: {
      alignItems: "flex-end",
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
   fundingSourceSingleHeaderStyles: {
      display: "flex",
      alignItems: "center",
      "& > img": { marginRight: "8px" },
   },
   fundingSourceSingleHeaderWrapStyles: {
      marginBottom: 34,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   title: {
      fontSize: "18px",
      color: Colors.TextPrimary,
      fontWeight: "bold",
      textTransform: "capitalize",
   },
   foundingIcon: {
      width: 32,
      height: 32,
      marginLeft: 8,
   },
   fundingSourceSinglePTModifiersStyles: {
      maxWidth: "710px",
      width: "100%",
      "&.narrow": { maxWidth: "450px" },
      padding: 24,
      borderRadius: 8,
      border: "1px solid #347AF080",
      marginLeft: 16,
   },
   fundingSourceSinglePTModifiersTitleStyles: {
      fontSize: 24,
      color: Colors.TextPrimary,
      fontWeight: "bold",

      width: 400,
      height: 33,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
   },
   fundingSourceSingleGeneralStyles: {
      display: "flex",
      justifyContent: "space-between",
   },
   clear: {
      height: 36,
      width: 74,
   },
   iconCursor: {
      cursor: "pointer",
   },
   iconCursordelete: {
      marginLeft: 16,
      cursor: "pointer",
   },
   tableTitle: {
      width: 130,
      textOverflow: "ellipsis",
      overflow: "hidden",
      height: 19,
   },
   fundindService: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 50,
   },
   fundindServiceItems: {
      marginTop: -32,
      width: "100%",
      "@media(max-width: 1280px)": {
         maxWidth: "600px",
         "&.narrow": { maxWidth: "450px" },
      },
   },
   searchContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& button": {
         marginLeft: 15,
      },
   },
   dateInput: {
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: 38,
         color: Colors.TextPrimary,
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
      "& .MuiInputBase-input::placeholder": {
         fontSize: 14,
         color: Colors.TextLightGray,
      },
   },
   noItemWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      "& p": {
         fontSize: 18,
         color: Colors.TextLightGray,
         fontWeight: "bold",
         marginTop: "50px",
      },
   },
}));

export const editButtonStyle = {
   height: 36,
   paddingInline: 24,
};
