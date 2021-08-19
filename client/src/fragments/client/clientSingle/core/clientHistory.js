import {HistoryCard} from "@eachbase/components/card";
import {useSelector} from "react-redux";


export const ClientHistory = ()=>{

    let data = []
    return(
        <div style={{marginTop: 50}}>
            {data && data.map((item,index)=>{
                return(
                    <HistoryCard data={item} />
                )
            })}

        </div>
    )
}