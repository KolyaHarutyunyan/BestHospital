import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const Modifiers = ({setPostModifiers, globalCredentials,modifiersServ,addNewMod ,setGetLastMod, handleCreate}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [modifiers, setModifiers] = useState( modifiersServ? [...modifiersServ] :  []);
    const [credentialID, setCredentialID] = useState(null)
    const [btnStyle, setBtnStyle] = useState(false)





    const classes = foundingSourceModalStyle()

    const handleChange = e => {
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }



    // useEffect(() => {
    //     globalCredentials &&  globalCredentials.length > 0 && globalCredentials.forEach((item, index) => {
    //         if (inputs.credentialId === item.name) {
    //             setCredentialID(item._id)
    //         }
    //
    //         if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type  ) {
    //             if (inputs.credentialId !== '0' && inputs.chargeRate !== ' ' && inputs.name !== ' ' ) {
    //                 setBtnStyle(true)
    //
    //
    //                 setPostModifiers([...modifiers, {
    //                     "credentialId": credentialID,
    //                     "chargeRate": +inputs.chargeRate,
    //                     "name": inputs.name,
    //                     'type': +inputs.type
    //                 }])
    //                 setGetLastMod({
    //                     "credentialId": credentialID,
    //                     "chargeRate": +inputs.chargeRate,
    //                     "name": inputs.name,
    //                     'type': +inputs.type
    //                 })
    //
    //
    //             }
    //         }else {
    //             setPostModifiers(null)
    //             setBtnStyle(false)
    //         }
    //     })
    //
    // }, [inputs])

    // const handleCreate = () => {
    //     setBtnStyle(false)
    //     if (inputs.credentialId && inputs.chargeRate && inputs.name && inputs.type  ) {
    //         if ( inputs.credentialId !=='0' && inputs.chargeRate !== ' ' && inputs.name !==' ' ){
    //             setGetLastMod(null)
    //             setModifiers([...modifiers,{
    //                 "credentialId": credentialID,
    //                 "chargeRate": +inputs.chargeRate,
    //                 "name": inputs.name,
    //                 'type': +inputs.type
    //             }])
    //             addNewMod({
    //                 "credentialId": credentialID,
    //                 "chargeRate": +inputs.chargeRate,
    //                 "name": inputs.name,
    //                 'type': +inputs.type
    //             })
    //             setInputs({name : ' ', chargeRate : ' ' , credentialId : credentialID, type : '0' })
    //         }
    //
    //
    //
    //
    //     } else {
    //         setError(
    //             !inputs.name ? 'name' :
    //                 !inputs.chargeRate ? 'chargeRate' :
    //                     !inputs.credentialId ? 'credentialId' :
    //                         !inputs.type ? 'type' :
    //                             'Input is not field'
    //         )
    //     }
    // }

    let list = [{name: 0,}, {name: 1}]


    let editModifier = (index)=>{
        alert(index)
    }

    return (
        <div>

            {modifiers.map((item, index) => {

                return (
                    <div className={classes.foundingSourceModalsBodyBlock} onClick={()=>editModifier(index)}>
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
                        <div style={{width: 36}}/>
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
                        <div style={{width: 36}}/>
                        <SelectInput
                            disabled={true}
                            name={"credentialId"}
                            label={"Credential*"}
                            handleSelect={handleChange}
                            value={globalCredentials.find(elem=>elem._id === item.credentialId && elem._id ).name}
                            list={globalCredentials}
                            styles={{width: 198}}
                        />
                        <div style={{width: 36}}/>
                        <SelectInput
                            disabled={true}
                            name={"type"}
                            label={"Type*"}
                            handleSelect={handleChange}
                            value={item.type === 0 ? '0' : item.type }
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