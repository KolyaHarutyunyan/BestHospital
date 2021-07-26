import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const agentsFragments = makeStyles(() => ({
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

  humanResourcesInfo: {
    display: "flex",
    alignItems: "center",

    "& p": {
      fontSize: "14px",
      lineHeight: "19px",
      fontWeight: "600",
      color: Colors.TextSecondary,
    },

    "& img": {
      width: "24px",
      height: "24px",
      marginRight: "4px",
      "@media (min-width: 1980px)": {
        marginRight: "8px",
      },
    },
  },

  humanResourcesInfoSwitcher: {
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