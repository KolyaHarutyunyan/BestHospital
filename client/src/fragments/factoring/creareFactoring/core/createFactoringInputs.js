import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {officeActions} from "@eachbase/store";
import {useHistory} from "react-router-dom";
import {
    Colors, CountryList,
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

export const CreateFactoringInputs = ({handleChangeName, info}) => {
    const globalStyle = useGlobalText();
    const globalInputs = useGlobalStyles();
    const globalScreens = createInputsWrapper();
    const dispatch = useDispatch();
    const history = useHistory();
    const [disables, setDisabled] = useState( !!info)
    const [fullAddress, setFullAddress] = useState(info ? info.address.formattedAddress : '')
    const [error, setError] = useState('')
    const [phone, setPhone] = useState(info ? info.phoneNumber : '')
    const [inputs, setInputs] = useState(info ? { ...info } : {});

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
            "address": fullAddress ,
            "officeId": info ? info.id : ''
        };

        if (inputs.name && inputs.email && phone && inputs.establishedDate && fullAddress) {
            if(info){
                // dispatch(officeActions.editOffice(editData))
                setDisabled(true)
            }else{
             // dispatch(officeActions.createFundingSource(data))
            }
        } else {
            setError(
                !inputs.company ? 'company' :
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

                    {info && <Circle number={1} back={Colors.ThemeOrange}/> }
                   <p className={globalStyle.title}>Factoring Company Information</p>
                </div>

                {info &&
                <EditSaveButtons
                   handleChancel={() => setDisabled(true)}
                   handleSetEdit={() => setDisabled(false)}
                   handleSaveInfo={handleCreate}
                />}
            </div>



            <div style={{display:'flex', width:'100%'}}>
                {info &&  <Line height={'281px'}/> }

            <div style={{width:'100%'}}>
              <div  className={globalScreens.basicInfo}>
                <p className={globalStyle.smallText}>Basic Information</p>
                <div className={globalScreens.basicInfoInputs}>

                    <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"company"}
                        type={"text"}
                        label={"Company Name*"}
                        typeError={error === 'company' ? ErrorText.field : ''}
                        onChange={handleChange}
                        value={ inputs.company }
                        disabled={disables}
                    />

                    <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"id"}
                        type={"text"}
                        label={"ID*"}
                        typeError={error === 'id' ? ErrorText.field : ''}
                        onChange={handleChange}
                        value={ inputs.id }
                        disabled={disables}
                    />

                    <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"bank"}
                        type={"text"}
                        label={"Bank Name"}
                        typeError={error === 'bank' ? ErrorText.field : ''}
                        onChange={handleChange}
                        value={ inputs.bank }
                        disabled={disables}
                    />

                    <ValidationInput
                        style={globalInputs.simpleInput}
                        variant={"outlined"}
                        name={"account"}
                        type={"text"}
                        label={"Account Number"}
                        typeError={error === 'account' ? ErrorText.field : ''}
                        onChange={handleChange}
                        value={ inputs.account }
                        disabled={disables}
                    />

                     <ValidationInput
                        variant={"outlined"}
                        name={"routing"}
                        type={"text"}
                        label={"Routing Number"}
                        typeError={error === 'routing' ? ErrorText.field : ''}
                        onChange={handleChange}
                        value={ inputs.routing }
                        disabled={disables}
                    />
                </div>

                  <div style={{display:'flex', width:'100%',marginTop:'28px'}}>
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
                      validator={EmailValidator}
                      variant={"outlined"}
                      name={"remittance"}
                      type={"email"}
                      label={"Remittance Email"}
                      typeError={error === 'remittance' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                      sendBoolean={ (bool) => bool === true ? setError("Not valid email") : setError('') }
                      onChange={handleChange}
                      value={inputs.remittance}
                      disabled={disables}
                  />

                      <ValidationInput
                          style={globalInputs.simpleInput}
                          validator={EmailValidator}
                          variant={"outlined"}
                          name={"email"}
                          type={"email"}
                          label={"Email Address*"}
                          typeError={error === 'email' ? ErrorText.field : error === 'Not valid email' ? 'Not valid email' : ''}
                          sendBoolean={ (bool) => bool === true ? setError("Not valid email") : setError('') }
                          onChange={handleChange}
                          value={inputs.email}
                          disabled={disables}
                      />

                      <SelectInput
                          name={"payment"}
                          label={"Payment Method"}
                          handleSelect={ handleChange }
                          value={ inputs.officeName }
                          list={ ['officesListReserve'] }
                          typeError={error === 'payment' ? ErrorText.field : ''}
                          type={'id'}
                      />

                  </div>
            </div>

            <div className={globalScreens.basicInfo}>
                <p className={globalStyle.smallText}>Address</p>

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
                onClose={() => history.push('/factoring')}
            />
            }
        </div>
    );
};
