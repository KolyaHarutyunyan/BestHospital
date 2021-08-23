import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import React, {useState} from "react";
import {foundingSourceModalStyle} from "./styles";
import {ErrorText, Images} from "@eachbase/utils";
import {useDispatch} from "react-redux";


export const FundingSourceServiceEdit = ({handleClose}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});


    const classes = foundingSourceModalStyle()

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );


    const handleCreate = () => {
        const data = {}
        if (inputs.name && inputs.cptCode && inputs.size && inputs.min && inputs.max) {
            // dispatch(fundingSourceActions.createFundingSource(data))
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

    const list = [
        {name: 'service'},
        {name: 'default'}
    ]




    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader handleClose={handleClose} title={'Edit Service'}/>
            <div className={classes.createFoundingSourceBody}>
                <p className={classes.fundingSourceModalsTitle}>Service</p>
                <div className={classes.foundingSourceModalsBodyBlock}>
                    <div className={classes.foundingSourceModalsBodyBox}>
                        <SelectInput
                            name={"name"}
                            label={"Service*"}
                            handleSelect={handleChange}
                            value={inputs.name}
                            list={list}
                            typeError={error === 'name' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock}>
                            <p className={classes.displayCodeBlockText}>Display Code: <span
                                className={classes.displayCode}>N/A</span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Display Code: <span
                                className={classes.displayCode}>N/A</span></p>
                        </div>
                    </div>
                    <div className={classes.foundingSourceModalsBodyBox}>
                        <ValidationInput
                            onChange={handleChange}
                            value={inputs.cptCode}
                            variant={"outlined"}
                            type={"text"}
                            label={"CPT Code*"}
                            name={'cptCode'}
                            typeError={error === 'cptCode' && ErrorText.field}
                        />
                        <ValidationInput
                            onChange={handleChange}
                            value={inputs.size}
                            variant={"outlined"}
                            type={"text"}
                            label={"Unit Size*"}
                            name={'size'}
                            typeError={error === 'size' && ErrorText.field}
                        />
                        <div className={classes.foundingSourceModalsBodyBlock}>
                            <ValidationInput
                                onChange={handleChange}
                                value={inputs.min}
                                variant={"outlined"}
                                type={"text"}
                                label={"Min Unit*"}
                                name={'min'}
                                typeError={error === 'min' && ErrorText.field}
                                styles={{width: 192}}
                            />
                            <ValidationInput
                                onChange={handleChange}
                                value={inputs.max}
                                variant={"outlined"}
                                type={"text"}
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
