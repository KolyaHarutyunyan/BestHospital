import React, {useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch} from "react-redux";


export const CreateClient = ({handleClose}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [step, setStep] = useState('first')

    const classes = createClientStyle()
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
        setStep('second')
        const data = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": inputs.phone,
            'type': inputs.type,
            'contact': inputs.contact,
            'website': inputs.website,
            "status": 1
        }
        if (inputs.name && inputs.email && inputs.phone && inputs.type && inputs.contact && inputs.website) {
            // dispatch(fundingSourceActions.createFundingSource(data))
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
            <ModalHeader steps={step}  handleClose={handleClose} title={'Add Client'}/>
            <div className={classes.createFoundingSourceBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {step === 'first' ? <div style={{width: 463}}>
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.name}
                            type={"text"}
                            label={"First Name*"}
                            name='name'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.email}
                            type={"text"}
                            label={"Middle Name"}
                            name='mid'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.type}
                            type={"text"}
                            label={"Last Name*"}
                            name='last'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.website}
                            type={"text"}
                            label={"Code*"}
                            name='codde'
                            typeError={error === 'name' && ErrorText.field}
                        />

                    </div> : <div style={{width: 463}}>
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
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.email}
                            type={"date"}
                            label={"Date of Birth*"}
                            name='mid'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.type}
                            type={"number"}
                            label={"Age*"}
                            name='last'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.website}
                            type={"text"}
                            label={"Ethnicity"}
                            name='codde'
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <SelectInput
                            name={"type"}
                            label={"Language*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.type}
                            list={list}
                            typeError={error === 'type' ? ErrorText.field : ''}
                            // type={'id'}
                        />
                        <SelectInput
                            name={"type"}
                            label={"Family Language*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.type}
                            list={list}
                            typeError={error === 'type' ? ErrorText.field : ''}
                            // type={'id'}
                        />
                    </div>}
                </div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>


                    <CreateChancel
                        // classes={globalInputs.buttonsStyle}
                        create={"Add"}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='224px'
                    />
                </div>
            </div>

        </div>
    );
};
