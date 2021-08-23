import React, {useEffect, useState} from "react";
import {btnStyles, fundingSourceSingleStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal} from "@eachbase/components";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    FundingSourceGeneralEdit,
    FundingSourceNotesAdd,
    FundingSourceServiceAdd,
} from "./modals";
import {CreateFundingSource} from "../../createFundingSource";


export const FundingSourceSingleHeader = ({activeTab, title, info}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const classes = fundingSourceSingleStyles()

    useEffect(() => {
        if (activeTab === 1) {
            dispatch(fundingSourceActions.getFoundingSourceServiceById(params.id))
        } else if (activeTab === 2) {

        } else if (activeTab === 3) {
            dispatch(fundingSourceActions.getFundingSourceHistoriesById(params.id))
        }
    }, [activeTab])

    const handleOpenClose = () => {
        setOpen(!open)
    }
   const prevData = useSelector(state => state.fundingSource.fundingSourceItem)

    return (
        <div className={classes.fundingSourceSingleHeaderWrapStyles}>
            <div className={classes.fundingSourceSingleHeaderStyles}>
                <img src={Images.fundingSourceActive} className={classes.foundingIcon} alt="founding"/>
                <p className={classes.title}>{title && title}</p>
            </div>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={activeTab === 0 ?
                    <CreateFundingSource handleClose={handleOpenClose} info={prevData}/>

                    // <FundingSourceGeneralEdit handleClose={handleOpenClose}/>
                    : activeTab === 1 ?
                        <FundingSourceServiceAdd handleClose={handleOpenClose}/> :
                        activeTab === 2 ?
                            <FundingSourceNotesAdd handleClose={handleOpenClose}/> : null}/>
            {activeTab === 0 ?
                <AddModalButton handleClick={handleOpenClose} text='Edit' btnStyles={btnStyles}/>
                : activeTab >= 3 ?
                    <div className={classes.clear}/> :
                    <AddButton
                        text={activeTab === 1 ? 'Add Service' : activeTab === 2 ? 'Add Note' : ''}
                        handleClick={handleOpenClose}/>}
        </div>
    )
}