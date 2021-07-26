import { makeStyles } from "@material-ui/core/styles";
import {Backgrounds, Colors, Shadow} from "@eachbase/utils";

export const wrapperStyle = makeStyles(() => ({
  buttonsTabStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addButton:{
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },

  createOfficesBody: {
    padding: "24px 16px",
    "@media (min-width: 1920px)": {
      padding: "32px 24px",
    },
  },

  createOfficeTableHead: {
    display: "flex",
    alignItems: "center",

    "& p": {
      marginLeft: "4px",
      "@media (min-width: 1920px)": {
        marginLeft: "8px",
      },
    },
  },

  managementWrapper:{
    padding:'16px',
    boxShadow: Shadow.modalShadow,
    width:'100%',
    marginTop:'16px',
    height:'420px',
    background: Backgrounds.whiteModal,
    
    "@media (min-width: 1920px)": {
      padding:'24px',
      marginTop:'24px',
      height:'444px'
    },
  }

}));
