import React, {useState, useEffect} from "react";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, RadioButton, ValidationInput, SelectInputPlaceholder} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "@eachbase/store";
import {useParams} from "react-router-dom";

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

export const CredentialModal = ({globalCredentialId, globalCredentials, credModalType, handleClose}) => {
    const dispatch = useDispatch()
    const params = useParams()

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    const [mType, setMType] = useState(credModalType)
    const [checkboxValue, setCheckboxValue] = useState('nonExpiring');

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});

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
        let data,editData
        if (inputs.expirationDate){
            data = {
                staffId: params.id,
                credentialId: globalCredId,
                expirationDate: new Date(inputs.expirationDate).toISOString()
            }
            editData = {
                credentialId: globalCredentialId,
                expirationDate: new Date(inputs.expirationDate).toISOString()
            }
        }else {
            data = {
                staffId: params.id,
                credentialId: globalCredId,
            }
            editData = {
                credentialId: globalCredentialId,
            }
        }

        if (inputs.type) {
            switch (mType) {
                case 'addCredential':
                    console.log(data,'data data')
                    dispatch(adminActions.createCredential(data))
                    handleClose()
                    break;
                case 'editCredential':
                    console.log(editData,'edit data')
                    dispatch(adminActions.editCredentialById(editData,params.id))
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
            <p className={classes.inactiveModalInfo}> {mType === 'addCredential' && 'Please fulfill the below fields to add a system.'}</p>

            {
                mType === 'credentialPreview' ? <SelectInput
                    style={classes.credentialInputStyle}
                    name={"type"}
                    placeholder={"Select Type*"}
                    list={globalCredentials}
                    value={inputs.type}
                    disabled={true}
                /> : <SelectInputPlaceholder
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
