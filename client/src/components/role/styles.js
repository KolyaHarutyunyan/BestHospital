import {makeStyles} from "@material-ui/core/styles";
import {Colors} from '@eachbase/utils'
import {SelectInputWidthTags} from "../inputs";

export const roleStyles = makeStyles(() => ({
    roleWrapper: {
      width: '100%'
    },
    roleItemContainer: {
      marginTop: 32
    },
    roleItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.BackgroundCatskillWhite,
        borderRadius: 8,
        padding: '12px 16px',
        '& div': {
            display: 'flex',
            alignItems: 'center',
        },
        '&:not(:last-child)': {
            marginBottom: 8
        }
    },
    roleItemName: {
        fontSize: 14,
        color: Colors.TextSecondary,
        fontWeight: 600,
        paddingLeft: 8
    },
    removeIcon: {
        cursor: 'pointer',
    }
}));
