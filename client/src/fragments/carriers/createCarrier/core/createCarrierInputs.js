import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {officeActions} from "@eachbase/store";
import {useHistory} from "react-router-dom";
import {
    Colors,
    createInputsWrapper,
    EmailValidator, ErrorText,
    useGlobalStyles,
    useGlobalText
} from "@eachbase/utils";
import {
    AddressInput,
    Circle,
    CreateChancel,
    Line,
    ValidationInput,
    EditSaveButtons,
    SelectInput
} from "@eachbase/components";
import moment from "moment";
import {RadioButtons} from "./radioButtons";

export const CreateCarrierInputs = ({handleChangeName, info}) => {
    const globalStyle = useGlobalText();
    const globalInputs = useGlobalStyles();
    const globalScreens = createInputsWrapper();
    const dispatch = useDispatch();
    const history = useHistory();
    const [disables, setDisabled] = useState(!!info)
    const [fullAddress, setFullAddress] = useState(info ? info.address.formattedAddress : '')
    const [error, setError] = useState('')
    const [phone, setPhone] = useState(info ? info.phoneNumber : '')
    const [inputs, setInputs] = useState(info ? {...info} : {});

    const handleChange = e => setInputs(prevState =>
            ({...prevState, [e.target.name]: e.target.value,}),
        error === e.target.name && setError(''),
        e.target.name === 'name' && handleChangeName(e.target.value)
    );

    const handleChangePhone = (ev) => {
        if (ev.target.value.length <= 11) {
            setPhone(ev.target.value)
            error === 'phone' && setError('')
        }
    }

    const handleCreate = () => {
        const data = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": phone,
            "establishedDate": new Date(inputs.establishedDate).getTime(),
            "address": fullAddress
        };

        const editData = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": phone,
            "address": fullAddress,
            "officeId": info ? info.id : ''
        };

        if (inputs.name && inputs.email && phone && inputs.establishedDate && fullAddress) {
            if (info) {
                dispatch(officeActions.editOffice(editData))
                setDisabled(true)
            } else {
                dispatch(officeActions.createOffice(data))
            }
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.email ? 'email' :
                        !phone ? 'phone' :
                            !inputs.establishedDate ? 'date' :
                                'Input is not field'
            )
        }
    }

    return (
        <div className={globalScreens.createInputsWrapper}>

            <div className={globalInputs.spaceBetween}>
                <div className={globalInputs.centerItem}>

                    {info && <Circle number={1} back={Colors.ThemeOrange}/>}
                    <p className={globalStyle.title}>Carrier Information</p>
                </div>

                {info &&
                <EditSaveButtons
                    handleChancel={() => setDisabled(true)}
                    handleSetEdit={() => setDisabled(false)}
                    handleSaveInfo={handleCreate}
                />}
            </div>


            <div style={{display: 'flex'}}>
                {info && <Line height={'281px'}/>}
                <div style={{width: '100%'}}>
                    <div className={globalScreens.basicInfo}>
                        <p className={globalStyle.smallText}>Basic Information</p>
                        <div className={globalScreens.basicInfoInputs}>


                            <ValidationInput
                                style={globalInputs.simpleInput}
                                variant={"outlined"}
                                name={"name"}
                                type={"text"}
                                label={"First Name*"}
                                typeError={error === 'name' ? ErrorText.field : ''}
                                onChange={handleChange}
                                value={inputs.name}
                                disabled={disables}
                            />
                            <ValidationInput
                                style={globalInputs.simpleInput}
                                variant={"outlined"}
                                name={"last"}
                                type={"text"}
                                label={"Last Name*"}
                                typeError={error === 'last' ? ErrorText.field : ''}
                                onChange={handleChange}
                                value={inputs.last}
                                disabled={disables}
                            />
                            <ValidationInput
                                variant={"outlined"}
                                name={"establishedDate"}
                                type={"date"}
                                typeError={error === 'date' ? ErrorText.field : ''}
                                label={"Date of Birth*"}
                                onChange={handleChange}
                                value={info ? moment(info.establishedDate).format('YYYY-MM-DD') : inputs.establishedDate}
                                disabled={disables}
                            />

                        </div>


                        <div className={globalScreens.basicInfoInputs}>
                            <ValidationInput
                                style={globalInputs.simpleInput}
                                variant={"outlined"}
                                name={"phone"}
                                label={"Phone Number*"}
                                type={'number'}
                                typeError={error === 'phone' ? ErrorText.field : ''}
                                onChange={handleChangePhone}
                                value={phone}
                                disabled={disables}
                            />

                            <ValidationInput
                                style={globalInputs.simpleInput}
                                variant={"outlined"}
                                name={"second"}
                                label={"Secondary Number"}
                                type={'number'}
                                typeError={error === 'second' ? ErrorText.field : ''}
                                onChange={handleChangePhone}
                                value={phone}
                                disabled={disables}
                            />

                            <ValidationInput
                                style={globalInputs.simpleInput}
                                variant={"outlined"}
                                name={"license"}
                                type={"text"}
                                label={"Driver’s License*"}
                                typeError={error === 'license' ? ErrorText.field : ''}
                                onChange={handleChange}
                                value={inputs.license}
                                disabled={disables}
                            />

                            <SelectInput
                                name={"issuing"}
                                label={"Issuing State*"}
                                handleSelect={handleChange}
                                value={inputs.issuing}
                                list={['officesListReserve']}
                                typeError={error === 'issuing' ? ErrorText.field : ''}
                                type={'id'}
                            />
                        </div>

                        <div style={{width: '48%'}} className={globalScreens.basicInfoInputs}>

                            <ValidationInput
                                style={globalInputs.simpleInput}
                                validator={EmailValidator}
                                variant={"outlined"}
                                name={"email"}
                                type={"email"}
                                label={"Email Address*"}
                                typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                                sendBoolean={(bool) => bool === true ? setError("Not valid email") : setError('')}
                                onChange={handleChange}
                                value={inputs.email}
                                disabled={disables}
                            />
                            <ValidationInput
                                validator={EmailValidator}
                                variant={"outlined"}
                                name={"remittancev"}
                                type={"email"}
                                label={"Remittancev Email*"}
                                typeError={error === 'remittancev' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                                sendBoolean={(bool) => bool === true ? setError("Not valid email") : setError('')}
                                onChange={handleChange}
                                value={inputs.remittancev}
                                disabled={disables}
                            />

                        </div>
                    </div>

                    <div className={globalScreens.basicInfo}>
                        <p className={globalStyle.smallText}>Shipping Address</p>

                        <div className={globalScreens.basicInfoInputs}>
                            <AddressInput
                                info={info}
                                handleSelectValue={setFullAddress}
                                disabled={disables}
                            />
                        </div>

                    </div>


                    <div className={globalScreens.basicInfo}>
                        <p className={globalStyle.smallText}>Mailing Address</p>




                            <RadioButtons disabled={ !fullAddress }/>


                        <div className={globalScreens.basicInfoInputs}>
                            <AddressInput
                                info={info}
                                handleSelectValue={setFullAddress}
                                disabled={disables}
                            />
                        </div>

                    </div>
                </div>

            </div>


            <p>{error === 'Input is not field' ? error : ''}</p>
            {!info &&
            <CreateChancel
                classes={globalInputs.buttonsStyle}
                create={"Create"}
                chancel={"Cancel"}
                onCreate={handleCreate}
                onClose={() => history.push('/carriers')}
            />
            }
        </div>
    );
};
