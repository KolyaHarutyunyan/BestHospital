import React, {useState} from "react";
import {modalsStyle,} from "@eachbase/components/modal/styles";
import {useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton, CreateChancel} from "@eachbase/components/buttons";
import {ValidationInput} from "@eachbase/components/inputs";

export const SystemItemAddService = ({modalType, handleClose}) => {

    const [mType, setMType] = useState(modalType)

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()

    const inputSpacing = {
        paddingBottom: 16,
    }

    const handleSubmit = () => {
        if (mType === 'edit') {
            alert('Edit Service Type')
            handleClose()
        } else if (modalType === 'infoModal') {
            setMType('edit')
        } else {
            alert('Add service Type')
            handleClose()
        }
    }

    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>{mType === 'edit' ? 'Edit Service Type' : mType === 'infoModal' ? 'Function Behavioral Analysis' : ' Add a Service Type'}</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>
                {!mType && 'To add a new service type in the system, please fulfill the below fields.'}
            </p>
            <ValidationInput
                disabled={mType === 'infoModal'}
                styles={inputSpacing}
                variant={"outlined"}
                onChange={() => alert('change')}
                type={"text"}
                label={"Service Name*"}
                name='serviceName'
            />
            <ValidationInput
                disabled={mType === 'infoModal'}
                styles={inputSpacing}
                variant={"outlined"}
                onChange={() => alert('change')}
                type={"text"}
                label={"Display Name*"}
                name='displayName'
            />
            <ValidationInput
                disabled={mType === 'infoModal'}
                styles={inputSpacing}
                variant={"outlined"}
                onChange={() => alert('change')}
                type={"text"}
                label={"category"}
                name='category'
            />
            {
                mType === '' || mType === 'infoModal' ?
                    <AddModalButton handleClick={handleSubmit} text={mType === '' ? `Add` : `Edit`}/> :
                    <>
                        <CreateChancel
                            buttonWidth='192px'
                            create='Save'
                            chancel="Cancel"
                            onClose={handleClose}
                            onCreate={handleSubmit}
                        />
                    </>
            }
        </div>
    );
}
