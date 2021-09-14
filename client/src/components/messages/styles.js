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
    margin: "7px 0 9px",
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

  nameEllipsis:{
    overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    width:'150px',
    textTransform:'uppercase',
    "@media (min-width: 1919px)": {
      width:'150px',
    },
  },

  addressEllipsis:{
    overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    width:'200px',
    "@media (min-width: 1919px)": {
      width:'250px',
    },
  } ,
  desc:{
    overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    width:'200px',
    "@media (min-width: 1919px)": {
      width:'250px',
    },
  },
  responsive:{
    overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    maxWidth:'200px',
    "@media (min-width: 1919px)": {
      maxWidth:'250px',
    },
  },
  emailEllipsis:{
    overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    width:'150px',
    "@media (min-width: 1919px)": {
      width:'200px',
    },
  },
}));
