import React, {useEffect, useState} from "react";
import {modalsStyle,} from "@eachbase/components/modal/styles";
import {ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, ValidationInput} from "@eachbase/components/inputs";
import {httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

const credentialsList = [
    {name: 'Degree'},
    {name: 'Clearance'},
    {name: 'licence'},
]

export const SystemItemAddService = ({modalInformation, modalType, handleClose}) => {
    const dispatch = useDispatch()
    const [mType] = useState(modalType)
    const [mInformation] = useState(modalInformation)
    const [inputs, setInputs] = useState(mInformation ? mInformation : {})

    const [error, setError] = useState('')

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    const title = (mType) => {
        if (mType === 'editService') {
            return 'Edit Service Type'
        } else if (mType === 'editCredential') {
            return 'Edit Credential'
        } else if (mType === 'editJobTitles') {
            return 'Edit Job Title'
        } else if (mType === 'editPlaceTitles') {
            return 'Edit Place Of Service'
        }
        return 'Edit Department'
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

    const handleSubmit = () => {
        let credentialData = {
            name: inputs.credentialName,
            type: checkType(inputs.credentialType),
        }

        let serviceData = {
            name: inputs.name,
            displayCode: inputs.displayCode,
            category: inputs.category
        }
        let departmentData = {
            name: inputs.departmentName,
        }
        let jobData = {
            name: inputs.jobTitle,
        }
        let placeData = {
            name: inputs.name,
            code: inputs.code,
        }
        switch (mType) {
            case 'editService':
                if (inputs.name && inputs.displayCode && inputs.category) {
                    dispatch(systemActions.editServiceByIdGlobal(serviceData, mInformation.id))
                } else {
                    setError(
                        !inputs.name ? 'name' :
                            !inputs.displayCode ? 'displayCode' :
                                !inputs.category ? 'category' :
                                    'Input is not filled'
                    )
                }
                break;
            case 'editCredential':
                if (inputs.credentialType && inputs.credentialName) {
                    dispatch(systemActions.editCredentialByIdGlobal(credentialData, mInformation.credentialId))
                } else {
                    setError(
                        !inputs.credentialType ? 'credentialType' :
                            !inputs.credentialName ? 'credentialName' :
                                'Input is not filled'
                    )
                }
                break;
            case 'editJobTitles':
                if (inputs.jobTitle) {
                    dispatch(systemActions.editJobByIdGlobal(jobData, mInformation.jobId))
                } else {
                    setError(
                        !inputs.jobTitle ? 'jobTitle' :
                            'Input is not filled'
                    )
                }
                break;

            case 'editPlaceTitles':
                if (inputs.name && inputs.code) {
                    dispatch(systemActions.editPlaceByIdGlobal(placeData, mInformation.jobId))
                } else {
                    setError(
                        !inputs.name ? 'name' :
                            !inputs.code ? 'code' :
                                'Input is not filled'
                    )
                }
                break;
            default:
                if (inputs.departmentName) {
                    dispatch(systemActions.editDepartmentByIdGlobal(departmentData, mInformation.departmentID))
                } else {
                    setError(
                        !inputs.departmentName ? 'departmentName' :
                            'Input is not filled'
                    )
                }
        }
    }

    const handleChange = e => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}));
        error === e.target.name && setError('')
    }

    const {httpOnLoad, httpOnSuccess} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
    }));

    const success =
        httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? true :
            httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_JOB_BY_ID_GLOBAL' ? true :
                httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_DEPARTMENT_BY_ID_GLOBAL' ? true :
                    httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_SERVICE_BY_ID_GLOBAL' ? true :
                    httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_PLACE_BY_ID_GLOBAL'

    const loader =
        httpOnLoad.length && httpOnLoad[0] === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? true :
            httpOnLoad.length && httpOnLoad[0] === 'EDIT_JOB_BY_ID_GLOBAL' ? true :
                httpOnLoad.length && httpOnLoad[0] === 'EDIT_SERVICE_BY_ID_GLOBAL' ? true :
                    httpOnLoad.length && httpOnLoad[0] === 'EDIT_DEPARTMENT_BY_ID_GLOBAL' ? true :
                        httpOnLoad.length && httpOnLoad[0] === 'EDIT_PLACE_BY_ID_GLOBAL'

    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess.length && httpOnSuccess[0].type))
            handleClose()
        }
    }, [success]);




    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle} ${classes.modalTitleMargin}`}>{title(mType)}</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            {mType === 'editPlaceTitles' ?
                <>
                    <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        type={"text"}
                        label={"Name*"}
                        name='name'
                        value={inputs.name}
                        typeError={error === 'name' && ErrorText.field}
                    />
                    <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        type={"number"}
                        label={"Code*"}
                        name='code'
                        value={inputs.code}
                        typeError={error === 'code' && ErrorText.field}
                    />
                </>
                :
                mType === 'editService' ?
                    <>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Service Type*"}
                            name='name'
                            value={inputs.name}
                            typeError={error === 'name' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Display Name*"}
                            name='displayCode'
                            value={inputs.displayCode}
                            typeError={error === 'displayCode' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"category"}
                            name='category'
                            value={inputs.category}
                            typeError={error === 'category' && ErrorText.field}
                        />
                    </> : mType === 'editCredential' ?
                    <>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Credential Name*"}
                            name='credentialName'
                            value={inputs.credentialName}
                            typeError={error === 'credentialName' && ErrorText.field}
                        />
                        <SelectInput
                            style={classes.credentialInputStyle}
                            name={"credentialType"}
                            placeholder={"Type*"}
                            list={credentialsList}
                            handleSelect={handleChange}
                            value={inputs.credentialType}
                            typeError={error === 'credentialType' && ErrorText.field}
                        />
                    </> : mType === 'editDepartment' ?
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            name='departmentName'
                            value={inputs.departmentName}
                            typeError={error === 'departmentName' && ErrorText.field}
                        /> :
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Job Title*"}
                            name='jobTitle'
                            value={inputs.jobTitle}
                            typeError={error === 'jobTitle' && ErrorText.field}
                        />

            }
            <>
                <CreateChancel
                    loader={loader}
                    buttonWidth='192px'
                    create='Save'
                    chancel="Cancel"
                    onClose={handleClose}
                    onCreate={handleSubmit}
                />
            </>
        </div>
    );
}
