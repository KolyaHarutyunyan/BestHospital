import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const FundingSourceModifiersAdd = ({
                                              info,
                                              setPostModifiers,
                                              globalCredentials,
                                              modifiersServ,
                                              addNewMod,
                                              setGetLastMod
                                          }) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [inputs2, setInputs2] = useState({});
    const [modifiers, setModifiers] = useState(modifiersServ ? [...modifiersServ] : []);
    const [credentialID, setCredentialID] = useState(null)
    const [credentialIDitem, setCredentialIDitem] = useState(null)
    const [btnStyle, setBtnStyle] = useState(false)
    const [indexItem, setIndexItem] = useState(null)
    const dispatch = useDispatch()


    const classes = foundingSourceModalStyle()

    const handleChange = e => {
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }

    const handleChange2 = e => {
        globalCredentials && globalCredentials.length > 0 && globalCredentials.forEach((item, index) => {
            if (inputs2.credentialId === item.name) {
                setCredentialIDitem(item._id)
            }
        })
        setInputs2(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }


    useEffect(() => {
        globalCredentials && globalCredentials.length > 0 && globalCredentials.forEach((item, index) => {
            if (inputs.credentialId === item.name) {
                setCredentialID(item._id)
            }

            if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type) {
                if (inputs.credentialId !== '0' && inputs.chargeRate !== ' ' && inputs.name !== ' ') {
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
            } else {
                setPostModifiers(null)
                setBtnStyle(false)
            }
        })

    }, [inputs])

    const handleCreate = () => {
        if (inputs2.credentialId && inputs2.chargeRate && inputs2.name && inputs2.type) {
            if (inputs2.credentialId !== '0' && inputs2.chargeRate !== ' ' && inputs2.name !== ' ') {
                dispatch(fundingSourceActions.editFoundingSourceModifier(modifiers[indexItem]._id, {
                    name: inputs2.name,
                    credentialID: inputs2.credentialId,
                    type : inputs2.type,
                    chargeRate : +inputs2.chargeRate
                }))
            }
        }
        setBtnStyle(false)
        if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type) {
            if (inputs.credentialId !== '0' && inputs.chargeRate !== ' ' && inputs.name !== ' ') {
                setGetLastMod(null)
                setModifiers([...modifiers, {
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
                setInputs({name: ' ', chargeRate: ' ', credentialId: credentialID, type: '0'})
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


    let editModifier = (i) => {
        if (i !== indexItem) {
            setIndexItem(i)
            setInputs2(modifiers[i])
        }
        if (inputs2.credentialId && inputs2.chargeRate && inputs2.name && inputs2.type) {
            if (inputs2.credentialId !== '0' && inputs2.chargeRate !== ' ' && inputs2.name !== ' ') {
                dispatch(fundingSourceActions.editFoundingSourceModifier(modifiers[i]._id, {
                    name: inputs2.name,
                    credentialID: inputs2.credentialId,
                    type : inputs2.type,
                    chargeRate : +inputs2.chargeRate
                }))
            }
        }
    }



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
                <div style={{width: 36}}/>
                <ValidationInput
                    onChange={handleChange}
                    value={inputs.chargeRate}
                    variant={"outlined"}
                    type={"number"}
                    label={"Charge Rate*"}
                    name={'chargeRate'}
                    typeError={error === 'chargeRate' && ErrorText.field}
                    styles={{width: 198}}
                />
                <div style={{width: 36}}/>
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

                if (index === indexItem) {
                    return (
                        <div className={classes.foundingSourceModalsBodyBlock} onClick={() => editModifier(index)}>
                            <ValidationInput
                                onChange={handleChange2}
                                value={inputs2?.name}
                                variant={"outlined"}
                                type={"text"}
                                label={"Modifier Name"}
                                name={'name'}
                                styles={{width: 198}}
                            />
                            <div style={{width: 36}}/>
                            <ValidationInput
                                onChange={handleChange2}
                                value={inputs2?.chargeRate}
                                variant={"outlined"}
                                type={"text"}
                                label={"Charge Rate*"}
                                name={'chargeRate'}

                                styles={{width: 198}}
                            />
                            <div style={{width: 36}}/>
                            <SelectInput
                                name={"credentialId"}
                                label={"Credential*"}
                                handleSelect={handleChange2}
                                value={globalCredentials.find(elem => elem._id === inputs2?.credentialId && elem._id)?.name}
                                list={globalCredentials}
                                styles={{width: 198}}
                            />
                            <div style={{width: 36}}/>
                            <SelectInput
                                name={"type"}
                                label={"Type*"}
                                handleSelect={handleChange2}
                                value={inputs2?.type === 0 ? '0' : inputs2?.type}
                                list={list}
                                styles={{width: 198,}}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div className={classes.foundingSourceModalsBodyBlock} onClick={() => editModifier(index)}>
                            <ValidationInput
                                onChange={handleChange2}
                                value={item.name}
                                variant={"outlined"}
                                type={"text"}
                                label={"Modifier Name"}
                                name={'name'}
                                styles={{width: 198}}
                            />
                            <div style={{width: 36}}/>



                            <ValidationInput
                                onChange={handleChange2}
                                value={item.chargeRate}
                                variant={"outlined"}
                                type={"text"}
                                label={"Charge Rate*"}
                                name={'chargeRate'}

                                styles={{width: 198}}
                            />




                            <div style={{width: 36}}/>
                            <SelectInput
                                name={"credentialId"}
                                label={"Credential*"}
                                handleSelect={handleChange2}
                                value={globalCredentials.find(elem => elem._id === item.credentialId && elem._id).name}
                                list={globalCredentials}
                                styles={{width: 198}}
                            />
                            <div style={{width: 36}}/>
                            <SelectInput
                                name={"type"}
                                label={"Type*"}
                                handleSelect={handleChange2}
                                value={item.type === 0 ? '0' : item.type}
                                list={list}
                                styles={{width: 198}}
                            />
                        </div>
                    )
                }
            })}

            <div className={classes.addmodifiersBlock}>
                <img onClick={handleCreate} src={btnStyle ? Images.addLight2 : Images.addLight} alt=""
                     className={classes.iconsCursor}/>
                <p onClick={handleCreate} className={classes.addMoreModifiersText}
                   style={btnStyle ? {color: '#347AF0'} : {color: "#347AF080"}}>Add more modifiers</p>
            </div>
        </div>

    );
};
