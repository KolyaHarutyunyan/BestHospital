import {AddressInput, ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useState} from "react";
import {createFoundingSourceStyle} from "./styles";
import {EmailValidator, ErrorText, Images} from "@eachbase/utils";
import {fundingSourceActions, officeActions} from "@eachbase/store";
import {useDispatch} from "react-redux";


export const FundingSourceServiceAdd = ({handleClose}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [fullAddress, setFullAddress] = useState(null)

    const classes = createFoundingSourceStyle()
    const dispatch = useDispatch()
    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );


    const handleCreate = () => {
        const data = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": inputs.phone,
            'type': inputs.type,
            'contact': inputs.contact,
            'website': inputs.website,
            "address": fullAddress,
            "status": 1
        }
        if (inputs.name && inputs.email && inputs.phone && inputs.type && inputs.contact && inputs.website) {
            dispatch(fundingSourceActions.createFundingSource(data))
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.email ? 'email' :
                        !inputs.phone ? 'phone' :
                            !inputs.type ? 'type' :
                                !inputs.contact ? 'contact' :
                                    !inputs.website ? 'website' :
                                        'Input is not field'
            )
        }
    }

    const list = [
        {name: 'service'},
        {name: 'default'}
    ]


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader handleClose={handleClose} title={'Add a New Service'}/>
            <div className={classes.createFoundingSourceBody}>
                <p className={classes.fundingSourceModalsTitle}>Service</p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: 400}}>
                        <SelectInput
                            name={"type"}
                            label={"Service*"}
                            handleSelect={handleChange}
                            sendBoolean={handleCheck}
                            value={inputs.type}
                            list={list}
                            typeError={error === 'type' ? ErrorText.field : ''}
                            // type={'id'}
                        />
                        <div className={classes.displayCodeBlock}>
                            <p className={classes.displayCodeBlockText}>Display Code: <span style={{color: '#4B5C68B3'}}>N/A</span> </p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Display Code: <span style={{color: '#4B5C68B3',}}>N/A</span> </p>
                        </div>
                    </div>
                    <div style={{width: 400}}>
                        <ValidationInput
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.website}
                            variant={"outlined"}
                            type={"text"}
                            label={"CPT Code*"}
                            name={'website'}
                            typeError={error === 'website' && ErrorText.field}
                        />
                        <ValidationInput
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.website}
                            variant={"outlined"}
                            type={"text"}
                            label={"Unit Size*"}
                            name={'website'}
                            typeError={error === 'website' && ErrorText.field}
                        />
                        <div style={{display:'flex',justifyContent:"space-between"}}>
                            <ValidationInput
                                sendBoolean={handleCheck}
                                onChange={handleChange}
                                value={inputs.website}
                                variant={"outlined"}
                                type={"text"}
                                label={"Min Unit*"}
                                name={'website'}
                                typeError={error === 'website' && ErrorText.field}
                                styles={{width:192}}
                            />
                            <ValidationInput
                                sendBoolean={handleCheck}
                                onChange={handleChange}
                                value={inputs.website}
                                variant={"outlined"}
                                type={"text"}
                                label={"Min Unit*"}
                                name={'website'}
                                typeError={error === 'website' && ErrorText.field}
                                styles={{width:192, marginLeft : 10}}
                            />
                        </div>
                    </div>

                </div>
                <p className={classes.fundingSourceModalsTitle} style={{marginTop:40}}>Modifiers</p>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <ValidationInput
                        sendBoolean={handleCheck}
                        onChange={handleChange}
                        value={inputs.website}
                        variant={"outlined"}
                        type={"text"}
                        label={"Modifier Name"}
                        name={'website'}
                        typeError={error === 'website' && ErrorText.field}
                        styles={{width:198}}
                    />
                    <ValidationInput
                        sendBoolean={handleCheck}
                        onChange={handleChange}
                        value={inputs.website}
                        variant={"outlined"}
                        type={"text"}
                        label={"Charge Rate*"}
                        name={'website'}
                        typeError={error === 'website' && ErrorText.field}
                        styles={{width:198}}
                    />
                    <SelectInput
                        name={"type"}
                        label={"Credential*"}
                        handleSelect={handleChange}
                        sendBoolean={handleCheck}
                        value={inputs.type}
                        list={list}
                        typeError={error === 'type' ? ErrorText.field : ''}
                        styles={{width:198}}
                        // type={'id'}
                    />
                    <div style={{width:36}}></div>
                    <SelectInput
                        name={"type"}
                        label={"Type*"}
                        handleSelect={handleChange}
                        sendBoolean={handleCheck}
                        value={inputs.type}
                        list={list}
                        typeError={error === 'type' ? ErrorText.field : ''}
                        styles={{width:198,}}
                        // type={'id'}
                    />
                </div>
                <div className={classes.addmodifiersBlock}>
                    <img src={Images.addLight} alt="" style={{ cursor: 'pointer'}}/>
                    <p className={classes.addMoreModifiersText}>Add more modifiers</p>
                </div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <CreateChancel
                        // classes={globalInputs.buttonsStyle}
                        create={"Add"}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='400px'
                    />
                </div>
            </div>

        </div>
    );
};
