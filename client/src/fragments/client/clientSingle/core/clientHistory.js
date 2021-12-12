import {HistoryCard} from "@eachbase/components/card";
import React from "react";
import {useGlobalStyles} from "@eachbase/utils";

export const ClientHistory = ({info}) => {
    const classes = useGlobalStyles()

    return (
        <div>
            <div className={classes.globalHistory}>
                {info && info.map((item, index) => {
                    return (
                        <div key={index}>
                            <HistoryCard data={item}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}