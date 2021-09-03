import React, {useState} from "react";
import {createStaffModalStyle} from "./style";
import {Steps, CloseButton} from "@eachbase/components";
import {useGlobalTextStyles, EmailValidator, ErrorText} from "@eachbase/utils";
import {AddressInput, ValidationInput, SelectInput} from "@eachbase/components";
import {adminActions} from "@eachbase/store";
import {useDispatch} from "react-redux";
import {inputStyle} from "../../../fundingSource/createFundingSource/core/styles";
import moment from "moment";

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


export const CreateStaff = ({handleClose, resetData, staffGeneral}) => {
    // const staffGeneral = useSelector(state => state.admins.adminInfoById);

    const [error, setError] = useState("");
    const [errorSec, setErrorSec] = useState("");
    const [inputs, setInputs] = useState(resetData ? {} : staffGeneral ? staffGeneral : {});
    const [fullAddress, setFullAddress] = useState('')

    const disabledOne = inputs.firstName && error !== 'Not valid email' && inputs.lastName && inputs.email && inputs.phone

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
    const handleCheckSecondary = (bool) => {
        if (bool === true) {
            setErrorSec("Not valid email");
        } else {
            setErrorSec("");
        }
    };

    const handleChange = e => {
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const handleCreate = () => {
        const data = {
            firstName: inputs.firstName,
            middleName: inputs.middleName ? inputs.middleName : '',
            lastName: inputs.lastName,
            email: inputs.email,
            secondaryEmail: inputs.secondaryEmail ? inputs.secondaryEmail : '',
            phone: inputs.phone.startsWith('+') ? inputs.phone : `+${inputs.phone}`,
            secondaryPhone: inputs.secondaryPhone ? inputs.secondaryPhone : '',
            state: 'state',
            gender: inputs.gender,
            birthday: (inputs.birthday ? new Date(inputs.birthday).toISOString() : ''),
            residency: 'residency',
            ssn: 0,
            status: staffGeneral ? staffGeneral.status : 1,
            address: fullAddress
        }


        if (inputs.firstName &&
            inputs.lastName &&
            inputs.email &&
            inputs.phone &&
            inputs.gender &&
            inputs.birthday &&
            fullAddress
        ) {
            staffGeneral ?
                dispatch(adminActions.editAdminById(data, staffGeneral.id)) :
                dispatch(adminActions.createAdmin(data))
            handleClose()
        } else {

            setError(
                !inputs.firstName ? 'firstName' :
                    !inputs.lastName ? 'lastName' :
                        !inputs.email ? 'email' :
                            !inputs.phone ? 'phone' :
                                !inputs.gender ? 'gender' :
                                    !inputs.birthday ? 'birthday' :
                                        'Input is not filled'
            )
        }
    }
    const firstStep = (
        <React.Fragment>
            <ValidationInput
                variant={"outlined"}
                onChange={handleChange}
                value={inputs.firstName}
                type={"text"}
                label={"First Name*"}
                name='firstName'
                typeError={error === 'firstName' && ErrorText.field}
            />

            <ValidationInput
                variant={"outlined"}
                onChange={handleChange}
                value={inputs.middleName}
                type={"text"}
                label={"Middle Name"}
                name='middleName'
                typeError={error === 'middleName' && ErrorText.field}
            />

            <ValidationInput
                variant={"outlined"}
                onChange={handleChange}
                value={inputs.lastName}
                type={"text"}
                label={"Last Name*"}
                name='lastName'
                typeError={error === 'lastName' && ErrorText.field}
            />

            <ValidationInput
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
                validator={EmailValidator}
                variant={"outlined"}
                name={"secondaryEmail"}
                type={"email"}
                label={"Secondary Email"}
                typeError={errorSec === 'secondaryEmail' ? ErrorText.field : errorSec === 'Not valid email' ? 'Not valid email' : ''}
                sendBoolean={handleCheckSecondary}
                value={inputs.secondaryEmail}
                onChange={handleChange}
            />
            <ValidationInput
                Length={11}
                onChange={handleChange}
                value={inputs.phone && inputs.phone.replace('+', "")}
                variant={"outlined"}
                type={"number"}
                label={"Primary Phone Number*"}
                name={'phone'}
                typeError={error === 'phone' && ErrorText.field}
            />
            <ValidationInput
                Length={11}
                onChange={handleChange}
                value={inputs.secondaryPhone && inputs.secondaryPhone.replace('+', '')}
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
            <AddressInput
                handleSelectValue={setFullAddress}
                Value={'Street Address*'}
                flex='block'
                info={staffGeneral && staffGeneral.address ? staffGeneral : ''}
                styles={inputStyle}
            />
        </React.Fragment>
    )

    const thirdStep = (
        <React.Fragment>
            <p className={classes.otherDetailsTitle}>Driver License</p>
            <ValidationInput
                variant={"outlined"}
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
                    value={inputs.issuingState}
                    list={issuingStateList}
                    typeError={error === 'issuingState' ? ErrorText.field : ''}
                />
                <ValidationInput
                    variant={"outlined"}
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
                value={inputs.department}
                list={departmentList}
                typeError={error === 'department' ? ErrorText.field : ''}
            />
            <SelectInput
                name={"supervisor"}
                label={"Supervisor*"}
                handleSelect={handleChange}
                value={inputs.supervisor}
                list={supervisorList}
                typeError={error === 'supervisor' ? ErrorText.field : ''}
            />
            <SelectInput
                name={"residencyStatus"}
                label={"Residency Status"}
                handleSelect={handleChange}
                value={inputs.residencyStatus}
                list={residencyList}
                typeError={error === 'residencyStatus' ? ErrorText.field : ''}
            />
            <ValidationInput
                variant={"outlined"}
                value={inputs.ssn}
                type={"number"}
                label={"SSN Number*"}
                name='ssn'
                onChange={handleChange}
                typeError={error === 'ssn' && ErrorText.field}
            />
            <div className={classes.flexContainer}>
                <SelectInput
                    style={classes.selectMargin}
                    name={"gender"}
                    label={"Gender*"}
                    handleSelect={handleChange}
                    value={inputs.gender}
                    list={genderList}
                    typeError={error === 'gender' ? ErrorText.field : ''}
                />
                <ValidationInput
                    variant={"outlined"}
                    onChange={handleChange}
                    value={inputs.birthday && moment(inputs.birthday).format().substring(0, 10)}
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
            <h1 className={`${globalText.modalTitle} ${classes.modalTitle}`}>{resetData ? 'Add Staff Member' : 'Edit Staff Member'}  </h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <Steps
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
