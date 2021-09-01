import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const FundingSourceServiceAdd = ({handleClose, systemServices}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [sysServiceItem, setSysServiceItem] = useState(null);
    const params = useParams()
    let dispatch = useDispatch()


    const classes = foundingSourceModalStyle()

    const handleChange = e => {
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        );


    }


    useEffect(() => {
        systemServices.length > 0 && systemServices.forEach((item, index) => {
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
             dispatch(fundingSourceActions.createFoundingSourceServiceById(params.id, data))
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

    let list = []


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader handleClose={handleClose} title={'Add a New Service'}/>
            <div className={classes.createFoundingSourceBody}>
                <p className={classes.fundingSourceModalsTitle}>Service</p>
                <div className={classes.foundingSourceModalsBodyBlock}>
                    <div className={classes.foundingSourceModalsBodyBox}>
                        <SelectInput
                            name={"name"}
                            label={"Service*"}
                            handleSelect={handleChange}
                            value={inputs.name}
                            list={systemServices ? systemServices : []}
                            typeError={error === 'name' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock}>
                            <p className={classes.displayCodeBlockText}>Display Code: <span
                                className={classes.displayCode}>
                                {sysServiceItem !== null && sysServiceItem?.displayCode !== 'displayCode' ? sysServiceItem?.displayCode : 'N/A'}
                            </span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Category: <span
                                className={classes.displayCode}>
                                {sysServiceItem !== null && sysServiceItem?.category !== 'category' ? sysServiceItem?.category : 'N/A'}
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
                <p className={classes.ModifiresTitle}>Modifiers</p>
                <div className={classes.foundingSourceModalsBodyBlock}>
                    <ValidationInput
                        onChange={handleChange}
                        value={inputs.website}
                        variant={"outlined"}
                        type={"text"}
                        label={"Modifier Name"}
                        name={'website'}
                        typeError={error === 'website' && ErrorText.field}
                        styles={{width: 198}}
                    />
                    <ValidationInput
                        onChange={handleChange}
                        value={inputs.website}
                        variant={"outlined"}
                        type={"text"}
                        label={"Charge Rate*"}
                        name={'website'}
                        typeError={error === 'website' && ErrorText.field}
                        styles={{width: 198}}
                    />
                    <SelectInput
                        name={"type"}
                        label={"Credential*"}
                        handleSelect={handleChange}
                        value={inputs.type}
                        list={list}
                        typeError={error === 'type' ? ErrorText.field : ''}
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
                <div className={classes.addmodifiersBlock}>
                    <img src={Images.addLight} alt="" className={classes.iconsCursor}/>
                    <p className={classes.addMoreModifiersText}>Add more modifiers</p>
                </div>
                <div className={classes.foundingSourceModalsBodyBlock}>
                    <CreateChancel
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
