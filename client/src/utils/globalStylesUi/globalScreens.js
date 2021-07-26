import { makeStyles } from "@material-ui/core";

export const createInputsWrapper = makeStyles({
  createInputsWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  basicInfo:{
    margin: "20px 0 8px 0",
    "@media (min-width: 1920px)": {
      margin: "30px 0 8px 0",
    },
  },

  basicInfoInputs:{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    "@media (min-width: 1920px)": {
      marginTop: "24px",
    },
  },

})