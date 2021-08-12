import {HistoryCard} from "@eachbase/components/card";
import {useSelector} from "react-redux";


export const ClientHistory = ()=>{
    let data = useSelector(state => state.fundingSource.fundingSourceHistories)
    console.log(data,'datahistory')
    return(
        <div style={{marginTop: 50}}>
            {data && data.map((item,index)=>{
                return(
                    <HistoryCard data={item} />
                )
            })}
            {/*<HistoryCard />*/}
            {/*<HistoryCard />*/}
        </div>
    )
}