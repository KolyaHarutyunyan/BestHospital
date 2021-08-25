import {AddButton, SelectInput, ValidationInput} from "@eachbase/components";
import React, {useState} from "react";
import {systemItemStyles} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {SelectInputPlaceholder} from "@eachbase/components";

const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

const credentialsList = [
    {name: 'type'},
    {name: 'type 1'},
    {name: 'type 2'},
    {name: 'type 3'},
]

const credentials = [
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
]

export const Credentials = ({removeItem,openModal}) => {

    const classes = systemItemStyles()

    const [inputs, setInputs] = useState({});
    const [error,setError] = useState('');

    const editCredential = (modalType) => {
        openModal(modalType)
    }

    const handleChange = e =>{
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const isDisabled = inputs.name && inputs.type

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
                    style={classes.credentialInputStyle}
                    name={"type"}
                    handleSelect={handleChange}
                    value={inputs.type}
                    list={credentialsList}
                    typeError={error === 'issuingState' ? ErrorText.field : ''}
                />
                <AddButton
                    disabled={!isDisabled}
                    styles={credentialBtn}
                    handleClick={() => alert('Add Credential')} text='Add Credential'
                />
            </div>
            <p className={classes.title}>Credentials</p>
            <div className={classes.credentialTable}>
                {
                    credentials.map((credentialItem, index) => {
                        return (
                            <div className={classes.item}>
                                <p>
                                    <span>{credentialItem.name}</span>
                                    {credentialItem.type}</p>
                                <div>
                                    <img src={Images.edit} style={{cursor: 'pointer'}}
                                         onClick={(e) => editCredential('editCredential')} alt="edit"/>
                                    <img src={Images.remove} alt="delete" style={{cursor: 'pointer', marginLeft: 16}}
                                         onClick={() => removeItem('credential')}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}