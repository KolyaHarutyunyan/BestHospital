import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const loginFragments = makeStyles(() => ({
  LoginHead: {
    height: "60px",
    background: `${Colors.BackgroundBlue} 0% 0% no-repeat padding-box`,
    boxShadow: "0px 3px 6px #1C23314D",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 100px",

    "@media (max-width: 1919px)": {
      padding: "18px 42px",
    },

    "& p": {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "900",
      color: `${Colors.TextWhite}`,
    },
  },

  LoginHeadPhoneNumber: {
    "& a": {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },

    "& img": {
      marginRight: "8px",
    },

    "& span": {
      fontSize: "16px",
      lineHeight: "22px",
      color: `${Colors.TextWhite}`,
    },
  },

  LoginModalWrapper: {
    background: `${Colors.TextWhite} 0% 0% no-repeat padding-box`,
    borderRadius: "8px",

    "@media (max-width: 1979px)": {
      width: "464px",
      height: "301px",
      padding: "22px 32px",
    },
    "@media (min-width: 1920px)": {
      width: "600px",
      height: "321px",
      padding: "40px",
    },

    "& p": {
      fontSize: "32px",
      lineHeight: "48px",
      fontWeight: "bold",
      color: Colors.TextSecondary,
      marginBottom: "10px",
    },
  },

  LoginModalForgotText: {
    fontSize: "16px",
    lineHeight: "24px",
    color: Colors.TextPrimary,
    marginBottom: "20px",
  },

  LoginModalForgot: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: 600,
    color: Colors.TextPrimary,
    background: "none",
    border: "none",
    outline: "none",
    width: "200px",
  },

  LoginModalButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:'20px'
  },

  CopyRight: {
    fontSize: "14px",
    lineHeight: "19px",
    color: Colors.TextWhite,
  },
}));
