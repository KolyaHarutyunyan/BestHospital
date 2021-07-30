import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  EmailValidator,
  useGlobalStyles,
  useGlobalText,
  createInputsWrapper, ErrorText, Colors
} from "@eachbase/utils";
import {AddressInput, Circle, CreateChancel, EditSaveButtons, Line, ValidationInput} from "@eachbase/components";
import { useDispatch } from "react-redux";
import { adminActions } from "@eachbase/store";

export const CreateAdminInputs = ({ handleChangeFirstName, handleChangeLastName, info }) => {
  const globalStyle = useGlobalText();
  const globalInputs = useGlobalStyles();
  const globalScreens = createInputsWrapper();
  const dispatch = useDispatch()
  const history = useHistory();
  const [disables, setDisabled] = useState( info ? true : false)
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState(info ? { ...info } : {});


  const [fullAddress, setFullAddress] =useState('')


  const handleChange = e => setInputs(
    prevState => ({ ...prevState, [e.target.name]: e.target.value }),
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

  const handleCreate =()=>{
   const data ={
     "firstName": inputs.firstName,
     "lastName": inputs.lastName,
     "username": inputs.username,
     "email": inputs.email,
     "phoneNumber": '14842989314',

     // "phoneNumber": inputs.phoneNumber,
     "ssn": 0,
     "dl": "string",
     "role": "Admin",
     "address":fullAddress,
   }

    dispatch(adminActions.createAdmin(data))

  }

  return (
    <div className={globalScreens.createInputsWrapper}>

      <div className={globalInputs.spaceBetween}>
        <div className={globalInputs.centerItem}>

          {info && <Circle number={1} back={Colors.ThemeYellow}/> }
          <p className={globalStyle.title}>Person Information</p>
        </div>

        {info &&
        <EditSaveButtons
            handleChancel={() => setDisabled(true)}
            handleSetEdit={() => setDisabled(false)}
            handleSaveInfo={handleCreate}
        />

        }

      </div>

      <div style={{display:'flex', }}>

        {info &&  <Line height={'281px'}/> }

        <div style={{ width:'100%'}}>

        <div className={globalScreens.basicInfo}>
        <p className={globalStyle.smallText}>Basic Information</p>

        <div>
          <div className={globalScreens.basicInfoInputs}>

            <ValidationInput
              style={globalInputs.simpleInput}
              variant={"outlined"}
              name={"firstName"}
              label={"First Name*"}
              value={inputs.firstName}
              onChange={handleChange}
            />
            <ValidationInput
              style={globalInputs.simpleInput}
              variant={"outlined"}
              name={"lastName"}
              label={"Last Name*"}
              value={inputs.lastName}
              onChange={handleChange}
            />
            <ValidationInput
              style={globalInputs.simpleInput}
              variant={"outlined"}
              name={"username"}
              label={"Username"}
              value={inputs.username}
              onChange={handleChange}

            />
            <ValidationInput
              variant={"outlined"}
              name={"role"}
              label={"Role"}
              value={inputs.role}
              onChange={handleChange}
            />

          </div>

          <div className={globalScreens.basicInfoInputs}>
            <ValidationInput
              style={globalInputs.simpleInput}
              validator={EmailValidator}
              variant={"outlined"}
              name={"email"}
              type={"email"}
              label={"Email Address*"}
              typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ?  'Not valid email' : ''}
              sendBoolean={ handleCheck }
              value={inputs.email}
              onChange={handleChange}
            />

            <ValidationInput
              style={globalInputs.simpleInput}
              variant={"outlined"}
              name={"phoneNumber"}
              label={"Phone Number*"}
              type={'number'}
              typeError={ error === 'phone' ? ErrorText.field : ''}
              value={inputs.phoneNumber}
              onChange={handleChange}
            />


            <ValidationInput
              style={globalInputs.simpleInput}
              variant={"outlined"}
              name={"ssn"}
              label={"SSN"}
              value={inputs.ssn}
              onChange={handleChange}
            />

            <ValidationInput
              variant={"outlined"}
              name={"driverLicense"}
              label={"Driver License"}
              value={inputs.driverLicense}
              onChange={handleChange}
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

        </div>

      </div>
      {!info &&
      <CreateChancel
          classes={globalInputs.buttonsStyle}
          create={"Create"}
          chancel={"Cancel"}
          onCreate={handleCreate}
          onClose={() => history.push("/humanResources")}
      />
      }
    </div>
  );
};
