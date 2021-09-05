import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const FundingSourceModifiersAdd = ({setPostModifiers, globalCredentials}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [modifiers, setModifiers] = useState([]);
    const [credentialID, setCredentialID] = useState(null)



    const classes = foundingSourceModalStyle()

    const handleChange = e => {
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }

    console.log(modifiers,'oooo')

    useEffect(() => {
        globalCredentials.length > 0 && globalCredentials.forEach((item, index) => {
            if (inputs.credentialId === item.name) {
                setCredentialID(item._id)
            }
            if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type  ) {
                if (inputs.credentialId !== '0' && inputs.chargeRate !== ' ' && inputs.name !== ' ' && inputs.type !== '0') {

                    setPostModifiers([...modifiers, {
                        "credentialId": credentialID,
                        "chargeRate": 1,
                        "name": inputs.name,
                        'type': 1
                    }])
                }
            }else {
                setPostModifiers(null)
            }
        })

    }, [inputs])

    const handleCreate = () => {
        if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type  ) {
            if ( inputs.credentialId !=='0' && inputs.chargeRate !== ' ' && inputs.name !==' ' && inputs.type !== '0'){
                setModifiers([...modifiers,{
                    "credentialId": credentialID,
                    "chargeRate": inputs.chargeRate,
                    "name": inputs.name,
                    'type': inputs.type
                }])
                setInputs({name : ' ', chargeRate : ' ' , credentialId : credentialID, type : '0' })
            }



            const data = {
                "credentialId": inputs.credentialId,
                "chargeRate": inputs.chargeRate,
                "name": inputs.name,
                'type': inputs.type
            }

        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.chargeRate ? 'chargeRate' :
                        !inputs.credentialId ? 'credentialId' :
                            !inputs.type ? 'type' :
                                'Input is not field'
            )
        }
    }

    let list = [{name: "11"}]




    return (
        <div>
            <p className={classes.ModifiresTitle}>Modifiers</p>

            <div className={classes.foundingSourceModalsBodyBlock}>
                <ValidationInput
                    onChange={handleChange}
                    value={inputs.name}
                    variant={"outlined"}
                    type={"text"}
                    label={"Modifier Name"}
                    name={'name'}
                    typeError={error === 'name' && ErrorText.field}
                    styles={{width: 198}}
                />
                <ValidationInput
                    onChange={handleChange}
                    value={ inputs.chargeRate}
                    variant={"outlined"}
                    type={"text"}
                    label={"Charge Rate*"}
                    name={'chargeRate'}
                    typeError={error === 'chargeRate' && ErrorText.field}
                    styles={{width: 198}}
                />
                <SelectInput
                    name={"credentialId"}
                    label={"Credential*"}
                    handleSelect={handleChange}
                    value={inputs.credentialId}
                    list={globalCredentials ? globalCredentials : []}
                    typeError={error === 'credentialId' ? ErrorText.field : ''}
                    styles={{width: 198}}
                />
                <div style={{width: 36}}/>
                <SelectInput
                    name={"type"}
                    label={"Type*"}
                    handleSelect={handleChange}
                    value={inputs.type}
                    list={list}
                    typeError={error === 'type' ? ErrorText.field : ''}
                    styles={{width: 198,}}
                />
            </div>
            {modifiers.map((item, index) => {
                return (
                    <div className={classes.foundingSourceModalsBodyBlock}>
                        <ValidationInput
                            onChange={handleChange}
                            value={item.name}
                            variant={"outlined"}
                            type={"text"}
                            label={"Modifier Name"}
                            name={'name'}
                            styles={{width: 198}}
                        />
                        <ValidationInput
                            onChange={handleChange}
                            value={ item.chargeRate}
                            variant={"outlined"}
                            type={"text"}
                            label={"Charge Rate*"}
                            name={'chargeRate'}

                            styles={{width: 198}}
                        />
                        <SelectInput
                            name={"credentialId"}
                            label={"Credential*"}
                            handleSelect={handleChange}
                            value={item.credentialId}
                            list={list}
                            styles={{width: 198}}
                        />
                        <div style={{width: 36}}/>
                        <SelectInput
                            name={"type"}
                            label={"Type*"}
                            handleSelect={handleChange}
                            value={item.type}
                            list={list}
                            styles={{width: 198,}}
                        />
                    </div>
                )
            })}

            <div className={classes.addmodifiersBlock} onClick={handleCreate}>
                <img src={Images.addLight} alt="" className={classes.iconsCursor}/>
                <p className={classes.addMoreModifiersText}>Add more modifiers</p>
            </div>
        </div>

    );
};
