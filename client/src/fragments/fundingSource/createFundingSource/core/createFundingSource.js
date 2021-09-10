import {AddressInput, ValidationInput, SelectInput, CreateChancel, ModalHeader, Toast} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {createFoundingSourceStyle} from "./styles";
import {EmailValidator, ErrorText} from "@eachbase/utils";
import {fundingSourceActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions,} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";


export const CreateFundingSource = ({handleClose, info}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info,
        phoneNumber: info.phoneNumber ? info.phoneNumber.substring(1) : ''} : {});
    const [fullAddress, setFullAddress] = useState(info && info.address ? info.address.formattedAddress : null)
    const classes = createFoundingSourceStyle()
    const dispatch = useDispatch()

    const { httpOnSuccess, httpOnError,httpOnLoad } = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const errorText = httpOnError.length && httpOnError[0].error
    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_FUNDING_SOURCE'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_FUNDING_SOURCE'

    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
        e.target.name === 'email' &&  httpOnError.length  && dispatch(httpRequestsOnErrorsActions.removeError('EDIT_FUNDING_SOURCE'))
    );


    const handleCreate = () => {
        const data = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": `+${inputs.phoneNumber}`,
            'type': inputs.type,
            'contact': inputs.contact,
            'website': inputs.website,
            "address": fullAddress,
            "status": 1
        }
        if (inputs.name && inputs.email && inputs.phoneNumber && inputs.type && inputs.contact && inputs.website) {
            if(info){
                dispatch(fundingSourceActions.editFundingSource(info.id, data))

            }else {
                dispatch(fundingSourceActions.createFundingSource(data))
            }
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.email ? 'email' :
                        !inputs.phoneNumber ? 'phoneNumber' :
                            !inputs.type ? 'type' :
                                !inputs.contact ? 'contact' :
                                    !inputs.website ? 'website' :
                                        'Input is not field'
            )
        }
    }

    const list = [
        {name: 'first'},
        {name: 'second'}
    ]
    const handleFullAddress = (ev) => {
        setFullAddress(ev)
        // httpOnError.length && dispatch(httpRequestsOnErrorsActions.removeError('CREATE_OFFICE'))
        // if (error === 'address') setError('')
    }





useEffect(()=>{
    if (success){
         handleClose()
        dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_FUNDING_SOURCE'))
    }
    if (successCreate){
        handleClose()
        dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_FUNDING_SOURCE'))
    }
},[success,successCreate])





    return (
        <div className={classes.createFoundingSource}>






            <ModalHeader headerBottom={true} handleClose={handleClose} title={info ? 'Edit Funding Source' : 'Add Funding Source'}/>
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.createFoundingSourceBodyBlock}>
                    <div className={classes.createFoundingSourceBodyBox}>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.name}
                            type={"text"}
                            label={"Funding Source Name*"}
                            name='name'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            validator={EmailValidator}
                            variant={"outlined"}
                            name={"email"}
                            type={"email"}
                            label={"Email Address*"}
                            typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email ' : ''}
                            sendBoolean={handleCheck}
                            value={inputs.email}
                            onChange={handleChange}
                        />
                        <ValidationInput
                            Length={11}
                            onChange={handleChange}
                            value={inputs.phoneNumber}
                            variant={"outlined"}
                            type={"number"}
                            label={"Phone Number*"}
                            name={'phoneNumber'}
                            typeError={error === 'phoneNumber' ? ErrorText.field : errorText[0] === 'phoneNumber must be a valid phone number' ? 'phoneNumber must be a valid phone number' : ""}
                        />


                        <SelectInput
                            name={"type"}
                            label={"Type*"}
                            handleSelect={handleChange}
                            value={inputs.type}
                            list={list}
                            typeError={error === 'type' ? ErrorText.field : ''}
                        />
                        <ValidationInput
                            onChange={handleChange}
                            value={inputs.contact}
                            variant={"outlined"}
                            type={"text"}
                            label={"Contact Person"}
                            name={'contact'}
                            typeError={error === 'contract' && ErrorText.field}
                        />
                        <ValidationInput
                            onChange={handleChange}
                            value={inputs.website}
                            variant={"outlined"}
                            type={"text"}
                            label={"Website"}
                            name={'website'}
                            typeError={error === 'website' && ErrorText.field}
                        />

                    </div>
                    <div className={classes.createFoundingSourceBodyBox}>
                        <AddressInput
                            errorBoolean={error === 'address' ? 'Input is not field' : ''}
                            info={info && info.address ? info : ''}
                            handleSelectValue={handleFullAddress}
                            flex='block'
                        />
                    </div>
                </div>
                <div className={classes.createFoundingSourceBodyBlock}>
                    <CreateChancel
                        loader={ httpOnLoad.length > 0}
                        create={info? "Save" :  "Add"}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='400px'
                    />
                </div>
            </div>

        </div>
    );
};
