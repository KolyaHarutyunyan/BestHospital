import {cardStyle} from "./style";
import Box from "@material-ui/core/Box";


export const CardItem = ({title, value, auth, authId, click, index, active,employment}) => {
    const classes = cardStyle()

    return (
        <>
            {
                auth ?
                    <Box onClick={()=>click(index)} className={classes.cardItem} style={active === index ? {background : "#347AF0",cursor: 'pointer'} : {cursor: 'pointer'}}>
                        <p style={active === index ? {color : "white"} : {}}> { employment ? title : `#${authId}` } </p>
                    </Box>
                    :
                    <Box className={classes.cardItem}>
                        <span>{title}:</span>
                        <span>{value}</span>
                    </Box>
            }
        </>
    )
}