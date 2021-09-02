import React, {useState} from "react";
import {ValidationInput, CreateChancel, ModalHeader, AddressInput} from "@eachbase/components";
import {createClientStyle} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch,} from "react-redux";
import {clientActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const AddContact = ({handleClose, info}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, phoneNumber : info.phoneNumber ? info.phoneNumber.substring(1) : '' } : {});
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
                const data = {
                    "firstName": inputs.firstName,
                    "lastName": inputs.lastName,
                    "phoneNumber": `+${inputs.phoneNumber}`,
                    "relationship": inputs.relationship,
                    address : fullAddress
                }
              if (!info){
                   dispatch(clientActions.createClientContact(data, params.id))
                   handleClose()
              }else if (info) {
                  dispatch(clientActions.editClientContact(data, info.id, params.id))
                  handleClose()
              }
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


    console.log( inputs.phoneNumber,'phone')

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader secondStepInfo={'Address'} setStep={setStep} steps={step} handleClose={handleClose} title={info ? 'Edit Contact' : 'Add Contact'}/>
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock} >
                    {step === 'first' ? <div className={classes.clientModalBox}>
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
                                type={"number"}
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
                        <div className={classes.clientModalBox}>
                            <AddressInput
                                flex={true}
                                handleSelectValue={setFullAddress}
                                info={info && info.address ? info : ''}
                            />
                        </div>}
                </div>
                <div className={classes.clientModalBlock} >
                    <CreateChancel
                        create={step === 'first' ? 'Next' : info ? 'Save' : "Add"}
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
