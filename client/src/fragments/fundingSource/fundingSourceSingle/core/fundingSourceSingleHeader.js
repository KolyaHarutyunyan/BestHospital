import React, {useEffect, useState} from "react";
import {btnStyles, fundingSourceSingleStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal,AddNotes} from "@eachbase/components";

import {useDispatch, useSelector} from "react-redux";
import {FundingSourceNotesAdd, FundingSourceServiceAdd,} from "./modals";
import {CreateFundingSource} from "../../createFundingSource";
import {httpRequestsOnSuccessActions} from "@eachbase/store";


export const FundingSourceSingleHeader = ({activeTab, title, info}) => {
    const [open, setOpen] = useState(false)
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const dispatch = useDispatch()
    const handleOpenClose = () => {
        setOpen(!open)
    }


    const successServ = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_FUNDING_SOURCE_SERVICE_BY_ID'

    useEffect(() => {
        if (successServ) {
            setOpen(false)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_FUNDING_SOURCE_SERVICE_BY_ID'))
        }

    }, [successServ])

    const classes = fundingSourceSingleStyles()
    useEffect(() => {
        if (activeTab === 1) {

        } else if (activeTab === 2) {

        } else if (activeTab === 3) {

        }
    }, [activeTab])


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
                    : activeTab === 1 ?
                        <FundingSourceServiceAdd handleClose={handleOpenClose}/> :
                        activeTab === 2 ?
                            <AddNotes model='Funder'  handleClose={handleOpenClose}/> : null}/>
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