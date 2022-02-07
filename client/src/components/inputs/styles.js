import { makeStyles } from "@material-ui/core/styles";
import { Colors, Images, Shadow } from "@eachbase/utils";
import { Switch, withStyles } from "@material-ui/core";

export const inputsStyle = makeStyles(() => ({
   select: {
      "& select:focus": {
         outline: "none!important",
         backgroundColor: "white",
         border: "none!important",
      },
      height: "36px",
      outline: "none!important",
   },
   selectPlaceholder: {
      "& .MuiSelect-select:focus": {
         outline: "none",
         backgroundColor: "white",
      },
   },
   radio: {
      color: Colors.BackgroundBlue,
      "&:hover": {
         backgroundColor: "white!important",
      },
      "&$checked": {
         color: `${Colors.BackgroundBlue}!important`,
         "&:hover": {
            backgroundColor: "white!important",
         },
      },
   },
   radioInputLabel: {
      fontSize: 16,
      color: Colors.TextSecondary,
   },

   days: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#4B5C68",
      marginLeft: "8px",
   },

   checked: {
      color: "green",
   },
   searchfAddressDescriptionText: {
      fontSize: "16px",
   },
   SignInInput: {
      width: "100%",
      "& .MuiFormLabel-root": {
         fontSize: "16px",
         color: `${Colors.TextPrimary}`,
      },

      "& .MuiInput-underline.Mui-error:after": {
         borderBottomColor: `${Colors.ThemeRed}`,
      },
   },

   searchInputTitle: {
      display: "flex",
      alignItems: "center",
      "& span": {
         fontSize: "14px",
         lineHeight: "19px",
         fontWeight: "600",
         color: Colors.BackgroundBlue,
         marginRight: "8px",
      },
      "& img": {
         width: "18px",
         height: "18px",
         cursor: "pointer",
      },
   },

   searchInput: {
      width: "100%",
      "@media (max-width: 1979px)": {
         marginBottom: "8px",
      },
      "@media (min-width: 1980px)": {
         marginBottom: "16px",
      },

      "& .MuiFormLabel-root": {
         fontSize: "16px",
         color: `${Colors.TextPrimary}`,
      },

      "& .MuiInput-underline.Mui-error:after": {
         borderBottomColor: `${Colors.ThemeRed}`,
      },
   },

   actionStyle: {
      width: "100%",

      "@media (max-width: 1979px)": {
         marginBottom: "8px",
      },
      "@media (min-width: 1980px)": {
         marginBottom: "16px",
      },
      "& .MuiInput-underline:before": {
         borderBottom: "none",
      },
   },

   PasswordInput: {
      "& .MuiInputBase-input::-webkit-input-placeholder": {
         fontSize: "16px",
         color: `${Colors.TextPrimary}`,
         opacity: 1,
      },
   },

   switcher: {
      // '& .MuiSwitch-root': {
      //   height: '41px',
      // },
      // '& .MuiSwitch-thumb': {
      //   width: '14px',
      //   height: '14px',
      //   marginTop: '4px',
      //   marginLeft: '1px',
      // },
   },

   inputTextField: {
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: "48px",
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
   inputTextFieldSmall: {
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiOutlinedInput-root": {
         height: "36px",
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
   TextareaTextField: {
      width: "100%",
      resize: "none",
      height: "128px!important",
      borderColor: Colors.BackgroundBlue,
      padding: "13px 0 10px 16px",
      borderRadius: "4px",
      overflow: "unset!important",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": { display: "none" },
      "&.error": { borderColor: Colors.ThemeRed },

      "&::placeholder": {
         fontSize: "14px",
         lineHeight: "19px",
         color: Colors.TextLightGray,
      },
   },

   // AutoComplete style **
   autocompleteStyle: {
      minHeight: "70px",
      "& fieldset": { borderColor: Colors.ThemeBlue },
      "& .MuiInputBase-root.MuiOutlinedInput-root.MuiAutocomplete-inputRoot.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiOutlinedInput-adornedEnd:hover fieldset":
         { borderColor: Colors.ThemeBlue },
      "& label": {
         color: "#4B5C6880 !important",
         top: "-5px",
         "&.Mui-focused": { top: 0 },
      },
      "& input": { padding: "0 16px !important" },
      "& .MuiAutocomplete-endAdornment > button:first-of-type, button svg": { display: "none" },
      "& .MuiAutocomplete-endAdornment > button:last-of-type": {
         position: "absolute",
         top: "3px",
         right: 0,
      },
      "& .MuiAutocomplete-endAdornment > button:last-of-type span:first-of-type": {
         display: "block",
         width: "18px",
         height: "18px",
         backgroundImage: `url(${Images.dropdownArrowFilledBlue})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "contain",
         backgroundPosition: "center",
      },
      "& .MuiInputBase-root.MuiOutlinedInput-root.MuiAutocomplete-inputRoot.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiOutlinedInput-adornedEnd":
         { padding: 0, height: "48px" },
   },
   optionsStyle: {
      fontSize: "16px",
      fontWeight: 400,
      color: "#4B5C68",
      "& *, & *:hover": { backgroundColor: "inherit" },
   },
   // end **

   // UserTextArea Style **
   userTextAreaStyle: {
      position: "relative",
      width: "100%",
      marginTop: "8px",
      "& label": {
         position: "absolute",
         top: "17px",
         left: "17px",
         cursor: "text",
         fontSize: "16px",
         fontWeight: 400,
         color: "#4B5C6880",
         transition: "all 0.1s ease-in-out",
      },
      "&.filled label": {
         backgroundColor: Colors.BackgroundWhite,
         padding: "0 4px",
         top: "-4px",
         left: "8px",
         fontSize: "12px",
      },
      "& textarea": {
         resize: "none",
         outline: "none",
         border: `1px solid ${Colors.ThemeBlue}`,
         borderRadius: "4px",
         padding: "13px 16px",
         width: "100%",
         height: "96px",
         overflowY: "auto",
         fontSize: "16px",
         fontWeight: 400,
         color: Colors.TextPrimary,
      },
      "&:focus-within textarea": { border: `2px solid ${Colors.ThemeBlue}` },
      "&.error textarea": { borderColor: Colors.ThemeRed },
   },
   errorAndCharsBoxStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .maxCharacter": {
         width: "100%",
         paddingRight: "16px",
         textAlign: "right",
         fontSize: "12px",
         fontWeight: 400,
         color: Colors.TextPrimary,
      },
   },
   // end **

   // SearchInput Style **
   searchInputBoxStyle: {
      width: "500px",
      backgroundColor: "#F2F4F8",
      borderRadius: "8px",
      marginRight: "35px",
      padding: "9px 16px 9px 38px",
      backgroundImage: `url(${Images.search})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "18px 18px",
      backgroundPosition: "16px 50%",
      cursor: "text",
      "@media(max-width: 1280px)": {
         width: "450px",
         marginRight: "27px",
      },
      "& > input": {
         width: "100%",
         outline: "none",
         border: "none",
         backgroundColor: "inherit",
         fontSize: "14px",
         fontWeight: 400,
         color: Colors.TextPrimary,
         "&::placeholder": {
            color: "#4B5C6899 !important",
            opacity: 1 /* Firefox */,
         },
         "&:-ms-input-placeholder": {
            /* Internet Explorer 10-11 */
            color: "#4B5C6899 !important",
         },
         "&::-ms-input-placeholder": {
            /* Microsoft Edge */
            color: "#4B5C6899 !important",
         },
      },
   },
   // end **

   // CheckBoxInput Style **
   checkBoxLabelStyle: {
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s linear",
      cursor: "pointer",
      padding: "15px 16px",
      "& input": { display: "none" },
      "& input:checked + $inputCheckBoxStyle": {
         backgroundImage: `url(${Images.checkmarkWhite})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "13px 10px",
         backgroundPosition: "center",
         backgroundColor: Colors.ThemeBlue,
      },
      "&:hover": { backgroundColor: Colors.BackgroundWater },
   },
   inputCheckBoxStyle: {
      backgroundColor: "inherit",
      transition: "background-color 0.2s linear",
      width: "18px",
      height: "18px",
      border: "1px solid #438AFE",
      borderRadius: "2px",
      marginRight: "16px",
   },
   inputLabelStyle: {
      fontSize: "16px",
      fontWeight: 400,
      color: Colors.TextPrimary,
   },
   // end **

   searchAddress: {
      height: "48px",
      border: `1px solid ${Colors.BackgroundBlue}`,
      borderRadius: "4px",
      padding: "18.5px 14px",
      fontSize: "16px",
      width: "100%",
   },
   searchAddressError: {
      height: "48px",
      border: `1px solid ${Colors.ThemeRed}`,
      borderRadius: "4px",
      padding: "18.5px 14px",
      fontSize: "16px",
      width: "100%",
      "&::placeholder": {
         color: Colors.ThemeRed,
      },
   },

   errorText: {
      color: "#F07379!important",
      fontSize: "12px!important",
      fontWeight: "600!important",
      minHeight: "20px !important",
   },

   inputShrink: {
      background: "white",
      padding: "0 6px",
   },

   valuesContainer: {
      backgroundColor: "white",
      boxShadow: Shadow.modalShadow,
      height: "auto",
      maxHeight: "300px",
      overflow: "auto",
      position: "absolute",
      zIndex: "10",
      width: "292px",
   },

   statusImg: {
      width: "12px",
      height: "12px",
      borderRadius: "24px",
      background: "red",
   },
}));

export const AntSwitch = withStyles((theme) => ({
   root: {
      width: 32,
      height: 16,
      padding: 0,
      display: "flex",
      marginTop: 0,
      marginLeft: "8px",
   },
   switchBase: {
      paddingTop: "2.2px",
      padding: 3,
      color: theme.palette.common.white,
      "&$checked": {
         transform: "translateX(14px)",
         color: theme.palette.common.white,
         "& + $track": {
            opacity: 1,
            backgroundColor: Colors.ThemeBlue,
            borderColor: theme.palette.primary.main,
         },
      },
   },
   thumb: {
      width: 12,
      height: 12,
      marginTop: 0,
      boxShadow: "none",
   },
   track: {
      border: "none",
      borderRadius: 24 / 2,
      opacity: 1,
      backgroundColor: theme.palette.grey[400],
   },
   checked: {},
}))(Switch);
