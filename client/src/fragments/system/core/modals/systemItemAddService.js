import React, {useState} from "react";
import {modalsStyle,} from "@eachbase/components/modal/styles";
import {useGlobalTextStyles} from "@eachbase/utils";
import {CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, ValidationInput} from "@eachbase/components/inputs";
import {systemActions} from "../../../../store";
import {useDispatch} from "react-redux";

const inputSpacing = {
    paddingBottom: 16,
}

const credentialsList = [
    {name: 'Degree'},
    {name: 'Clearance'},
    {name: 'licence'},
]

export const SystemItemAddService = ({modalId, modalType, handleClose}) => {

    const [mType] = useState(modalType)
    const [mId] = useState(modalId)

    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch()
    const [error,setError] = useState('')
    console.log(inputs,'inputs');
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

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

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
        switch (mType) {
            case 'editService':
                alert('edit services')
                break;
            case 'editCredential':
                if (inputs.credentialType && inputs.credentialName){
                    dispatch(systemActions.editCredentialByIdGlobal(credentialData,mId))
                    handleClose()
                }else {
                    alert('error')
                }
                break;
            case 'editJobTitles':
                alert('edit job title')
                break;
            default:
                alert('edit departments')
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
                            label={"Service Name*"}
                            name='serviceName'
                            value={inputs.serviceName}
                        />
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={handleChange}
                            type={"text"}
                            label={"Display Name*"}
                            name='displayName'
                            value={inputs.displayName}
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
                                label={"Department Name*"}
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
