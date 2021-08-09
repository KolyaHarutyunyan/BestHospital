import {CardItem} from "./cardItem";
import {CardHeader} from "./cardHeader";
import {cardStyle} from "./style";

export const Card = ({cardInfo,color, title,icon, showHeader, width}) => {

    const classes = cardStyle()
    return (
        <div className={classes.card} style={width && {width: width, 'maxWidth' : 563} }>
            {showHeader && <CardHeader color={color} title={title} icon={icon}/>}
            <div className={classes.cardBody}>
                {
                    cardInfo && cardInfo.map((item,index)=>{
                        return (
                            <CardItem
                                key={index}
                                title={item.title}
                                value={item.value}
                                width ={width}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}