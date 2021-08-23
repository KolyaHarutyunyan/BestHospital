import React, { useState } from "react";
import {
    AddModalButton,
    CheckboxesTags,
    CloseButton,
    ValidationInput
} from "@eachbase/components";

import {EmailValidator, ErrorText, globalModals, useGlobalStyles, useGlobalTextStyles} from '@eachbase/utils'
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "@eachbase/store";

export const AddManagerModal =({handleClose, permissionsList})=>{
    // const classes = managementFragments();
    const globalModalsClasses = globalModals();
    const globalText = useGlobalTextStyles();
    const globalInputs = useGlobalStyles()
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('')
    const [phone, setPhone] = useState('')

    const dispatch = useDispatch()


    const addManager =()=>{

        // const permissionsList = []
        // for(let i of permissions){
        //     permissionsList.push(i.id)
        // }
        //
        // if(roleName && permissions) {
        //     const body ={
        //         "title": roleName,
        //         "description": description,
        //         "permissions": permissionsList,
        //     }
        //     dispatch(roleActions.createRole(body))
        //     handleClose()
        // }
        // else if(!roleName){
        //     setError('role')
        // }
        // else if(!permissions){
        //     setError('permissions')
        // }
        // else if(!description){
        //     setError('description')
        // }
    }

    // const handleChange =(ev) =>{
    //     setRoleName(ev)
    //     if(error === 'role') setError('')
    // }


    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
        // e.target.name === 'firstName' && handleChangeFirstName(e.target.value),
        // e.target.name === 'lastName' && handleChangeLastName(e.target.value),
    );

    const handleChangePhone = (ev) => {
        if (ev.target.value.length <= 11) {
            setPhone(ev.target.value)
            error === 'phone' && setError('')
        }
    }

    return(
        <div className={globalModalsClasses.smallModalWrapper}>
            <div className={globalModalsClasses.smallModalClose}>
                <CloseButton handleCLic={handleClose}/>
            </div>

            <div className={globalModalsClasses.modalWrapperContent}>
                <p className={globalText.modalTitle}>Want to Add Office Manager?</p>
                <p className={globalText.modalText}>Please fulfill the below fields to add an Office Manager.</p>

                <ValidationInput
                    onChange={handleChange}
                    typeError={error === 'role'}
                    // style={classes.input}
                    variant={"outlined"}
                    name={"name"}
                    label={"Full Name*"}
                    type={"text"}
                />
                <ValidationInput
                    validator={EmailValidator}
                    variant={"outlined"}
                    name={"email"}
                    type={"email"}
                    label={"Email Address*"}
                    typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                    sendBoolean={(bool) => bool === true ? setError("Not valid email") : setError('')}
                    onChange={handleChange}
                    value={inputs.email}
                />

                <ValidationInput
                    onChange={handleChange}
                    typeError={error === 'role'}
                    // style={classes.input}
                    variant={"outlined"}
                    name={"name"}
                    label={"Full Name*"}
                    type={"text"}
                />


                <ValidationInput
                    variant={"outlined"}
                    name={"phone"}
                    label={"Phone Number*"}
                    type={'number'}
                    typeError={ error === 'phone' ? ErrorText.field : ''}
                    onChange={ handleChangePhone }
                    value={ phone }
                />


                <AddModalButton styles={{marginTop:'16px'}} handleClick={addManager} text={'Add'} />

            </div>

        </div>
    )
}