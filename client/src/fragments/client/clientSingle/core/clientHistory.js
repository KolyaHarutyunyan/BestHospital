import {HistoryCard} from "@eachbase/components/card";
import {serviceSingleStyles} from "./styles";



export const ClientHistory = ()=>{
    const classes = serviceSingleStyles()
    let data = []
    return(
        <div className={classes.clientHistory}>
            {data && data.map((item,index)=>{
                return(
                    <HistoryCard data={item} />
                )
            })}

        </div>
    )
}