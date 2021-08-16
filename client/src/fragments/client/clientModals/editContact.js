import React, {useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader, AddressInput} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText, languages} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const EditContact = ({handleClose, contactId}) => {
    const data = useSelector(state=>state?.client?.clientContacts[contactId])
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        relationship : data?.relationship
    });
    const [step, setStep] = useState('first')
    const [fullAddress, setFullAddress] = useState(null)
    const classes = createClientStyle()
    const dispatch = useDispatch()
    const params = useParams()



    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );


    const handleCreate = () => {
        if (step === 'first') {
            if (inputs.firstName && inputs.lastName && inputs.phoneNumber && inputs.relationship) {
                setStep('second')
            } else {
                setError(
                    !inputs.firstName ? 'firstName' :
                        !inputs.lastName ? 'lastName' :
                            !inputs.phoneNumber ? 'phoneNumber' :
                                !inputs.relationship ? 'relationship' :
                                    'Input is not field'
                )
            }
        } else if (step === 'second') {
            if ('fullAddress') {
                const newData = {
                    "firstName": inputs.firstName,
                    "lastName": inputs.lastName,
                    "phoneNumber": inputs.phoneNumber,
                    "relationship": inputs.relationship,
                }
                dispatch(clientActions.editClientContact(newData, data.id))
            } else {
                setError(
                    !inputs.firstName ? 'firstName' :
                                        'Input is not field'
                )
            }


        }
    }


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader secondStepInfo={'Address'} steps={step} handleClose={handleClose} title={'Edit Contact'}/>
            <div className={classes.createFoundingSourceBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {step === 'first' ? <div style={{width: 463}}>
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.firstName}
                                type={"text"}
                                label={"First Name*"}
                                name='firstName'
                                typeError={error === 'firstName' && ErrorText.field}
                            />
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.lastName}
                                type={"text"}
                                label={"Last Name*"}
                                name='lastName'
                                typeError={error === 'lastName' && ErrorText.field}
                            />
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.phoneNumber}
                                type={"text"}
                                label={"Phone Number*"}
                                name='phoneNumber'
                                typeError={error === 'phoneNumber' && ErrorText.field}
                            />
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.relationship}
                                type={"text"}
                                label={"Relationship*"}
                                name='relationship'
                                typeError={error === 'relationship' && ErrorText.field}
                            />

                        </div> :
                        <div style={{width: 463}}>
                            <AddressInput flex={true} handleSelectValue={setFullAddress}/>
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
