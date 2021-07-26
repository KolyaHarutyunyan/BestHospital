import { makeStyles } from "@material-ui/core/styles";
import {Backgrounds, Colors} from '@eachbase/utils'

export const createOfficeStyle = makeStyles(() => ({
    radioButtonStyle:{
         display:'flex',
         alignItems:'center',
         padding:'16px 40px',
         background: Backgrounds.info,
         borderRadius: '4px',
         width: '421px',
         height: '54px',
         marginTop:'24px',

        '& span':{
            fontSize:'15px',
            color: Colors.TextPrimary
        },
        '& .MuiIconButton-label':{
            color: Colors.ThemeBlue
        }

    }


}));
