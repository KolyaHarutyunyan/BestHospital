import {cardStyle} from "./style";


export const CardItem = ({title, value, auth, authId, click, index, active,employment}) => {
    const classes = cardStyle()

    return (
        <>
            {
                auth ? <div onClick={()=>click(index)} className={classes.cardItem} style={active === index ? {background : "#347AF0",cursor: 'pointer'} : {cursor: 'pointer'}}>
                        <p style={active === index ? {color : "white"} : {}}> {employment ? title : `#${authId}` } </p>
                    </div>
                    : <div className={classes.cardItem}>
                        <p>{title}:</p>
                        <p>{value}</p>
                    </div>
            }
        </>
    )
}