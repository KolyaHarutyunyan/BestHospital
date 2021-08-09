import React, {useEffect, useState} from "react";
import {fundingSourceSingleStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal} from "@eachbase/components";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    FundingSourceGeneralEdit,
    FundingSourceNotesAdd,
    FundingSourceServiceAdd,
    FundingSourceServiceEdit
} from "./modals";


export const FundingSourceSingleHeader = ({activeTab, title}) => {
    const [open, setOpen] = useState(false)
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

    const handleOpenClose = () => {
        setOpen(!open)
    }


    return (
        <div className={classes.fundingSourceSingleHeaderStyles} style={{marginBottom: 34}}>

            <div className={classes.fundingSourceSingleHeaderStyles}>
                <img src={Images.fundingSourceActive} className={classes.foundingIcon} alt="founding"/>
                <p className={classes.title}>{title && title}</p>
            </div>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={ activeTab === 0 ?
                    <FundingSourceGeneralEdit handleClose={handleOpenClose} />
                    : activeTab===1 ?
                        <FundingSourceServiceAdd handleClose={handleOpenClose} /> :
                        activeTab===2 ?
                            <FundingSourceNotesAdd handleClose={handleOpenClose} /> : null }/>
            {activeTab === 0 ?
                <AddModalButton handleClick={handleOpenClose} text='Edit' btnStyles={{height: 36, width: 74}}/>
                : activeTab >= 3 ?
                    <div style={{height: 36, width: 74}}/> :
                    <AddButton
                        text={activeTab === 1 ? 'Add Service' : activeTab === 2 ? 'Add Note' : ''}
                        handleClick={handleOpenClose}/>}
        </div>
    )
}