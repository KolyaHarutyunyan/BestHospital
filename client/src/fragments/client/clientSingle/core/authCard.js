import {cardStyle} from "@eachbase/components/card";


export const AuthCard = ({title}) =>{

    const classes = cardStyle

    return (
        <div className={classes.cardItemAuth} >
            <p>{title}</p>
        </div>
    )
}