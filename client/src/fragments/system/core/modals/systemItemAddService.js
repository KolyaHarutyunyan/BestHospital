import React, {useState} from "react";
import {modalsStyle,} from "@eachbase/components/modal/styles";
import {useGlobalTextStyles} from "@eachbase/utils";
import {CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {SelectInput, ValidationInput} from "@eachbase/components/inputs";

const inputSpacing = {
    paddingBottom: 16,
}

const credentialLicenceList = [
    {name: 'type'},
    {name: 'type 1'},
    {name: 'type 2'},
    {name: 'type 3'},
]

export const SystemItemAddService = ({modalType, handleClose}) => {

    const [mType] = useState(modalType)

    const title = (mType) => {
        if (mType === 'editService') {
            return 'Edit Service Type'
        } else if (mType === 'editCredential') {
            return 'Edit Credential'
        }
        return 'Edit Department'
    }

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    const handleSubmit = () => {
        switch(mType) {
            case 'editService':
                alert('edit services')
                break;
            case 'editCredential':
                alert('edit credentials')
                break;
            default:
                alert('edit departments')
        }
        handleClose()
    }

    const handleChange = () =>{
        console.log('handle Change')
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
                            onChange={() => alert('change')}
                            type={"text"}
                            label={"Service Name*"}
                            name='serviceName'
                        />
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={() => alert('change')}
                            type={"text"}
                            label={"Display Name*"}
                            name='displayName'
                        />
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={() => alert('change')}
                            type={"text"}
                            label={"category"}
                            name='category'
                        />
                    </> : mType === 'editCredential' ?
                    <>
                        <ValidationInput
                            styles={inputSpacing}
                            variant={"outlined"}
                            onChange={() => alert('change')}
                            type={"text"}
                            label={"Credential Name*"}
                            name='credentialName'
                        />
                        <SelectInput
                            style={classes.credentialInputStyle}
                            name={"issuingState"}
                            placeholder={"Issuing State*"}
                            list={credentialLicenceList}
                            handleSelect={handleChange}
                        />
                    </> :
                    <ValidationInput
                        styles={inputSpacing}
                        variant={"outlined"}
                        onChange={() => alert('change')}
                        type={"text"}
                        label={"Department Name*"}
                        name='departmentName'
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
