import React, {useState, useEffect} from "react";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, RadioButton, ValidationInput} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "@eachbase/store";
import {useParams} from "react-router-dom";

const credentialList = [
    {name: 'type'},
    {name: 'type 1'},
    {name: 'type 2'},
    {name: 'type 3'},
]

const radioData = [
    {
        label: 'Non-Expiring',
        value: 'nonExpiring',
    },
    {
        label: 'Expiring',
        value: 'expiring'
    }
]


const editCredentialData = {
    credentialId: "610cf947776f5210843ccb54",
    expirationDate: new Date("09-05-2019").toISOString()
}

const checkboxStyle = {display: 'flex', alignItems: 'center', flexDirection: 'row'}

export const CredentialModal = ({credModalType, handleClose}) => {

    const params = useParams()

    const dispatch = useDispatch()

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    // const AddCredential = {
    //     staffId: params.id,
    //     credentialId: '611e47e3dd4a01497ff559dc',
    //     expirationDate: new Date('06-11-2021').toISOString()
    // }

    const [mType, setMType] = useState(credModalType)
    const [checkboxValue, setCheckboxValue] = useState('nonExpiring');

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});

    // const removeCredentialData = {
    //     id: params.id
    // }
    // const removeCredential = () => {
    //     dispatch(adminActions.deleteCredentialById(removeCredentialData))
    // }

    const change = (event) => {
        setCheckboxValue(event.target.value);
    };

    const title = (type) => {
        if (type === 'addCredential') {
            return 'Add a New Credential'
        } else if (type === 'editCredential') {
            return 'Edit Credential'
        }
        return 'HB (License)'
    }

    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };

    const handleSubmit = () => {
        const data = {
            staffId: params.id,
            credentialId: '611e47e3dd4a01497ff559dc',
            expirationDate:inputs.expirationDate ? new Date(inputs.expirationDate).toISOString() : ''
        }
        if (inputs.expirationDate) {
            switch (mType) {
                case 'addCredential':
                    dispatch(adminActions.createCredential(data))
                    handleClose()
                    break;
                case 'editCredential':
                    dispatch(adminActions.editCredentialById(editCredentialData, params.id))
                    handleClose()
                    break;
                case 'credentialPreview':
                    setMType('addCredential')
                    break;
                default:
                    handleClose()
            }

        } else {
            setError(
                !inputs.expirationDate ? 'expirationDate' : 'Input is not filled'
            )
        }


    }
    const handleChange = e => setInputs(
        prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ),
        error === e.target.name && setError(''),
    );
    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>{title(mType)}</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <p className={classes.inactiveModalInfo}> {mType === 'addCredential' && 'Please fulfill the below fields to add a credential.'}</p>

            {
                mType === 'credentialPreview' ? <SelectInput
                    style={classes.credentialInputStyle}
                    name={"type"}
                    placeholder={"Select Type*"}
                    list={credentialList}
                    value={inputs.type}
                    disabled={true}
                /> : <SelectInput
                    style={classes.credentialInputStyle}
                    name={"type"}
                    placeholder={"Select Type*"}
                    list={credentialList}
                    value={inputs.type}
                    handleSelect={handleChange}
                    sendBoolean={handleCheck}
                    typeError={error === 'issuingState' ? ErrorText.field : ''}
                />
            }

            <p className={classes.title}>Expiration</p>
            <div className={classes.checkboxWrapper}>
                <RadioButton styles={checkboxStyle} value={checkboxValue} onChange={change} radioData={radioData}/>
                {
                    checkboxValue !== 'nonExpiring' &&
                    <ValidationInput
                        style={classes.datePickerStyle}
                        variant={"outlined"}
                        value={inputs.expirationDate}
                        type={"date"}
                        label={"Expiration Date*"}
                        name='expirationDate'
                        sendBoolean={handleCheck}
                        onChange={handleChange}
                        typeError={error === 'birthday' && ErrorText.field}
                    />
                }
            </div>
            {
                mType === 'credentialPreview' ?
                    <AddModalButton text='Edit' handleClick={handleSubmit}/> :
                    <CreateChancel
                        buttonWidth='192px'
                        create={mType === 'addCredential' ? 'Add' : 'Save'}
                        chancel="Cancel"
                        onClose={handleClose}
                        onCreate={handleSubmit}
                    />
            }
        </div>
    );
}
