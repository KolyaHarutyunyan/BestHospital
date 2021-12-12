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
    cardBody: {
        maxHeight: 404,
        overflowY: 'scroll',
        overflow: 'hidden',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
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
        '& span:first-child': {
            fontSize: '14px',
            color: Colors.TextSecondary,
            fontWeight: '600',
            lineHeight: '36px',
            maxWidth: '50%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        '& span:last-child': {
            fontSize: '14px',
            color: Colors.TextMiddleGray,
            paddingLeft: '8px',
            lineHeight: '36px',
            maxWidth: '50%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

        },
    },
    historyCardStyle: {
        width: '100%',
        padding: '16px',
        background: '#F2F4F8',
        marginBottom: 16,
        borderRadius: 8
    },
    historyCardDateStyle: {
        color: Colors.ThemeBlue,
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 16
    },
    historyCardBoxStyle: {
        width: '100%',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 0px 6px #347AF033',
        borderRadius: 8,
        padding: '16px 32px',
        display: "flex",
        alignItems: 'center',
        marginTop: 8,
        fontSize: 14,
        color: Colors.TextPrimary
    },
    historyCardBoxTimeStyle: {
        minWidth: 200
    },

}));