import { makeStyles } from "@material-ui/core/styles";
import {Backgrounds, Colors} from "@eachbase/utils";

export const tableStyle = makeStyles(() => ({
  tableHead: {
    boxShadow: '0px 0px 12px #0052E01A',
    borderRadius:'8px',

    background: Backgrounds.headerLightBlue,



    "& .MuiTableCell-sizeSmall": {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "19px",
      color: Colors.TextSecondary,
      padding: "8px 16px 8px 16px",
      border:'none',
      "@media (min-width: 1920px)": {
        padding: "17px 24px 17px 24px",
      },
    },
  },
  tableBody:{
    boxShadow: '0px 0px 12px #0052E01A',
    borderRadius:'8px'
  },
  tableRow: {
    "&:hover": {
      background: "#EAF2FF 0% 0% no-repeat padding-box",
    },
    height: "50px",

    "& .makeStyles-membersTableWrapper-26 .MuiTableContainer-root": {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 8px 12px #0052E01A",
    },
    "& .MuiTableCell-sizeSmall": {
      fontSize: "14px",
      lineHeight: "22px",
      color: Colors.TextPrimary,
      border:'none',

      padding: "8px 16px 8px 16px",
      "@media (min-width: 1920px)": {
        padding: "16px 32px 16px 32px",
      },
    },

    "& .MuiTableCell-sizeSmall:last-child": {
      paddingTop: "11px",
      fontSize: "16px",
      lineHeight: "30px",
      color: "#545F7E",
    },

    "& MuiSwitch-track": {
      borderRadius: "12px",
      background: "lightgray",
    },

    "& .MuiSwitch-colorPrimary.Mui-checked": {
      color: "white",
    },

    "& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track": {
      background: "#387DFF",
      borderRadius: "12px",
      opacity: "1",
    },
  },
}));
