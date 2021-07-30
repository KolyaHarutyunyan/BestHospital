import React, {useState} from "react";
import {createStaffModalStyle} from "./style";
import {Steps, CloseButton} from "@eachbase/components";
import {useGlobalTextStyles} from "@eachbase/utils";
import {AddressInput, ValidationInput, SelectInput, CreateChancel} from "@eachbase/components";
import {EmailValidator, ErrorText} from "@eachbase/utils";

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
    {name: 'Famele'},
    {name: 'Other'},
]

export const CreateStaff = ({handleClose}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});

    console.log(inputs,'inputs')

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
        // const data = {
        //     "name": inputs.name,
        //     "officeId": inputs.officeName,
        //     "email": inputs.email,
        //     "phoneNumber": phone,
        //     "establishedDate": new Date(inputs.date).getTime(),
        //     "address": fullAddress
        // }
        if (inputs.firstName &&
            inputs.middleName &&
            inputs.lastName &&
            inputs.primaryEmail &&
            inputs.secondaryEmail &&
            inputs.primaryPhoneNumber &&
            inputs.secondaryPhoneNumber &&
            inputs.driverLicense &&
            inputs.issuingState &&
            inputs.expirationDate &&
            inputs.department &&
            inputs.supervisor &&
            inputs.residencyStatus &&
            inputs.ssnNumber &&
            inputs.gender &&
            inputs.birthDate
        ) {
            // dispatch(fundingSourceActions.createFundingSource(data))
        } else {
            setError(
                !inputs.firstName ? 'firstName' :
                    !inputs.middleName ? 'middleNAme' :
                     !inputs.lastName ? 'lastName' :
                      !inputs.primaryEmail ? 'primaryEmail' :
                      !inputs.secondaryEmail ? 'secondaryEmail' :
                      !inputs.primaryPhoneNumber ? 'primaryPhoneNumber' :
                      !inputs.secondaryPhoneNumber ? 'secondaryPhoneNumber' :
                       !inputs.driverLicense ? 'driverLicense' :
                       !inputs.issuingState ? 'issuingState' :
                       !inputs.expirationDate ? 'expirationDate' :
                       !inputs.department ? 'department' :
                        !inputs.supervisor ? 'supervisor' :
                        !inputs.residencyStatus ? 'residencyStatus' :
                        !inputs.ssnNumber ? 'ssnNumber' :
                        !inputs.gender ? 'gender' :
                        !inputs.birthDate ? 'birthDate' :
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
                name={"primaryEmail"}
                type={"email"}
                label={"Primary Email*"}
                typeError={error === 'primaryEmail' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                sendBoolean={handleCheck}
                value={inputs.primaryEmail}
                onChange={handleChange}
            />

            <ValidationInput
                // style={globalInputs.simpleInput}
                validator={EmailValidator}
                variant={"outlined"}
                name={"secondaryEmail"}
                type={"email"}
                label={"Secondary Email*"}
                typeError={error === 'secondaryEmail' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                sendBoolean={handleCheck}
                value={inputs.secondaryEmail}
                onChange={handleChange}
            />
            <ValidationInput
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.primaryPhoneNumber}
                variant={"outlined"}
                type={"number"}
                label={"Primary Phone Number*"}
                name={'primaryPhoneNumber'}
                typeError={error === 'primaryPhoneNumber' && ErrorText.field}
            />
            <ValidationInput
                sendBoolean={handleCheck}
                onChange={handleChange}
                value={inputs.secondaryPhoneNumber}
                variant={"outlined"}
                type={"number"}
                label={"Secondary Phone Number*"}
                name={'secondaryPhoneNumber'}
                typeError={error === 'secondaryPhoneNumber' && ErrorText.field}
            />
        </React.Fragment>
    )

    const secondStep = (
        <React.Fragment>
            <AddressInput Value='Street Address*' flex='block'/>
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
                label={"Residency Status*"}
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
                value={inputs.ssnNumber}
                type={"number"}
                label={"SSN Number*"}
                name='ssnNumber'
                typeError={error === 'ssnNumber' && ErrorText.field}
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
                    value={inputs.birthDate}
                    type={"date"}
                    label={"Date of Birth*"}
                    name='birthDate'
                    typeError={error === 'birthDate' && ErrorText.field}
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
                firstStep={firstStep}
                secondStep={secondStep}
                thirdStep={thirdStep}
                stepTitles={steps}
                handleClose={handleClose}/>
        </div>
    );
};
