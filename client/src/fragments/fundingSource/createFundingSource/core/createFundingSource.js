import { AddressInput, ValidationInput, SelectInput,  CreateChancel } from "@eachbase/components";
import React, { useState } from "react";
import {CreateFoundingSourceHeader, FoundingSourceHeader} from "./createFoundingSourceHeader";
import { createFoundingSourceStyle } from "./styles";
import { EmailValidator, ErrorText } from "@eachbase/utils";
// import SelectInput from "@material-ui/core/Select/SelectInput";

export const CreateFundingSource = ({ handleClose }) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});


    const classes = createFoundingSourceStyle()

    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };

    const handleChange = e => setInputs(
        prevState => ({ ...prevState, [e.target.name]: e.target.value }),
        error === e.target.name && setError(''),
    );


    const handleCreate = () => {
        // const data = {
        //     "name": inputs.name,
        //     "officeId": inputs.officeName,
        //     "email": inputs.email,
        //     "phoneNumber": phone,
        //     "establishedDate": new Date(inputs.date).getTime(),
        //     "address": fullAddress
        // }
        if (inputs.name && inputs.email && inputs.phone && inputs.type && inputs.contract && inputs.website) {
            // dispatch(fundingSourceActions.createFundingSource(data))
        }
        else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.email ? 'email' :
                        !inputs.phone ? 'phone' :
                        !inputs.type ? 'type' :
                        !inputs.contract ? 'contract' :
                        !inputs.website ? 'website' :
                            'Input is not field'

            )
        }
    }

    const list = [
        { name: 'first' },
        { name: 'second' }
    ]

    console.log(error, '9999999');
    return (
        <div className={classes.createFoundingSource}>
            <CreateFoundingSourceHeader handleClose={handleClose} title={'Add Funding Source'} />
            <div className={classes.createFoundingSourceBody}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: 400 }}>
                        <ValidationInput variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.name}
                            type={"text"}
                            label={"Funding Source Name*"}
                            name='name'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            // style={globalInputs.simpleInput}
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
                            // style={globalInputs.simpleInput}
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
                            value={inputs.contract}
                            variant={"outlined"}
                            type={"text"}
                            label={"Contact Person"}
                            name={'contract'}
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
                    <div style={{ width: 400 }}>
                        <AddressInput Value='Street Address*' flex='block' />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>

                    {/* <button onClick={handleCreate}>click</button> */}
                    {/* <button onClick={handleCreate}>click</button> */}
                    {/* <AddModalButton handleClick={handleCreate} text={'Add'} styles={{width: '400px'}} /> */}
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
