import {CardItem} from "./cardItem";
import {CardHeader} from "./cardHeader";
import {cardStyle} from "./style";

export const Card = ({cardInfo,color, title,icon, showHeader, width,hideHeaderLine , auth}) => {

    const classes = cardStyle()
    return (
        <div className={classes.card} style={width && {width: width, 'maxWidth' : 563} }>
            {showHeader && <CardHeader hideHeaderLine={hideHeaderLine} color={color} title={title} icon={icon}/>}
            <div className={classes.cardBody}>
                {
                    cardInfo && cardInfo.map((item,index)=>{
                        return (
                            <CardItem
                                auth ={auth}
                                key={index}
                                title={item.title}
                                value={item.value}
                                authId={item?.authId}
                                width ={width}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}