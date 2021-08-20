import {editButtonStyle, serviceSingleStyles,} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SelectInput, SimpleModal} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {EditClient, AddContact, AddEnrollment} from "@eachbase/fragments/client";
import {useDispatch,} from "react-redux";
import {clientActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const TabsHeader = ({activeTab, data}) => {

    const params = useParams()
    const classes = serviceSingleStyles()
    const [open, setOpen] = useState()
    const [inputs, setInputs] = useState({active: 'active'});
    const dispatch = useDispatch()

    useEffect(() => {
        if (activeTab === 1) {

        }
        switch (activeTab) {
            case 1 :
                dispatch(clientActions.getClientsContacts(params.id))
            case 2 :
                dispatch(clientActions.getClientsEnrollment(params.id))
        }
    }, [activeTab])


    const handleOpenClose = () => {
        setOpen(!open)
    }

    const list = [
        {name: 'Active'},
        {name: 'Inactive'},
        {name: 'On Hold'},
        {name: 'Terminated'},
    ]
    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
    );

    return (
        <div>
            <ul className={classes.tabsWrapper}>
                <li>
                    <img src={Images.userProfile} alt="avatar" className={classes.avatar}/>
                    <div className={classes.nameContent}>
                        <h1 className={classes.name}>{data ? `${data?.firstName} ${data?.lastName}` : ''}</h1>
                        <div className={classes.tagContent}>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                        </div>
                    </div>
                </li>
                <li className={classes.headerRight}>
                    {activeTab !== 6 &&
                    <SelectInput
                        name={"active"}
                        handleSelect={handleChange}
                        value={inputs.active}
                        list={list}
                        className={classes.select}

                    />}
                    {
                        activeTab === 0 ?
                            <AddModalButton btnStyles={editButtonStyle} handleClick={() => setOpen(true)} text='Edit'/> :
                            activeTab !== 6 && activeTab !== 4 ?
                                <AddButton text={activeTab === 1 ?
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
                content={activeTab === 0 ? <EditClient handleClose={handleOpenClose}/> :
                    activeTab === 1 ?
                        <AddContact handleClose={handleOpenClose}/> :
                        activeTab === 2 ?
                            <AddEnrollment handleClose={handleOpenClose}/> :
                            activeTab === 3 ?
                                <p>add Auth</p> :
                                activeTab === 4 ?
                                    <p>add availab</p> :
                                    activeTab === 5 ?
                                        <p>add notes</p> : null
                }
            />
        </div>
    )
}