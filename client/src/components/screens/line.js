import {screensStyle} from "./styles";

export const Line =({ height }) =>{

    const classes = screensStyle()
    return(
        <div style={{height:height}} className={classes.lineStyle}/>
    )
}