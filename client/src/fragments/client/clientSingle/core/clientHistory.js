import {HistoryCard} from "@eachbase/components/card";
import {serviceSingleStyles} from "./styles";



export const ClientHistory = ({info})=>{
    const classes = serviceSingleStyles()

    return(
        <div className={classes.clientHistory}>
            {info && info.map((item,index)=>{
                return(
                    <HistoryCard data={item} />
                )
            })}

        </div>
    )
}