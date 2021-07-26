import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {
    EmailValidator,
    useGlobalStyles,
    useGlobalText,
    createInputsWrapper, ErrorText
} from "@eachbase/utils";
import {AddressInput, CreateChancel, SelectInput, ValidationInput} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {agentActions} from "@eachbase/store";

export const CreateAgentInputs = ({handleChangeFirstName, handleChangeLastName}) => {
    const globalStyle = useGlobalText();
    const globalInputs = useGlobalStyles();
    const globalScreens = createInputsWrapper();
    const dispatch = useDispatch()
    const history = useHistory();
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [phone, setPhone] = useState('')
    const [fullAddress, setFullAddress] = useState('')

    const {officesListReserve, branchesList} = useSelector((state) => ({
        officesListReserve: state.offices.officesListReserve,
        branchesList: state.branches.branchesList
    }));


    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
        e.target.name === 'firstName' && handleChangeFirstName(e.target.value),
        e.target.name === 'lastName' && handleChangeLastName(e.target.value),
    );

    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };

    const handleCreate = () => {


        const data = {
            "email": inputs.email,
            "firstName": inputs.firstName,
            "lastName": inputs.lastName,
            "address": fullAddress,
            "officeId": inputs.officeName,
            "branchId": inputs.branch,
        }

        if (inputs.email && inputs.firstName && inputs.lastName && fullAddress && inputs.officeName) {
            dispatch(agentActions.createAgent(data))


        } else {
            setError(
                !inputs.email ? 'email' :
                    !inputs.firstName ? 'firstName' :
                        !inputs.lastName ? 'lastName' :
                            !fullAddress ? 'address' :
                                !inputs.officeName ? 'officeName' :
                                    ''
            )
        }

    }

    const handleChangePhone = (ev) => {
        if (ev.target.value.length <= 11) {
            setPhone(ev.target.value)
            error === 'phone' && setError('')
        }
    }
    console.log(inputs, 'fullAddress')

    return (
        <div className={globalScreens.createInputsWrapper}>
            <p className={globalStyle.title}>Person Information</p>

            <div className={globalScreens.basicInfo}>
                <p className={globalStyle.smallText}>Basic Information</p>

                <div>
                    <div className={globalScreens.basicInfoInputs}>

                        <ValidationInput
                            style={globalInputs.simpleInput}
                            variant={"outlined"}
                            name={"username"}
                            label={"Username"}
                            value={inputs.username}
                            onChange={handleChange}
                        />

                        <ValidationInput
                            style={globalInputs.simpleInput}
                            variant={"outlined"}
                            name={"firstName"}
                            label={"First Name*"}
                            typeError={error === 'firstName' && ErrorText.field}
                            value={inputs.firstName}
                            onChange={handleChange}
                        />

                        <ValidationInput
                            style={globalInputs.simpleInput}
                            variant={"outlined"}
                            name={"lastName"}
                            label={"Last Name*"}
                            typeError={error === 'lastName' && ErrorText.field}
                            value={inputs.lastName}
                            onChange={handleChange}
                        />
                    </div>


                    <div className={globalScreens.basicInfoInputs}>

                        <SelectInput
                            style={globalInputs.simpleInput}
                            name={"officeName"}
                            label={"Office*"}
                            handleSelect={handleChange}
                            value={inputs.officeName}
                            list={officesListReserve}
                            typeError={error === 'officeName' ? ErrorText.field : ''}
                            type={'id'}

                        /> <SelectInput
                        style={globalInputs.simpleInput}
                        name={"branch"}
                        label={"Branch*"}
                        handleSelect={handleChange}
                        value={inputs.branch}
                        list={branchesList}
                        typeError={error === 'branch' ? ErrorText.field : ''}
                        type={'id'}

                    />


                        <ValidationInput
                            style={globalInputs.simpleInput}
                            validator={EmailValidator}
                            variant={"outlined"}
                            name={"email"}
                            type={"email"}
                            label={"Email Address*"}
                            typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                            sendBoolean={handleCheck}
                            onChange={handleChange}
                            value={inputs.email}
                        />

                        <ValidationInput
                            style={globalInputs.simpleInput}
                            variant={"outlined"}
                            name={"phone"}
                            label={"Phone Number*"}
                            type={'number'}
                            typeError={error === 'phone' ? ErrorText.field : ''}
                            onChange={handleChangePhone}
                            value={phone}

                        />

                    </div>


                </div>
            </div>

            <div className={globalScreens.basicInfo}>
                <p className={globalStyle.smallText}>Address</p>
                <div className={globalScreens.basicInfoInputs}>
                    <AddressInput
                        handleSelectValue={setFullAddress}
                    />
                </div>
            </div>


            <p>{error}</p>
            <CreateChancel
                classes={globalInputs.buttonsStyle}
                create={"Create"}
                chancel={"Cancel"}
                onCreate={handleCreate}
                onClose={() => history.push("/agents")}
            />
        </div>
    );
};
