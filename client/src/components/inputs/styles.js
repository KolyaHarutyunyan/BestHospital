import { makeStyles } from "@material-ui/core/styles";
import { Colors, Shadow } from "@eachbase/utils";
import { Switch, withStyles } from "@material-ui/core";

export const inputsStyle = makeStyles(() => ({
   select: {
      "& select:focus": {
         outline: "none!important",
         backgroundColor: "white",
         border: "none!important",
      },
      width: "164px",
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
      "&::-webkit-scrollbar": {
         display: "none",
      },

      "&::placeholder": {
         fontSize: "14px",
         lineHeight: "19px",
         color: Colors.TextLightGray,
      },
   },
   errorTextareaTextField: {
      width: "100%",
      resize: "none",
      height: "128px!important",
      borderColor: Colors.ThemeRed,
      padding: "13px 0 10px 16px",
      borderRadius: "4px",
      overflow: "unset!important",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
         display: "none",
      },

      "&::placeholder": {
         fontSize: "14px",
         lineHeight: "19px",
         color: Colors.TextLightGray,
      },
   },
   inputTextFieldAutoHeight: {
      "& .MuiOutlinedInput-root": {
         // minHeight:'48px',
         // height:'auto'
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.BackgroundBlue,
      },
      "& .MuiInputLabel-outlined": {
         // marginTop:'-3px'
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
         transform: "translate(14px, -2px) scale(0.75)",
      },
   },

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
      fontSize: "14px!important",
      fontWeight: "600!important",
      margin: "0px 0 16px!important",
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
