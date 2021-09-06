import React, {useState, useEffect} from "react";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, RadioButton, ValidationInput, SelectInputPlaceholder} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import moment from "moment";

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


// const editCredentialData = {
//     credentialId: "610cf947776f5210843ccb54",
//     expirationDate: new Date("09-05-2019").toISOString()
// }

const checkboxStyle = {display: 'flex', alignItems: 'center', flexDirection: 'row'}

export const CredentialModal = ({globalCredentialInformation, globalCredentials, credModalType, handleClose}) => {
    const dispatch = useDispatch()
    const params = useParams()

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    const [mType, setMType] = useState(credModalType)
    const [checkboxValue, setCheckboxValue] = useState('nonExpiring');

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(globalCredentialInformation ? globalCredentialInformation : {});

    const [globalCredId, setGlobalCredId] = useState('')

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

    const getGlobalCredentialID = (name) => {
        for (let i = 0; i < globalCredentials.length; i++) {
            if (globalCredentials[i].name === name) {
                return globalCredentials[i]._id
            }
        }
    }

    useEffect(() => {
        setGlobalCredId(getGlobalCredentialID(inputs.type))
    }, [inputs.type])

    const handleSubmit = () => {
        let data, editData

        data = {
            staffId: params.id,
            credentialId: globalCredId,
            expirationDate: inputs.expirationDate ? new Date(inputs.expirationDate).toISOString() : null
        }
        editData = {
            credentialId: globalCredId ? globalCredId : globalCredentialInformation?.credId,
            expirationDate: (inputs.expirationDate && checkboxValue === 'expiring') ? new Date(inputs.expirationDate).toISOString() : null
        }

        switch (mType) {
            case 'addCredential':
                dispatch(adminActions.createCredential(data))
                handleClose()
                break;
            case 'editCredential':
                dispatch(adminActions.editCredentialById(editData, globalCredentialInformation?.id))
                handleClose()
                break;
            case 'credentialPreview':
                setMType('editCredential')
                break;
            default:
                handleClose()
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
            <p className={classes.inactiveModalInfo}> {mType === 'addCredential' && 'Please fulfill the below fields to add a system.'}</p>

            {
                mType === 'credentialPreview' ? <SelectInput
                    style={classes.credentialInputStyle}
                    name={"type"}
                    placeholder={"Select Type*"}
                    list={globalCredentials}
                    value={inputs.type}
                    disabled={true}
                /> : <SelectInput
                    style={classes.credentialInputStyle}
                    name={"type"}
                    placeholder={"Select Credential*"}
                    list={globalCredentials}
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
                        value={inputs.expirationDate && moment(inputs.expirationDate).format().substring(0, 10)}
                        type={"date"}
                        // label={"Expiration Date*"}
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
