import React from "react";
import {fundingSourceSingleStyles} from "./styles";
import { Images } from "@eachbase/utils";
import {AddModalButton} from "../../../../components";

export const FundingSourceSingleHeader = ({handleOpenClose,activeTab, title}) => {

let a = ()=>{
    alert(activeTab+'tab')
}

    const classes = fundingSourceSingleStyles()
    return (
            <div className={classes.fundingSourceSingleHeaderStyles} style={{marginBottom:34}}>
                <div className={classes.fundingSourceSingleHeaderStyles}>
                    <img src={Images.fundingSourceActive} className={classes.foundingIcon} alt="founding"/>
                    <p className={classes.title}>{title && title}</p>
                </div>
                <AddModalButton text='Edit' handleClick={a} />
            </div>
    )
}