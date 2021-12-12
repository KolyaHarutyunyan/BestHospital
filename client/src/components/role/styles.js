import {makeStyles} from "@material-ui/core/styles";
import {Colors} from '@eachbase/utils'

export const roleStyles = makeStyles(() => ({
    roleWrapper: {
        width: '100%'
    },

    roleItemContainer: {
        marginTop: 32
    },

    noItem:{
        fontSize: 18,
        color: Colors.TextLightGray,
        fontWeight: 'bold',
        position: 'relative',
        marginLeft:'5px',
    },
    roleItemHover:{
        backgroundColor: Colors.BackgroundCatskillWhite,
        borderRadius: 8,
        marginBottom:'8px',
        '& :hover': {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid #A3B2BD80',
            borderRadius: 8,
            '& p':{
                border:'none'
            },
            '& img':{
                border:'none'
            },
            '& div':{
                border:'none'
            },
        },
    },

    roleItemActive:{
        backgroundColor: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: 8,
        marginBottom:'8px',
        border: `1px solid ${Colors.BackgroundCatskillWhite}`,
    },

    roleItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        cursor:'pointer',
        border: `1px solid ${Colors.BackgroundCatskillWhite}`,
        borderRadius: 8,
        '& div': {
            display: 'flex',
            alignItems: 'center',
        },
        '&:not(:last-child)': {
            marginBottom: 8
        },

    },
    roleItemName: {
        fontSize: 14,
        color: Colors.TextSecondary,
        fontWeight: 600,
        paddingLeft: 8
    },
    removeIcon: {
        cursor: 'pointer',
        border:'none',
        background:'none',
    }
}));
