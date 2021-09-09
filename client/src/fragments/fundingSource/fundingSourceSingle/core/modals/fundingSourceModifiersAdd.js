import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const FundingSourceModifiersAdd = ({setPostModifiers, globalCredentials,modifiersServ,addNewMod ,setGetLastMod}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [modifiers, setModifiers] = useState( modifiersServ? [...modifiersServ] :  []);
    const [credentialID, setCredentialID] = useState(null)
    const [btnStyle, setBtnStyle] = useState(false)


    console.log(modifiersServ,'modders')

    const classes = foundingSourceModalStyle()

    const handleChange = e => {
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }



    useEffect(() => {
        globalCredentials &&  globalCredentials.length > 0 && globalCredentials.forEach((item, index) => {
            if (inputs.credentialId === item.name) {
                setCredentialID(item._id)
            }

            if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type  ) {
                if (inputs.credentialId !== '0' && inputs.chargeRate !== ' ' && inputs.name !== ' ' ) {
                    setBtnStyle(true)


                    setPostModifiers([...modifiers, {
                        "credentialId": credentialID,
                        "chargeRate": +inputs.chargeRate,
                        "name": inputs.name,
                        'type': +inputs.type
                    }])
                    setGetLastMod({
                        "credentialId": credentialID,
                        "chargeRate": +inputs.chargeRate,
                        "name": inputs.name,
                        'type': +inputs.type
                    })


                }
            }else {
                setPostModifiers(null)
                setBtnStyle(false)
            }
        })

    }, [inputs])

    const handleCreate = () => {
        setBtnStyle(false)
        if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type  ) {
            if ( inputs.credentialId !=='0' && inputs.chargeRate !== ' ' && inputs.name !==' ' ){
                setGetLastMod(null)
                setModifiers([...modifiers,{
                    "credentialId": credentialID,
                    "chargeRate": +inputs.chargeRate,
                    "name": inputs.name,
                    'type': +inputs.type
                }])
                addNewMod({
                    "credentialId": credentialID,
                    "chargeRate": +inputs.chargeRate,
                    "name": inputs.name,
                    'type': +inputs.type
                })
                setInputs({name : ' ', chargeRate : ' ' , credentialId : credentialID, type : '0' })
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

    let list = [{name: 0,}, {name: 1}]




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
                    type={"number"}
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
                            disabled={true}

                        />
                        <ValidationInput
                            disabled={true}
                            onChange={handleChange}
                            value={ item.chargeRate}
                            variant={"outlined"}
                            type={"text"}
                            label={"Charge Rate*"}
                            name={'chargeRate'}

                            styles={{width: 198}}
                        />
                        <SelectInput
                            disabled={true}
                            name={"credentialId"}
                            label={"Credential*"}
                            handleSelect={handleChange}
                            value={item.credentialId}
                            list={list}
                            styles={{width: 198}}
                        />
                        <div style={{width: 36}}/>
                        <SelectInput
                            disabled={true}
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
                <img src={btnStyle ? Images.addLight2 : Images.addLight} alt="" className={classes.iconsCursor}/>
                <p className={classes.addMoreModifiersText} style={btnStyle ? {color: '#347AF0'} : {color : "#347AF080"}}>Add more modifiers</p>
            </div>
        </div>

    );
};