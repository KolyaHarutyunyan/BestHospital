import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const modalsStyle = makeStyles(() => ({
  closeButton:{
    display:"flex",
    justifyContent:"flex-end",
  },

  buttons:{
    display:'flex'
  },

  deleteModalWrapper:{
    padding:'8px 40px 0 40px',
  },

  deleteInfo:{
    color:Colors.ThemeRed,
    fontSize: '18px',
  }
}));


