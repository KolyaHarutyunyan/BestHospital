import React, {useState, useEffect} from "react";
import {modalsStyle} from "@eachbase/components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, RadioButton, ValidationInput, SelectInputPlaceholder, Toast} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {adminActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";
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
            expirationDate: inputs.expirationDate ? new Date(inputs.expirationDate).toISOString() : null,
            receiveData: new Date().toISOString()
        }
        editData = {
            credentialId: globalCredId ? globalCredId : globalCredentialInformation?.credId,
            expirationDate: (inputs.expirationDate && checkboxValue === 'expiring') ? new Date(inputs.expirationDate).toISOString() : null,
            receiveData: ''
        }

        switch (mType) {
            case 'addCredential':
                if(inputs.type){
                    dispatch(adminActions.createCredential(data))
                    handleClose()
                }else {
                    setError(
                        !inputs.type ? 'type' : 'Input is not filled'
                    )
                }
                break;
            case 'editCredential':
                dispatch(adminActions.editCredentialById(editData, globalCredentialInformation?.id, params.id))
                handleClose()
                break;
            case 'credentialPreview':
                setMType('editCredential')
                break;
            default:
                handleClose()
        }

    }

    const handleChange = e => {
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const {httpOnError, httpOnLoad, httpOnSuccess } = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError
    }));

    console.log(httpOnSuccess,'httpOnSuccess');

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CREDENTIAL'
    const errorText = httpOnError.length && httpOnError[0].type === 'CREATE_CREDENTIAL'
    const loader = httpOnLoad.length && httpOnLoad[0] === 'CREATE_CREDENTIAL'

    useEffect(()=>{
        if(success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_CREDENTIAL'))
        }else if(errorText){
            dispatch(httpRequestsOnErrorsActions.removeError('CREATE_CREDENTIAL'))
        }
    },[success])

    let errorMessage = success ? 'Successfully added' : 'Something went wrong';

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
                /> : mType === 'editCredential' ? <SelectInput
                    style={classes.credentialInputStyle}
                    name={"type"}
                    placeholder={"Select Credential*"}
                    list={globalCredentials}
                    value={inputs.type}
                    handleSelect={handleChange}
                    typeError={error === 'type' && ErrorText.field}
                /> :
                    <SelectInputPlaceholder
                        style={classes.credentialInputStyle}
                        name={"type"}
                        placeholder={"Select Credential*"}
                        list={globalCredentials}
                        value={inputs.type}
                        handleSelect={handleChange}
                        typeError={error === 'type' && ErrorText.field}
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
                        loader={loader}
                    />
            }
            <Toast
                type={success ? 'Successfully added' : errorText ? 'Something went wrong' : ''}
                text={errorMessage}
                info={success ? success : errorText ? errorText : ''}/>
        </div>
    );
}
