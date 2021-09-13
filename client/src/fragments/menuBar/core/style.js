import { makeStyles } from "@material-ui/core/styles";
import {Backgrounds, Colors, Shadow} from "@eachbase/utils";

const drawerWidth = 100;
export const navBarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  transition: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBar: {
    background: `${Colors.BackgroundWhite} 0% 0% no-repeat padding-box`,
    boxShadow: Shadow.menuShadow,
    opacity: 1,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  IconButtonStyle: {
    height: "32px",
    width: "32px",
    marginTop: "90px",
    position: "fixed",
    color: Colors.BackgroundWhite,
    border: `1px solid ${Colors.BackgroundWhite}`,
    zIndex: 1202,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: `${Colors.BackgroundWhite} 0% 0% no-repeat padding-box`,
    boxShadow: Shadow.menuShadow,
    opacity: "1",
    width: "220px",

    zIndex: 1201,
    overflowX: "hidden",
    border: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: 1201,
    background: `${Colors.BackgroundWhite} 0% 0% no-repeat padding-box`,
    boxShadow: Shadow.menuShadow,
    opacity: "1",
    width: "64px",
    border: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  Toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  openToolbar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "@media (min-width: 1280px)": {
      marginLeft: "240px",
    },
    "@media (min-width: 1920px)": {
      marginLeft: "237px",
    },
  },
  closeToolbar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: "60px",

    "@media (min-width: 1920px)": {
      marginLeft: "80px",
    },
  },
  content: {
    flexGrow: 1,
    padding: "90px 20px 24px 24px",
    paddingBottom: "40px",
    height:'100%',
    background: `${Colors.BackgroundSecondary} 0% 0% no-repeat padding-box`,

    "@media (min-width: 1920px)": {
      padding: "90px 40px 24px 40px",
    },
  },

  headerContent: {
    display: "flex",
    justifyContent: "flex-end",
  },

  menuItems: {
    marginTop: "70px",
    "& .MuiListItemText-root": {
      margin: "0",
    },
    "& a": {
      textDecoration: "none",
    },
  },

  linkWrapperActive:{
    borderLeft:`4px solid ${Colors.BackgroundBlue}`,
    borderRadius: '0px 8px 8px 0px',
  },
  activeListItem: {
    background: Backgrounds.lightBlue,
    marginTop: "16px",
    paddingLeft: "8px",
    marginLeft:'8px',
    height: "36px",
    width:'200px',
    borderRadius:'8px',
  },
  activeListItemFalse: {
    background: Backgrounds.lightBlue,
    marginTop: "16px",
    paddingLeft: "8px",
    marginLeft:'8px',
    height: "36px",
    width:'40px',
    borderRadius:'8px',
  },
  listItem: {
    width:'40px',
    marginTop: "16px",
    paddingLeft: "8px",
    marginLeft:'12px',
    borderRadius: "4px",
    height: "36px",
  },
  menuItemsStyle: {
    lineHeight: "21px",
    fontSize:'14px',
    color: Colors.TextSecondary,
    marginLeft:'8px',
  },
  menuActiveItemsStyle: {
    lineHeight: "21px",
    fontSize:'14px',
    color: Colors.BackgroundBlue,
    marginLeft:'8px',
  },

  boxWrapper: {
    display: "flex",
    alignItems: "center",
  },

  userInfo: {
    alignItems: "center",
    display: "flex",
    cursor: 'pointer',

    "& img": {
      width: "40px",
      height: "40px",
      border: "1px solid white",
      borderRadius: "24px",
    },
  },

  userInfoText: {
    fontSize: "14px",
    lineHeight: "19px",
    color: Colors.TextSecondary,
    opacity: "1",
    paddingLeft: "8px",
    "@media (min-width: 1980px)": {
      marginLeft: "16px",
    },
  },

  logOutInfo: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    paddingLeft: "54px",
    "& img": {
      width: "18px",
      height: "18px",
    },
  },

  logOut: {
    textAlign: "right",
    font: "normal normal normal 12px/17px",
    letterSpacing: "0",
    color: "#FFFFFF",
    opacity: "1",
    paddingLeft: "8px",
  },
}));
