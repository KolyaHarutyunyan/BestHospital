import React, {useEffect, useState} from "react";
import {editButtonStyle, serviceSingleStyles, inputStyle} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SelectInput, SimpleModal, AddNotes, ValidationInput} from "@eachbase/components";
import {
    AddContact,
    AddEnrollment,
    CreateClient,
    AddAuthorization,
    AddAuthorizationService
} from "@eachbase/fragments/client";
import {fundingSourceActions} from "@eachbase/store";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

const filterBtn = {
    width: 93,
    height: 36
}

export const TabsHeader = ({activeTab, data, authActive, status,handleOpen, setGetStatus ,setPrevStatus ,getStatus, type}) => {

    const classes = serviceSingleStyles()
    const [open, setOpen] = useState()
    const [inputs, setInputs] = useState(status);
    const params = useParams()


    useEffect(()=>{
        setInputs(getStatus)
    },[getStatus])

    useEffect(()=>{
        setInputs(status)
    },[])

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const dispatch = useDispatch()

    const [searchDate, setSearchDate] = useState('')

    const handleChangeDate = e => {
        setSearchDate(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Client', searchDate && new Date(searchDate).toISOString()))
    }

    const list = [
        {name: 'ACTIVE'},
        {name: 'INACTIVE'},
        {name: 'HOLD'},
        {name: 'TERMINATE'},
    ]


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
        <div>
            <ul className={classes.tabsWrapper}>
                <li style={{display:'flex',alignItems:'center'}}>
                    <img src={Images.userProfile} alt="avatar" className={classes.avatar}/>
                    <div className={classes.nameContent}>
                        <h1 className={classes.name}>{data ? `${data?.firstName} ${data?.lastName}` : ''}</h1>
                        {/*<div className={classes.tagContent}>*/}
                            {/*<p>Tag Name</p>*/}
                            {/*<p>Tag Name</p>*/}
                            {/*<p>Tag Name</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
                <li className={classes.headerRight}>
                    {activeTab !== 6 &&
                    <SelectInput
                        styles={inputStyle}
                        name={"active"}
                        handleSelect={handleChange}
                        value={inputs ? inputs : status}
                        list={list}
                        className={classes.inputTextField}
                    />
                    }
                    {
                        activeTab === 6 ? <>
                                <div className={classes.searchContainer}>
                                    <ValidationInput
                                        className={classes.dateInput}
                                        errorFalse={true}
                                        variant={"outlined"}
                                        onChange={(e) => handleChangeDate(e)}
                                        value={searchDate}
                                        type={"date"}
                                        name='searchDate'
                                        // typeError={error === 'birthday' && ErrorText.field}
                                    />
                                    <AddModalButton
                                        handleClick={handleSubmit} text='Search'
                                        btnStyles={filterBtn}
                                    />
                                </div>
                            </> :

                        activeTab === 0 ?
                            <AddModalButton btnStyles={editButtonStyle} handleClick={() => setOpen(true)}
                                            text='Edit'/> :
                            activeTab !== 6 && activeTab !== 4 ?
                                <AddButton text={
                                    authActive ? 'Add Authorization Service' :
                                        activeTab === 1 ?
                                            'Add Contact' :
                                            activeTab === 2 ?
                                                'Add Enrollments' :
                                                activeTab === 3 ?
                                                    'Add Authorization'
                                                    : 'Add Notes'
                                } handleClick={handleOpenClose} styles={{width: 450}}/> : null
                    }
                </li>
            </ul>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={authActive ? <AddAuthorizationService handleClose={handleOpenClose}/> :
                    activeTab === 0 ? <CreateClient info={data} handleClose={handleOpenClose}/> :
                        activeTab === 1 ?
                            <AddContact handleClose={handleOpenClose}/> :
                            activeTab === 2 ?
                                <AddEnrollment handleClose={handleOpenClose}/> :
                                activeTab === 3 ?
                                    <AddAuthorization handleClose={handleOpenClose}/> :
                                    activeTab === 4 ?
                                        null :
                                        activeTab === 5 ?
                                            <AddNotes model='Client' handleClose={handleOpenClose}/> :

                                            null
                }
            />
        </div>
    )
}