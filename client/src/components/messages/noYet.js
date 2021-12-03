import {errMessageStyle} from "./styles";

export const NoYet =({text, position})=>{
    const classes = errMessageStyle();
    return(
        <div className={position === 'center' ? classes.notYetCenter: '' }>
          <p className={classes.notYetText}>{text}</p>
        </div>
    )
}