import { makeStyles } from "@material-ui/core/styles";
import {Colors} from "../../../../utils";
import {FundingSourceSinglePTModifiers} from "./fundingSourceSinglePTModifiers";

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
    },
    fundingSourceSinglePTModifiersStyles: {
        width: '710px',
        padding : 24,
        borderRadius : 8,
        border : '1px solid #347AF080',
        marginLeft: 16,
        flex: '0 0 710px'
    },
    fundingSourceSinglePTModifiersTitleStyles: {
        fontSize : 24,
        color : Colors.TextPrimary,
        fontWeight : "bold"
    }
}));
