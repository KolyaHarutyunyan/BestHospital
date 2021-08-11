import { makeStyles } from "@material-ui/core/styles";

export const errMessageStyle = makeStyles(() => ({
  errMessageCenterPosition: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "3px 0 5px",
  },

  errMessageLeftPosition: {
    display: "flex",
    width: "100%",
    margin: "3px 0 5px",
  },

  errMessageStyleText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#F07379",
    // position:'absolute'
  },

  DoneMessage: {
    width: "420px",
    height: "62px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 12px #0052E01F",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    padding: "20px 16px",
    position: "fixed",
    bottom: "50px",
    right: "40%",
    left: "40%",

    "& p": {
      fontSize: "16px",
      lineHeight: "24px",
      color: "#252E48",
    },
  },
}));
