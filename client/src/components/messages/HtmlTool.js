import { Tooltip, withStyles } from '@material-ui/core';
import { Colors } from "@eachbase/utils";

export const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        maxWidth: 396,
        background: Colors.TextSecondary,
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '6px',
        fontSize: '14px',
        color:Colors.TextWhite,
        padding:'6px 16px',
    },
}))(Tooltip);
