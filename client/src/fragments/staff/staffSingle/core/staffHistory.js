import {HistoryCard, NoItemText} from '@eachbase/components';
import {useSelector} from "react-redux";
import React from "react";
import {useGlobalStyles} from "@eachbase/utils";

export const StaffHistory = ({data}) => {
    const classes = useGlobalStyles()
    const {httpOnError} = useSelector((state) => ({
            httpOnError: state.httpOnError
        })
    )

    let errorMessage = httpOnError.length && httpOnError.filter(param => param.error === 'History with this id was not found')

    return (
        <div>
            {
                errorMessage ?
                    <NoItemText text='There is no history in this date'/>
                    :
                    <div className={classes.globalHistory}>
                        {data && data.map((item, index) => {
                            return (
                                <HistoryCard key={index} data={item}/>
                            )
                        })}
                    </div>
            }
        </div>
    )
}