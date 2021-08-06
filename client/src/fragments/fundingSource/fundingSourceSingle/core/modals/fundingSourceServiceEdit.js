import {AddressInput, ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useState} from "react";
import {createFoundingSourceStyle} from "./styles";
import {EmailValidator, ErrorText} from "@eachbase/utils";
import {fundingSourceActions, officeActions} from "@eachbase/store";
import {useDispatch} from "react-redux";


export const FundingSourceServiceEdit = ({handleClose}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [fullAddress, setFullAddress] = useState(null)

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
            "phoneNumber": inputs.phone,
            'type': inputs.type,
            'contact': inputs.contact,
            'website': inputs.website,
            "address": fullAddress,
            "status": 1
        }
        if (inputs.name && inputs.email && inputs.phone && inputs.type && inputs.contact && inputs.website) {
            dispatch(fundingSourceActions.createFundingSource(data))
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.email ? 'email' :
                        !inputs.phone ? 'phone' :
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


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader handleClose={handleClose} title={'Edit Service'} headerBottom={true}/>
            <div className={classes.createFoundingSourceBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: 400}}>
                        <ValidationInput
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
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.phone}
                            variant={"outlined"}
                            type={"number"}
                            label={"Phone Number*"}
                            name={'phone'}
                            typeError={error === 'phone' && ErrorText.field}
                        />
                        <SelectInput
                            name={"type"}
                            label={"Type*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.type}
                            list={list}
                            typeError={error === 'type' ? ErrorText.field : ''}
                            // type={'id'}
                        />
                        <ValidationInput
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.contact}
                            variant={"outlined"}
                            type={"text"}
                            label={"Contact Person"}
                            name={'contact'}
                            typeError={error === 'contract' && ErrorText.field}
                        />
                        <ValidationInput
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
                    <div style={{width: 400}}>

                    </div>
                </div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>

                    <CreateChancel
                        // classes={globalInputs.buttonsStyle}
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
