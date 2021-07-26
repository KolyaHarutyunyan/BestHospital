import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const inputsStyle = makeStyles(() => ({
  SignInInput: {
    width: "100%",
    // marginBottom: "16px",
    // marginBottom: "24px",
    // "@media (max-width: 1280px)": {
    //   // marginBottom: "16px",
    // },

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
    "& p": {
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

  inputTextField:{
    width:'100%',
    '& .MuiOutlinedInput-notchedOutline':{
      borderColor:Colors.BackgroundBlue
    },
    '& .MuiOutlinedInput-root':{
      height:'48px'
    },
    '& .MuiInputLabel-outlined':{
      marginTop:'-3px'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -2px) scale(0.75)'
    },
  },
  inputTextFieldAutoHeight:{
    '& .MuiOutlinedInput-root':{
      // minHeight:'48px',
      // height:'auto'
    },
    '& .MuiOutlinedInput-notchedOutline':{
      borderColor:Colors.BackgroundBlue
    },
    '& .MuiInputLabel-outlined':{
      // marginTop:'-3px'

    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -2px) scale(0.75)'
    }
  },

  searchAddress:{
    height:'48px',
    border: `1px solid ${Colors.BackgroundBlue}`,
    borderRadius: '4px',
    padding: '18.5px 14px',
    fontSize:'16px',
    width:'100%',
  },

  errorText:{
    color: '#F07379',
    fontSize: '14px',
    fontWeight: 600,
    margin:'3px 0'
  },

  inputShrink:{
    background:'white',
    padding:'0 6px'
  }

}));


