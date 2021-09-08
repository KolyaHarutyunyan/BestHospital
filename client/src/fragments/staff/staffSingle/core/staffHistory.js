import {HistoryCard} from '@eachbase/components';

export const StaffHistory = ({data}) => {
    return(
        <div style={{marginTop: 50}}>
            {data && data.map((item,index)=>{
                return(
                    <HistoryCard key={index} data={item} />
                )
            })}
        </div>
    )
}