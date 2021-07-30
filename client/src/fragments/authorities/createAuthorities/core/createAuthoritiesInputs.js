import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  EmailValidator,
  useGlobalStyles,
  useGlobalText,
  createInputsWrapper, ErrorText,
} from "@eachbase/utils";
import { AddressInput, CreateChancel, ValidationInput } from "@eachbase/components";
import { useDispatch } from "react-redux";

export const CreateAuthoritiesInputs = ({ }) => {
  const globalStyle = useGlobalText();
  const globalInputs = useGlobalStyles();
  const globalScreens = createInputsWrapper()
  const dispatch = useDispatch()
  const history = useHistory();
  const [fullAddress, setFullAddress] =useState('')
  const [error, setError] =useState('')
  const [phone, setPhone] =useState('')
  const [mcNumber, setMcNumber] =useState('')
  const [inputs, setInputs] = useState({});

  const handleChange = e => setInputs(prevState =>
      ({ ...prevState, [e.target.name]: e.target.value }),
    error === e.target.name && setError('')
  );

  const handleChangePhone =(ev) =>{
    if(ev.target.name === 'mcNumber'){
      if (ev.target.value.length <= 5) {
        setMcNumber(ev.target.value)
        error === 'mcNumber' && setError('')
      }
    }else {
      if (ev.target.value.length <= 11) {
        setPhone(ev.target.value)
        error === 'phone' && setError('')
      }
    }
  }

  const handleCreate =()=> {


    const data ={
      "name": inputs.name,
      "mcNumber": mcNumber,
      "phoneNumber": phone,
      "address": fullAddress
    }
    if(inputs.name && mcNumber && phone && fullAddress){
      // dispatch(officeActions.createFundingSource(data))
    }
    else{
      setError(
        !inputs.name ? 'name' :
          !mcNumber ? 'mcNumber' :
            !phone ? 'phone' :
                'Input is not field'
      )
    }
  }

  return (
    <div className={globalScreens.createInputsWrapper}>
      <p className={globalStyle.title}>MC Authority Information</p>

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

          <ValidationInput
            style={globalInputs.simpleInput}
            variant={"outlined"}
            name={"mcNumber"}
            label={"MC Number*"}
            type={'number'}
            typeError={ error === 'mcNumber' ? ErrorText.field : ''}
            onChange={ handleChangePhone }
            value={ mcNumber }
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
        onClose={  () => history.push('/authorities')}
      />
    </div>
  );
};
