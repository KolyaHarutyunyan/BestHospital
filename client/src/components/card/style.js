import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds, Colors, Shadow} from "@eachbase/utils";

export const cardStyle = makeStyles(() => ({
    card: {
        maxWidth: '511px',
        width: '100%',
        borderRadius: '8px',
        boxShadow: Shadow.changeShadow,
        padding: '18px 16px 32px 16px',
    },

    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '26px',
        position: 'relative',
    },
    cardIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::after': {
            content: `''`,
            position: 'absolute',
            left: '1px',
            top: '1px',
            width: '34px',
            height: '34px',
            backgroundColor: 'transparent',
            borderRadius: '50%',
            border: '1px solid white'
        }
    },
    cardTitle: {
        fontSize: '16px',
        color: Colors.TextSecondary,
        fontWeight: '600',
        lineHeight: '22px',
        paddingLeft: '18px'
    },
    topLine: {
        position: 'absolute',
        top: '-18px',
        width: '100%',
        height: '4px',
        borderRadius: '0 0 8px 8px',
    },
    cardItem: {
        width: '100%',
        height: '48px',
        background: Backgrounds.catskillWhite,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '16px',
        borderRadius: '8px',
        marginBottom: '8px',
        '& p:first-child': {
            fontSize: '14px',
            color: Colors.TextSecondary,
            fontWeight: '600',
            lineHeight: '36px'
        },
        '& p:last-child': {
            fontSize: '14px',
            color: Colors.TextMiddleGray,
            paddingLeft: '8px',
            lineHeight: '36px'
        },
    }
}));