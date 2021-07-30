import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createOfficeStyle } from "./styles";
import {
  EmailValidator,
  useGlobalStyles,
  useGlobalText,
  createInputsWrapper, ErrorText, CountryList
} from "@eachbase/utils";
import { AddressInput, CreateChancel, SelectInput, ValidationInput } from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {fundingSourceActions, officeActions} from "@eachbase/store";

export const CreateBranchInputs = ({ handleChangeName }) => {
  const globalStyle = useGlobalText();
  const globalInputs = useGlobalStyles();
  const globalScreens = createInputsWrapper()
  const dispatch = useDispatch()
  const history = useHistory();
  const [fullAddress, setFullAddress] =useState('')
  const [error, setError] =useState('')
  const [phone, setPhone] =useState('')
  const [inputs, setInputs] = useState({});

  const { officesListReserve } = useSelector((state) => ({
    officesListReserve: state.offices.officesListReserve
  }));

  const handleChange = e => setInputs(prevState =>
      ({ ...prevState, [e.target.name]: e.target.value }),
      error === e.target.name && setError(''),
      e.target.name === 'name' && handleChangeName(e.target.value)
  );
  const handleCheck = (bool) => {
    if (bool === true) {
      setError("Not valid email");
    } else {
      setError('');
    }
  };

  const handleChangePhone =(ev) =>{
    if(ev.target.value.length <= 11){
      setPhone(ev.target.value)
      error === 'phone' && setError('')
    }
  }

  const handleCreate =()=> {
    const data ={
      "name": inputs.name,
      "officeId": inputs.officeName,
      "email": inputs.email,
      "phoneNumber": phone,
      "establishedDate": new Date(inputs.date).getTime(),
      "address": fullAddress
    }
    if(inputs.name && inputs.officeName && inputs.email && phone && inputs.date && fullAddress){
       // dispatch(fundingSourceActions.createFundingSource(data))
    }
    else{
      setError(
         !inputs.name ? 'name' :
                !inputs.officeName ? 'officeName' :
                 !inputs.email ? 'email' :
                  !phone ? 'phone' :
                    !inputs.date ? 'date' :
                   'Input is not field'
      )
    }
  }

  return (
    <div className={globalScreens.createInputsWrapper}>
      <p className={globalStyle.title}>Branch Information</p>

      <div className={globalScreens.basicInfo}>
        <p className={globalStyle.smallText}>Basic Information</p>
        <div className={globalScreens.basicInfoInputs}>

          <ValidationInput
            style={globalInputs.simpleInput}
            variant={"outlined"}
            name={"name"}
            type={"text"}
            label={"Name*"}
            typeError={error === 'name' ? ErrorText.field : ''}
            onChange={ handleChange }
            value={ inputs.name }
          />

          <SelectInput
            style={globalInputs.simpleInput}
            name={"officeName"}
            label={"Office Name"}
            handleSelect={ handleChange }
            value={ inputs.officeName }
            list={ officesListReserve }
            typeError={error === 'officeName' ? ErrorText.field : ''}
            type={'id'}

          />

          <ValidationInput
            style={globalInputs.simpleInput}
            validator={EmailValidator}
            variant={"outlined"}
            name={"email"}
            type={"email"}
            label={"Email Address*"}
            typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ?  'Not valid email' : ''}
            sendBoolean={ handleCheck }
            onChange={ handleChange }
            value={ inputs.email }
          />

          <ValidationInput
            style={globalInputs.simpleInput}
            variant={"outlined"}
            name={"phone"}
            label={"Phone Number*"}
            type={'number'}
            typeError={ error === 'phone' ? ErrorText.field : ''}
            onChange={ handleChangePhone }
            value={ phone }
          />

          <ValidationInput
              variant={"outlined"}
              name={"date"}
              type={"date"}
              typeError={ error === 'date' ? ErrorText.field : '' }
              label={"Establishment Date*"}
              onChange={ handleChange }
              value={ inputs.date }
          />


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
      <p>{error === 'Input is not field' ? error : ''}</p>
      <CreateChancel
        classes={globalInputs.buttonsStyle}
        create={"Create"}
        chancel={"Cancel"}
        onCreate={ handleCreate }
        onClose={  () => history.push('/fundingSource')}
      />
    </div>
  );
};
