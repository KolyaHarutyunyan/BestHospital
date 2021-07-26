import {wrapperStyle} from "./styles";


export const Management =({head,body})=>{
    const classes = wrapperStyle()
    return(
        <div className={classes.managementWrapper}>
            <div>{head}</div>
            <div>{body}</div>
        </div>
    )
}