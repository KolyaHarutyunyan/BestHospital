import { makeStyles } from "@material-ui/core/styles";
import {Colors, Images} from "@eachbase/utils";

export const loginPage = makeStyles((theme) => ({
  loginPageBodyPosition: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginPageBody: {
    backgroundImage: `url(${Images.doctors})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    overflow: "hidden",
    height: "calc(100vh - 60px)",
    background: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,0.9))",

    "@media (max-width: 1979px)": {
      padding: "152px 42px",
    },
    "@media (min-width: 1920px)": {
      padding: "152px 100px",
    },
  },

  loginPageTitle: {
    borderLeft: "12px solid #347AF0",
    height: "177px",

    "& p": {
      fontSize: "40px",
      lineHeight: "64px",
      fontWeight: 'bold',
      letterSpacing: "2.4px",
      color: Colors.TextWhite,
      textTransform: "uppercase",
      marginTop: "-8px",
      marginLeft: "24px",

      "@media (max-width: 1919px)": {
        marginLeft: "16px",
      },
    },
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: "100%",
  },

  submit: {
    height: "50px",
    background:
      "transparent linear-gradient(90deg, #5690FF 0%, #766DE8 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 16px #387DFF4D",
    color: "white",
    fontWeight: "bold",
    "& .Mui-disabled": {
      opacity: "0.5",
      color: "white",
      fontWeight: "bold",
    },
  },

  CopyRightPos: {
    position: "absolute",
    bottom: "24px",
    marginLeft: "102px",
    "@media (max-width: 1919px)": {
      marginLeft: "42px",
    },
  },
}));
