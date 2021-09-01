import {HistoryCard} from "@eachbase/components/card";
import {useSelector} from "react-redux";


export const FundingSourceSingleHistories = ({data})=>{


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