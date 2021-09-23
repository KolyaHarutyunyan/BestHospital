// // import {CardItem} from "@eachbase/components/card";
// // import {CardHeader} from "@eachbase/components/card";
// import {cardStyle} from "@eachbase/components/card";
//
// export const Card = ({cardInfo,color, title,icon, showHeader, width,hideHeaderLine}) => {
//
//     const classes = cardStyle()
//     return (
//         <div className={classes.card} style={width && {width: width, 'maxWidth' : 563} }>
//             {showHeader && <CardHeader hideHeaderLine={hideHeaderLine} color={color} title={title} icon={icon}/>}
//             <div className={classes.cardBody}>
//                 {
//                     cardInfo && cardInfo.map((item,index)=>{
//                         return (
//                             <CardItem
//                                 key={index}
//                                 title={item.title}
//                                 value={item.value}
//                                 width ={width}
//                             />
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }