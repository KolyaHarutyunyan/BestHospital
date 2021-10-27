import {scheduleStyle} from "./styles";


export const Items = ({text, subText}) =>{
    const classes = scheduleStyle()
    return(
        <div className={classes.infoItems}>
            <p>{text}</p>
            <span>{subText}</span>
        </div>
    )
}