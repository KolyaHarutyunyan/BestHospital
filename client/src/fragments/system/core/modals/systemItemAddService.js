import React, {useState} from "react";
import {modalsStyle,} from "@eachbase/components/modal/styles";
import {useGlobalTextStyles} from "@eachbase/utils";
import {CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, ValidationInput} from "@eachbase/components/inputs";
import {systemActions} from "@eachbase/store";
import {useDispatch} from "react-redux";

const inputSpacing = {
    paddingBottom: 16,
}

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

    const [error,setError] = useState('')

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    const title = (mType) => {
        if (mType === 'editService') {
            return 'Edit Service Type'
        } else if (mType === 'editCredential') {
            return 'Edit Credential'
        } else if (mType === 'editJobTitles') {
            return 'Edit Job Title'
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
            displayCode:inputs.displayCode,
            category: inputs.category
        }
        let departmentData = {
            name: inputs.departmentName,
        }
        let jobData = {
            name: inputs.jobTitle,
        }
        switch (mType) {
            case 'editService':
                if (inputs.name && inputs.displayCode && inputs.category){
                    dispatch(systemActions.editServiceByIdGlobal(serviceData,mInformation.id))
                    handleClose()
                }else {
                    alert('error')
                }
                break;
            case 'editCredential':
                if (inputs.credentialType && inputs.credentialName){
                    dispatch(systemActions.editCredentialByIdGlobal(credentialData,mInformation.credentialId))
                    handleClose()
                }else {
                    alert('error')
                }
                break;
            case 'editJobTitles':
                if (inputs.jobTitle){
                    dispatch(systemActions.editJobByIdGlobal(jobData,mInformation.jobId))
                    handleClose()
                }else {
                    alert('error')
                }
                break;
            default:
                if (inputs.departmentName){
                    dispatch(systemActions.editDepartmentByIdGlobal(departmentData,mInformation.departmentID))
                    handleClose()
                }
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

    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle} ${classes.modalTitleMargin}`}>{title(mType)}</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            {
                mType === 'editService' ?
                    <>
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Service Type*"}
                            name='name'
                            value={inputs.name}
                        />
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Display Name*"}
                            name='displayCode'
                            value={inputs.displayCode}
                        />
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"category"}
                            name='category'
                            value={inputs.category}
                        />
                    </> : mType === 'editCredential' ?
                        <>
                            <ValidationInput
                                styles={inputSpacing}
                                variant={"outlined"}
                                onChange={handleChange}
                                type={"text"}
                                label={"Credential Name*"}
                                name='credentialName'
                                value={inputs.credentialName}
                            />
                            <SelectInput
                                style={classes.credentialInputStyle}
                                name={"credentialType"}
                                placeholder={"Type*"}
                                list={credentialsList}
                                handleSelect={handleChange}
                                value={inputs.credentialType}
                            />
                        </> : mType === 'editDepartment' ?
                            <ValidationInput
                                styles={inputSpacing}
                                variant={"outlined"}
                                onChange={handleChange}
                                type={"text"}
                                name='departmentName'
                                value={inputs.departmentName}
                            /> :
                            <ValidationInput
                                styles={inputSpacing}
                                variant={"outlined"}
                                onChange={handleChange}
                                type={"text"}
                                label={"Job Title*"}
                                name='jobTitle'
                                value={inputs.jobTitle}
                            />

            }
            <>
                <CreateChancel
                    loader={false}
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
