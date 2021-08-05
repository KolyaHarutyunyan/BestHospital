import React, {useEffect} from "react";
import {fundingSourceSingleStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton} from "@eachbase/components";
import {fundingSourceActions} from "../../../../store";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getFoundingSourceServiceById} from "../../../../store/fundingSource/fundingSource.action";


export const FundingSourceSingleHeader = ({handleOpenClose, activeTab, title}) => {

    const dispatch = useDispatch()
    let params = useParams()
    useEffect(() => {
        if (activeTab === 1) {
            dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id))
        } else if (activeTab === 2) {

        } else if (activeTab === 3) {
            dispatch(fundingSourceActions.getFundingSourceHistoriesById(params.id))
        }
    }, [activeTab])


    const classes = fundingSourceSingleStyles()
    return (
        <div className={classes.fundingSourceSingleHeaderStyles} style={{marginBottom: 34}}>
            <div className={classes.fundingSourceSingleHeaderStyles}>
                <img src={Images.fundingSourceActive} className={classes.foundingIcon} alt="founding"/>
                <p className={classes.title}>{title && title}</p>
            </div>
            {activeTab === 0 ?
                <AddModalButton text='Edit' btnStyles={{height: 36, width: 74}}/>
                : activeTab >= 3 ?
                    <div style={{height: 36, width: 74}}/> :
                    <AddButton
                        text={activeTab === 1 ? 'Add Service' : activeTab === 2 ? 'Add Note' : ''}
                        handleClick={handleOpenClose}/>}
            {/*<AddButton/>*/}

        </div>
    )
}