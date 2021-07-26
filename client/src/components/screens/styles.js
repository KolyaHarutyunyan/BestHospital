import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";

export const screensStyle = makeStyles(() => ({
  messageScreenWrapper: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },

  messageScreenModal: {
    background: Backgrounds.white,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "@media (min-width: 1240px)": {
      width: "332px",
      height: "241px",
      padding: "32px",
      marginTop: "70px",
    },
    "@media (min-width: 1980px)": {
      width: "348px",
      height: "257px",
      padding: "40px",
      marginTop: "212px",
    },
  },

  messageScreenText: {
    marginTop: "24px",
    marginBottom: "16px",
    fontSize: "32px",
    fontWeight: "bold",
    color: Colors.TextSecondary,
  },

  messageScreenResponse: {
    fontSize: "15px",
    lineHeight: "24px",
    color: Colors.TextPrimary,
  },

  messageButton: {
    width: "100%",
    height: "48px",
    padding: "10px",
    background: "#438AFE 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "600px",
    color: Colors.TextWhite,
    border: "none",
    outline: "none",
    marginTop: "16px",
  },

  errMessageScreenModal: {
    background: Backgrounds.white,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "@media (min-width: 1240px)": {
      width: "332px",
      height: "305px",
      padding: "32px",
      marginTop: "70px",
    },
    "@media (min-width: 1980px)": {
      width: "348px",
      height: "321px",
      padding: "40px",
      marginTop: "212px",
    },
  },

  messageMiniScreen: {
    width: "345px",
    height: "78px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 12px #0000001A",
    borderRadius: "8px",
    display: "flex",
    padding: "16px",
    alignItems: "center",
    position: "absolute",
    bottom: "50px",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    right: 20,

    "@media (min-width: 1240px)": {
      right: 42,
    },
    "@media (min-width: 1980px)": {
      right: 100,
    },

    "& p": {
      color: Colors.TextSecondary,
      fontSize: "16px",
      lineHeight: "24px",
      marginLeft: "16px",
    },
  },

  selectRole:{
    width:'100%',
    justifyContent:'center',
    display:'flex',
    marginTop:'30px'
  },

  circleStyle:{
    width: '32px',
    height: '32px',
    borderRadius:'40px',
    color: Colors.TextWhite,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'16px',
    fontWeight:'600',
    marginRight:'8px',
    "@media (min-width: 1920px)": {
      marginRight:'16px',
    },
  },

  lineStyle:{
    borderLeft: '1px dashed #51566D80',
    margin:'16px 30px 0 16px',
    "@media (min-width: 1920px)": {
      margin:'24px 30px 0 16px',
    },

  },
}));
