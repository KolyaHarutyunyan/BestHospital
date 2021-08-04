import {CardItem} from "./cardItem";
import {CardHeader} from "./cardHeader";
import {cardStyle} from "./style";

export const Card = ({cardInfo,color, title,icon, showHeader, width}) => {

    const classes = cardStyle()
    console.log(cardInfo,'zzzzzzzzzz')
    return (
        <div className={classes.card} style={width && {width: width, 'max-width' : 563} }>
            {showHeader && <CardHeader color={color} title={title} icon={icon}/>}
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
    )
}