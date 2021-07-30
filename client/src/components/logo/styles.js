import { makeStyles } from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";

export const logoStyle = makeStyles(() => ({
  GlobalLogo: {
    fontSize:'18px',
    fontWeight:'bold',
    margin:'28px 12px',
    color:Colors.BackgroundBlue,
    "& img": {
      width: "56px",
      height: "40px",
    },
  },
}));
