import { Colors, Images } from "@eachbase/utils";
import { makeStyles } from "@material-ui/core/styles";

export const dropdownsStyle = makeStyles(() => ({
   dropOverlayStyle: {
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      position: "fixed",
      zIndex: 9,
   },

   // UserInputsDropdown Style **
   userDropStyle: {
      width: "164px",
      "& .userDropLabel": {
         fontSize: "14px",
         fontWeight: 600,
         color: Colors.BackgroundBlue,
         marginBottom: "8px",
      },
      "& .dropdown-box": {
         position: "relative",
         width: "100%",
         backgroundColor: Colors.BackgroundWhite,
         borderRadius: "4px",
         border: "1px solid #A3B2BD80",
         "&.error": { border: `1px solid ${Colors.ThemeRed}` },
         "& .show-dropdown-box": {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            padding: "9px 16px",
            borderRadius: "4px",
            "& .dropdown-selected": {
               fontSize: "14px",
               fontWeight: 600,
               color: Colors.TextPrimary,
               display: "flex",
               alignItems: "center",
            },
            "& > i": {
               width: "18px",
               height: "18px",
               backgroundImage: `url(${Images.dropdownArrow})`,
               backgroundRepeat: "no-repeat",
               backgroundSize: "contain",
               backgroundPosition: "center",
               "&.active": { transform: "rotate(180deg)" },
            },
         },
         "& .dropdown-options": {
            position: "absolute",
            top: "40px",
            left: 0,
            width: "100%",
            backgroundColor: Colors.BackgroundWhite,
            boxShadow: "0 0 6px #8A8A8A3D",
            borderRadius: "4px",
            padding: "4px 0",
            zIndex: 10,
            "& > li": {
               transition: "all 0.1s linear",
               cursor: "pointer",
               padding: "9px 16px",
               display: "flex",
               alignItems: "center",
               "&:hover": { backgroundColor: Colors.BackgroundPrimary },
               "& .dropdown-option-title": {
                  fontSize: "14px",
                  fontWeight: 400,
                  color: Colors.TextPrimary,
                  "&.selected-title": { fontWeight: 600 },
               },
            },
         },
      },
   },
   optionStyle: {
      "&::before": {
         content: "''",
         width: "12px",
         height: "12px",
         borderRadius: "50%",
         marginRight: "8px",
      },
      "&.ACTIVE::before": { backgroundColor: Colors.ThemeGreen },
      "&.INACTIVE::before": { backgroundColor: Colors.TextSecondary },
      "&.HOLD::before": { backgroundColor: Colors.ThemeBlue },
      "&.TERMINATE::before": { backgroundColor: Colors.ThemeRed },
   },
   // end **

   // CheckBoxDropdown Style **
   dropdownBoxStyle: {
      width: "100%",
      position: "relative",
      backgroundColor: Colors.BackgroundWhite,
      border: `1px solid ${Colors.ThemeBlue}`,
      borderRadius: "4px",
      "&.error": { borderColor: Colors.ThemeRed },
   },
   showDropdownBoxStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "13px 16px",
      cursor: "pointer",
   },
   dropdownSelectedStyle: {
      fontSize: "16px",
      fontWeight: 400,
      color: "#4B5C6880",
   },
   dropArrowStyle: {
      width: "18px",
      height: "18px",
      "&.rotate": { transform: "rotate(180deg)" },
      "& img": { width: "100%" },
   },
   dropdownStyle: {
      position: "absolute",
      width: "100%",
      maxHeight: "296px",
      overflowY: "auto",
      top: "56px",
      left: 0,
      backgroundColor: Colors.BackgroundWhite,
      boxShadow: "0 0 6px #8A8A8A3D",
      borderRadius: "4px",
      padding: "4px 0",
      zIndex: 999,
   },
   // end **
}));
