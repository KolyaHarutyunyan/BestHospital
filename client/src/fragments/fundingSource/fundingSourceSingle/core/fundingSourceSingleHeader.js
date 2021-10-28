import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fundingSourceSingleStyles, editButtonStyle} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal, AddNotes, ValidationInput, SelectInput} from "@eachbase/components";
import {FundingSourceServiceAdd} from "./modals";
import {CreateFundingSource} from "../../createFundingSource";
import {fundingSourceActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {inputStyle} from "../../../client/clientSingle/core/styles";
import {useParams} from "react-router-dom";

export const FundingSourceSingleHeader = ({activeTab, title, status,handleOpen, setGetStatus ,setPrevStatus ,getStatus, type}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const prevData = useSelector(state => state.fundingSource.fundingSourceItem)
    const classes = fundingSourceSingleStyles()
    const [inputs, setInputs] = useState(status);
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    useEffect(()=>{
        setInputs(getStatus)
    },[getStatus])

    useEffect(()=>{
        setInputs(status)
    },[])




    const params = useParams()

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const [searchDate, setSearchDate] = useState('')

    const handleChangeFile = e => {
        setSearchDate(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Funder', searchDate && new Date(searchDate).toISOString()))
    }

    const successServ = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_FUNDING_SOURCE_SERVICE_BY_ID'

    const list = [
        {name: 'ACTIVE'},
        {name: 'INACTIVE'},
        {name: 'HOLD'},
        {name: 'TERMINATE'},
    ]

    useEffect(() => {
        if (successServ) {
            setOpen(false)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_FUNDING_SOURCE_SERVICE_BY_ID'))
        }

    }, [successServ])

    const handleChange = e => {
        setPrevStatus(inputs)
        setGetStatus(e.target.value)
       if (e.target.value === 'INACTIVE' || e.target.value === 'HOLD' || e.target.value === 'TERMINATE'){
           handleOpen()
       }if (e.target.value === 'ACTIVE') {
           dispatch(fundingSourceActions.setStatus(params.id,'funding', e.target.value, type ))
       }

        setInputs(e.target.value)
    };


    return (
        <div className={classes.fundingSourceSingleHeaderWrapStyles}>
            <div className={classes.fundingSourceSingleHeaderStyles}>
                <img src={Images.fundingSourceActive} className={classes.foundingIcon} alt="founding"/>
                <p className={classes.title}>{title && title}</p>
            </div>
            <div style={{display: 'flex'}}>
                <SelectInput
                    styles={inputStyle}
                    name={"active"}
                    handleSelect={handleChange}
                    value={inputs}
                    list={list}
                    className={classes.inputTextField}
                />
                <SimpleModal
                    openDefault={open}
                    handleOpenClose={handleOpenClose}
                    content={activeTab === 0 ?
                        <CreateFundingSource handleClose={handleOpenClose} info={prevData}/>
                        : activeTab === 1 ?
                            <FundingSourceServiceAdd handleClose={handleOpenClose}/> :
                            activeTab === 2 ?
                                <AddNotes model='Funder' handleClose={handleOpenClose}/> : null}/>

                {activeTab === 0 ?
                    <AddModalButton styles={{width: 450}} handleClick={handleOpenClose} text='Edit'
                                    btnStyles={editButtonStyle}/> :
                    activeTab === 3 ?
                        <>
                            <div className={classes.searchContainer}>
                                <ValidationInput
                                    errorFalse={true}
                                    variant={"outlined"}
                                    onChange={(e) => handleChangeFile(e)}
                                    value={searchDate}
                                    type={"date"}
                                    name='searchDate'
                                />
                                <AddButton text='Search' handleClick={handleSubmit}/>
                            </div>
                        </>
                        : activeTab >= 3 ?
                        <div className={classes.clear}/> :
                        <AddButton
                            styles={{width: 450}}
                            text={activeTab === 1 ? 'Add Service' : activeTab === 2 ? 'Add Note' : ''}
                            handleClick={handleOpenClose}/>}
            </div>
        </div>
    )
}