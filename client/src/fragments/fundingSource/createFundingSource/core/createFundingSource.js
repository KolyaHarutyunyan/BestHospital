import {AddressInput, ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useState} from "react";
import {createFoundingSourceStyle, inputStyle} from "./styles";
import {EmailValidator, ErrorText} from "@eachbase/utils";
import {fundingSourceActions,} from "@eachbase/store";
import {useDispatch} from "react-redux";


export const CreateFundingSource = ({handleClose, info}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info} : {});
    const [fullAddress, setFullAddress] = useState(info && info.address ? info.address.formattedAddress : null)
    const classes = createFoundingSourceStyle()
    const dispatch = useDispatch()
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
    );


    const handleCreate = () => {
        const data = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": inputs.phoneNumber,
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

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader headerBottom={true} handleClose={handleClose} title={info ? 'Edit Funding Source' : 'Add Funding Source'}/>
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.createFoundingSourceBodyBlock}>
                    <div className={classes.createFoundingSourceBodyBox}>
                        <ValidationInput
                            styles={inputStyle}
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.name}
                            type={"text"}
                            label={"Funding Source Name*"}
                            name='name'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            styles={inputStyle}
                            validator={EmailValidator}
                            variant={"outlined"}
                            name={"email"}
                            type={"email"}
                            label={"Email Address*"}
                            typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                            sendBoolean={handleCheck}
                            value={inputs.email}
                            onChange={handleChange}
                        />
                        <ValidationInput
                            Length={11}
                            styles={inputStyle}
                            onChange={handleChange}
                            value={inputs.phoneNumber}
                            variant={"outlined"}
                            type={"number"}
                            label={"Phone Number*"}
                            name={'phoneNumber'}
                            typeError={error === 'phoneNumber' && ErrorText.field}
                        />
                        <SelectInput
                            styles={inputStyle}
                            name={"type"}
                            label={"Type*"}
                            handleSelect={handleChange}
                            value={inputs.type}
                            list={list}
                            typeError={error === 'type' ? ErrorText.field : ''}
                        />
                        <ValidationInput
                            styles={inputStyle}
                            onChange={handleChange}
                            value={inputs.contact}
                            variant={"outlined"}
                            type={"text"}
                            label={"Contact Person"}
                            name={'contact'}
                            typeError={error === 'contract' && ErrorText.field}
                        />
                        <ValidationInput
                            styles={inputStyle}
                            sendBoolean={handleCheck}
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
                            styles={inputStyle}
                            flex='block'
                        />
                    </div>
                </div>
                <div className={classes.createFoundingSourceBodyBlock}>
                    <CreateChancel
                        create={"Add"}
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
