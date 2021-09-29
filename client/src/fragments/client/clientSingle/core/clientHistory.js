import {HistoryCard} from "@eachbase/components/card";
import {serviceSingleStyles} from "./styles";
import React from "react";

export const ClientHistory = ({info})=>{
    const classes = serviceSingleStyles()

    return(
        <div className={classes.clientHistory}>
            {info && info.map((item,index)=>{
                return(
                    <React.Fragment key={index}>
                        <HistoryCard data={item} />
                    </React.Fragment>
                )
            })}
        </div>
    )
}