import {makeStyles} from "@material-ui/core";
import { Colors } from "./globalColors";

export const useGlobalText = makeStyles({
    smallText:{
        fontSize:'18px',
        fontWeight:'600',
        color:'#2A374E',
    },
    title:{
        fontSize:'24px',
        fontWeight:'bold',
        color:'#2A374E',
    },
    smallSwitchText:{
        fontSize:'14px',
        color: Colors.TextSecondary ,
    },
})