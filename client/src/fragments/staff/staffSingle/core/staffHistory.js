import {HistoryCard, NoItemText} from '@eachbase/components';
import {useSelector} from "react-redux";
import React from "react";

export const StaffHistory = ({data}) => {

    const {httpOnError} = useSelector((state) => ({
            httpOnError: state.httpOnError
        })
    )

    let errorMessage = httpOnError.length && httpOnError.filter(param => param.error === 'History with this id was not found')

    return(
        <div style={{marginTop: 50}}>
            {
                errorMessage ?<NoItemText text='There is no history in this date'/>  : data && data.map((item,index)=>{
                    return(
                        <HistoryCard key={index} data={item} />
                    )
                })
            }
        </div>
    )
}