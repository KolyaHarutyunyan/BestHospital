import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const inputsStyle = makeStyles(() => ({
  select: {
    '& select:focus':{
      outline: 'none',
      backgroundColor: 'white'
    }
  },
  selectPlaceholder: {
    '& .MuiSelect-select:focus':{
      outline: 'none',
      backgroundColor: 'white'
    }
  },
  radio: {
    color: Colors.BackgroundBlue,
    '&:hover': {
      backgroundColor: 'white'
    },
    '&$checked': {
      color: Colors.BackgroundBlue,
      '&:hover': {
        backgroundColor: 'white'
      },
    }
  },
  radioInputLabel: {
    fontSize: 16,
    color: Colors.TextSecondary,
  },
  checked: {
    color :'green'
  },
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
      borderColor:Colors.BackgroundBlue,
    },
    '& .MuiOutlinedInput-root':{
      height:'48px'
    },
    '& .MuiInputLabel-outlined':{
      marginTop:'-3px',
      color :Colors.TextPrimary
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -2px) scale(0.75)'
    },
    '&:hover .MuiOutlinedInput-notchedOutline':{
      borderColor:Colors.BackgroundBlue,
    },
  },
  TextareaTextField:{
    width:'100%',
    resize: 'none',
    height:'128px!important',
    borderColor:Colors.BackgroundBlue,
    padding: '13px 0 0 10px',
    borderRadius: '4px',
    '&::placeholder' : {
      fontSize: '14px',
      lineHeight: '19px',
      color: Colors.TextMiddleGray
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
    margin:'0px 0 8px'
  },

  inputShrink:{
    background:'white',
    padding:'0 6px'
  }

}));


