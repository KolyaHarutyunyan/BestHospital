import { makeStyles } from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";


export const fundingSourceSingleStyles = makeStyles(() => ({

    fundingSourceSingleHeaderStyles : {
        display: 'flex',
        justifyContent:'space-between',
        alignItems: "center"
    },
    fundingSourceSingleHeaderWrapStyles : {
        marginBottom : 34,
        display: 'flex',
        justifyContent:'space-between',
        alignItems: "center",
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
        fontWeight : "bold",
    },
    fundingSourceSingleGeneralStyles : {
        display: 'flex',
        justifyContent: "space-between"
    },
    clear : {
        height: 36, width: 74
    },
    iconCursor : {
        cursor  : 'pointer'
    },
    iconCursordelete : {
        marginLeft: 16,
        cursor  : 'pointer'
    },
    tableTitle : {
        width: 130,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        height : 19
    }

}));

export const btnStyles={height: 36, width: 74}