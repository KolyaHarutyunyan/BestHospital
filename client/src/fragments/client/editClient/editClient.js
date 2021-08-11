import React, {useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./../createClient/styles";
import {ErrorText, languages} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";


export const EditClient = ({handleClose,index,id}) => {
    const data = useSelector(state=>state.client.clientList[index])
    console.log(data,'dataaaaa')
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        "firstName": data.firstName,
        "middleName": data.middleName,
        "lastName": data.lastName,
        "ethnicity": data.ethnicity,
        "code": data.code,
        'language': data.language,
        'familyLanguage': data.familyLanguage,
        'gender': data.gender,
        'birthday': data.birthday,
        // 'age' : inputs.age,
        });
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
        if (step === 'first') {
            if (inputs.firstName && inputs.lastName && inputs.code) {
                setStep('second')
            } else {
                setError(
                    !inputs.firstName ? 'firstName' :
                        !inputs.lastName ? 'lastName' :
                            !inputs.code ? 'code' :
                                'Input is not field'
                )
            }
        } else if (step === 'second') {
            if (inputs.gender && inputs.birthday && inputs.age && inputs.ethnicity && inputs.language && inputs.familyLanguage) {
                const newData = {
                    "firstName": inputs.firstName,
                    "middleName": inputs.middleName,
                    "lastName": inputs.lastName,
                    "ethnicity": inputs.ethnicity,
                    "code": inputs.code,
                    'language': inputs.language,
                    'familyLanguage': inputs.familyLanguage,
                    'gender': inputs.gender,
                    'birthday': inputs.birthday,
                    // 'age' : inputs.age,
                    "status": 1
                }
                dispatch(clientActions.editClient(newData,id ))
            } else {
                setError(
                    !inputs.gender ? 'gender' :
                        !inputs.birthday ? 'birthday' :
                            !inputs.age ? 'age' :
                                !inputs.language ? 'language' :
                                    !inputs.familyLanguage ? 'familyLanguage' :
                                        'Input is not field'
                )
            }
        }
    }

    const list = [
        {name: 'male'},
        {name: 'female'}
    ]


    console.log(inputs,'eeeeee')

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader steps={'second'} handleClose={handleClose} title={'Edit Client'}/>
            <div className={classes.createFoundingSourceBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {step === 'first' ? <div style={{width: 463}}>
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.firstName}
                            type={"text"}
                            label={"First Name*"}
                            name='firstName'
                            typeError={error === 'firstName' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.middleName}
                            type={"text"}
                            label={"Middle Name"}
                            name='middleName'
                            typeError={error === 'middleName' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.lastName}
                            type={"text"}
                            label={"Last Name*"}
                            name='lastName'
                            typeError={error === 'lastName' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.code}
                            type={"number"}
                            label={"Code*"}
                            name='code'
                            typeError={error === 'code' && ErrorText.field}
                        />

                    </div> : <div style={{width: 463}}>
                        <SelectInput
                            name={"gender"}
                            label={"Gender*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.gender}
                            list={list}
                            typeError={error === 'gender' ? ErrorText.field : ''}
                            // type={'id'}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.birthday}
                            type={"date"}
                            label={"Date of Birth*"}
                            name='birthday'
                            typeError={error === 'birthday' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.age}
                            type={"number"}
                            label={"Age*"}
                            name='age'
                            typeError={error === 'age' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.ethnicity}
                            type={"text"}
                            label={"Ethnicity"}
                            name='ethnicity'
                            typeError={error === 'ethnicity' && ErrorText.field}
                        />
                        <SelectInput
                            name={"language"}
                            label={"Language*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.language}
                            language={languages}
                            typeError={error === 'language' ? ErrorText.field : ''}
                        />
                        <SelectInput
                            name={"familyLanguage"}
                            label={"Family Language*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.familyLanguage}
                            language={languages}
                            typeError={error === 'familyLanguage' ? ErrorText.field : ''}
                        />
                    </div>}
                </div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>


                    <CreateChancel
                        create={step === 'first' ? 'Next' : "Add"}
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
