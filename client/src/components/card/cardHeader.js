import {cardStyle} from "./style";

export const CardHeader = ({color, title, icon,hideHeaderLine}) => {

    const classes = cardStyle()

    return (
        <div className={classes.cardHeader}>
            <div className={classes.cardIcon} style={{backgroundColor: color ? color : 'gray'}}>
                <img src={icon} alt="g"/>
            </div>
            <p className={classes.cardTitle}>{title}</p>
            {hideHeaderLine && <p className={classes.topLine} style={{backgroundColor: color ? color : 'gray'}}/>}
        </div>
    )
}