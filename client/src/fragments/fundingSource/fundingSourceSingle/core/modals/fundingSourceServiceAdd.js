import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import {FundingSourceModifiersAdd} from "./fundingSourceModifiersAdd";


export const FundingSourceServiceAdd = ({handleClose, info, modifiersID}) => {
    const systemServices = useSelector(state => state.system.services)
    const globalCredentials = useSelector(state => state.system.credentials)
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info} : {});
    const [sysServiceItem, setSysServiceItem] = useState(null);
    const [postModifiers, setPostModifiers] = useState()
    const [modifiersEdit, setModifiersEdit] = useState([]);
    const [getLastMod, setGetLastMod] = useState(null);
    const params = useParams()
    let dispatch = useDispatch()
    const classes = foundingSourceModalStyle()



    let addNewMod = (newMod)=>{
        setModifiersEdit([...modifiersEdit, newMod])
    }



    const handleChange = e => {
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );
    }



    useEffect(() => {
        systemServices && systemServices.length > 0 && systemServices.forEach((item, index) => {
            if (inputs.name === item.name) {
                setSysServiceItem(item)
            }
        })

    }, [inputs])


    const handleCreate = () => {

        if (inputs.name && inputs.cptCode && inputs.size && inputs.min && inputs.max) {
            const data = {
                "name": inputs.name,
                "serviceId": sysServiceItem?.id,
                "rate": 0,
                "cptCode": +inputs.cptCode,
                "size": +inputs.size,
                "min": +inputs.min,
                "max": +inputs.max
            }

            if (getLastMod){
                postModifiers?.push(getLastMod)
                modifiersEdit?.push(getLastMod)
            }
            if (!info){
                dispatch(fundingSourceActions.createFoundingSourceServiceById(params.id, data, modifiersEdit))
            }else {
                dispatch(fundingSourceActions.editFoundingSourceServiceById(info?._id, data, modifiersEdit,params.id))
                 handleClose()
            }

        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.cptCode ? 'cptCode' :
                        !inputs.size ? 'size' :
                            !inputs.min ? 'min' :
                                !inputs.max ? 'max' :
                                    'Input is not field'
            )
        }
    }


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader handleClose={handleClose} title={info ? "Edit Service" : 'Add a New Service'}/>
            <div className={classes.createFoundingSourceBody}>
                <p className={classes.fundingSourceModalsTitle}>Service</p>
                <div className={classes.foundingSourceModalsBodyBlock}>
                    <div className={classes.foundingSourceModalsBodyBox}>
                        <SelectInput
                            name={"name"}
                            label={"Service*"}
                            handleSelect={handleChange}
                            value={inputs.name}
                            typeError={error === 'name' ? ErrorText.field : ''}
                            list={systemServices ? systemServices : []}
                        />
                        <div className={classes.displayCodeBlock}>
                            <p className={classes.displayCodeBlockText}>Display Code: <span
                                className={classes.displayCode}>
                                {sysServiceItem !== null && sysServiceItem?.displayCode !== 'displayCode' && inputs?.name !== '' ? sysServiceItem?.displayCode : 'N/A'}
                            </span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Category: <span
                                className={classes.displayCode}>
                                {sysServiceItem !== null && sysServiceItem?.category !== 'category' && inputs?.name !== '' ? sysServiceItem?.category : 'N/A'}
                            </span></p>
                        </div>
                    </div>
                    <div className={classes.foundingSourceModalsBodyBox}>
                        <ValidationInput
                            onChange={handleChange}
                            value={inputs.cptCode}
                            variant={"outlined"}
                            type={"number"}
                            label={"CPT Code*"}
                            name={'cptCode'}
                            typeError={error === 'cptCode' && ErrorText.field}
                        />
                        <ValidationInput
                            onChange={handleChange}
                            value={inputs.size}
                            variant={"outlined"}
                            type={"number"}
                            label={"Unit Size*"}
                            name={'size'}
                            typeError={error === 'size' && ErrorText.field}
                        />
                        <div className={classes.foundingSourceModalsBodyBlock}>
                            <ValidationInput
                                onChange={handleChange}
                                value={inputs.min}
                                variant={"outlined"}
                                type={"number"}
                                label={"Min Unit*"}
                                name={'min'}
                                typeError={error === 'min' && ErrorText.field}
                                styles={{width: 192}}
                            />
                            <ValidationInput
                                onChange={handleChange}
                                value={inputs.max}
                                variant={"outlined"}
                                type={"number"}
                                label={"Min Unit*"}
                                name={'max'}
                                typeError={error === 'max' && ErrorText.field}
                                styles={{width: 192, marginLeft: 10}}
                            />
                        </div>
                    </div>

                </div>


                <FundingSourceModifiersAdd
                    info={info}
                    addNewMod={addNewMod}
                    modifiersServ={modifiersID}
                    setPostModifiers={setPostModifiers}
                    globalCredentials={globalCredentials}
                    setGetLastMod = {setGetLastMod}
                />


                <div className={classes.foundingSourceModalsBodyBlock}>
                    <CreateChancel
                        create={info ? 'Save' : "Add"}
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
