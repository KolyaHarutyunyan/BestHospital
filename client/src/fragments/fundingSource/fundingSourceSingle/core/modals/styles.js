import {Colors} from "@eachbase/utils";
import {makeStyles} from "@material-ui/core/styles";


export const createFoundingSourceStyle = makeStyles(() => ({

    createFoundingSource: {
        width: 920,
        background: Colors.BackgroundWhite,
        borderRadius: '8px',
        overflow: "hidden",
        '@media (max-width: 1280px)': {
            width: '896px'
        }
    },

    createFoundingSourceBody: {
        width: '100%',
        padding: '40px',
    },
    fundingSourceModalsTitle : {
        fontSize: 18,
        color : Colors.TextPrimary,
        fontWeight : 600,
        marginBottom :16
    },
    addMoreModifiersText: {
        marginLeft : 8,
        fontSize : 14,
        color :  '#347AF080',
        cursor: 'pointer'
    },
    addmodifiersBlock : {
        display:'flex',
        justifyContent: 'flex-end',
        margin: '20px 0 40px',
        alignItems: "center"
    },
    displayCodeBlock: {
        width : '100%',
        padding :  "31px 16px",
        background : Colors.BackgroundPrimary
    },
    displayCodeBlockText : {
        color : Colors.TextPrimary,
        fontSize :14,
        fontWeight : 600,
    }

}));