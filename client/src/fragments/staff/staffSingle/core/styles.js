import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";

export const serviceSingleStyles = makeStyles(() => ({
    // General
    staffGeneralWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    // Access
    staffAccessWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    roleInformation: {
        width: '50%',
        flex: '0 0 50%',
        marginLeft: 24,
        border: `1px solid ${Colors.TextCadetBlue}`,
        borderRadius: 8,
        padding: 26
    },
    cardIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: Colors.ThemeMangoOrange,
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

    roleHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    roleTitle: {
        fontSize: 24,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        lineHeight: '25px',
        paddingLeft: 16
    },
    roleSubtitle: {
        fontSize: 16,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        margin: '25px 0 16px',
        lineHeight: '25px'
    },
    roleText: {
        fontSize: 14,
        color: Colors.TextMiddleGray,
        lineHeight: '16px'
    },
    rolePermissionContainer: {
        display: 'flex',
        alignItems: 'center',
        '&:not(:last-child)':{
            marginBottom: 8
        }
    },
    rolePermissionName:{
        fontSize: 14,
        color: Colors.TextMiddleGray,
        lineHeight: '21px',
        paddingLeft: 8
    },
    // header
    tabsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 36,
        '& li:first-child': {
            display: 'flex',
        }
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        position: 'relative',
        border: `1px solid ${Colors.BackgroundBlue}`,
        objectFit: 'cover',
        padding: 3
    },
    nameContent: {
        marginLeft: 19
    },
    name: {
        fontSize: 18,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        lineHeight: '25px',
        marginBottom: 8
    },
    tagContent: {
        display: 'flex',
        alignItems: 'center',
        '& p': {
            fontSize: 12,
            color: Colors.TextSecondary,
            fontWeight: 600,
            backgroundColor: Colors.BackgroundWater,
            padding: '0 16px',
            lineHeight: '25px',
            borderRadius: 13,
        },
        '& p:not(:last-child)': {
            marginRight: 8
        }
    }
}));