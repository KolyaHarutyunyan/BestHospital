import {CardItem} from "./cardItem";
import {CardHeader} from "./cardHeader";
import {cardStyle} from "./style";

export const Card = ({cardInfo,color, title,icon}) => {

    const classes = cardStyle()

    return (
        <div className={classes.card}>
            <CardHeader color={color} title={title} icon={icon} />
            {
                cardInfo && cardInfo.map((generalInfoItem,index)=>{
                    return (
                        <CardItem
                            key={index}
                            title={generalInfoItem.title}
                            value={generalInfoItem.value}
                        />
                    )
                })
            }

        </div>
    )
}