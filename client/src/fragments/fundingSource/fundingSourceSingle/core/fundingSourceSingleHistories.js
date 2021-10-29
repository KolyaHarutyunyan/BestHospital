import {HistoryCard} from "@eachbase/components/card";
import {useSelector} from "react-redux";
import {NoItemText} from "../../../../components";
import React from "react";


export const FundingSourceSingleHistories = ({data}) => {

    const {httpOnError} = useSelector((state) => ({
            httpOnError: state.httpOnError
        })
    )

    let errorMessage = httpOnError.length && httpOnError.filter(param => param.error === 'History with this id was not found')

    return (
        <div style={{marginTop: 50}}>
            {
                errorMessage ? <NoItemText text='There is no history in this date'/> : data && data.map((item,index)=>{
                    return(
                        <HistoryCard key={index} data={item} />
                    )
                })
            }
        </div>
    )
}