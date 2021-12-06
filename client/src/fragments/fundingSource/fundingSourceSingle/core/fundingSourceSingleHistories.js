import {HistoryCard} from "@eachbase/components/card";
import {useSelector} from "react-redux";
import {Loader, NoItemText} from "@eachbase/components";
import React from "react";
import {FindLoad, useGlobalStyles} from "@eachbase/utils";

export const FundingSourceSingleHistories = ({data}) => {
    const classes = useGlobalStyles()
    const {httpOnError, httpOnLoad} = useSelector((state) => ({
            httpOnError: state.httpOnError,
            httpOnLoad: state.httpOnLoad
        })
    )
    const loader = FindLoad('GET_FUNDING_SOURCE_HISTORIES_BY_ID')
    let errorMessage = httpOnError.length && httpOnError.filter(param => param.error === 'History with this id was not found')

    return (
        <div>
            {
                errorMessage ?
                    <NoItemText text='There is no history in this date'/> :
                    httpOnLoad && loader.length ?
                        <Loader/>
                        :
                        <div className={classes.globalHistory}>
                            {data && data.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <HistoryCard data={item}/>
                                    </div>
                                )
                            })}
                        </div>
            }
        </div>
    )
}