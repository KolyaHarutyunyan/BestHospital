import {cardStyle} from "./style";

export const CardItem = ({title,value}) =>{

    const classes = cardStyle()

    return (
        <div className={classes.cardItem}>
            <p>{title}</p>
            <p>{value}</p>
        </div>
    )
}