import { makeStyles } from "@material-ui/core/styles";

export const claimsCoreStyle = makeStyles(() => ({
   claimTableStyle: {
      width: "100%",
      marginBottom: "6px",
      "& table": {
         borderSpacing: "0px 8px",
         borderCollapse: "separate",
      },
   },
}));
