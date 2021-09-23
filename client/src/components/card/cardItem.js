import {cardStyle} from "./style";

export const CardItem = ({title, value, auth, authId}) => {

    const classes = cardStyle()


    return (
        <>
            {
                auth ? <div className={classes.cardItem} style={{cursor: 'pointer'}}>
                        <p>#{authId}</p>
                    </div>
                    : <div className={classes.cardItem}>
                        <p>{title}:</p>
                        <p>{value}</p>
                    </div>
            }
        </>
    )
}