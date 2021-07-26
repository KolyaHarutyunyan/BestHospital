import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const officesFragments = makeStyles(() => ({
  tableWrapper: {
    height: "100%",
    minHeight: "100vh",
    width: "100%",
    boxShadow: "0px 0px 12px #0052E01A",
    borderRadius: "8px",
    marginTop: "16px",
    marginBottom: "24px",
    "& .MuiTableContainer-root": {
      boxShadow: "none",
    },
  },


  officeInfoSwitcher: {
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: "14px",
      lineHeight: "19px",
      fontWeight: "normal",
      color: Colors.TextSecondary,
    },
  },
}));
