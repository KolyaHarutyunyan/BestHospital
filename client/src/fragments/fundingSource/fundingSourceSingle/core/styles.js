import { makeStyles } from "@material-ui/core/styles";
import {Colors} from "../../../../utils";

export const fundingSourceSingleStyles = makeStyles(() => ({

    fundingSourceSingleHeaderStyles : {
        display: 'flex',
        justifyContent:'space-between',
        alignItems: "center"
    },
    title : {
        fontSize: '18px',
        color:Colors.TextPrimary,
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    foundingIcon: {
        width: 32,
        height: 32,
        marginLeft:8
    }

}));
