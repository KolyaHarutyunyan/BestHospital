import React, {useState} from "react";
import {createStaffModalStyle} from "./style";
import {Steps, CloseButton} from "@eachbase/components";
import {useGlobalTextStyles} from "@eachbase/utils";
import {AddressInput, ValidationInput, SelectInput} from "@eachbase/components";
import {EmailValidator, ErrorText} from "@eachbase/utils";
import {adminActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";


const steps = ['General Info', 'Address', 'Other Details']

const issuingStateList = [
    {name: '1'},
    {name: '2'}
]
const departmentList = [
    {name: '3'},
    {name: '4'}
]
const supervisorList = [
    {name: '5'},
    {name: '6'}
]
const residencyList = [
    {name: '7'},
    {name: '8'}
]

const genderList = [
    {name: 'Male'},
    {name: 'Female'},
    {name: 'Other'},
]


export const CreateStaff = ({handleClose, editGeneralInfo}) => {
    const staffGeneral = useSelector(state => state.admins.adminInfoById);

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(staffGeneral ? staffGeneral : {});

    const [fullAddress, setFullAddress] = useState('')

    const disabledOne = inputs.firstName && inputs.middleName && error !== 'Not valid email' && inputs.lastName && inputs.email && inputs.phone
    const disableSecond = !fullAddress.length

    const dispatch = useDispatch()

    const classes = createStaffModalStyle()
    const globalText = useGlobalTextStyles()

    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };
    const handleChange = e => setInputs(
        prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
        const data = {
            "firstName": inputs.firstName,
            "middleName": inputs.middleName,
            "lastName": inputs.lastName,
            "email": inputs.email,
            "secondaryEmail": inputs.secondaryEmail,
            "phone": inputs.phone,
            "secondaryPhone": inputs.secondaryPhone,
            "state": 'state',
            'gender': inputs.gender,
            'birthday': inputs.birthday,
            'residency': 'residency',
            'ssn': 0
        }
        if (inputs.firstName &&
            inputs.middleName &&
            inputs.lastName &&
            inputs.email &&
            // inputs.secondaryEmail &&
            inputs.phone &&
            // inputs.secondaryPhone &&
            // inputs.driverLicense &&
            // inputs.issuingState &&
            // inputs.expirationDate &&
            // inputs.department &&
            inputs.supervisor &&
            // inputs.residencyStatus &&
            // inputs.ssn &&
            inputs.gender &&
            inputs.birthday
        ) {
            staffGeneral ? dispatch(adminActions.editAdmin(data, staffGeneral.id)) : dispatch(adminActions.createAdmin(data))
            handleClose()

        } else {

            setError(
                !inputs.firstName ? 'firstName' :
                    !inputs.middleName ? 'middleName' :
                        !inputs.lastName ? 'lastName' :
                            !inputs.email ? 'email' :
                                !inputs.phone ? 'phone' :
                                    // !inputs.driverLicense ? 'driverLicense' :
                                    //     !inputs.issuingState ? 'issuingState' :
                                    //         !inputs.expirationDate ? 'expirationDate' :
                                    //             !inputs.department ? 'department' :
                                    //                 !inputs.supervisor ? 'supervisor' :
                                    //                     !inputs.ssn ? 'ssn' :
                                                            !inputs.gender ? 'gender' :
                                                                !inputs.birthday ? 'birthday' :
                                                                    'Input is not field'
            )
        }
    }

    const firstStep = (
        <React.Fragment>
            <ValidationInput
                variant={"outlined"}
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.firstName}
                type={"text"}
                label={"First Name*"}
                name='firstName'
                typeError={error === 'firstName' && ErrorText.field}
            />

            <ValidationInput
                variant={"outlined"}
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.middleName}
                type={"text"}
                label={"Middle Name*"}
                name='middleName'
                typeError={error === 'middleName' && ErrorText.field}
            />

            <ValidationInput
                variant={"outlined"}
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.lastName}
                type={"text"}
                label={"Last Name*"}
                name='lastName'
                typeError={error === 'lastName' && ErrorText.field}
            />

            <ValidationInput
                // style={globalInputs.simpleInput}
                validator={EmailValidator}
                variant={"outlined"}
                name={"email"}
                type={"email"}
                label={"Primary Email*"}
                typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                sendBoolean={handleCheck}
                value={inputs.email}
                onChange={handleChange}
            />

            <ValidationInput
                // style={globalInputs.simpleInput}
                validator={EmailValidator}
                variant={"outlined"}
                name={"secondaryEmail"}
                type={"email"}
                label={"Secondary Email"}
                typeError={error === 'secondaryEmail' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                sendBoolean={handleCheck}
                value={inputs.secondaryEmail}
                onChange={handleChange}
            />
            <ValidationInput
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.phone}
                variant={"outlined"}
                type={"number"}
                label={"Primary Phone Number*"}
                name={'phone'}
                typeError={error === 'phone' && ErrorText.field}
            />
            <ValidationInput
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.secondaryPhone}
                variant={"outlined"}
                type={"number"}
                label={"Secondary Phone Number"}
                name={'secondaryPhone'}
                typeError={error === 'secondaryPhone' && ErrorText.field}
            />
        </React.Fragment>
    )

    const secondStep = (
        <React.Fragment>
            <AddressInput handleSelectValue={setFullAddress} Value={'Street Address*'} flex='block'/>
        </React.Fragment>
    )

    const thirdStep = (
        <React.Fragment>
            <p className={classes.otherDetailsTitle}>Driver License</p>
            <ValidationInput
                variant={"outlined"}
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.driverLicense}
                type={"text"}
                label={"Driver License*"}
                name='driverLicense'
                typeError={error === 'driverLicense' && ErrorText.field}
            />
            <div className={classes.flexContainer}>
                <SelectInput
                    style={classes.selectMargin}
                    name={"issuingState"}
                    label={"Issuing State*"}
                    handleSelect={handleChange}
                    sendBoolean={handleCheck}
                    value={inputs.issuingState}
                    list={issuingStateList}
                    typeError={error === 'issuingState' ? ErrorText.field : ''}
                    // type={'id'}
                />
                <ValidationInput
                    variant={"outlined"}
                    sendBoolean={handleCheck}
                    onChange={handleChange}
                    value={inputs.expirationDate}
                    type={"date"}
                    label={"Expiration Date*"}
                    name='expirationDate'
                    typeError={error === 'expirationDate' && ErrorText.field}
                />
            </div>
            <p className={`${classes.otherDetailsTitle} ${classes.titlePadding}`}>Other</p>
            <SelectInput
                name={"department"}
                label={"Department*"}
                handleSelect={handleChange}
                sendBoolean={handleCheck}
                value={inputs.department}
                list={departmentList}
                typeError={error === 'department' ? ErrorText.field : ''}
                // type={'id'}
            />
            <SelectInput
                name={"supervisor"}
                label={"Supervisor*"}
                handleSelect={handleChange}
                sendBoolean={handleCheck}
                value={inputs.supervisor}
                list={supervisorList}
                typeError={error === 'supervisor' ? ErrorText.field : ''}
                // type={'id'}
            />
            <SelectInput
                name={"residencyStatus"}
                label={"Residency Status"}
                handleSelect={handleChange}
                sendBoolean={handleCheck}
                value={inputs.residencyStatus}
                list={residencyList}
                typeError={error === 'residencyStatus' ? ErrorText.field : ''}
                // type={'id'}
            />
            <ValidationInput
                variant={"outlined"}
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.ssn}
                type={"number"}
                label={"SSN Number*"}
                name='ssn'
                typeError={error === 'ssn' && ErrorText.field}
            />
            <div className={classes.flexContainer}>
                <SelectInput
                    style={classes.selectMargin}
                    name={"gender"}
                    label={"Gender*"}
                    handleSelect={handleChange}
                    sendBoolean={handleCheck}
                    value={inputs.gender}
                    list={genderList}
                    typeError={error === 'gender' ? ErrorText.field : ''}
                />
                <ValidationInput
                    variant={"outlined"}
                    sendBoolean={handleCheck}
                    onChange={handleChange}
                    value={inputs.birthday}
                    type={"date"}
                    label={"Date of Birth*"}
                    name='birthday'
                    typeError={error === 'birthday' && ErrorText.field}
                />
            </div>
        </React.Fragment>
    )

    return (
        <div className={classes.modalDimensions}>
            <h1 className={`${globalText.modalTitle} ${classes.modalTitle}`}>Add Staff Member</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <Steps
                editGeneralInfo={editGeneralInfo}
                handleClick={handleCreate}
                firstStep={firstStep}
                secondStep={secondStep}
                thirdStep={thirdStep}
                stepTitles={steps}
                handleClose={handleClose}
                disabledOne={disabledOne}
                disableSecond={disableSecond}
            />
        </div>
    );
};
