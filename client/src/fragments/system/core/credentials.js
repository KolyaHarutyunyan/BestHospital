import {AddButton, NoItemText, Toast, ValidationInput} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {systemItemStyles} from "./styles";
import {ErrorText, Images,} from "@eachbase/utils";
import {SelectInputPlaceholder} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnErrorsActions, httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";

const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

const credentialsList = [
    {name: 'Degree'},
    {name: 'Clearance'},
    {name: 'licence'},
]

export const Credentials = ({removeItem, openModal,globalCredentials}) => {
    const dispatch = useDispatch()
    const classes = systemItemStyles()

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');

    const editCredential = (modalType, modalId) => {
        openModal(modalType,modalId)
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

    const checkType = (type) => {
        if (type === 'Degree') {
            return 0
        } else if (type === 'Clearance') {
            return 1
        } else if (type === 'licence') {
            return 2
        }
    }

    const convertType = (index) =>{
        if (index === 0) {
            return 'Degree'
        } else if (index === 1) {
            return 'Clearance'
        } else if (index === 2) {
            return 'licence'
        }
    }

    const handleSubmit = () => {
        let data = {
            name: inputs.name,
            type: checkType(inputs.type)
        }
        if (inputs.name && inputs.type) {
            dispatch(systemActions.createCredentialGlobal(data));
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.type ? 'type' :
                        'Input is not filled'
            )
        }
    }

    const isDisabled = inputs.name && inputs.type

    const {httpOnError, httpOnLoad, httpOnSuccess } = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CREDENTIAL_GLOBAL'

    const errorText = httpOnError.length && httpOnError[0].type === 'CREATE_CREDENTIAL_GLOBAL'

    useEffect(()=>{
        if(success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_CREDENTIAL_GLOBAL'))
            setInputs({
                name: '',
                type: ''
            })
        }else if(errorText){
            dispatch(httpRequestsOnErrorsActions.removeError('CREATE_CREDENTIAL_GLOBAL'))
        }
    },[success])
    let errorMessage = success ? 'success' : 'error'
    console.log(errorText,'errorText');
    return (
        <>
            <div className={`${classes.flexContainer} ${classes.headerSize}`}>
                <ValidationInput
                    style={classes.credentialInputStyle}
                    onChange={handleChange}
                    value={inputs.name}
                    variant={"outlined"}
                    name={"name"}
                    type={"text"}
                    placeholder={'Name*'}
                />
                <SelectInputPlaceholder
                    placeholder='Type'
                    style={classes.credentialInputStyle}
                    name={"type"}
                    handleSelect={handleChange}
                    value={inputs.type}
                    list={credentialsList}
                    typeError={error === 'issuingState' ? ErrorText.field : ''}
                />
                <AddButton
                    loader={!!httpOnLoad.length}
                    disabled={!isDisabled}
                    styles={credentialBtn}
                    handleClick={handleSubmit} text='Add Credential'
                />
            </div>
            <p className={classes.title}>Credentials</p>
            <div className={classes.credentialTable}>
                {
                    globalCredentials && globalCredentials.length ? globalCredentials.map((credentialItem, index) => {
                        return (
                            <div className={classes.item} key={index}>
                                <p>
                                    <span>{`${credentialItem.name} - `}</span>
                                    {convertType(credentialItem.type)}
                                </p>
                                <div className={classes.icons}>
                                    <img src={Images.edit}
                                         onClick={() => editCredential('editCredential', {
                                             credentialId: credentialItem._id,
                                             credentialName: credentialItem.name,
                                             credentialType: convertType(credentialItem.type)
                                         })} alt="edit"/>
                                    <img src={Images.remove} alt="delete" onClick={() => removeItem({id: credentialItem._id.id,name: credentialItem.name} )}/>
                                </div>
                            </div>
                        )
                    }) : <NoItemText text='No Items Yet' />
                }

            </div>
            <Toast
                type={success ? 'success' : errorText ? 'error' : '' }
                text={errorMessage}
                info={success ? success : errorText ? errorText : ''}/>
        </>
    )
}